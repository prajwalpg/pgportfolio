'use server';

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "portfolio_visit_session";
const SESSION_DURATION_SECONDS = 6 * 60 * 60; // 6 hours deduplication window

export type VisitCountResponse = {
  success: boolean;
  count: number;
  uniqueCount: number;
  isOffline?: boolean;
};

export async function recordVisit(): Promise<VisitCountResponse> {
  try {
    const cookieStore = await cookies();
    const existingSession = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!existingSession) {
      const newSessionToken = crypto.randomUUID();

      // Record visit entry in persistent database
      await db.visit.create({
        data: {
          sessionToken: newSessionToken,
          visitorHash: crypto
            .createHash("sha256")
            .update(newSessionToken)
            .digest("hex")
            .substring(0, 16),
        },
      });

      // Set deduplication session cookie
      cookieStore.set(SESSION_COOKIE_NAME, newSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_DURATION_SECONDS,
        path: "/",
      });
    }

    const [totalVisits, uniqueVisitsResult] = await Promise.all([
      db.visit.count(),
      db.visit.groupBy({
        by: ["sessionToken"],
        _count: true,
      }),
    ]);

    return {
      success: true,
      count: totalVisits,
      uniqueCount: uniqueVisitsResult.length,
    };
  } catch (error) {
    console.error("Error recording visitor count:", error);
    // Graceful fallback if database is temporarily offline
    return {
      success: false,
      count: 0,
      uniqueCount: 0,
      isOffline: true,
    };
  }
}

export async function getPublicVisitorCount(): Promise<VisitCountResponse> {
  try {
    const [totalVisits, uniqueVisitsResult] = await Promise.all([
      db.visit.count(),
      db.visit.groupBy({
        by: ["sessionToken"],
        _count: true,
      }),
    ]);

    return {
      success: true,
      count: totalVisits,
      uniqueCount: uniqueVisitsResult.length,
    };
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    return {
      success: false,
      count: 0,
      uniqueCount: 0,
      isOffline: true,
    };
  }
}

export type GuestbookInput = {
  name: string;
  message?: string;
  publicConsent: boolean;
  honeypot?: string; // Bot protection
};

export async function submitGuestbook(input: GuestbookInput) {
  try {
    // Spam check: honeypot field must be empty
    if (input.honeypot && input.honeypot.trim() !== "") {
      return { success: false, error: "Spam detected." };
    }

    const name = input.name ? input.name.trim() : "";
    const message = input.message ? input.message.trim() : "";

    if (!name || name.length < 2 || name.length > 50) {
      return {
        success: false,
        error: "Name must be between 2 and 50 characters.",
      };
    }

    if (message && message.length > 280) {
      return {
        success: false,
        error: "Message must be 280 characters or fewer.",
      };
    }

    const cookieStore = await cookies();
    const hasSubmitted = cookieStore.get("guestbook_submitted_recently");
    if (hasSubmitted) {
      return {
        success: false,
        error: "You have recently submitted a message. Please try again later.",
      };
    }

    // Sanitize string content
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    await db.guestbookEntry.create({
      data: {
        name: sanitizedName,
        message: sanitizedMessage || null,
        publicConsent: Boolean(input.publicConsent),
        approved: false, // Default: owner must approve for public display
      },
    });

    // Rate-limit cookie (1 hour)
    cookieStore.set("guestbook_submitted_recently", "true", {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
    });

    return { success: true, name: sanitizedName };
  } catch (error) {
    console.error("Error submitting guestbook entry:", error);
    return {
      success: false,
      error: "Failed to submit guestbook entry. Please try again.",
    };
  }
}

export async function getPublicGuestbookEntries() {
  try {
    const config = await db.systemConfig.findUnique({
      where: { key: "PUBLIC_GUESTBOOK_ENABLED" },
    });

    const isPublicEnabled = config?.value === "true";

    if (!isPublicEnabled) {
      return { enabled: false, entries: [] };
    }

    const entries = await db.guestbookEntry.findMany({
      where: {
        publicConsent: true,
        approved: true,
      },
      select: {
        id: true,
        name: true,
        message: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return { enabled: true, entries };
  } catch (error) {
    console.error("Error fetching public guestbook entries:", error);
    return { enabled: false, entries: [] };
  }
}

'use server';

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_COOKIE_NAME = "portfolio_admin_session";

function getExpectedAdminToken() {
  const secret = process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_PASSWORD || "prajwal-ai-admin-secret-2026";
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    return token === getExpectedAdminToken();
  } catch (error) {
    return false;
  }
}

export async function adminLogin(password: string) {
  try {
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
    const authSecret = process.env.ADMIN_AUTH_SECRET;

    if (password === expectedPassword || (authSecret && password === authSecret)) {
      const cookieStore = await cookies();
      const token = getExpectedAdminToken();

      cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      return { success: true };
    }

    return { success: false, error: "Invalid admin password." };
  } catch (error) {
    console.error("Admin login error:", error);
    return { success: false, error: "Authentication failed." };
  }
}

export async function adminLogout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getAdminMessages() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  return await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateMessageStatus(id: string, status: "NEW" | "READ" | "REPLIED") {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.contactMessage.update({
    where: { id },
    data: { status },
  });

  return { success: true };
}

export async function deleteMessage(id: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.contactMessage.delete({
    where: { id },
  });

  return { success: true };
}

export async function getAdminVisitorStats() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  const [totalVisits, uniqueSessions, guestbookCount, publicGuestbookCount, isPublicEnabled] =
    await Promise.all([
      db.visit.count(),
      db.visit.groupBy({ by: ["sessionToken"], _count: true }),
      db.guestbookEntry.count(),
      db.guestbookEntry.count({ where: { publicConsent: true } }),
      db.systemConfig.findUnique({ where: { key: "PUBLIC_GUESTBOOK_ENABLED" } }),
    ]);

  return {
    totalVisits,
    uniqueVisitors: uniqueSessions.length,
    guestbookSubmissions: guestbookCount,
    publicOptInSubmissions: publicGuestbookCount,
    isPublicGuestbookEnabled: isPublicEnabled?.value === "true",
  };
}

export async function getAdminGuestbookEntries() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  return await db.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateGuestbookApproval(id: string, approved: boolean) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.guestbookEntry.update({
    where: { id },
    data: { approved },
  });

  return { success: true };
}

export async function deleteGuestbookEntry(id: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.guestbookEntry.delete({
    where: { id },
  });

  return { success: true };
}

export async function togglePublicGuestbookSetting(enabled: boolean) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.systemConfig.upsert({
    where: { key: "PUBLIC_GUESTBOOK_ENABLED" },
    update: { value: enabled ? "true" : "false" },
    create: { key: "PUBLIC_GUESTBOOK_ENABLED", value: enabled ? "true" : "false" },
  });

  return { success: true, enabled };
}

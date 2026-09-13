'use server';

import { db } from "@/lib/db";
import { cookies } from "next/headers";

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
};

export async function submitContactMessage(input: ContactInput) {
  try {
    // Spam bot check
    if (input.honeypot && input.honeypot.trim() !== "") {
      return { success: false, error: "Spam submission detected." };
    }

    if (!input.consent) {
      return {
        success: false,
        error: "You must agree to have your message stored to contact me.",
      };
    }

    const name = input.name?.trim() || "";
    const email = input.email?.trim() || "";
    const phone = input.phone?.trim() || "";
    const subject = input.subject?.trim() || "New Inquiry";
    const message = input.message?.trim() || "";

    if (!name || name.length < 2 || name.length > 80) {
      return { success: false, error: "Please enter a valid name (2-80 characters)." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!message || message.length < 5 || message.length > 2000) {
      return {
        success: false,
        error: "Message must be between 5 and 2000 characters.",
      };
    }

    // Rate limiting check via session cookie
    const cookieStore = await cookies();
    const recentlySubmitted = cookieStore.get("contact_submitted_recently");
    if (recentlySubmitted) {
      return {
        success: false,
        error: "You have submitted a message recently. Please wait a few minutes before submitting another.",
      };
    }

    // Sanitize string fields
    const cleanName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanPhone = phone.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanSubject = subject.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 1. Save to Database
    const savedMessage = await db.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone || null,
        subject: cleanSubject,
        message: cleanMessage,
        status: "NEW",
      },
    });

    // 2. Optional Resend Email Delivery
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "prajwal02pg@gmail.com";
    let emailSent = false;

    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: cleanEmail,
            subject: `New Portfolio Contact: ${cleanSubject}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${cleanName}</p>
              <p><strong>Email:</strong> ${cleanEmail}</p>
              <p><strong>Phone:</strong> ${cleanPhone || "Not provided"}</p>
              <p><strong>Subject:</strong> ${cleanSubject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${cleanMessage}</p>
              <hr />
              <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
            `,
          }),
        });

        if (response.ok) {
          emailSent = true;
        } else {
          console.warn("Resend API response not OK:", await response.text());
        }
      } catch (err) {
        console.error("Failed to send email notification via Resend:", err);
      }
    }

    // Set rate limit cookie for 5 minutes
    cookieStore.set("contact_submitted_recently", "true", {
      httpOnly: true,
      maxAge: 300,
      path: "/",
    });

    return {
      success: true,
      emailNotificationSent: emailSent,
      messageId: savedMessage.id,
      message: "Message sent successfully. I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error handling contact submission:", error);
    return {
      success: false,
      error: "Something went wrong while sending your message. Please try again or email me directly.",
    };
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend, FROM_ADDRESS, CONTACT_ADDRESS, contactNotificationEmail, contactAutoReplyEmail } from "@/lib/mail";

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  studentName: z.string().max(100).optional(),
  desiredCourse: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, studentName, desiredCourse, message } = parsed.data;

  try {
    await db.contactSubmission.create({
      data: { firstName, lastName, email, phone, studentName, desiredCourse, message },
    });

    const notification = contactNotificationEmail({ firstName, lastName, email, phone, studentName, desiredCourse, message });
    const autoReply = contactAutoReplyEmail(firstName);

    const notifResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_ADDRESS,
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName}`,
      html: notification.html,
      text: notification.text,
    });
    console.log("[contact] notification result:", JSON.stringify(notifResult));

    const autoReplyResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "We've received your enquiry — Brilliant Tutors Academy",
      html: autoReply.html,
      text: autoReply.text,
    });
    console.log("[contact] auto-reply result:", JSON.stringify(autoReplyResult));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submission failed", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

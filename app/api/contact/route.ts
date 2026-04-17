import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend, FROM_ADDRESS, CONTACT_ADDRESS } from "@/lib/mail";

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

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_ADDRESS,
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        studentName ? `Child's name: ${studentName}` : null,
        desiredCourse ? `Programme: ${desiredCourse}` : null,
        `\nMessage:\n${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submission failed", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = process.env.NODE_ENV === "production"
  ? "Brilliant Tutors Academy <no-reply@brilliant-tutors.co.uk>"
  : "Brilliant Tutors Academy <onboarding@resend.dev>";
export const CONTACT_ADDRESS = process.env.ADMIN_EMAIL ?? "contact@brilliant-tutors.co.uk";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk";

// ─── Shared layout ─────────────────────────────────────────────────────────────

function layout(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1b2b4b;padding:28px 40px;text-align:center;">
            <img src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_80/brilliant-tutors/logo" alt="Brilliant Tutors Academy" width="80" height="80" style="display:block;margin:0 auto 12px;" />
            <p style="margin:0;color:#f5a623;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Brilliant Tutors Academy</p>
            <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">Expert 11+ &amp; GCSE Tutoring</p>
          </td>
        </tr>
        <tr><td style="padding:40px;">${body}</td></tr>
        <tr>
          <td style="background:#f8f8f8;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
              Brilliant Tutors Academy · Reading, Berkshire<br/>
              <a href="tel:01184050184" style="color:#9ca3af;">01184 050184</a> ·
              <a href="mailto:contact@brilliant-tutors.co.uk" style="color:#9ca3af;">contact@brilliant-tutors.co.uk</a>
            </p>
            <p style="margin:10px 0 0;color:#d1d5db;font-size:11px;">&copy; ${new Date().getFullYear()} Brilliant Tutors Academy Ltd. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(text: string, href: string) {
  return `<a href="${href}" style="display:inline-block;background:#f5a623;color:#1a1a1a;font-weight:700;font-size:14px;padding:14px 28px;border-radius:100px;text-decoration:none;margin-top:24px;">${text}</a>`;
}

function divider() {
  return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;" />`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 0;color:#9ca3af;font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#374151;font-size:13px;">${value}</td>
  </tr>`;
}

// ─── Contact: notification to business ────────────────────────────────────────

export function contactNotificationEmail(data: {
  firstName: string; lastName: string; email: string;
  phone?: string; studentName?: string; desiredCourse?: string; message: string;
}) {
  const html = layout(`
    <h2 style="margin:0 0 4px;color:#1b2b4b;font-size:20px;">New enquiry received</h2>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">Someone has submitted the contact form on the website.</p>
    ${divider()}
    <table cellpadding="0" cellspacing="0">
      ${row("Name", `${data.firstName} ${data.lastName}`)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#f5a623;">${data.email}</a>`)}
      ${data.phone ? row("Phone", data.phone) : ""}
      ${data.studentName ? row("Child's name", data.studentName) : ""}
      ${data.desiredCourse ? row("Programme", data.desiredCourse) : ""}
    </table>
    ${divider()}
    <p style="margin:0 0 8px;color:#1b2b4b;font-weight:700;font-size:14px;">Message</p>
    <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
    ${divider()}
    ${btn("Reply to enquiry", `mailto:${data.email}`)}
  `);

  const text = [
    `New enquiry from ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.studentName ? `Child's name: ${data.studentName}` : null,
    data.desiredCourse ? `Programme: ${data.desiredCourse}` : null,
    `\nMessage:\n${data.message}`,
  ].filter(Boolean).join("\n");

  return { html, text };
}

// ─── Contact: auto-reply to customer ─────────────────────────────────────────

export function contactAutoReplyEmail(firstName: string) {
  const html = layout(`
    <h2 style="margin:0 0 8px;color:#1b2b4b;font-size:22px;">Thanks for getting in touch, ${firstName}!</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
      We've received your message and will get back to you within one working day.
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">
      In the meantime, feel free to browse our programmes or check the weekly timetable.
    </p>
    ${divider()}
    <p style="margin:0 0 12px;color:#1b2b4b;font-weight:700;font-size:15px;">Helpful links</p>
    <table cellpadding="0" cellspacing="0">
      <tr><td style="padding:4px 0;"><a href="${SITE}/courses" style="color:#f5a623;font-size:14px;">→ View all programmes</a></td></tr>
      <tr><td style="padding:4px 0;"><a href="${SITE}/mock-exams" style="color:#f5a623;font-size:14px;">→ Mock exam dates</a></td></tr>
      <tr><td style="padding:4px 0;"><a href="${SITE}/timetable" style="color:#f5a623;font-size:14px;">→ Weekly timetable</a></td></tr>
    </table>
    ${btn("Visit our website", SITE)}
  `);

  const text = `Hi ${firstName},\n\nThanks for getting in touch! We've received your message and will reply within one working day.\n\nBrilliant Tutors Academy\n01184 050184\ncontact@brilliant-tutors.co.uk`;

  return { html, text };
}

// ─── Payment receipt ──────────────────────────────────────────────────────────

export type ReceiptItem = { name: string; variant?: string | null; quantity: number; price: number };

export function paymentReceiptEmail(data: {
  firstName: string;
  orderId: string;
  items: ReceiptItem[];
  total: number;
}) {
  const itemRows = data.items.map((item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;">
        <strong>${item.name}</strong>${item.variant ? `<br/><span style="color:#9ca3af;font-size:12px;">${item.variant}</span>` : ""}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;text-align:center;">${item.quantity}</td>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#374151;font-size:14px;text-align:right;">£${(item.price / 100).toFixed(2)}</td>
    </tr>`).join("");

  const html = layout(`
    <h2 style="margin:0 0 4px;color:#1b2b4b;font-size:22px;">Booking confirmed!</h2>
    <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">
      Hi ${data.firstName}, your booking is confirmed and payment received. We look forward to working with your child!
    </p>

    <div style="background:#f8fafc;border-radius:8px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#1b2b4b;font-weight:700;font-size:15px;">Order summary</p>
      <p style="margin:0 0 16px;color:#9ca3af;font-size:12px;">Ref: ${data.orderId.slice(-8).toUpperCase()}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th style="text-align:left;color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;padding-bottom:8px;">Item</th>
            <th style="text-align:center;color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;padding-bottom:8px;">Qty</th>
            <th style="text-align:right;color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;padding-bottom:8px;">Price</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:16px;color:#1b2b4b;font-weight:700;font-size:15px;">Total paid</td>
            <td style="padding-top:16px;color:#1b2b4b;font-weight:700;font-size:15px;text-align:right;">£${(data.total / 100).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div style="background:#fffbeb;border:1px solid #f5a62340;border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:#1b2b4b;font-weight:700;font-size:14px;">What happens next?</p>
      <ul style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.9;">
        <li>We'll be in touch to confirm session dates and setup details.</li>
        <li>Please complete your child's profile in your account.</li>
        <li>Questions? Reply to this email or call us on 01184 050184.</li>
      </ul>
    </div>

    ${btn("View my bookings", `${SITE}/account`)}
  `);

  const text = [
    `Booking confirmed — Brilliant Tutors Academy`,
    ``,
    `Hi ${data.firstName}, your booking is confirmed!`,
    `Ref: ${data.orderId.slice(-8).toUpperCase()}`,
    ``,
    ...data.items.map((i) => `- ${i.name}${i.variant ? ` (${i.variant})` : ""} x${i.quantity} — £${(i.price / 100).toFixed(2)}`),
    ``,
    `Total paid: £${(data.total / 100).toFixed(2)}`,
    ``,
    `View bookings: ${SITE}/account`,
  ].join("\n");

  return { html, text };
}

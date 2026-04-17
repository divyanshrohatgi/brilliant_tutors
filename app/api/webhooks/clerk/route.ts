import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    primary_email_address_id: string;
    first_name: string | null;
    last_name: string | null;
    deleted?: boolean;
  };
};

function primaryEmail(data: ClerkUserEvent["data"]): string {
  return (
    data.email_addresses.find((e) => e.id === data.primary_email_address_id)
      ?.email_address ?? ""
  );
}

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();

  let event: ClerkUserEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "user.created") {
      await db.user.create({
        data: {
          clerkId: event.data.id,
          email: primaryEmail(event.data),
          name: [event.data.first_name, event.data.last_name].filter(Boolean).join(" ") || null,
        },
      });
    }

    if (event.type === "user.updated") {
      await db.user.update({
        where: { clerkId: event.data.id },
        data: {
          email: primaryEmail(event.data),
          name: [event.data.first_name, event.data.last_name].filter(Boolean).join(" ") || null,
        },
      });
    }

    if (event.type === "user.deleted") {
      // Anonymise rather than hard-delete to preserve order history integrity
      await db.user.updateMany({
        where: { clerkId: event.data.id },
        data: {
          email: `deleted-${event.data.id}@deleted`,
          name: null,
          clerkId: `deleted-${event.data.id}`,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[clerk-webhook]", event.type, err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { blogViewLimit } from "@/lib/rate-limit";

type Params = { params: Promise<{ slug: string }> };

function getSessionId(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("cart_session")?.value ?? randomUUID();
}

async function upsertStats(slug: string) {
  return db.postStats.upsert({
    where: { slug },
    create: { slug },
    update: {},
  });
}

export async function GET(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const sessionId = getSessionId(cookieStore);
  const { userId } = await auth();

  const stats = await db.postStats.findUnique({
    where: { slug },
    include: { likes: true, savedBy: true },
  });

  const likes = stats?.likes.length ?? 0;
  const views = stats?.views ?? 0;
  const liked = stats?.likes.some((l) => l.sessionId === sessionId) ?? false;

  let saved = false;
  if (userId) {
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    saved = user ? (stats?.savedBy.some((s) => s.userId === user.id) ?? false) : false;
  }

  return NextResponse.json({ views, likes, liked, saved });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const { action } = await req.json().catch(() => ({ action: null }));
  const cookieStore = await cookies();
  const sessionId = getSessionId(cookieStore);

  if (action === "view") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    const { success } = await blogViewLimit.limit(`${ip}:${slug}`).catch(() => ({ success: true }));
    if (success) {
      await upsertStats(slug);
      await db.postStats.update({ where: { slug }, data: { views: { increment: 1 } } });
    }
    const response = NextResponse.json({ ok: true });
    if (!cookieStore.get("cart_session")) {
      response.cookies.set("cart_session", sessionId, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
    }
    return response;
  }

  if (action === "like") {
    await upsertStats(slug);
    const existing = await db.postLike.findUnique({
      where: { postSlug_sessionId: { postSlug: slug, sessionId } },
    });
    if (existing) {
      await db.postLike.delete({ where: { id: existing.id } });
    } else {
      await db.postLike.create({ data: { postSlug: slug, sessionId } });
    }
    const likes = await db.postLike.count({ where: { postSlug: slug } });
    const response = NextResponse.json({ liked: !existing, likes });
    if (!cookieStore.get("cart_session")) {
      response.cookies.set("cart_session", sessionId, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
    }
    return response;
  }

  if (action === "save") {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Sign in to save posts" }, { status: 401 });
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "Account not found" }, { status: 404 });
    await upsertStats(slug);
    const existing = await db.savedPost.findUnique({
      where: { postSlug_userId: { postSlug: slug, userId: user.id } },
    });
    if (existing) {
      await db.savedPost.delete({ where: { id: existing.id } });
    } else {
      await db.savedPost.create({ data: { postSlug: slug, userId: user.id } });
    }
    return NextResponse.json({ saved: !existing });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

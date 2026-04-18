import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Bookmark, BookmarkX } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved articles | My account",
};

export default async function SavedPostsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/sign-in");

  const saved = await db.savedPost.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const allPosts = getAllPosts();
  const slugSet = new Set(saved.map((s) => s.postSlug));
  const posts = saved
    .map((s) => allPosts.find((p) => p.slug === s.postSlug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <Bookmark className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-primary text-lg">Saved articles</h1>
          <span className="ml-auto text-xs text-muted-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-muted-foreground text-sm mb-1">No saved articles yet.</p>
            <p className="text-xs text-muted-foreground mb-5">Tap the bookmark icon on any blog post to save it here.</p>
            <Link
              href="/blog"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse articles
            </Link>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-0.5">
                      {post.category} · {post.readTime}
                    </p>
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors text-sm truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(post.date))}</p>
                    <span className="text-xs text-primary/40 group-hover:text-accent transition-colors mt-0.5 block">Read →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

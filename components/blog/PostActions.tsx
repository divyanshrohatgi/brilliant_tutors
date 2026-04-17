"use client";

import { useEffect, useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { slug: string };

type Stats = { views: number; likes: number; liked: boolean; saved: boolean };

export function PostActions({ slug }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => null);

    fetch(`/api/blog/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "view" }),
    }).catch(() => null);
  }, [slug]);

  async function toggleLike() {
    if (!stats || likeLoading) return;
    setLikeLoading(true);
    const optimistic = { ...stats, liked: !stats.liked, likes: stats.liked ? stats.likes - 1 : stats.likes + 1 };
    setStats(optimistic);
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      const data = await res.json();
      setStats((prev) => prev ? { ...prev, liked: data.liked, likes: data.likes } : prev);
    } catch {
      setStats(stats);
    } finally {
      setLikeLoading(false);
    }
  }

  async function toggleSave() {
    if (!stats || saveLoading) return;
    setSaveLoading(true);
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save" }),
      });
      if (res.status === 401) {
        window.location.href = "/sign-in";
        return;
      }
      const data = await res.json();
      setStats((prev) => prev ? { ...prev, saved: data.saved } : prev);
    } catch {
      // ignore
    } finally {
      setSaveLoading(false);
    }
  }

  if (!stats) return null;

  return (
    <div className="flex items-center gap-6 py-4 border-t border-border mt-10 text-sm text-muted-foreground">
      <span>{stats.views.toLocaleString()} views</span>

      <button
        type="button"
        onClick={toggleLike}
        disabled={likeLoading}
        className={cn(
          "flex items-center gap-1.5 transition-colors",
          stats.liked ? "text-red-500" : "hover:text-red-500"
        )}
        aria-label={stats.liked ? "Unlike" : "Like"}
      >
        <Heart className={cn("h-4 w-4", stats.liked && "fill-current")} />
        <span>{stats.likes}</span>
      </button>

      <button
        type="button"
        onClick={toggleSave}
        disabled={saveLoading}
        className={cn(
          "flex items-center gap-1.5 transition-colors",
          stats.saved ? "text-primary" : "hover:text-primary"
        )}
        aria-label={stats.saved ? "Unsave" : "Save"}
      >
        <Bookmark className={cn("h-4 w-4", stats.saved && "fill-current")} />
        <span>{stats.saved ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
}

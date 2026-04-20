import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-4">404</p>
      <h1 className="text-4xl font-bold text-primary mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed">
        The page you were looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/courses"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-semibold rounded-md hover:bg-muted transition-colors"
        >
          Browse courses
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-semibold rounded-md hover:bg-muted transition-colors"
        >
          Visit shop
        </Link>
      </div>
    </div>
  );
}

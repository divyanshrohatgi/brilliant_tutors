"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-destructive font-semibold text-xs uppercase tracking-widest mb-4">Something went wrong</p>
      <h1 className="text-4xl font-bold text-primary mb-4">Unexpected error</h1>
      <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed">
        We&apos;re sorry — an unexpected error occurred. Our team has been notified. Please try again or contact us if the problem persists.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-semibold rounded-md hover:bg-muted transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-semibold rounded-md hover:bg-muted transition-colors"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

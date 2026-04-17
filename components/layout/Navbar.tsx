"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X, GraduationCap, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "GCSE", href: "/gcse" },
  { label: "Mock Exams", href: "/mock-exams" },
  { label: "Timetable", href: "/timetable" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    function refreshCart() {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((data) => setCartCount(data.items?.length ?? 0))
        .catch(() => null);
    }
    refreshCart();
    window.addEventListener("cart-updated", refreshCart);
    return () => window.removeEventListener("cart-updated", refreshCart);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg shrink-0">
          <GraduationCap className="h-7 w-7 text-accent" aria-hidden="true" />
          <span>Brilliant Tutors</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px]" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/#contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
          >
            Claim your free assessment
          </Link>

          {!isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors min-h-[44px]"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
              >
                My account
              </Link>
              <UserButton />
            </>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted min-h-[44px] min-w-[44px]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-white"
        >
          <ul className="px-4 py-3 space-y-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "block px-3 py-3 rounded-md text-sm font-medium transition-colors",
                    pathname === href
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-border">
              <Link
                href="/#contact"
                className="block px-3 py-3 text-sm font-bold text-white bg-primary rounded-full text-center mb-2"
                onClick={() => setMobileOpen(false)}
              >
                Claim your free assessment
              </Link>
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="block px-3 py-3 text-sm font-medium text-primary hover:bg-muted rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="block px-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  My account
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

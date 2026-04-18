"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, ShoppingBag, Bookmark, Settings } from "lucide-react";

const links = [
  { label: "Overview", href: "/account", icon: LayoutDashboard, exact: true },
  { label: "Bookings", href: "/account/bookings", icon: CalendarCheck },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Saved articles", href: "/account/saved", icon: Bookmark },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Account navigation">
      <ul className="space-y-0.5">
        {links.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

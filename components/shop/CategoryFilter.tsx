"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const CATEGORIES = [
  { value: "", label: "All" },
  { value: "11-plus", label: "11+ Tuition" },
  { value: "mock-exams", label: "Mock Exams" },
  { value: "gcse", label: "GCSE" },
  { value: "summer", label: "Summer Booster" },
] as const;

export function CategoryFilter({ active }: { active: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function select(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("category", value);
    else next.delete("category");
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <nav aria-label="Filter by category">
      <ul className="flex flex-wrap gap-2" role="list">
        {CATEGORIES.map(({ value, label }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => select(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                active === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              aria-current={active === value ? "true" : undefined}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";

export const metadata: Metadata = {
  title: "Shop — Courses, Mock Exams & Tutoring",
  description: "Book 11+ tuition, GCSE courses, mock exams and summer booster programmes at Brilliant Tutors Academy.",
  alternates: { canonical: "/shop" },
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const products = await db.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "asc" },
    include: { variants: { select: { stock: true } } },
  });

  return (
    <>
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Book a place</h1>
          <p className="text-primary-foreground/80">
            Courses, mock exams and booster programmes across Reading and Berkshire.
          </p>
        </div>
      </section>

      <section className="py-10 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense>
            <CategoryFilter active={category ?? ""} />
          </Suspense>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!products.length ? (
            <p className="text-muted-foreground text-center py-16">
              No products found in this category.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

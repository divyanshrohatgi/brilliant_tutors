import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { VariantSelector } from "@/components/shop/VariantSelector";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    include: { variants: { orderBy: { createdAt: "asc" } } },
  });

  if (!product) notFound();

  const { name, description, basePrice, salePrice, images, locationTags, variants } = product;
  const displayPrice = salePrice ?? basePrice;
  const isOnSale = !!salePrice && salePrice < basePrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
          {images[0] && (
            <Image
              src={images[0]}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Details + purchase panel */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {locationTags.map((tag) => (
                <span key={tag} className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-primary mb-3">{name}</h1>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-primary">{formatPrice(displayPrice)}</span>
              {isOnSale && (
                <span className="text-base text-muted-foreground line-through">{formatPrice(basePrice)}</span>
              )}
              {isOnSale && (
                <span className="text-sm font-semibold text-destructive">
                  Save {formatPrice(basePrice - displayPrice)}
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          <div className="bg-muted rounded-2xl border border-border p-6">
            <VariantSelector
              variants={variants}
              basePrice={basePrice}
              productSlug={slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

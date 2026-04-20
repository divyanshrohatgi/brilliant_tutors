import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { safeJsonLdString } from "@/lib/jsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await db.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return {};

  const ogImage = product.images[0]
    ? { url: product.images[0], width: 1200, height: 630, alt: product.name }
    : undefined;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: images[0] ?? undefined,
    description,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (displayPrice / 100).toFixed(2),
      availability: variants.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(jsonLd) }}
      />

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

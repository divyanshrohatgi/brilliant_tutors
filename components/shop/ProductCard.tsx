import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@prisma/client";

type Props = {
  product: Pick<Product, "slug" | "name" | "description" | "basePrice" | "salePrice" | "images" | "locationTags" | "inventoryBadge" | "category">;
};

export function ProductCard({ product }: Props) {
  const { slug, name, description, basePrice, salePrice, images, locationTags, inventoryBadge } = product;
  const displayPrice = salePrice ?? basePrice;
  const isOnSale = !!salePrice && salePrice < basePrice;

  return (
    <article className="bg-white rounded-xl border border-border overflow-hidden hover:border-accent hover:shadow-md transition-all group">
      <Link href={`/shop/${slug}`} className="block">
        <div className="relative aspect-video bg-muted overflow-hidden">
          {images[0] && (
            <Image
              src={images[0]}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {inventoryBadge && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              {inventoryBadge}
            </span>
          )}
          {isOnSale && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {locationTags.map((tag) => (
              <span key={tag} className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-primary">{formatPrice(displayPrice)}</span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(basePrice)}</span>
              )}
            </div>
            <span className="text-sm font-semibold text-accent">Book →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

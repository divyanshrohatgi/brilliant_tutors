import { PrismaClient, DiscountType } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createClient() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

const db = createClient();

async function main() {
  await db.promoCode.upsert({
    where: { code: "MULTI25OFF" },
    create: {
      code: "MULTI25OFF",
      discountType: DiscountType.PERCENT,
      discountValue: 25,
      isActive: true,
    },
    update: {},
  });

  await db.promoCode.upsert({
    where: { code: "MULTI60OFF" },
    create: {
      code: "MULTI60OFF",
      discountType: DiscountType.FIXED,
      discountValue: 6000,
      isActive: true,
    },
    update: {},
  });

  console.log("Seeded promo codes: MULTI25OFF, MULTI60OFF");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());

import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient, DiscountType } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createClient() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

const db = createClient();

const PLACEHOLDER_IMG = "https://placehold.co/600x400/1B2B4B/F5A623.png";

async function main() {
  // Promo codes
  await db.promoCode.upsert({
    where: { code: "MULTI25OFF" },
    create: { code: "MULTI25OFF", discountType: DiscountType.PERCENT, discountValue: 25, isActive: true },
    update: {},
  });
  await db.promoCode.upsert({
    where: { code: "MULTI60OFF" },
    create: { code: "MULTI60OFF", discountType: DiscountType.FIXED, discountValue: 6000, isActive: true },
    update: {},
  });

  // Products
  const products = [
    {
      slug: "year-5-weekly-tuition-earley",
      name: "Year 5 Weekly Tuition — Earley",
      description: "Full 11+ preparation with weekly 2-hour group sessions at our Earley centre. Covers GL and CEM formats, English, Maths and Reasoning.",
      category: "11-plus",
      basePrice: 18000,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Earley"],
      inventoryBadge: "Limited places",
      variants: [
        { name: "Monday 4pm–6pm", time: "16:00", location: "Earley", stock: 4 },
        { name: "Thursday 4pm–6pm", time: "16:00", location: "Earley", stock: 6 },
        { name: "Saturday 9am–11am", time: "09:00", location: "Earley", stock: 3 },
      ],
    },
    {
      slug: "year-5-weekly-tuition-caversham",
      name: "Year 5 Weekly Tuition — Caversham",
      description: "Full 11+ preparation at our Caversham centre. Same curriculum as Earley — weekly sessions covering all 11+ subjects.",
      category: "11-plus",
      basePrice: 18000,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Caversham"],
      variants: [
        { name: "Tuesday 4pm–6pm", time: "16:00", location: "Caversham", stock: 5 },
        { name: "Saturday 9am–11am", time: "09:00", location: "Caversham", stock: 4 },
      ],
    },
    {
      slug: "year-4-weekly-tuition-earley",
      name: "Year 4 Weekly Tuition — Earley",
      description: "Structured 11+ preparation for Year 4 pupils. Introduces Verbal Reasoning alongside English and Maths.",
      category: "11-plus",
      basePrice: 16000,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Earley"],
      variants: [
        { name: "Wednesday 4pm–6pm", time: "16:00", location: "Earley", stock: 6 },
        { name: "Saturday 11am–1pm", time: "11:00", location: "Earley", stock: 5 },
      ],
    },
    {
      slug: "gl-mock-exam-earley",
      name: "GL Mock Exam — Earley",
      description: "Full GL Assessment paper sat under timed exam conditions. Includes a detailed written feedback report per pupil.",
      category: "mock-exams",
      basePrice: 4500,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Earley"],
      inventoryBadge: "Filling fast",
      variants: [
        { name: "Saturday 14 June 2025 — 9am", time: "09:00", location: "Earley", stock: 12 },
        { name: "Saturday 12 July 2025 — 9am", time: "09:00", location: "Earley", stock: 15 },
      ],
    },
    {
      slug: "gl-mock-exam-slough",
      name: "GL Mock Exam — Slough",
      description: "Full GL Assessment paper at our Slough centre. Timed conditions with written feedback report.",
      category: "mock-exams",
      basePrice: 4500,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Slough"],
      variants: [
        { name: "Saturday 14 June 2025 — 9am", time: "09:00", location: "Slough", stock: 10 },
      ],
    },
    {
      slug: "gcse-maths-weekly-reading",
      name: "GCSE Maths Weekly Tuition — Reading",
      description: "Targeted GCSE Maths support for Years 10 and 11. AQA and Edexcel specs covered. Small groups of maximum 6.",
      category: "gcse",
      basePrice: 16000,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Reading"],
      variants: [
        { name: "Monday 5pm–7pm", time: "17:00", location: "Reading", stock: 3 },
        { name: "Sunday 10am–12pm", time: "10:00", location: "Reading", stock: 4 },
      ],
    },
    {
      slug: "summer-booster-year-5",
      name: "Summer Booster — Year 5",
      description: "Intensive 4-day summer programme for Year 5 pupils. Full 11+ coverage with daily mock practice.",
      category: "summer",
      basePrice: 32000,
      salePrice: 27200,
      images: [PLACEHOLDER_IMG],
      locationTags: ["Earley", "Caversham"],
      inventoryBadge: "Summer 2025",
      variants: [
        { name: "28–31 July 2025 — Earley", location: "Earley", stock: 8 },
        { name: "4–7 August 2025 — Caversham", location: "Caversham", stock: 8 },
      ],
    },
  ];

  for (const p of products) {
    const { variants, ...productData } = p;
    const product = await db.product.upsert({
      where: { slug: productData.slug },
      create: { ...productData, salePrice: productData.salePrice ?? null, inventoryBadge: productData.inventoryBadge ?? null },
      update: { ...productData, salePrice: productData.salePrice ?? null, inventoryBadge: productData.inventoryBadge ?? null },
    });

    for (const v of variants) {
      await db.productVariant.upsert({
        where: {
          id: (await db.productVariant.findFirst({
            where: { productId: product.id, name: v.name },
          }))?.id ?? "new",
        },
        create: { ...v, productId: product.id, time: ("time" in v ? v.time : undefined) ?? null, location: v.location ?? null },
        update: { stock: v.stock },
      });
    }
  }

  console.log(`Seeded ${products.length} products and 2 promo codes`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());

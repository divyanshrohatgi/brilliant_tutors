import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteUrl, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
  { url: `${siteUrl}/courses`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
  { url: `${siteUrl}/courses/year-3`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
  { url: `${siteUrl}/courses/year-4`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
  { url: `${siteUrl}/courses/year-5`, lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
  { url: `${siteUrl}/gcse`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
  { url: `${siteUrl}/mock-exams`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
  { url: `${siteUrl}/summer-booster`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
  { url: `${siteUrl}/shop`, lastModified: new Date(), priority: 0.7, changeFrequency: "weekly" },
  { url: `${siteUrl}/timetable`, lastModified: new Date(), priority: 0.6, changeFrequency: "weekly" },
  { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...postRoutes];
}

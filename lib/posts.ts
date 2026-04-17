import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  cover?: string;
  readTime: string;
  canonical?: string;
};

export type Post = PostMeta & { content: string };

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function parsePost(file: string): PostMeta {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  const description = (data.description as string) || (data.excerpt as string) || "";
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title as string,
    description,
    excerpt: description,
    date: data.date as string,
    author: (data.author as string) || "Brilliant Tutors Academy",
    category: (data.category as string) || "General",
    tags: (data.tags as string[]) || [],
    cover: (data.cover as string) || undefined,
    readTime: (data.readTime as string) || calcReadTime(content),
    canonical: (data.canonical as string) || undefined,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files.map(parsePost).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category: string, excludeSlug?: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category === category && p.slug !== excludeSlug
  );
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const description = (data.description as string) || (data.excerpt as string) || "";
  return {
    slug,
    title: data.title as string,
    description,
    excerpt: description,
    date: data.date as string,
    author: (data.author as string) || "Brilliant Tutors Academy",
    category: (data.category as string) || "General",
    tags: (data.tags as string[]) || [],
    cover: (data.cover as string) || undefined,
    readTime: (data.readTime as string) || calcReadTime(content),
    canonical: (data.canonical as string) || undefined,
    content,
  };
}

export function extractHeadings(content: string): { id: string; text: string }[] {
  const matches = [...content.matchAll(/^## (.+)$/gm)];
  return matches.map(([, text]) => ({
    id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    text,
  }));
}

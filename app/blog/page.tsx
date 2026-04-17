import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk";

export const metadata: Metadata = {
  title: "Blog | 11+ and GCSE Tips | Brilliant Tutors",
  description:
    "Expert advice on 11+ preparation, GCSE revision, mock exams and grammar school admissions from the tutors at Brilliant Tutors Academy in Reading, Berkshire.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | 11+ and GCSE Tips | Brilliant Tutors",
    description:
      "Expert advice on 11+ preparation, GCSE revision, mock exams and grammar school admissions.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Brilliant Tutors Academy Blog",
    url: `${siteUrl}/blog`,
    description: "Advice, exam tips, and insights from our expert tutors.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="bg-white min-h-screen">
        {/* Page header */}
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Resources</p>
          <h1
            className="text-4xl font-semibold text-primary tracking-tight mb-3"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Blog
          </h1>
          <p className="text-base text-muted-foreground leading-7">
            Advice, exam tips, and insights from our expert tutors.
          </p>
        </div>

        {/* Post grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center">No posts yet.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-200 h-full"
                  >
                    {/* Cover */}
                    <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ background: "linear-gradient(135deg, #d1dbe8 0%, #b8c8db 100%)" }}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatDate(new Date(post.date))} &middot; {post.readTime}
                      </p>
                      <h2
                        className="text-xl font-semibold text-primary mb-1.5 group-hover:text-accent transition-colors duration-200 leading-snug"
                        style={{ fontFamily: "var(--font-fraunces)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

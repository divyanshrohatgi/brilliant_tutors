import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, getPostsByCategory, extractHeadings } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { PostActions } from "@/components/blog/PostActions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${siteUrl}/blog/${slug}`;
  const canonical = post.canonical ?? url;

  return {
    title: `${post.title} | Brilliant Tutors`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.cover
        ? [{ url: `${siteUrl}${post.cover}`, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.cover ? [`${siteUrl}${post.cover}`] : [],
    },
  };
}

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith("http");
    return (
      <a
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      />
    );
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} loading="lazy" alt={props.alt ?? ""} />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getPostsByCategory(post.category, slug).slice(0, 3);
  const url = `${siteUrl}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.cover ? `${siteUrl}${post.cover}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Brilliant Tutors Academy",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.category, item: `${siteUrl}/blog?category=${encodeURIComponent(post.category)}` },
      { "@type": "ListItem", position: 4, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="bg-white min-h-screen">
        {/* Breadcrumbs */}
        <div className="border-b border-border">
          <nav
            aria-label="Breadcrumb"
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
          >
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap" role="list">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-accent font-medium">{post.category}</li>
              <li aria-hidden="true">/</li>
              <li className="text-primary truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-12">

            {/* Main content */}
            <main>
              {/* Cover image */}
              {post.cover && (
                <div className="w-full overflow-hidden rounded-2xl mb-8" style={{ height: 360 }}>
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              )}

              {/* Post header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h1
                  className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight leading-tight mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {post.title}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {formatDate(new Date(post.date))} &middot; {post.readTime} &middot; By {post.author}
                </p>
              </header>

              {/* MDX content */}
              <article className="prose prose-neutral max-w-none prose-headings:text-primary prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-7 blog-article">
                <MDXRemote
                  source={post.content}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  components={mdxComponents}
                />
              </article>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <PostActions slug={post.slug} />

              {/* Related posts */}
              {related.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-12 pt-8 border-t border-border">
                  <h2
                    id="related-heading"
                    className="text-xl font-semibold text-primary mb-6"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    More in {post.category}
                  </h2>
                  <ul className="space-y-4" role="list">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-accent transition-colors"
                        >
                          <p className="text-xs text-muted-foreground">{formatDate(new Date(r.date))} &middot; {r.readTime}</p>
                          <p className="font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                            {r.title}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{r.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </main>

            {/* Sidebar — sticky ToC */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    In this article
                  </p>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-2" role="list">
                      {headings.map(({ id, text }) => (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors leading-snug block py-0.5"
                          >
                            {text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

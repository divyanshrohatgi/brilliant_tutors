import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      { source: "/category/all-products", destination: "/shop", permanent: true },
      { source: "/category/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/product-page/:slug", destination: "/shop/product/:slug", permanent: true },
      { source: "/blog-1", destination: "/blog", permanent: true },
      { source: "/blog-1/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/year3", destination: "/courses/year-3", permanent: true },
      { source: "/year4", destination: "/courses/year-4", permanent: true },
      { source: "/year5", destination: "/courses/year-5", permanent: true },
      { source: "/mockexams", destination: "/mock-exams", permanent: true },
      { source: "/gcse-preparation-course", destination: "/gcse", permanent: true },
      { source: "/summer-booster-course", destination: "/summer-booster", permanent: true },
    ];
  },
};

export default nextConfig;

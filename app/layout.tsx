import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A3EBF",
};

export const metadata: Metadata = {
  title: {
    default: "Brilliant Tutors Academy | 11+ & GCSE Tutoring in Reading",
    template: "%s | Brilliant Tutors Academy",
  },
  description:
    "Expert 11+ and GCSE tutoring in Reading, Berkshire. Centres in Earley, Caversham and Slough. Trusted by families preparing for Kendrick, Reading School and FSCE.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://brilliant-tutors.co.uk"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Brilliant Tutors Academy",
  },
};

import { safeJsonLdString } from "@/lib/jsonLd";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://brilliant-tutors.co.uk/#organization",
      name: "Brilliant Tutors Academy",
      url: "https://brilliant-tutors.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_80/brilliant-tutors/logo",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Earley Business Centre, 459 Wokingham Road",
        addressLocality: "Reading",
        addressRegion: "Berkshire",
        postalCode: "RG6 7HU",
        addressCountry: "GB",
      },
      sameAs: [
        "https://www.facebook.com/BTAcademyUK/",
        "https://www.linkedin.com/company/brilliant-tutors-academy/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://brilliant-tutors.co.uk/#website",
      url: "https://brilliant-tutors.co.uk",
      name: "Brilliant Tutors Academy",
      publisher: { "@id": "https://brilliant-tutors.co.uk/#organization" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en-GB" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
        <body className="antialiased min-h-screen flex flex-col">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLdString(orgJsonLd) }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </body>
      </html>
    </ClerkProvider>
  );
}

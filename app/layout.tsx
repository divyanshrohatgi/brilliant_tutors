import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
  themeColor: "#1B2B4B",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en-GB" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
        <body className="antialiased min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

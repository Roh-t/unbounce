import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://unbounce-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Unbounce AI — Next-Gen AI Landing Page Builder & CRO Platform",
    template: "%s | Unbounce AI",
  },
  description:
    "Turn ad clicks into high-converting customers with instant AI landing page generation, smart traffic optimization, and sub-second edge performance.",
  keywords: [
    "landing page builder",
    "conversion rate optimization",
    "CRO",
    "A/B testing",
    "smart traffic",
    "AI landing pages",
    "Unbounce clone",
  ],
  authors: [{ name: "Unbounce AI Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Unbounce AI",
    title: "Unbounce AI — Next-Gen AI Landing Page Builder & CRO Platform",
    description:
      "Turn clicks into customers with autonomous AI landing pages, multi-armed bandit traffic routing, and sub-second edge performance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unbounce AI — Next-Gen AI Landing Page Builder & CRO Platform",
    description:
      "Turn clicks into customers with autonomous AI landing pages and Smart Traffic routing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} font-sans scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#141414]">
        {children}
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "OpenResume - Free Resume Builder",
    template: "%s | OpenResume",
  },
  description:
    "Build and customize your professional resume with our modern, free resume builder. Real-time preview, PDF download, ATS-friendly templates. No sign-up required, 100% private.",
  keywords: [
    "resume builder",
    "CV builder",
    "free resume",
    "professional resume",
    "ATS-friendly",
    "resume template",
    "PDF resume",
    "online resume",
  ],
  authors: [{ name: "OpenResume" }],
  creator: "OpenResume",
  publisher: "OpenResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "OpenResume",
    title: "OpenResume - Free Professional Resume Builder",
    description:
      "Create beautiful, ATS-friendly resumes in minutes. Free, private, and no sign-up required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenResume - Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenResume - Free Resume Builder",
    description:
      "Create beautiful, ATS-friendly resumes in minutes. Free, private, and no sign-up required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

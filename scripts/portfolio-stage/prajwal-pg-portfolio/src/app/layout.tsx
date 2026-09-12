import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prajwal PG — AI/ML Engineer | GenAI | RAG | Computer Vision",
  description:
    "Portfolio of Prajwal PG — AI/ML Engineer specializing in GenAI, RAG systems, Computer Vision, and production-grade AI products. Explore featured projects, experience, and certifications.",
  keywords: [
    "Prajwal PG",
    "AI ML Engineer",
    "GenAI",
    "RAG",
    "Computer Vision",
    "LLMs",
    "Next.js",
    "Machine Learning",
    "TensorFlow",
    "OpenCV",
    "Portfolio",
  ],
  authors: [{ name: "Prajwal PG" }],
  creator: "Prajwal PG",
  openGraph: {
    title: "Prajwal PG — AI/ML Engineer",
    description:
      "GenAI, RAG, and Computer Vision engineer building production-grade AI products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajwal PG — AI/ML Engineer",
    description:
      "GenAI, RAG, and Computer Vision engineer building production-grade AI products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

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
  title: "Prajwal PG | AI Engineer",
  description:
    "AI Engineer specializing in Generative AI, RAG, Multi-Agent Systems, Computer Vision, OCR, and AI-powered applications.",
  keywords: [
    "Prajwal PG",
    "AI Engineer",
    "Generative AI",
    "RAG",
    "Multi-Agent Systems",
    "Computer Vision",
    "OCR",
    "Gemini API",
    "TensorFlow",
    "OpenCV",
    "Next.js",
    "PostgreSQL",
  ],
  authors: [{ name: "Prajwal PG" }],
  creator: "Prajwal PG",
  openGraph: {
    title: "Prajwal PG | AI Engineer",
    description:
      "AI Engineer specializing in Generative AI, RAG, Multi-Agent Systems, Computer Vision, OCR, and AI-powered applications.",
    type: "website",
    url: "https://github.com/prajwalpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajwal PG | AI Engineer",
    description:
      "AI Engineer specializing in Generative AI, RAG, Multi-Agent Systems, Computer Vision, OCR, and AI-powered applications.",
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

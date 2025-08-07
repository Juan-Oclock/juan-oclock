import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan oclock - Software Developer",
  description: "Software developer specializing in scalable systems, reusable components, and clean web applications. Single dad who turns coffee and ideas into code.",
  keywords: ["software developer", "web developer", "React", "Next.js", "TypeScript", "full-stack developer"],
  authors: [{ name: "Juan oclock" }],
  creator: "Juan oclock",
  openGraph: {
    title: "Juan oclock - Software Developer",
    description: "Software developer specializing in scalable systems, reusable components, and clean web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan oclock - Software Developer",
    description: "Software developer specializing in scalable systems, reusable components, and clean web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col h-screen antialiased">
        <main className="flex flex-col items-center grow">{children}</main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

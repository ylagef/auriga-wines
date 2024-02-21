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
        <header className="sticky top-0 z-10 flex items-center justify-center px-2 py-3 bg-white/30 backdrop-blur">
          <Image
            src="/images/auriga-logo.svg"
            alt="Auriga"
            width={200}
            height={37.5}
            className="w-auto h-6"
            priority
          />
        </header>

        <main className="flex flex-col items-center grow">{children}</main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

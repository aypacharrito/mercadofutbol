import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mercadofutbol.shop";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Mercado Fútbol | Soccer Jerseys",
    template: "%s | Mercado Fútbol",
  },
  description: "Shop Fan and Player soccer jerseys, retro kits, national teams, kids styles, and custom name-and-number options.",
  openGraph: {
    title: "Mercado Fútbol",
    description: "Wear the beautiful game.",
    url: appUrl,
    siteName: "Mercado Fútbol",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1714",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ClerkProvider>
          <AppShell>{children}</AppShell>
          <SiteFooter />
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}

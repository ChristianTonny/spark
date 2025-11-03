import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpportunityMap - Discover Your Future Career in Rwanda",
  description: "Explore 100+ careers, take assessments, and book 15-min chats with professionals to discover your path.",
  manifest: "/manifest.json",
  themeColor: "#FF6B35",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OpportunityMap",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

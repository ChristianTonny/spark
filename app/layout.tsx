import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spark Learning Platform",
  description: "Offline-capable educational platform for rural students in Sub-Saharan Africa",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Spark Learning",
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

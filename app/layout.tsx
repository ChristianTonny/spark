import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/tiptap.css";
import Navigation from "@/components/navigation";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { UserSyncProvider } from "./UserSyncProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpportunityMap - Discover Your Future Career in Rwanda",
  description: "Explore 100+ careers, take assessments, and book 15-min chats with professionals to discover your path.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OpportunityMap",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        <ConvexClientProvider>
          <UserSyncProvider>
            <NotificationProvider>
              <Navigation />
              {children}
              <Toaster />
            </NotificationProvider>
          </UserSyncProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

"use client";

import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";

// Guard against missing env var during static build / SSR prerendering.
// The real URL must be set in .env.local (dev) or Vercel env vars (prod).
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? '';
const convex = new ConvexReactClient(convexUrl || 'https://placeholder.convex.cloud');

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

# Next.js 16 Upgrade Checklist

## Upgrade Summary

**Date:** December 11, 2025  
**Branch:** `feature/nextjs-15-upgrade`

## Package Upgrades

| Package | Before | After |
|---------|--------|-------|
| next | 14.1.0 | 16.0.8 |
| react | 18.2.0 | 19.2.1 |
| react-dom | 18.2.0 | 19.2.1 |
| @clerk/nextjs | 5.0.0 | 6.36.2 |
| convex | 1.16.0 | 1.31.0 |
| eslint | 8.56.0 | 9.39.1 |
| eslint-config-next | 14.1.0 | 16.0.8 |
| lucide-react | 0.307.0 | 0.559.0 |
| react-hook-form | 7.49.3 | 7.68.0 |
| @tanstack/react-query | 5.17.19 | 5.90.12 |
| zod | 3.22.4 | 4.1.13 |
| @hookform/resolvers | 3.3.4 | 5.2.2 |
| @types/react | 18.2.48 | 19.2.7 |
| @types/react-dom | 18.2.18 | 19.2.3 |

## Breaking Changes Addressed

### 1. Metadata API Changes

**File:** `app/layout.tsx`

- Removed deprecated `viewport` and `themeColor` from metadata object
- Added separate `viewport` export using new `Viewport` type

```typescript
// Before
export const metadata: Metadata = {
  viewport: { ... },
  themeColor: "#FF6B35",
};

// After
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FF6B35",
};
```

### 2. Dynamic Route Params

In Next.js 15+, `params` prop in page components becomes a Promise. Since our pages use `"use client"`, we converted them to use the `useParams()` hook instead.

**Files Changed:**
- `app/mentors/[mentorId]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/dashboard/mentor/articles/edit/[id]/page.tsx`

```typescript
// Before
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
}

// After
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
}
```

### 3. Next.js Config

**File:** `next.config.js`

- Removed deprecated `swcMinify: true` (now default in Next.js 15+)

### 4. ESLint Configuration

**Files Changed:**
- Deleted `.eslintrc.json` (legacy format)
- Added `eslint.config.mjs` (flat config format for ESLint 9)
- Updated `package.json` lint script from `next lint` to `eslint .`

## Verification Checklist

- [x] TypeScript compilation (`npm run typecheck`)
- [x] Production build (`npm run build`)
- [x] ESLint (`npm run lint`)
- [x] Dev server starts successfully
- [x] Homepage loads
- [x] Dynamic routes work (`/careers/[id]`, `/mentors/[mentorId]`, `/blog/[slug]`)
- [x] Convex queries function correctly

## Security

- Started with 4 vulnerabilities
- Ended with 0 vulnerabilities

## Notes

- Next.js 16 is being used (latest stable as of Dec 2025)
- React 19 brings improved hydration and new hooks
- Clerk v6 has better Next.js 15+ support
- Convex v1.31 maintains full compatibility


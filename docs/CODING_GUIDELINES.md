# Coding Guidelines for Spark Learning Platform

This document outlines coding standards and best practices to avoid common errors, especially those that cause Vercel deployment failures.

## Table of Contents
1. [ESLint Configuration](#eslint-configuration)
2. [JSX Best Practices](#jsx-best-practices)
3. [TypeScript Standards](#typescript-standards)
4. [Next.js Specific Guidelines](#nextjs-specific-guidelines)
5. [Convex Schema Guidelines](#convex-schema-guidelines)

---

## ESLint Configuration

### Disabled Rules

The following ESLint rules have been disabled to improve developer experience:

#### `react/no-unescaped-entities` - DISABLED
**Why**: This rule requires escaping all apostrophes and quotes in JSX text, making code less readable.

```jsx
// ❌ Would cause error with rule enabled
<p>Don't worry, it's working!</p>

// ✅ Would require this (less readable)
<p>Don&apos;t worry, it&apos;s working!</p>

// ✅ Now both work fine (rule disabled)
```

#### `@next/next/no-img-element` - WARNING ONLY
**Why**: While Next.js Image component is preferred, regular `<img>` tags are acceptable for external images or specific use cases. This is now a warning instead of an error.

---

## JSX Best Practices

### Text Content in JSX

You can now write natural text in JSX without escaping:

```jsx
// ✅ GOOD - Natural, readable text
<p>It's a beautiful day. Let's go outside!</p>
<h1>Welcome to "Spark Learning"</h1>

// ⚠️ UNNECESSARY (but still valid)
<p>It&apos;s a beautiful day. Let&apos;s go outside!</p>
<h1>Welcome to &quot;Spark Learning&quot;</h1>
```

### Attributes Still Require Proper Quoting

```jsx
// ✅ GOOD
<button title="Click here">Save</button>
<input placeholder="Enter your name" />

// ❌ BAD - Attributes need quotes
<button title=Click here>Save</button>
```

---

## TypeScript Standards

### Type Safety

Always ensure proper type checking, especially with Convex schemas:

```typescript
// ✅ GOOD - Check for undefined/null
if (checkUser && checkUser.user) {
  console.log(checkUser.user.role);
}

// ❌ BAD - May cause TypeScript error
console.log(checkUser.user.role);
```

### Convex ID Types

```typescript
// ✅ GOOD - Proper typing
const mentorId: Id<'users'> = ...;

// ❌ BAD - String instead of proper ID type
const mentorId: string = ...;
```

---

## Next.js Specific Guidelines

### Client Components with `useSearchParams()`

**CRITICAL**: Any component using `useSearchParams()` MUST be wrapped in a Suspense boundary for static generation.

```tsx
// ✅ GOOD - Proper pattern
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContentWithParams() {
  const searchParams = useSearchParams();
  // ... use searchParams
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ContentWithParams />
    </Suspense>
  );
}

// ❌ BAD - Will fail Vercel build
export default function Page() {
  const searchParams = useSearchParams(); // No Suspense!
  // ...
}
```

### Dynamic Imports for Client-Heavy Components

```tsx
// ✅ GOOD - Large client components
const HeavyEditor = dynamic(() => import('@/components/HeavyEditor'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
```

---

## Convex Schema Guidelines

### Adding New Fields

When extending Convex schemas, always use `v.optional()` for new fields to maintain backward compatibility:

```typescript
// ✅ GOOD - New field is optional
defineTable({
  name: v.string(),
  newField: v.optional(v.string()), // Won't break existing data
})

// ❌ BAD - Required field breaks existing records
defineTable({
  name: v.string(),
  newField: v.string(), // Error if old records don't have this
})
```

### Notification Types

When adding new notification types, remember to update BOTH locations:

1. **Schema** (`convex/schema.ts`):
```typescript
type: v.union(
  v.literal("booking"),
  v.literal("message"),
  v.literal("review"),
  v.literal("system"),
  v.literal("mentor_application"), // ✅ Add here
),
```

2. **Frontend components** that handle notifications

---

## Common Deployment Errors and Solutions

### Error: "Failed to compile - react/no-unescaped-entities"

**Solution**: This should no longer occur as the rule is disabled. If it persists, check `.eslintrc.json`.

### Error: "useSearchParams() should be wrapped in a suspense boundary"

**Solution**: See [Client Components with useSearchParams()](#client-components-with-usesearchparams) above.

### Error: "Property does not exist on type"

**Solution**: Add proper null/undefined checks or use optional chaining:

```typescript
// ✅ GOOD
const value = data?.property ?? 'default';
if (data && 'property' in data) {
  console.log(data.property);
}

// ❌ BAD
const value = data.property; // May be undefined
```

### Error: "Type X is not assignable to type Y"

**Solution**: Check Convex schema unions. If adding new types, ensure they're added to the union type definition.

---

## Pre-Deployment Checklist

Before pushing to Vercel:

- [ ] Run `npm run build` locally to catch build errors
- [ ] Check all new TypeScript types for proper null checking
- [ ] Ensure new Convex schema fields are optional (`v.optional()`)
- [ ] Verify all `useSearchParams()` uses are wrapped in Suspense
- [ ] Test all new notification types
- [ ] Clear Convex cache if schema changed significantly

---

## Getting Help

If you encounter persistent errors:

1. Check this document first
2. Review recent git commits for similar fixes
3. Check Vercel deployment logs for specific error messages
4. Review Next.js and Convex documentation

---

## Version History

- **v1.0** (2025-11-18): Initial guidelines document
  - Disabled `react/no-unescaped-entities` rule
  - Documented Suspense boundary requirements
  - Added Convex schema best practices


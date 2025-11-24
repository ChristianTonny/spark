# Development Rules for SPARK Codebase

## Core Principle: No Code Deletion Without Explicit Permission

**CRITICAL RULE**: AI assistants working on this codebase MUST NOT delete, remove, or comment out existing code unless the user explicitly requests it.

## What This Means

### ❌ DO NOT:
- Remove existing features or components
- Delete imports that are being used
- Comment out functional code
- Remove UI sections or components
- Delete database queries or mutations
- Remove any working functionality

### ✅ DO:
- Add new features
- Enhance existing features
- Fix bugs by modifying problematic code
- Refactor code while preserving functionality
- Add new imports, components, and features
- Ask the user before removing anything

## Examples

### ❌ Wrong Approach:
```typescript
// Removing SchoolRecommendations import and usage
- import { SchoolRecommendations } from '@/components/SchoolRecommendations';
- <SchoolRecommendations schools={schools} />
```

### ✅ Correct Approach:
```typescript
// Adding new feature while keeping existing ones
import { SchoolRecommendations } from '@/components/SchoolRecommendations';
+ import { NewFeature } from '@/components/NewFeature';

<SchoolRecommendations schools={schools} />
+ <NewFeature data={data} />
```

## When User Says "Fix X"

- Only modify the specific broken code
- Don't remove surrounding working code
- Don't "clean up" by deleting features
- Don't remove "unused" code without verification

## When User Says "Remove X"

- Only then should you delete code
- Confirm what exactly needs to be removed
- Remove only what was explicitly requested

## Why This Rule Exists

1. **Feature Loss**: Removing code can accidentally delete working features
2. **Context**: AI may not understand all dependencies and usage patterns
3. **Reversibility**: Adding is easier to undo than deleting
4. **User Intent**: User knows what they want removed

## Checklist Before Deleting Code

Before removing ANY code, ask yourself:
- [ ] Did the user explicitly request this deletion?
- [ ] Am I 100% certain this code is unused?
- [ ] Have I checked all files for dependencies?
- [ ] Is this code part of a feature the user wants?

**If ANY answer is uncertain, DO NOT DELETE.**

## Override Permission

This rule can only be overridden when the user:
1. Explicitly says "remove X"
2. Explicitly says "delete X"
3. Says "I don't need X anymore"
4. Gives clear permission to remove specific code

## Summary

**Default Action**: PRESERVE existing code
**Exception**: User explicitly requests deletion
**When In Doubt**: ADD, don't SUBTRACT

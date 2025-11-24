# My Design System Prompt

Use this prompt when starting any new project with AI to maintain consistent design language across all applications.

---

## Core Design Philosophy

I design using **Neobrutalist principles** with a focus on:
- Bold, unapologetic visual hierarchy
- Clear boundaries and strong contrast
- Playful yet professional interactions
- Mobile-first, accessibility-conscious approach
- Practical simplicity over decorative complexity

---

## Visual Language

### Color System

**Define colors using HSL CSS variables for flexibility:**

```css
:root {
  /* Semantic Colors */
  --background: /* Light neutral background */
  --foreground: /* Dark text */
  --primary: /* Main brand color */
  --primary-foreground: /* Text on primary */
  --secondary: /* Supporting brand color */
  --destructive: /* Error/danger states */
  --muted: /* Subtle backgrounds */
  --border: /* Border color */
  --input: /* Form input borders */
  --ring: /* Focus ring color */
  
  /* Neobrutalist Palette */
  --brutal-orange: /* Primary action color - vibrant orange */
  --brutal-blue: /* Secondary action - deep blue */
  --brutal-yellow: /* Accent/highlight - bright yellow */
  --brutal-green: /* Success states - neon green */
  --brutal-pink: /* Tertiary accent - hot pink */
  --brutal-purple: /* Alternative accent - deep purple */
  --brutal-bg: /* Off-white cream background */
  --brutal-text: /* Near-black text */
  --brutal-border: /* Pure black borders */
}

.dark {
  /* Provide dark mode alternatives for all variables */
}
```

**Color Usage Principles:**
- Use bold, saturated colors for interactive elements
- Pure black (#000000) for all borders and outlines
- Off-white/cream for main backgrounds (not pure white)
- High contrast ratios (WCAG AAA when possible)
- Each color has a specific semantic meaning in the UI

### Typography

**Font Stack (System Fonts):**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

**Type Scale:**
- `xs`: 12px / 1.5 line-height
- `sm`: 14px / 1.5 line-height
- `base`: 16px / 1.5 line-height (body text)
- `lg`: 18px / 1.5 line-height
- `xl`: 20px / 1.5 line-height
- `2xl`: 24px / 1.25 line-height
- `3xl`: 30px / 1.25 line-height
- `4xl`: 36px / 1.25 line-height

**Typography Principles:**
- Headings: `font-black` (900 weight), UPPERCASE for impact
- Body text: `font-normal` or `font-medium`
- Interactive elements: `font-bold` (700 weight), UPPERCASE
- Generous line-height (1.5) for readability
- Use font-weight for hierarchy, not just size

### Spacing System

**4px Base Unit:**
```
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
```

**Spacing Principles:**
- Consistent padding/margins using the scale above
- Generous spacing for touch targets (min 44x44px)
- Group related elements with less space (12-16px)
- Separate sections with substantial space (48-64px)
- Use responsive spacing: smaller on mobile, larger on desktop

### Border & Shadow System

**Borders:**
- Default thickness: `3px` (border-3)
- Heavy emphasis: `4px` (border-4)
- Always use `--brutal-border` (black) color
- Apply to ALL interactive elements and cards

**Neobrutalist Shadows (Solid Offset):**
```css
shadow-brutal-sm: 2px 2px 0px #000
shadow-brutal: 4px 4px 0px #000      /* Default */
shadow-brutal-lg: 8px 8px 0px #000
shadow-brutal-xl: 12px 12px 0px #000
```

**Shadow Principles:**
- Solid color (black), no blur
- Offset creates 3D "lifted" effect
- Interactive elements: increase shadow on hover
- Active state: remove shadow (pressed effect)
- Decorative elements: offset layer with border

### Border Radius

**Minimal Rounding:**
- Inputs/Cards: `rounded-lg` (8px)
- Buttons: `rounded-lg` (8px)
- Small elements: `rounded-md` (6px)
- Icons/badges: `rounded` (4px)
- Sharp corners are acceptable for brutalist aesthetic

---

## Component Patterns

### Buttons

**Structure:**
```tsx
<button className="
  px-6 py-4 
  bg-brutal-orange text-white 
  font-bold text-base uppercase 
  border-3 border-brutal-border 
  shadow-brutal 
  hover:shadow-brutal-lg 
  hover:translate-x-[-2px] hover:translate-y-[-2px]
  active:shadow-none 
  transition-all
  min-h-[52px]
">
  Button Text
</button>
```

**Variants:**
- **Primary**: Colored background (orange/blue), white text, shadow
- **Secondary**: White background, colored text, shadow
- **Outline**: White background, colored border, no shadow
- **Ghost**: No background, no border, subtle hover
- **Link**: Underline text, no styling

**Interaction States:**
- Hover: Increase shadow, translate up-left (-2px, -2px)
- Active/Pressed: Remove shadow (flatten)
- Focus: 2px ring in primary color
- Disabled: 50% opacity, pointer-events-none

**Principles:**
- Minimum touch target: 44x44px (use min-h-[44px])
- Include loading states with spinner
- Always uppercase text for primary actions
- Use icon + text for clarity

### Cards

**Structure:**
```tsx
<div className="
  bg-white 
  border-3 border-brutal-border 
  shadow-brutal 
  hover:shadow-brutal-lg 
  hover:translate-x-[-2px] hover:translate-y-[-2px]
  active:shadow-none
  transition-all
  overflow-hidden
">
  <div className="p-6">
    <!-- Card content -->
  </div>
</div>
```

**Principles:**
- All cards have thick borders and shadows
- Hover state increases depth perception
- Internal sections separated by borders
- Consistent padding: p-6 (24px) for content
- Images/media sections have border separators

### Forms & Inputs

**Structure:**
```tsx
<input className="
  h-12 w-full 
  px-4 py-3 
  border border-gray-300 
  rounded-lg 
  bg-white 
  text-base
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary 
  focus:border-primary
  transition-all
  min-h-[44px]
" />
```

**Principles:**
- Clear visual feedback on focus (ring + border color)
- Error states: red border + error message below
- Icon support: left padding for icons
- Consistent height (48px / 3rem)
- Placeholder text: gray-400
- Labels: font-bold, mb-2

### Layout Patterns

**Container:**
```tsx
<div className="container mx-auto max-w-6xl px-4">
  <!-- Content constrained to readable width -->
</div>
```

**Section Spacing:**
```tsx
<section className="px-4 py-12 sm:py-16 md:py-24">
  <!-- Progressive spacing increase -->
</section>
```

**Grid Patterns:**
```tsx
<!-- 3-column responsive grid -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  
<!-- 2-column content/sidebar -->
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <main className="lg:col-span-2">
  <aside>
</div>
```

**Principles:**
- Mobile-first: start with `grid-cols-1`, expand upward
- Consistent gaps: 4-6 for cards, 8-12 for sections
- Max content width: 1440px (2xl breakpoint)
- Generous padding on mobile: px-4 minimum

---

## Responsive Design

### Breakpoints

```
sm: 640px   /* Tablets portrait */
md: 768px   /* Tablets landscape */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1440px /* Large desktops - max content width */
```

### Mobile-First Approach

**Always start unstyled or mobile-styled, then add breakpoint modifiers:**

```tsx
<!-- Font sizes -->
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">

<!-- Spacing -->
<div className="p-4 sm:p-6 md:p-8">

<!-- Layout -->
<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

<!-- Grid -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
```

**Responsive Patterns:**
- Typography: Smaller on mobile, progressively larger
- Spacing: Tighter on mobile (p-4) → generous on desktop (p-8)
- Grids: Stack on mobile (cols-1) → multi-column on desktop
- Navigation: Hamburger menu on mobile → horizontal on desktop
- Touch targets: Minimum 44x44px on all devices
- Images: Full width on mobile → constrained on desktop

---

## Interaction Patterns

### Hover States

**Brutalist Hover (Increase Depth):**
```tsx
hover:shadow-brutal-lg 
hover:translate-x-[-2px] 
hover:translate-y-[-2px]
```

**Subtle Hover (Non-elevated elements):**
```tsx
hover:bg-gray-100
hover:text-primary
```

### Active/Pressed States

```tsx
active:shadow-none
active:scale-[0.98]
```

### Focus States

```tsx
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-primary 
focus-visible:ring-offset-2
```

### Transitions

```tsx
transition-all /* Smooth all property changes */
transition-colors /* Color changes only */
transition-transform /* Movement/scale only */
transition-shadow /* Shadow changes only */

/* Duration: default 150-300ms cubic-bezier */
duration-200
```

**Principles:**
- All interactive elements have visible hover states
- Active states provide tactile feedback (press down)
- Focus states are keyboard-navigation friendly
- Transitions are subtle and performant (avoid animating layout)
- Loading states use spinners or skeleton screens

---

## Accessibility Requirements

### Color Contrast

- Body text: Minimum 4.5:1 (WCAG AA), target 7:1 (AAA)
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1 against background
- Test all color combinations

### Touch Targets

- Minimum size: 44x44px
- Apply `.touch-target` utility class
- Space interactive elements 8px apart minimum

### Focus Management

- Visible focus indicators on all interactive elements
- Logical tab order (follows visual order)
- Skip links for navigation
- Focus trap in modals

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Buttons for actions, links for navigation
- Form labels properly associated
- ARIA labels where semantic HTML insufficient

### Screen Reader Support

- Alt text for all images
- ARIA live regions for dynamic content
- Role attributes where needed
- Hidden but accessible text for icon-only buttons

---

## Animation Philosophy

**Use Sparingly and Purposefully:**

- **Feedback animations**: Hover, click, loading states
- **Entrance animations**: Subtle fade/slide for new content
- **No gratuitous motion**: Avoid distracting animations
- **Respect prefers-reduced-motion**: Disable for accessibility

**Animation Types:**
```tsx
/* Entrance */
animate-in fade-in slide-in-from-top-5 duration-200

/* Loading */
animate-spin /* Spinners */
animate-pulse /* Skeleton screens */

/* Interactions */
transition-all duration-200 /* Smooth state changes */
```

---

## Code Organization

### File Structure

```
app/
  [route]/
    page.tsx        # Page component
    layout.tsx      # Route layout
    loading.tsx     # Loading state
    error.tsx       # Error boundary
    
components/
  ui/               # Base components (button, input, card)
  [feature]/        # Feature-specific components
  
lib/
  utils.ts          # Utility functions
  
styles/
  globals.css       # Global styles, CSS variables
```

### Component Structure

```tsx
'use client'; // Only if needed (state, effects, events)

import { cn } from '@/lib/utils'; // Class name utility

interface ComponentProps {
  // TypeScript interfaces for props
}

export function Component({ prop1, prop2 }: ComponentProps) {
  return (
    <div className={cn(
      "base classes",
      "spacing classes",
      "color classes",
      "state classes",
      conditionalClass && "conditional classes"
    )}>
      {/* Component content */}
    </div>
  );
}
```

### Styling Approach

**Use Tailwind Utility Classes:**
- No custom CSS unless absolutely necessary
- Compose utilities with `cn()` helper
- Extract repeated patterns to components, not CSS
- Use arbitrary values sparingly: `p-[17px]`

---

## Design Checklist for New Projects

When starting a new project, ensure:

### ✅ Setup
- [ ] Install Tailwind CSS with config
- [ ] Set up CSS variables in globals.css
- [ ] Configure HSL color system with light/dark modes
- [ ] Define neobrutalist color palette
- [ ] Add system font stack
- [ ] Configure spacing scale (4px base)
- [ ] Create shadow utilities (brutal-sm, brutal, brutal-lg, brutal-xl)

### ✅ Base Components
- [ ] Button (primary, secondary, outline, ghost variants)
- [ ] Card (with header, content, footer sections)
- [ ] Input (with error states, icon support)
- [ ] Label (bold, consistent spacing)
- [ ] Badge/Tag (for categories, status)
- [ ] Toast/Notification system

### ✅ Layout
- [ ] Container component (max-w-6xl, centered)
- [ ] Responsive navigation (mobile menu + desktop nav)
- [ ] Footer component
- [ ] Section spacing utilities
- [ ] Grid patterns defined

### ✅ Interactions
- [ ] Hover states (shadow increase, translate)
- [ ] Active states (shadow removal)
- [ ] Focus states (visible rings)
- [ ] Loading states (spinners, skeletons)
- [ ] Transition utilities

### ✅ Accessibility
- [ ] Color contrast validated
- [ ] Touch targets minimum 44x44px
- [ ] Focus management implemented
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Keyboard navigation tested

### ✅ Responsive
- [ ] Mobile-first approach
- [ ] Breakpoints: sm, md, lg, xl, 2xl
- [ ] Progressive spacing increase
- [ ] Responsive typography scale
- [ ] Grid systems adapt to viewport

---

## Example Component Showcase

**Button:**
```tsx
<button className="px-6 py-4 bg-brutal-orange text-white font-bold text-base uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all min-h-[52px]">
  Primary Action
</button>
```

**Card:**
```tsx
<div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all overflow-hidden">
  <div className="p-6 border-b-3 border-brutal-border">
    <h3 className="text-xl font-black uppercase">Card Title</h3>
  </div>
  <div className="p-6">
    <p className="text-base text-gray-700">Card content goes here.</p>
  </div>
</div>
```

**Input:**
```tsx
<div className="space-y-2">
  <label className="text-sm font-bold text-gray-900">Email Address</label>
  <input 
    type="email"
    className="h-12 w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-base focus:outline-none focus:ring-2 focus:ring-brutal-orange focus:border-brutal-orange transition-all"
    placeholder="you@example.com"
  />
</div>
```

**Hero Section:**
```tsx
<section className="px-4 py-12 sm:py-16 md:py-24">
  <div className="container mx-auto max-w-6xl">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="space-y-6 md:space-y-8">
        <div className="inline-block">
          <span className="px-4 py-2 bg-brutal-yellow border-3 border-brutal-border text-brutal-text font-bold uppercase text-sm shadow-brutal-sm">
            🎯 Badge Text
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          Bold Hero Headline
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Supporting description text that explains the value proposition.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="px-6 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all">
            Primary CTA
          </button>
          <button className="px-6 py-4 bg-white text-brutal-text font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all">
            Secondary CTA
          </button>
        </div>
      </div>
      <div className="relative">
        <!-- Image or illustration -->
      </div>
    </div>
  </div>
</section>
```

---

## When to Break the Rules

**Flexibility is important. Break these rules when:**

1. **Accessibility requires it**: Color contrast, touch targets, focus states
2. **Performance demands it**: Reduce animations, simplify shadows on low-end devices
3. **Context demands it**: Professional/enterprise apps might need subtler styling
4. **User testing shows issues**: Real data trumps design principles

**But maintain consistency:**
- Keep the same spacing scale
- Keep the same typography scale
- Keep hover/active/focus patterns consistent
- Keep accessibility standards high

---

## Final Notes

**This design system prioritizes:**
1. **Clarity over cleverness**: Users should understand instantly
2. **Consistency over novelty**: Familiar patterns reduce cognitive load
3. **Accessibility over aesthetics**: Everyone should be able to use it
4. **Performance over perfection**: Fast and good beats slow and perfect
5. **Practicality over purity**: Solve real problems, not theoretical ones

**Questions to ask when designing:**
- Is it immediately understandable?
- Is it accessible to all users?
- Is it responsive across all devices?
- Is it performant and fast?
- Is it consistent with the system?
- Does it solve the user's problem?

---

## Usage Instructions for AI

When I provide this prompt, please:

1. **Apply these design principles** to whatever project I'm building
2. **Adapt the color palette** to match my specific project needs (but keep the structure)
3. **Maintain the interaction patterns** (hover, active, focus states)
4. **Follow the responsive approach** (mobile-first, same breakpoints)
5. **Use the same spacing/typography scales**
6. **Keep the neobrutalist aesthetic** (bold borders, solid shadows, strong contrast)
7. **Prioritize accessibility** in all implementations

Ask me for:
- The project's primary brand colors (I'll give you 2-3 colors to adapt)
- Any specific component needs beyond the base system
- Any domain-specific requirements

Then generate components and pages that follow this system while adapting to the specific project context.

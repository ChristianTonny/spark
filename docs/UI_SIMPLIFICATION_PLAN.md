# UI Simplification Plan - Assessment & Results Pages

**Created:** December 15, 2024  
**Status:** Approved for Implementation

---

## Executive Summary

This document captures the complete context, business rationale, and design decisions for simplifying OpportunityMap's assessment and results pages.

---

## Part 1: The Mission

### The Problem

**In Rwanda, people commit years to education without understanding what careers await.**

At key decision points:
- **Senior 3 O-Level (~15 yrs):** Choose A-Level pathway or TVET — with no career context
- **Senior 6 A-Level (~18 yrs):** Choose university major — based on assumptions, not data  
- **Post-graduation:** Take whatever job is available — not what fits

**The result:** Brilliant people trapped in mismatched careers. Wasted talent at national scale.

### The Rwanda Context

At Senior 3, before national exams, students fill government forms choosing:
- **3 schools** (A-Level or TVET)
- **Majors within those schools**

They have **zero context** on what careers these majors lead to, what those jobs involve day-to-day, or whether there's demand in Rwanda.

**They choose schools. Not careers. And nobody gives it much thought.**

### What OpportunityMap Does

**We flip the order:**

```
Traditional:     School → Major → Hope for a job
OpportunityMap:  Career → What's needed → Which path gets you there
```

We give people the data BEFORE they commit years of their lives.

---

## Part 2: Who We Serve

### Primary Users (Free)

| Segment | Description | What They Need |
|---------|-------------|----------------|
| **Senior 3 Students** | ~15 yrs, choosing A-Level vs TVET | "What career should I aim for?" |
| **Senior 6 Students** | ~18 yrs, choosing university major | "Which major leads to which job?" |
| **University Students** | 18-24, choosing specialization | "What does this career actually look like?" |
| **Career Changers** | 25-40, considering a switch | "Is this career viable in Rwanda?" |
| **Job Seekers** | Any age, actively looking | "What skills do employers want?" |

### Key Insight

**We're not just for students.** Anyone needing local, relevant career data is our user. The more people explore careers on our platform, the more valuable our data becomes.

---

## Part 3: Business Model

### The Data Moat

Every user action creates value:
- Which careers are searched most
- What skills people are building
- Who's ready to transition careers
- Which schools people choose

**This is Rwanda-specific data nobody else has.**

### Revenue Streams

#### 1. HR / Recruitment Companies (B2B)
- **Intent Data:** "500 users explored Software Developer this month"
- **Candidate Leads:** Users who complete Reality Quiz + opt-in
- **Talent Pipeline:** Early access to matched candidates
- **Employer Branding:** Sponsored "Day in Life" content

#### 2. Schools / Training Providers (B2B)
- **School Recommendations:** Featured placement in career pages
- **TVET Partnerships:** "Recommended Path" for specific careers
- **Bootcamp Referrals:** Revenue share on enrollments

#### 3. Premium Features (B2C)
- **Mentor Sessions:** Fee per session (we take %)
- **Career Roadmaps:** One-time purchase
- **Advanced Assessment:** Deeper analysis

#### 4. Government / NGO Partnerships
- Workforce analytics
- Program design data
- Student outcomes tracking

---

## Part 4: Design Principles

### Business Model → UI Design

> **Every tap, save, or exploration is a signal. Design for actions that create both user value AND data value.**

| User Action | Data Value |
|-------------|------------|
| Completes assessment | Profile data (interests, strengths, values) |
| Views career | Career interest signal |
| Saves career | High-intent signal (considering seriously) |
| Takes Reality Quiz | Fit signal (are they right for this?) |
| Books mentor | Conversion signal (ready to act) |
| Clicks school link | Enrollment intent |

### Guiding Principles

1. **Universal language** — "You", not "students" (broader audience)
2. **Prominent "Save"** — This signals purchase intent for B2B
3. **School section visible** — Drives referral revenue
4. **Focused Next Steps** — Only actions that generate valuable data
5. **Soft borders** — Better UX = higher completion rates

---

## Part 5: Specific Changes

### Global: Soften Borders

**File:** `tailwind.config.ts`

```diff
-'brutal-border': '#000000',
+'brutal-border': '#333333',
```

---

### Assessment Page (`app/assessments/page.tsx`)

#### Remove
| Element | Lines | Reason |
|---------|-------|--------|
| Header icon (Brain box) | 35-37 | Visual noise, doesn't add value |
| Topics Covered section | 97-140 | Nobody cares about categories |
| Privacy card | 242-248 | Secondary info, clutter |
| Retake card | 250-256 | Redundant with button label |

#### Simplify
| Element | Current | New |
|---------|---------|-----|
| 3 feature cards | Three separate boxes | One line: "25 questions · 15 min · Your top matches" |

#### Rewrite Copy
| Element | Current | New |
|---------|---------|-----|
| Headline | "CAREER ASSESSMENT" | "FIND YOUR CAREER" |
| Subhead | "Discover Your Perfect Career Match" | "25 questions. 15 minutes. See what fits." |
| Intro | Long formal paragraph | "Find out which careers match your interests and strengths — based on research, not guesswork. No grades. Just honest answers." |
| CTA | "Start Assessment" | "Start Now →" |

---

### Results Page (`app/assessment/results/page.tsx`)

#### Remove
| Element | Lines | Reason |
|---------|-------|--------|
| Bottom buttons (Retake + Browse) | 570-584 | Redundant with existing CTAs |

#### Simplify
| Element | Current | New |
|---------|---------|-----|
| Next Steps grid | 4 cards | 2 cards: "Explore this career" + "Talk to someone" |
| Mentor section | 3 cards | 2 cards max |
| Match reasons | 3 bullets | 1-2 bullets |

#### Rewrite Copy
| Element | Current | New |
|---------|---------|-----|
| Header | "Your Top Match" | "You'd be great at [Career]" |
| Subhead | "Focus on the next 1–2 steps..." | "Here's what fits — and what to do next." |
| Next Step 1 | "Research Deeply" | "Explore this career" |
| Next Step 2 | "Talk to Professionals" | "Talk to someone who does this" |

---

## Part 6: What Stays the Same

- ✅ Neo-brutalist styling (shadows, bold fonts, color accents)
- ✅ Background colors (no change)
- ✅ Previous Results section (assessment page)
- ✅ Top match hero card + Options 2-3 (results page)
- ✅ Strengths Snapshot (collapsed by default)
- ✅ All Matches toggle
- ✅ School recommendations section
- ✅ Mentor section (2 cards)
- ✅ Save/Bookmark functionality

---

## Part 7: Inspiration

We are inspired by **80,000 Hours** methodology:
- Role Impact
- Career Capital  
- Personal Fit
- Supportive Conditions

**Note:** Never mention 80,000 Hours in any user-facing UI. Internal reference only.

---

## Summary

| Change | Assessment Page | Results Page |
|--------|-----------------|--------------|
| **Remove** | Icon, Topics, Privacy card, Retake card | Bottom buttons |
| **Simplify** | 3 cards → 1 line | 4 steps → 2, 3 mentors → 2 |
| **Rewrite** | Universal language, conversational tone | Personal, action-oriented copy |
| **Soften** | Borders (#000 → #333) | Borders (#000 → #333) |

---

**Implementation Status:** In Progress

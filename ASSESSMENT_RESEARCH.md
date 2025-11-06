# Career Assessment Research & Implementation Guide

## Overview
This document contains complete research on career assessment methodologies and provides a ready-to-implement assessment system optimized for Rwandan high school students.

---

## Methodology: Holland Code (RIASEC)

### What It Is
The Holland Code (RIASEC) is the gold standard for career assessments, developed by psychologist John L. Holland in the 1950s. Used by US Department of Labor's O*NET system.

### The 6 Personality Types

1. **Realistic (R)** - "Doers"
   - Prefer hands-on, practical work
   - Like working with tools, machines, objects
   - Examples: Engineer, Mechanic, Farmer, Builder

2. **Investigative (I)** - "Thinkers"
   - Prefer analyzing, researching, problem-solving
   - Like working with ideas and data
   - Examples: Scientist, Doctor, Researcher, Analyst

3. **Artistic (A)** - "Creators"
   - Prefer creative, expressive work
   - Like unstructured environments
   - Examples: Designer, Writer, Artist, Musician

4. **Social (S)** - "Helpers"
   - Prefer working with people, helping others
   - Like teaching, counseling, service
   - Examples: Teacher, Nurse, Social Worker, Counselor

5. **Enterprising (E)** - "Persuaders"
   - Prefer leading, influencing, selling
   - Like business, competition, persuasion
   - Examples: Manager, Lawyer, Salesperson, Entrepreneur

6. **Conventional (C)** - "Organizers"
   - Prefer structured, organized work
   - Like data, details, procedures
   - Examples: Accountant, Administrator, Banker, Clerk

### How Matching Works

**Step 1:** Students answer questions about activities they enjoy
**Step 2:** Each answer increases scores in 1-2 RIASEC categories
**Step 3:** Top 3 categories become their "Holland Code" (e.g., IAS = Investigative-Artistic-Social)
**Step 4:** Compare student profile to career profiles using correlation
**Step 5:** Rank careers by best match

### Scoring Formula
Use **cosine similarity** between student profile vector and career profile vector:

```
Student: [R:20, I:85, A:70, S:40, E:30, C:25]
Career:  [R:10, I:90, A:60, S:30, E:20, C:15]

Similarity = (Student · Career) / (||Student|| × ||Career||)
           = High match (0.95+)
```

---

## 80,000 Hours Framework

### What It Is
Career decision framework from 80,000 Hours (Oxford-based research org) focused on maximizing career impact and satisfaction.

### 4 Key Factors

1. **Personal Fit** - Will you excel at this career?
   - Past performance indicators
   - Skills match
   - Enjoyment/motivation

2. **Career Capital** - Does this build your future opportunities?
   - Skills gained
   - Credentials earned
   - Network/connections

3. **Impact Potential** - Can you make a difference?
   - Direct impact (helping people)
   - Earning to give (high salary → donations)
   - Advocacy (influencing others)

4. **Supportive Conditions** - Will you be satisfied?
   - Work-life balance
   - Job security
   - Team/culture fit

### Why This Matters for Rwanda
Many Rwandan students choose careers based on:
- ❌ Parent pressure
- ❌ Perceived prestige
- ❌ Salary alone

80,000 Hours adds:
- ✅ Long-term thinking (career capital)
- ✅ Personal fulfillment (fit)
- ✅ Societal contribution (impact)

---

## OPTIMIZED ASSESSMENT: 12 Questions

### Design Principles
- ✅ Short (12 questions = ~3-4 min completion)
- ✅ Activity-based (concrete, relatable)
- ✅ Covers all 6 RIASEC types
- ✅ Adds 80,000 Hours thinking (impact, progression)
- ✅ Mobile-friendly (one question per screen)

---

### SECTION 1: INTERESTS (RIASEC) - 8 Questions

#### Question 1: Hands-On Work (Realistic)
**"Which of these activities sounds most interesting to you?"**

- A) Building or repairing things with your hands
- B) Researching how things work
- C) Creating art, music, or designs
- D) Helping people solve their problems
- E) Leading a team or starting a project
- F) Organizing data and keeping records

**Scoring:**
- A = R+15, I+5
- B = I+15, R+5
- C = A+15, I+5
- D = S+15, A+5
- E = E+15, S+5
- F = C+15, E+5

---

#### Question 2: Problem-Solving Style (Investigative)
**"You encounter a challenging problem. How do you prefer to solve it?"**

- A) Try different solutions hands-on until something works
- B) Research and analyze data to find the best solution
- C) Think creatively and come up with innovative approaches
- D) Ask others for advice and collaborate
- E) Take charge and make quick decisions
- F) Follow proven procedures and guidelines

**Scoring:**
- A = R+12, I+5
- B = I+15, C+5
- C = A+15, I+5
- D = S+15, E+5
- E = E+15, S+5
- F = C+15, R+5

---

#### Question 3: Work Environment (Social)
**"Which work environment appeals to you most?"**

- A) Workshop or outdoor setting with tools and equipment
- B) Laboratory or office with data and research
- C) Creative studio with freedom to express ideas
- D) Community setting helping and teaching others
- E) Dynamic office with meetings and presentations
- F) Structured office with clear processes

**Scoring:**
- A = R+15, C+3
- B = I+15, C+5
- C = A+15, E+3
- D = S+15, A+5
- E = E+15, S+5
- F = C+15, I+3

---

#### Question 4: Daily Activities (Artistic)
**"Which daily activity would you find most fulfilling?"**

- A) Operating machinery or equipment
- B) Analyzing data and finding patterns
- C) Designing, writing, or creating content
- D) Teaching or mentoring others
- E) Presenting ideas and convincing people
- F) Managing schedules and organizing tasks

**Scoring:**
- A = R+15, C+5
- B = I+15, C+8
- C = A+15, I+3
- D = S+15, A+3
- E = E+15, C+5
- F = C+15, E+5

---

#### Question 5: Skills You Enjoy Using (Enterprising)
**"Which skill do you most enjoy using?"**

- A) Physical coordination and technical skills
- B) Critical thinking and research skills
- C) Creative and artistic skills
- D) Communication and empathy
- E) Leadership and persuasion
- F) Attention to detail and organization

**Scoring:**
- A = R+15, I+3
- B = I+15, A+3
- C = A+15, S+3
- D = S+15, E+3
- E = E+15, S+3
- F = C+15, I+5

---

#### Question 6: Project Preference (Conventional)
**"You're assigned a group project. What role do you naturally take?"**

- A) The builder - making the physical product
- B) The researcher - gathering information
- C) The designer - creating the visual/creative elements
- D) The communicator - presenting and coordinating
- E) The leader - organizing the team and delegating
- F) The planner - tracking deadlines and details

**Scoring:**
- A = R+15, E+5
- B = I+15, C+5
- C = A+15, S+3
- D = S+15, E+8
- E = E+15, C+5
- F = C+15, I+5

---

#### Question 7: Learning Style
**"How do you prefer to learn new things?"**

- A) Hands-on practice and experimentation
- B) Reading, research, and independent study
- C) Creative exploration and self-expression
- D) Group discussions and collaborative learning
- E) Leading projects and learning by doing
- F) Step-by-step instructions and structured courses

**Scoring:**
- A = R+12, I+5
- B = I+15, A+3
- C = A+15, S+3
- D = S+15, E+3
- E = E+12, R+5
- F = C+15, I+5

---

#### Question 8: Success Feeling
**"You feel most accomplished when you:"**

- A) Build or fix something that works perfectly
- B) Discover new information or solve a complex problem
- C) Create something beautiful or original
- D) Help someone overcome a challenge
- E) Achieve a goal and lead others to success
- F) Complete tasks efficiently and accurately

**Scoring:**
- A = R+15, C+3
- B = I+15, A+3
- C = A+15, I+3
- D = S+15, A+5
- E = E+15, S+3
- F = C+15, E+3

---

### SECTION 2: VALUES & PRIORITIES (80,000 Hours) - 4 Questions

#### Question 9: Career Motivation
**"What matters most to you in a career?"**

- A) High salary and financial security
- B) Making a positive impact on society
- C) Creative freedom and self-expression
- D) Work-life balance and personal time
- E) Career growth and advancement opportunities
- F) Job stability and clear expectations

**Scoring:**
- A = E+10, C+8 | VALUE: income=+20
- B = S+10, I+8 | VALUE: impact=+20
- C = A+12, E+5 | VALUE: autonomy=+20
- D = S+8, C+8 | VALUE: balance=+20
- E = E+12, I+8 | VALUE: growth=+20
- F = C+12, R+5 | VALUE: stability=+20

---

#### Question 10: Long-Term Vision
**"Where do you see yourself in 10-15 years?"**

- A) Running my own business or being financially independent
- B) Being an expert/specialist in my field
- C) Creating work that inspires others
- D) Leading a team or organization making a difference
- E) Having a balanced life with time for family and hobbies
- F) Holding a respected position in a stable organization

**Scoring:**
- A = E+15, I+5 | VALUE: autonomy=+15, income=+15
- B = I+15, C+5 | VALUE: growth=+20
- C = A+15, S+5 | VALUE: impact=+15, autonomy=+10
- D = E+12, S+10 | VALUE: impact=+20
- E = S+10, A+8 | VALUE: balance=+20
- F = C+12, E+8 | VALUE: stability=+20

---

#### Question 11: Work Pace Preference
**"What work pace suits you best?"**

- A) Fast-paced with variety and new challenges daily
- B) Moderate pace with focused deep work
- C) Flexible pace where I control my schedule
- D) Steady pace with regular routines
- E) Intense bursts with clear deadlines
- F) Predictable pace with minimal surprises

**Scoring:**
- A = E+12, R+8 | ENVIRONMENT: pace=intense
- B = I+12, A+8 | ENVIRONMENT: pace=moderate
- C = A+10, E+8 | ENVIRONMENT: pace=flexible
- D = C+12, S+8 | ENVIRONMENT: pace=steady
- E = E+10, I+10 | ENVIRONMENT: pace=deadline-driven
- F = C+15, R+5 | ENVIRONMENT: pace=predictable

---

#### Question 12: Team vs Individual
**"How do you prefer to work?"**

- A) Mostly alone with occasional collaboration
- B) Independently but part of a larger team
- C) In small teams (2-5 people)
- D) In large teams with lots of interaction
- E) Leading teams and managing people
- F) Following clear procedures with minimal interaction

**Scoring:**
- A = I+12, A+10 | ENVIRONMENT: teamSize=solo
- B = R+10, C+10 | ENVIRONMENT: teamSize=independent
- C = A+10, S+10 | ENVIRONMENT: teamSize=small
- D = S+15, E+8 | ENVIRONMENT: teamSize=large
- E = E+15, S+8 | ENVIRONMENT: teamSize=leader
- F = C+15, R+5 | ENVIRONMENT: teamSize=minimal

---

## SCORING ALGORITHM

### Step 1: Calculate RIASEC Scores
```typescript
interface RIASECScore {
  realistic: number;      // 0-180
  investigative: number;  // 0-180
  artistic: number;       // 0-180
  social: number;        // 0-180
  enterprising: number;  // 0-180
  conventional: number;  // 0-180
}

// Sum up points from all answers
// Max per category: 15 points × 12 questions = 180
```

### Step 2: Calculate Value Scores
```typescript
interface ValueScore {
  impact: number;      // 0-60
  income: number;      // 0-60
  autonomy: number;    // 0-60
  balance: number;     // 0-60
  growth: number;      // 0-60
  stability: number;   // 0-60
}
```

### Step 3: Determine Environment Preferences
```typescript
interface EnvironmentPreference {
  teamSize: 'solo' | 'small' | 'large' | 'leader';
  pace: 'steady' | 'moderate' | 'intense' | 'flexible';
}
```

### Step 4: Match to Careers

For each career in database:

```typescript
function calculateCareerMatch(
  studentProfile: RIASECScore,
  studentValues: ValueScore,
  studentEnvironment: EnvironmentPreference,
  career: Career
): MatchResult {

  // 1. RIASEC Interest Match (50% weight)
  const interestMatch = cosineSimilarity(
    normalize(studentProfile),
    normalize(career.interestProfile)
  );

  // 2. Value Alignment (30% weight)
  const valueMatch = cosineSimilarity(
    normalize(studentValues),
    normalize(career.valueProfile)
  );

  // 3. Environment Fit (20% weight)
  let environmentMatch = 0;
  if (studentEnvironment.teamSize === career.workEnvironment.teamSize) {
    environmentMatch += 0.5;
  }
  if (studentEnvironment.pace === career.workEnvironment.pace) {
    environmentMatch += 0.5;
  }

  // Weighted total
  const totalScore = (
    (interestMatch * 0.5) +
    (valueMatch * 0.3) +
    (environmentMatch * 0.2)
  ) * 100;

  return {
    careerId: career._id,
    matchPercentage: Math.round(totalScore),
    interestScore: Math.round(interestMatch * 100),
    valueScore: Math.round(valueMatch * 100),
    environmentScore: Math.round(environmentMatch * 100),
    topRIASEC: getTop3RIASEC(studentProfile),
    matchReasons: generateReasons(studentProfile, studentValues, career),
  };
}
```

### Step 5: Generate Match Reasons

```typescript
function generateReasons(
  studentProfile: RIASECScore,
  studentValues: ValueScore,
  career: Career
): string[] {
  const reasons = [];

  // RIASEC alignment
  const studentTop = getTop3RIASEC(studentProfile);
  const careerTop = getTop3RIASEC(career.interestProfile);

  const overlap = studentTop.filter(type => careerTop.includes(type));

  if (overlap.length >= 2) {
    reasons.push(
      `Your ${overlap.join(' and ')} interests align perfectly with this career`
    );
  }

  // Value alignment
  const topValue = getTopValue(studentValues);
  const careerValue = getTopValue(career.valueProfile);

  if (topValue === careerValue) {
    reasons.push(`This career matches your priority for ${topValue}`);
  }

  // Specific interest matches
  if (studentProfile.investigative > 100 && career.interestProfile.investigative > 70) {
    reasons.push("Strong match for your analytical and research interests");
  }

  if (studentProfile.social > 100 && career.interestProfile.social > 70) {
    reasons.push("Great fit for your desire to help and work with people");
  }

  // Add 2-4 specific reasons based on highest matches
  return reasons.slice(0, 4);
}
```

---

## CAREER METADATA REQUIREMENTS

Each career in `/convex/seed.ts` needs this metadata:

```typescript
{
  title: "Software Engineer",
  // ... existing fields ...

  // NEW: Assessment matching fields
  interestProfile: {
    realistic: 30,        // Some hands-on with computers
    investigative: 90,    // HIGH - lots of problem-solving
    artistic: 60,         // Moderate - UI/UX creativity
    social: 40,           // Some - team collaboration
    enterprising: 50,     // Moderate - project leadership
    conventional: 40,     // Some - code structure
  },

  valueProfile: {
    impact: 70,           // Can build products that help many
    income: 80,           // HIGH - well-paid career
    autonomy: 75,         // HIGH - flexible work
    balance: 60,          // Moderate - can be demanding
    growth: 90,           // HIGH - constantly learning
    stability: 70,        // Good - high demand
  },

  workEnvironment: {
    teamSize: 'small',    // Usually work in small teams
    pace: 'moderate',     // Steady with occasional sprints
    structure: 'flexible' // Agile, not rigid
  }
}
```

### How to Score Careers (Examples)

**Doctor:**
- RIASEC: I=95, S=90, R=60, C=50, A=30, E=40
- Values: impact=95, growth=85, income=80, stability=90, autonomy=50, balance=30
- Environment: teamSize=large, pace=intense, structure=structured

**Graphic Designer:**
- RIASEC: A=95, E=60, I=50, S=45, R=30, C=40
- Values: autonomy=90, growth=80, impact=60, balance=70, income=60, stability=50
- Environment: teamSize=small, pace=flexible, structure=flexible

**Accountant:**
- RIASEC: C=95, I=70, E=50, R=30, S=40, A=20
- Values: stability=95, income=80, balance=80, growth=60, autonomy=50, impact=40
- Environment: teamSize=small, pace=steady, structure=structured

**Teacher:**
- RIASEC: S=95, A=60, E=55, I=50, C=45, R=30
- Values: impact=95, balance=70, growth=75, stability=80, autonomy=60, income=50
- Environment: teamSize=large, pace=moderate, structure=structured

**Entrepreneur:**
- RIASEC: E=95, I=70, S=60, A=55, R=45, C=50
- Values: autonomy=95, growth=90, income=85, impact=70, balance=40, stability=30
- Environment: teamSize=leader, pace=intense, structure=flexible

---

## IMPLEMENTATION CHECKLIST

### 1. Update Schema (`/convex/schema.ts`)
```typescript
careers: defineTable({
  // ... existing fields ...

  interestProfile: v.object({
    realistic: v.number(),
    investigative: v.number(),
    artistic: v.number(),
    social: v.number(),
    enterprising: v.number(),
    conventional: v.number(),
  }),

  valueProfile: v.object({
    impact: v.number(),
    income: v.number(),
    autonomy: v.number(),
    balance: v.number(),
    growth: v.number(),
    stability: v.number(),
  }),

  workEnvironment: v.object({
    teamSize: v.string(), // 'solo' | 'small' | 'large' | 'leader'
    pace: v.string(),     // 'steady' | 'moderate' | 'intense' | 'flexible'
    structure: v.string() // 'flexible' | 'balanced' | 'structured'
  }),
}),
```

### 2. Create Algorithm (`/lib/assessment-algorithm.ts`)
- Implement scoring functions from above
- Cosine similarity helper
- Match reason generator
- Export `calculateCareerMatch()` function

### 3. Update Questions (`/app/assessment/questions/page.tsx`)
- Replace current 5 questions with 12 questions above
- Update answer handling to track RIASEC + values + environment
- Pass complete profile to results page

### 4. Update Results (`/app/assessment/results/page.tsx`)
- Use real algorithm instead of hardcoded scores
- Sort careers by match percentage
- Display match reasons
- Show student's top 3 RIASEC codes

### 5. Update Seed Data (`/convex/seed.ts`)
- Add interestProfile, valueProfile, workEnvironment to all 100+ careers
- Use examples above as templates
- Ensure profiles are accurate and diverse

---

## VALIDATION

After implementation, test with these scenarios:

**Test Student 1: Strong Investigative**
- Answers all analytical/research options
- Should match: Scientist, Doctor, Researcher, Data Analyst

**Test Student 2: Strong Artistic**
- Answers all creative options
- Should match: Designer, Architect, Writer, Artist

**Test Student 3: Strong Social**
- Answers all helping/teaching options
- Should match: Teacher, Nurse, Social Worker, Counselor

**Test Student 4: Balanced E+I**
- Mix of leadership and analytical
- Should match: Manager, Consultant, Lawyer, Entrepreneur

**Test Student 5: Values Income**
- Chooses high salary priorities
- Should rank: Doctor, Lawyer, Engineer above Teacher, Social Worker

---

## SUCCESS METRICS

Good assessment system should achieve:
- ✅ 70%+ of students report "matches feel accurate"
- ✅ Match percentages range 60-98% (not all 90%+)
- ✅ Top 5 matches are diverse career types
- ✅ Reasons are specific, not generic
- ✅ Students discover careers they hadn't considered

---

**This document is complete. The implementing AI has everything needed to build a production-ready assessment system without additional research.**

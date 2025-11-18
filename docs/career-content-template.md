# Career Content Template & Guide

## Overview

Your career database has rich fields that make careers come alive. This guide shows you how to fill them all effectively.

---

## ✅ Core Fields (Required)

These are already present in most careers:

```typescript
{
  title: "Software Developer",
  category: "Technology",
  shortDescription: "Build applications and solve problems through code",
  fullDescription: "...",
  videoUrl: "...",
  videoThumbnail: "...",
  salaryMin: 30000000,  // RWF
  salaryMax: 60000000,  // RWF
  currency: "RWF",
  requiredEducation: "Bachelor's in Computer Science or related field",
  requiredSkills: ["Programming", "Problem Solving", "Debugging"],
  careerPath: [...],
  relatedCareerIds: [...],
}
```

---

## 🎯 Assessment Profiles (Important for Matching)

### Interest Profile (RIASEC)
Based on Holland Code system. Rate 0-100 for each dimension:

```typescript
interestProfile: {
  realistic: 40,       // Hands-on, practical, mechanical work
  investigative: 85,   // Research, analysis, problem-solving
  artistic: 60,        // Creative, expressive, original
  social: 30,          // Helping, teaching, counseling
  enterprising: 50,    // Leading, persuading, selling
  conventional: 45,    // Organized, detail-oriented, systematic
}
```

**How to determine scores:**
- **High (70-100)**: Core requirement of the job
- **Medium (40-69)**: Helpful but not essential
- **Low (0-39)**: Rarely needed

**Examples:**
- Software Developer: High Investigative (85), Medium Artistic (60)
- Teacher: High Social (90), Medium Artistic (55)
- Accountant: High Conventional (95), Medium Investigative (60)

### Value Profile
What this career offers. Rate 0-100:

```typescript
valueProfile: {
  impact: 70,          // Making a difference, helping society
  income: 75,          // Financial rewards, high earning potential
  autonomy: 60,        // Independence, self-direction
  balance: 55,         // Work-life balance, flexible hours
  growth: 85,          // Learning, career advancement
  stability: 65,       // Job security, predictability
}
```

### Personality Profile (Big Five)
Typical personality of successful professionals. Rate 0-100:

```typescript
personalityProfile: {
  openness: 80,              // Creativity, curiosity, new ideas
  conscientiousness: 75,     // Organization, reliability, discipline
  extraversion: 45,          // Sociability, assertiveness
}
```

### Work Environment

```typescript
workEnvironment: {
  teamSize: 'small',         // solo | independent | small | large | leader | minimal
  pace: 'deadline-driven',   // steady | moderate | intense | flexible | deadline-driven | predictable
  structure: 'balanced',     // flexible | balanced | structured
}
```

---

## 💡 Rich Content Fields (Make It Real)

### Reality Check
Bust myths and set expectations:

```typescript
realityCheck: {
  myths: [
    "You write code all day",
    "You need to be a math genius",
    "It's all creative and fun",
  ],
  realities: [
    "60% debugging, 20% meetings, 20% writing new code",
    "Logic matters more than advanced math",
    "Often tedious problem-solving and fixing broken things",
  ],
  surprises: [
    "How much time you spend reading documentation",
    "The job is more about communication than coding",
    "Production bugs at 3 AM are part of the deal",
  ],
}
```

**Tips:**
- Myths: What students think before entering the field
- Realities: What it's actually like day-to-day
- Surprises: What even insiders didn't expect

### Week in Life (Good Day vs Hard Day)

```typescript
weekInLife: {
  goodDay: [
    { time: "9:00 AM", activity: "Morning standup - team shares progress" },
    { time: "9:30 AM", activity: "Flow state coding - implementing new feature" },
    { time: "12:00 PM", activity: "Lunch with colleagues, discuss tech trends" },
    { time: "1:00 PM", activity: "Code review - helping junior dev improve" },
    { time: "3:00 PM", activity: "Feature deployed successfully, users love it" },
    { time: "5:00 PM", activity: "Head home on time, proud of progress" },
  ],
  hardDay: [
    { time: "9:00 AM", activity: "Production is down, urgent all-hands meeting" },
    { time: "10:00 AM", activity: "Debugging critical issue, can't find the cause" },
    { time: "1:00 PM", activity: "Skip lunch, still debugging" },
    { time: "4:00 PM", activity: "Found bug, but fix is complex" },
    { time: "7:00 PM", activity: "Still at office, coordinating deployment" },
    { time: "10:00 PM", activity: "Finally fixed, exhausted, stressed" },
  ],
}
```

### Career Capital (What You Gain)

```typescript
careerCapital: {
  transferableSkills: [
    "Problem-solving and logical thinking",
    "Project management and prioritization",
    "Communication and collaboration",
    "Learning quickly and adapting to change",
  ],
  specificSkills: [
    "Programming languages (JavaScript, Python, etc.)",
    "Software architecture and design patterns",
    "Database design and optimization",
    "Version control and DevOps",
  ],
  exitOpportunities: [
    "Product Management",
    "Technical Writing",
    "Software Architecture",
    "Startup Founder",
    "DevOps Engineer",
  ],
}
```

### Breaking In (How to Enter This Career)

```typescript
breakingIn: [
  {
    pathName: "Traditional University Path",
    percentage: 60,
    timeline: "4 years",
    cost: "20-40M RWF",
    steps: [
      "Complete Bachelor's in Computer Science",
      "Build portfolio of personal projects",
      "Internship at tech company",
      "Entry-level developer role",
    ],
  },
  {
    pathName: "Bootcamp Path",
    percentage: 25,
    timeline: "6-12 months",
    cost: "2-5M RWF",
    steps: [
      "Join coding bootcamp (online or in-person)",
      "Build 3-5 portfolio projects",
      "Contribute to open source",
      "Junior developer role at startup",
    ],
  },
  {
    pathName: "Self-Taught Path",
    percentage: 15,
    timeline: "1-2 years",
    cost: "0.5-1M RWF",
    steps: [
      "Learn via online courses (freeCodeCamp, Udemy)",
      "Build real projects, deploy them",
      "Freelance on Upwork/Fiverr",
      "Join tech company as junior dev",
    ],
  },
]
```

### Pros and Cons

```typescript
prosAndCons: {
  pros: [
    "High earning potential (top 10% earn 100M+ RWF annually)",
    "Remote work opportunities globally",
    "Constant learning keeps work interesting",
    "Create tangible products used by millions",
    "Strong job market demand",
  ],
  cons: [
    "Can be sedentary and isolated",
    "Rapid technology changes require constant learning",
    "Debugging can be frustrating and time-consuming",
    "Deadline pressure and production incidents cause stress",
    "Imposter syndrome is common even among experienced devs",
  ],
  bestFor: [
    "People who love solving logical puzzles",
    "Self-directed learners who enjoy mastering new tools",
    "Those comfortable with ambiguity and trial-and-error",
    "Detail-oriented thinkers who spot patterns",
  ],
  notFor: [
    "People who need constant social interaction",
    "Those who prefer stable, unchanging work",
    "People frustrated by ambiguous problems",
    "Those who need immediate visible impact",
  ],
}
```

### Salary Progression

```typescript
salaryProgression: [
  {
    level: "Junior Developer (0-2 years)",
    years: "0-2",
    range: "30-45M RWF/year",
  },
  {
    level: "Mid-Level Developer (3-5 years)",
    years: "3-5",
    range: "45-70M RWF/year",
  },
  {
    level: "Senior Developer (6-10 years)",
    years: "6-10",
    range: "70-100M RWF/year",
  },
  {
    level: "Lead/Principal (10+ years)",
    years: "10+",
    range: "100-150M RWF/year",
  },
]
```

### Skill Roadmap

```typescript
skillRoadmap: [
  {
    stage: "Beginner (0-6 months)",
    duration: "6 months",
    skills: [
      "Basic HTML/CSS",
      "JavaScript fundamentals",
      "Git version control",
      "Problem-solving basics",
    ],
    projects: [
      "Personal portfolio website",
      "Todo list application",
      "Simple calculator",
    ],
    resources: [
      "freeCodeCamp Responsive Web Design",
      "JavaScript30 by Wes Bos",
      "Codecademy JavaScript course",
    ],
  },
  {
    stage: "Intermediate (6-18 months)",
    duration: "12 months",
    skills: [
      "React or Vue framework",
      "Backend with Node.js or Python",
      "Database basics (SQL/NoSQL)",
      "API design and integration",
    ],
    projects: [
      "Full-stack blog platform",
      "E-commerce site with payments",
      "Real-time chat application",
    ],
    resources: [
      "Full Stack Open (University of Helsinki)",
      "The Odin Project",
      "Build projects and deploy them",
    ],
  },
  {
    stage: "Advanced (18+ months)",
    duration: "Ongoing",
    skills: [
      "System design and architecture",
      "Testing and CI/CD",
      "Performance optimization",
      "Cloud platforms (AWS/Azure)",
    ],
    projects: [
      "Scalable microservices app",
      "Open source contributions",
      "Production apps with thousands of users",
    ],
    resources: [
      "System Design Primer",
      "Real-world work experience",
      "Tech conferences and communities",
    ],
  },
]
```

### Success Stories

```typescript
successStories: [
  {
    name: "Jean-Claude",
    age: 28,
    previousRole: "Accountant",
    switchTrigger: "Felt unfulfilled crunching numbers, wanted to build things",
    timeline: "12 months from first line of code to first dev job",
    hardestPart: "Imposter syndrome and feeling behind others",
    biggestHelp: "Rwanda Coding Academy bootcamp and mentor support",
    currentSalary: "55M RWF/year",
    advice: "Start building projects immediately. Theory is important but building is how you learn.",
  },
  {
    name: "Grace",
    age: 24,
    previousRole: "Recent university graduate (CS degree)",
    switchTrigger: "N/A - followed passion from high school",
    timeline: "4 years degree + 6 months job search",
    hardestPart: "Getting first job without experience",
    biggestHelp: "Personal projects showcased problem-solving skills",
    currentSalary: "40M RWF/year (junior role)",
    advice: "Don't wait for perfect. Build messy projects, learn from mistakes, keep going.",
  },
]
```

### Warning Flags

```typescript
warningFlags: {
  redFlags: [
    "Company has no senior developers (you won't learn)",
    "No code review process (quality will suffer)",
    "Frequent weekend work expected (burnout incoming)",
    "No automated testing (tech debt nightmare)",
    "Unclear project requirements (endless changes)",
  ],
  greenFlags: [
    "Strong mentorship program for juniors",
    "Regular code reviews and pair programming",
    "Documented processes and best practices",
    "Work-life balance respected",
    "Investment in employee learning (courses, conferences)",
  ],
}
```

### Resources

```typescript
resources: [
  {
    name: "freeCodeCamp",
    type: "course",
    rating: 3,  // 1-3 stars
    description: "Free, comprehensive curriculum from beginner to advanced",
    url: "https://freecodecamp.org",
  },
  {
    name: "The Pragmatic Programmer",
    type: "book",
    rating: 3,
    description: "Essential book on software craftsmanship",
  },
  {
    name: "Rwanda Coding Academy",
    type: "community",
    rating: 2,
    description: "Local coding bootcamp and developer community in Kigali",
  },
  {
    name: "Stack Overflow",
    type: "tool",
    rating: 3,
    description: "Q&A platform for debugging and learning",
    url: "https://stackoverflow.com",
  },
]
```

### Remote Work & Growth Potential

```typescript
remoteWork: {
  friendly: true,
  percentage: 70,  // % of jobs offering remote options
  notes: "Software development is one of the most remote-friendly careers globally. Many Rwanda-based developers work for international companies remotely.",
}

growthPotential: 5,  // 1-5 stars (5 = excellent growth)

timeToEntry: "6-18 months",  // How long to get first job
```

---

## 📝 Content Gathering Tips

### Where to Get This Information:

1. **Interview Professionals**
   - Talk to 3-5 people in the career
   - Ask about myths, hard days, advice

2. **Research Online**
   - Bureau of Labor Statistics (US)
   - LinkedIn profiles and posts
   - Reddit career subreddits (r/cscareerquestions, etc.)
   - Glassdoor reviews

3. **Local Context**
   - Rwanda job boards (Akazi Kanoze, LinkedIn Rwanda)
   - Local salary surveys
   - Kigali tech community insights

4. **Use AI Assistants**
   - Claude/ChatGPT can help draft initial content
   - But ALWAYS validate with real professionals
   - Add local Rwanda context manually

---

## ⚡ Quick Start: Minimum Viable Content

If you're short on time, prioritize these fields:

1. ✅ **interestProfile** - Needed for assessment matching
2. ✅ **valueProfile** - Needed for assessment matching
3. ✅ **workEnvironment** - Needed for assessment matching
4. ✅ **realityCheck** - Shows honesty and builds trust
5. ✅ **prosAndCons** - Helps students make informed decisions
6. ✅ **realityQuiz** - Your differentiation! (see reality-quiz-guide.md)

Everything else is "nice to have" but not critical for MVP.

---

## 📊 Sample: Software Developer (Full Example)

See `lib/sample-quizzes/software-developer-quiz.ts` for the Reality Quiz.

For a complete career profile example, check the Software Developer entry in your database after seeding.

---

**Questions? Stuck on a field? Ask in the team chat or refer to this guide!**

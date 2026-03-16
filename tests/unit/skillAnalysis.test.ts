import { describe, it, expect } from "vitest";
import {
  calculateJobMatchScore,
  deterministicRecommendation,
  buildLearningPath,
  type UserSkillInput,
  type JobListingInput,
  type LearningResourceInput,
} from "../../convex/lib/skillAnalysis";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const skills: UserSkillInput[] = [
  { id: "js", name: "JavaScript", category: "technical", level: "intermediate" },
  { id: "react", name: "React", category: "technical", level: "intermediate" },
  { id: "html", name: "HTML/CSS", category: "technical", level: "advanced" },
];

const job: JobListingInput = {
  _id: "job-001",
  title: "Junior Web Developer",
  company: "kLab",
  industry: "Technology",
  salaryMin: 220000,
  salaryMax: 360000,
  requiredSkills: ["HTML/CSS", "JavaScript", "MySQL"],
  preferredSkills: ["React", "Node.js"],
  level: "entry",
  postedAt: Date.now(),
  isRemote: false,
};

const resources: LearningResourceInput[] = [
  {
    resourceId: "r001",
    title: "SQL Basics",
    provider: "Khan Academy",
    type: "course",
    url: "https://example.com",
    difficulty: "beginner",
    cost: "free",
    tags: ["SQL", "MySQL", "Database"],
  },
  {
    resourceId: "r002",
    title: "React Fundamentals",
    provider: "freeCodeCamp",
    type: "course",
    url: "https://example.com",
    difficulty: "beginner",
    cost: "free",
    tags: ["React", "JavaScript"],
  },
];

// ─── calculateJobMatchScore ───────────────────────────────────────────────────

describe("calculateJobMatchScore", () => {
  it("returns 0 for empty skills", () => {
    expect(calculateJobMatchScore([], job)).toBe(0);
  });

  it("returns 0 for undefined skills", () => {
    expect(calculateJobMatchScore(undefined, job)).toBe(0);
  });

  it("returns 0 for null skills", () => {
    expect(calculateJobMatchScore(null, job)).toBe(0);
  });

  it("returns 0 for null job", () => {
    expect(calculateJobMatchScore(skills, null)).toBe(0);
  });

  it("returns 0 for undefined job", () => {
    expect(calculateJobMatchScore(skills, undefined)).toBe(0);
  });

  it("scores correctly with partial required skills match", () => {
    // User has HTML/CSS and JavaScript (2/3 required), React (1/2 preferred)
    // required: 2/3 = 0.6667, preferred: 1/2 = 0.5
    // score = 0.6667 * 0.75 + 0.5 * 0.25 = 0.5 + 0.125 = 0.625
    const score = calculateJobMatchScore(skills, job);
    expect(score).toBeGreaterThan(0.5);
    expect(score).toBeLessThan(0.8);
  });

  it("scores 1.0 for exact match on all required and preferred", () => {
    const perfectSkills: UserSkillInput[] = [
      { id: "1", name: "HTML/CSS", category: "technical", level: "intermediate" },
      { id: "2", name: "JavaScript", category: "technical", level: "intermediate" },
      { id: "3", name: "MySQL", category: "technical", level: "intermediate" },
      { id: "4", name: "React", category: "technical", level: "intermediate" },
      { id: "5", name: "Node.js", category: "technical", level: "intermediate" },
    ];
    expect(calculateJobMatchScore(perfectSkills, job)).toBe(1.0);
  });

  it("handles fuzzy matching (case-insensitive, substring)", () => {
    const fuzzySkills: UserSkillInput[] = [
      { id: "1", name: "html/css", category: "technical", level: "intermediate" }, // lowercase
      { id: "2", name: "javascript", category: "technical", level: "intermediate" },
      { id: "3", name: "MySQL", category: "technical", level: "intermediate" },
    ];
    // All 3 required matched
    const score = calculateJobMatchScore(fuzzySkills, job);
    expect(score).toBeGreaterThanOrEqual(0.75); // at minimum full required score
  });

  it("returns between 0 and 1", () => {
    const score = calculateJobMatchScore(skills, job);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});

// ─── deterministicRecommendation ─────────────────────────────────────────────

describe("deterministicRecommendation", () => {
  const jobs: JobListingInput[] = [
    job,
    {
      _id: "job-002",
      title: "Data Analyst",
      company: "Bank of Kigali",
      industry: "Banking",
      salaryMin: 450000,
      salaryMax: 650000,
      requiredSkills: ["Excel Advanced", "SQL", "Power BI"],
      preferredSkills: ["Python"],
      level: "mid",
      postedAt: Date.now(),
      isRemote: false,
    },
  ];

  it("returns valid structure with all inputs", () => {
    const result = deterministicRecommendation(skills, jobs, resources);
    expect(result).toHaveProperty("currentOpportunityIds");
    expect(result).toHaveProperty("nextLevelOpportunityIds");
    expect(result).toHaveProperty("skillGaps");
    expect(result).toHaveProperty("learningPath");
    expect(result).toHaveProperty("salaryProjection");
  });

  it("handles null skills gracefully", () => {
    const result = deterministicRecommendation(null, jobs, resources);
    expect(result.currentOpportunityIds).toHaveLength(0);
    expect(result.skillGaps.length).toBeGreaterThanOrEqual(0);
  });

  it("handles null jobs gracefully", () => {
    const result = deterministicRecommendation(skills, null, resources);
    expect(result.currentOpportunityIds).toHaveLength(0);
    expect(result.nextLevelOpportunityIds).toHaveLength(0);
  });

  it("handles null resources gracefully", () => {
    const result = deterministicRecommendation(skills, jobs, null);
    expect(result).toHaveProperty("learningPath");
    expect(result.learningPath.phases).toHaveLength(3);
  });

  it("handles all nulls gracefully (no crash)", () => {
    expect(() => deterministicRecommendation(null, null, null)).not.toThrow();
  });

  it("salary projection current >= 0", () => {
    const result = deterministicRecommendation(skills, jobs, resources);
    expect(result.salaryProjection.current).toBeGreaterThanOrEqual(0);
    expect(result.salaryProjection.potential).toBeGreaterThanOrEqual(result.salaryProjection.current);
  });

  it("skill gaps are ranked by salary impact descending", () => {
    const result = deterministicRecommendation(skills, jobs, resources);
    if (result.skillGaps.length >= 2) {
      for (let i = 0; i < result.skillGaps.length - 1; i++) {
        expect(result.skillGaps[i].salaryImpact).toBeGreaterThanOrEqual(
          result.skillGaps[i + 1].salaryImpact,
        );
      }
    }
  });

  it("limits skill gaps to 5", () => {
    const result = deterministicRecommendation(skills, jobs, resources);
    expect(result.skillGaps.length).toBeLessThanOrEqual(5);
  });
});

// ─── buildLearningPath ────────────────────────────────────────────────────────

describe("buildLearningPath", () => {
  it("returns 3 phases", () => {
    const gaps = [
      {
        skill: "SQL",
        importance: "critical" as const,
        timeToLearn: "4-6 weeks",
        salaryImpact: 100000,
        opportunities: 5,
        learningResources: [],
      },
    ];
    const path = buildLearningPath(gaps, resources);
    expect(path.phases).toHaveLength(3);
  });

  it("uses primary skill from first gap", () => {
    const gaps = [
      { skill: "React", importance: "high" as const, timeToLearn: "4 weeks", salaryImpact: 80000, opportunities: 3, learningResources: [] },
    ];
    const path = buildLearningPath(gaps, resources);
    expect(path.targetSkill).toBe("React");
    expect(path.title).toContain("React");
  });

  it("handles empty gaps (uses Career Fundamentals)", () => {
    const path = buildLearningPath([], resources);
    expect(path.targetSkill).toBe("Career Fundamentals");
  });

  it("handles empty resources", () => {
    const gaps = [
      { skill: "Python", importance: "high" as const, timeToLearn: "6 weeks", salaryImpact: 50000, opportunities: 3, learningResources: [] },
    ];
    const path = buildLearningPath(gaps, []);
    expect(path.phases[0].resources).toHaveLength(0);
  });

  it("distributes resources across phases (max 3 per phase)", () => {
    const manyResources: LearningResourceInput[] = Array.from({ length: 9 }, (_, i) => ({
      resourceId: `r${i}`,
      title: `SQL Resource ${i}`,
      provider: "Test",
      type: "course" as const,
      url: "https://example.com",
      difficulty: "beginner" as const,
      cost: "free" as const,
      tags: ["SQL", "MySQL"],
    }));
    const gaps = [
      { skill: "SQL", importance: "critical" as const, timeToLearn: "6 weeks", salaryImpact: 100000, opportunities: 5, learningResources: [] },
    ];
    const path = buildLearningPath(gaps, manyResources);
    path.phases.forEach((phase) => {
      expect(phase.resources.length).toBeLessThanOrEqual(3);
    });
  });
});

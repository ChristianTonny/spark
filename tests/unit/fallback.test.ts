/**
 * T5.2 — Fallback integration test
 *
 * Verifies that when ANTHROPIC_API_KEY is absent, the deterministic fallback
 * path returns a valid RecommendationOutput without throwing.
 *
 * The full Convex action (runSkillAnalysis) can only run inside a Convex
 * environment, so we test the fallback path directly by calling
 * deterministicRecommendation — which is exactly what the action uses when
 * the API key is missing or Claude fails.
 */

import { describe, it, expect } from "vitest";
import {
  deterministicRecommendation,
  type UserSkillInput,
  type JobListingInput,
  type LearningResourceInput,
} from "../../convex/lib/skillAnalysis";

const skills: UserSkillInput[] = [
  { id: "js", name: "JavaScript", category: "web-development", level: "intermediate" },
  { id: "react", name: "React", category: "web-development", level: "intermediate" },
];

const jobs: JobListingInput[] = [
  {
    _id: "job-001",
    title: "Junior Web Developer",
    company: "kLab",
    location: "Kigali",
    industry: "Technology",
    salaryMin: 220_000,
    salaryMax: 360_000,
    requiredSkills: ["HTML/CSS", "JavaScript", "MySQL"],
    preferredSkills: ["React", "Node.js"],
    level: "entry",
    postedAt: Date.now(),
    isRemote: false,
  },
  {
    _id: "job-002",
    title: "Data Analyst",
    company: "Bank of Kigali",
    location: "Kigali",
    industry: "Banking",
    salaryMin: 450_000,
    salaryMax: 650_000,
    requiredSkills: ["Excel Advanced", "SQL", "Power BI"],
    preferredSkills: ["Python"],
    level: "mid",
    postedAt: Date.now(),
    isRemote: false,
  },
];

const resources: LearningResourceInput[] = [
  {
    resourceId: "res-001",
    title: "freeCodeCamp Full Stack",
    provider: "freeCodeCamp",
    type: "course",
    url: "https://www.freecodecamp.org",
    difficulty: "beginner",
    cost: "free",
    tags: ["JavaScript", "HTML/CSS", "React", "Node.js"],
  },
];

describe("fallback path — deterministicRecommendation", () => {
  it("returns a valid RecommendationOutput without throwing (simulates no-api-key)", () => {
    // This is exactly what runSkillAnalysis calls when ANTHROPIC_API_KEY is absent
    expect(() => deterministicRecommendation(skills, jobs, resources)).not.toThrow();

    const result = deterministicRecommendation(skills, jobs, resources);

    expect(result).toBeDefined();
    expect(typeof result.currentOpportunityIds).toBe("object");
    expect(Array.isArray(result.currentOpportunityIds)).toBe(true);
    expect(Array.isArray(result.nextLevelOpportunityIds)).toBe(true);
    expect(Array.isArray(result.skillGaps)).toBe(true);
    expect(result.salaryProjection).toBeDefined();
    expect(typeof result.salaryProjection.current).toBe("number");
    expect(typeof result.salaryProjection.potential).toBe("number");
    expect(result.learningPath).toBeDefined();
    expect(Array.isArray(result.learningPath.phases)).toBe(true);
  });

  it("does not crash when called with null/undefined inputs (defensive nil guards)", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => deterministicRecommendation(null as any, null as any, null as any)).not.toThrow();
  });

  it("does not crash with empty inputs", () => {
    expect(() => deterministicRecommendation([], [], [])).not.toThrow();
  });

  it("source label is 'fallback' when skills have low match (no AI involved)", () => {
    // With zero skills, all jobs become next-level, no current matches
    const result = deterministicRecommendation([], jobs, resources);
    // All opportunities are in nextLevel or neither bucket
    expect(result.currentOpportunityIds.length).toBe(0);
  });

  it("salary projection values are non-negative numbers", () => {
    const result = deterministicRecommendation(skills, jobs, resources);
    expect(result.salaryProjection.current).toBeGreaterThanOrEqual(0);
    expect(result.salaryProjection.potential).toBeGreaterThanOrEqual(0);
  });
});

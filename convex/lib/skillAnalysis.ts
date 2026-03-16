/**
 * Skill Analysis — deterministic job matching and skill gap engine
 *
 * Ported from SkillSync convex/lib/analysis.ts with nil guards added
 * for all inputs and aligned to Spark's Convex schema types.
 *
 * Scoring pipeline:
 *
 *   userSkills[]  +  jobListings[]
 *         │                │
 *         └────────┬───────┘
 *                  ▼
 *         calculateJobMatchScore()
 *         required(75%) + preferred(25%) → 0-1 score
 *                  │
 *          ┌───────┴──────────┐
 *          ▼                  ▼
 *     score >= 0.7       0.4 ≤ score < 0.7
 *   "current jobs"      "next level jobs"
 *          │                  │
 *          └───────┬──────────┘
 *                  ▼
 *         collectSkillGaps()
 *         ranked by: salaryImpact × opportunityCount × levelWeight
 *                  │
 *                  ▼
 *         buildLearningPath() — 3 phases: Foundation / Applied / Portfolio
 *                  │
 *                  ▼
 *         RecommendationOutput
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type UserSkillInput = {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  yearsExperience?: number;
};

export type JobListingInput = {
  _id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  salaryMin: number;
  salaryMax: number;
  requiredSkills: string[];
  preferredSkills: string[];
  level: "entry" | "mid" | "senior" | "lead";
  postedAt: number;
  isRemote: boolean;
};

export type LearningResourceInput = {
  resourceId: string;
  title: string;
  provider: string;
  type: "video" | "course" | "article" | "tutorial" | "project" | "certification";
  url: string;
  duration?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  cost: "free" | "paid";
  rating?: number;
  tags: string[];
};

export type SkillGapOutput = {
  skill: string;
  importance: "critical" | "high" | "medium" | "low";
  timeToLearn: string;
  salaryImpact: number;
  opportunities: number;
  learningResources: LearningResourceInput[];
};

export type LearningPhase = {
  id: string;
  title: string;
  duration: string;
  description: string;
  resources: LearningResourceInput[];
  objectives: string[];
};

export type LearningPathOutput = {
  id: string;
  title: string;
  description: string;
  targetSkill: string;
  totalDuration: string;
  phases: LearningPhase[];
};

export type RecommendationOutput = {
  currentOpportunityIds: string[];
  nextLevelOpportunityIds: string[];
  skillGaps: SkillGapOutput[];
  learningPath: LearningPathOutput;
  salaryProjection: {
    current: number;
    potential: number;
    timeframe: string;
  };
};

// ─── Core functions ───────────────────────────────────────────────────────────

function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim().replace(/\s+/g, " ");
}

function skillMatches(userSkill: string, requiredSkill: string): boolean {
  const u = normalizeSkill(userSkill);
  const r = normalizeSkill(requiredSkill);
  return u === r || u.includes(r) || r.includes(u);
}

/**
 * Score a user's skills against a job listing.
 * Returns 0-1. Required skills: 75%, preferred skills: 25%.
 */
export function calculateJobMatchScore(
  userSkills: UserSkillInput[] | undefined | null,
  job: JobListingInput | undefined | null,
): number {
  // Nil guards
  if (!userSkills || !Array.isArray(userSkills) || userSkills.length === 0) return 0;
  if (!job) return 0;
  if (!job.requiredSkills || job.requiredSkills.length === 0) return 0;

  const userSkillNames = userSkills.map((s) => s.name).filter(Boolean);

  const requiredMatched = job.requiredSkills.filter((req) =>
    userSkillNames.some((u) => skillMatches(u, req)),
  ).length;

  const preferredMatched = job.preferredSkills
    ? job.preferredSkills.filter((pref) =>
        userSkillNames.some((u) => skillMatches(u, pref)),
      ).length
    : 0;

  const requiredScore = requiredMatched / job.requiredSkills.length;
  const preferredScore =
    job.preferredSkills && job.preferredSkills.length > 0
      ? preferredMatched / job.preferredSkills.length
      : 0;

  return Number((requiredScore * 0.75 + preferredScore * 0.25).toFixed(4));
}

function getMissingSkills(userSkills: UserSkillInput[], job: JobListingInput): string[] {
  const userSkillNames = userSkills.map((s) => s.name).filter(Boolean);
  return job.requiredSkills.filter(
    (req) => !userSkillNames.some((u) => skillMatches(u, req)),
  );
}

function levelWeight(level: JobListingInput["level"]): number {
  switch (level) {
    case "entry": return 1;
    case "mid":   return 1.2;
    case "senior": return 1.5;
    case "lead":  return 1.7;
  }
}

function averageSalary(job: JobListingInput): number {
  return Math.round((job.salaryMin + job.salaryMax) / 2);
}

function inferLearningTime(opportunities: number, importance: SkillGapOutput["importance"]): string {
  if (importance === "critical") return opportunities > 5 ? "8-12 weeks" : "6-8 weeks";
  if (importance === "high") return opportunities > 4 ? "6-8 weeks" : "4-6 weeks";
  if (importance === "medium") return "3-5 weeks";
  return "2-3 weeks";
}

function getImportance(opportunityCount: number): SkillGapOutput["importance"] {
  if (opportunityCount >= 6) return "critical";
  if (opportunityCount >= 4) return "high";
  if (opportunityCount >= 2) return "medium";
  return "low";
}

function collectSkillGaps(
  userSkills: UserSkillInput[],
  jobsWithScores: Array<{ job: JobListingInput; score: number }>,
  resources: LearningResourceInput[],
): SkillGapOutput[] {
  const deficits = new Map<
    string,
    { opportunities: number; salaryImpactAccumulator: number; weightedDemand: number }
  >();

  const baselineCurrent = jobsWithScores.filter(({ score }) => score >= 0.7);
  const baselineSalary =
    baselineCurrent.length > 0
      ? baselineCurrent.reduce((sum, item) => sum + averageSalary(item.job), 0) / baselineCurrent.length
      : 250000; // Rwanda entry-level RWF baseline

  for (const { job, score } of jobsWithScores) {
    if (score >= 0.7) continue;
    const missing = getMissingSkills(userSkills, job);
    const impact = Math.max(0, averageSalary(job) - baselineSalary);
    for (const skill of missing) {
      const normalized = normalizeSkill(skill);
      const existing = deficits.get(normalized) ?? { opportunities: 0, salaryImpactAccumulator: 0, weightedDemand: 0 };
      existing.opportunities += 1;
      existing.salaryImpactAccumulator += impact;
      existing.weightedDemand += levelWeight(job.level);
      deficits.set(normalized, existing);
    }
  }

  return [...deficits.entries()]
    .map(([skill, stats]) => {
      const { opportunities } = stats;
      const importance = getImportance(opportunities);
      const relatedResources = (resources ?? [])
        .filter((r) =>
          r.tags.some((tag) =>
            normalizeSkill(tag).includes(skill) || skill.includes(normalizeSkill(tag)),
          ),
        )
        .slice(0, 5);

      return {
        skill: skill.split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" "),
        importance,
        timeToLearn: inferLearningTime(opportunities, importance),
        salaryImpact: Math.round(stats.salaryImpactAccumulator / Math.max(opportunities, 1)),
        opportunities,
        learningResources: relatedResources,
        _demandScore: stats.weightedDemand,
      };
    })
    .sort((a, b) => {
      const d = b.salaryImpact - a.salaryImpact;
      if (d !== 0) return d;
      const d2 = b.opportunities - a.opportunities;
      if (d2 !== 0) return d2;
      return b._demandScore - a._demandScore;
    })
    .slice(0, 5)
    .map(({ _demandScore: _, ...rest }) => rest);
}

export function buildLearningPath(
  skillGaps: SkillGapOutput[],
  resources: LearningResourceInput[],
): LearningPathOutput {
  const primarySkill = skillGaps[0]?.skill ?? "Career Fundamentals";
  const safeResources = resources ?? [];
  const selected = safeResources
    .filter((r) =>
      r.tags.some((tag) =>
        normalizeSkill(tag).includes(normalizeSkill(primarySkill)) ||
        normalizeSkill(primarySkill).includes(normalizeSkill(tag)),
      ),
    )
    .slice(0, 9);

  return {
    id: `path-${normalizeSkill(primarySkill).replace(/\s+/g, "-")}`,
    title: `${primarySkill} Career Upgrade Path`,
    description: `A focused path to unlock higher-paying Rwanda opportunities by mastering ${primarySkill}.`,
    targetSkill: primarySkill,
    totalDuration: "8-12 weeks",
    phases: [
      {
        id: "phase-foundation",
        title: "Foundation",
        duration: "2-3 weeks",
        description: `Build practical fundamentals for ${primarySkill}.`,
        resources: selected.slice(0, 3),
        objectives: ["Understand core concepts", "Complete first guided project"],
      },
      {
        id: "phase-practice",
        title: "Applied Practice",
        duration: "3-4 weeks",
        description: "Apply skills through market-relevant tasks.",
        resources: selected.slice(3, 6),
        objectives: ["Ship one portfolio artifact", "Solve at least two real-world scenarios"],
      },
      {
        id: "phase-portfolio",
        title: "Portfolio & Interview Prep",
        duration: "3-5 weeks",
        description: "Prepare proof-of-skill and job application readiness.",
        resources: selected.slice(6, 9),
        objectives: ["Complete capstone", "Prepare interview stories with measurable impact"],
      },
    ],
  };
}

function projectSalary(
  current: Array<{ job: JobListingInput; score: number }>,
  next: Array<{ job: JobListingInput; score: number }>,
): RecommendationOutput["salaryProjection"] {
  const currentAvg =
    current.length > 0
      ? Math.round(current.reduce((sum, item) => sum + averageSalary(item.job), 0) / current.length)
      : 250000;

  const potentialAvg =
    next.length > 0
      ? Math.round(next.reduce((sum, item) => sum + averageSalary(item.job), 0) / next.length)
      : Math.round(currentAvg * 1.2);

  return {
    current: currentAvg,
    potential: Math.max(potentialAvg, currentAvg),
    timeframe: "6 months",
  };
}

/**
 * Full deterministic recommendation — no AI dependency.
 * Always returns a valid RecommendationOutput even with empty inputs.
 */
export function deterministicRecommendation(
  userSkills: UserSkillInput[] | undefined | null,
  jobs: JobListingInput[] | undefined | null,
  resources: LearningResourceInput[] | undefined | null,
): RecommendationOutput {
  const safeSkills = userSkills ?? [];
  const safeJobs = jobs ?? [];
  const safeResources = resources ?? [];

  const jobsWithScores = safeJobs
    .map((job) => ({ job, score: calculateJobMatchScore(safeSkills, job) }))
    .sort((a, b) => b.score - a.score);

  const current = jobsWithScores.filter((item) => item.score >= 0.7).slice(0, 8);
  const next = jobsWithScores.filter((item) => item.score < 0.7 && item.score >= 0.4).slice(0, 8);

  const skillGaps = collectSkillGaps(safeSkills, jobsWithScores, safeResources);
  const learningPath = buildLearningPath(skillGaps, safeResources);

  return {
    currentOpportunityIds: current.map((item) => item.job._id),
    nextLevelOpportunityIds: next.map((item) => item.job._id),
    skillGaps,
    learningPath,
    salaryProjection: projectSalary(current, next),
  };
}

/** Extract the first {...} JSON object from a string (for AI response parsing) */
export function extractJsonObject(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return input.slice(start, end + 1);
}

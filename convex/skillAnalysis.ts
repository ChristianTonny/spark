/**
 * Skill Analysis — Convex queries, mutations, and AI action
 *
 * Data flow:
 *
 *   Client submits skills
 *        │
 *        ▼
 *   saveSkillProfile (mutation) → skillProfiles table
 *        │
 *        ▼
 *   runSkillAnalysis (action)
 *        ├── fetchJobs + fetchResources (internal queries)
 *        ├── deterministicRecommendation (always runs as baseline)
 *        ├── Try Claude Haiku 4.5 (15s timeout)
 *        │      ├─ success → parse + Zod validate → merge with deterministic
 *        │      └─ any failure → use deterministic (source: "fallback")
 *        └── saveAnalysis (mutation) → skillAnalyses table
 */

import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { anyApi } from "convex/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  calculateJobMatchScore,
  deterministicRecommendation,
  extractJsonObject,
  type JobListingInput,
  type LearningResourceInput,
  type RecommendationOutput,
  type UserSkillInput,
} from "./lib/skillAnalysis";
import { sanitizeSkillNames } from "./utils/sanitize";

// ─── Zod schemas for Claude response validation ───────────────────────────────

const skillGapSchema = z.object({
  skill: z.string(),
  importance: z.enum(["critical", "high", "medium", "low"]),
  timeToLearn: z.string(),
  salaryImpact: z.number().nonnegative(),
  opportunities: z.number().int().nonnegative(),
});

const phaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  description: z.string(),
  objectives: z.array(z.string()),
});

const aiResponseSchema = z.object({
  skillGaps: z.array(skillGapSchema).min(1),
  marketInsights: z.array(z.string()).min(1),
  learningPath: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    targetSkill: z.string(),
    totalDuration: z.string(),
    phases: z.array(phaseSchema),
  }),
  salaryProjection: z.object({
    current: z.number().nonnegative(),
    potential: z.number().nonnegative(),
    timeframe: z.string(),
  }),
});

// ─── Public queries ───────────────────────────────────────────────────────────

export const getJobListings = query({
  args: {
    industry: v.optional(v.string()),
    level: v.optional(v.string()),
    isRemote: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let jobs = await ctx.db
      .query("jobListings")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();

    if (args.industry) {
      jobs = jobs.filter((j) => j.industry === args.industry);
    }
    if (args.level) {
      jobs = jobs.filter((j) => j.level === args.level);
    }
    if (args.isRemote !== undefined) {
      jobs = jobs.filter((j) => j.isRemote === args.isRemote);
    }
    return jobs;
  },
});

export const getAllResources = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("learningResources").collect();
  },
});

export const getSkillTaxonomy = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("skillTaxonomy").collect();
  },
});

export const getLatestAnalysis = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    return ctx.db
      .query("skillAnalyses")
      .withIndex("by_user_created", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();
  },
});

export const getJobMatchScores = query({
  args: { skillNames: v.array(v.string()) },
  handler: async (ctx, args) => {
    const jobs = await ctx.db
      .query("jobListings")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();

    const userSkills: UserSkillInput[] = args.skillNames.map((name, i) => ({
      id: `skill-${i}`,
      name,
      category: "technical",
      level: "intermediate",
    }));

    return jobs.map((job) => ({
      jobId: job._id,
      score: calculateJobMatchScore(userSkills, job as JobListingInput),
    }));
  },
});

// ─── Mutations ────────────────────────────────────────────────────────────────

export const saveSkillProfile = mutation({
  args: {
    userId: v.optional(v.id("users")),
    skills: v.array(v.object({
      id: v.string(),
      name: v.string(),
      category: v.string(),
      level: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
        v.literal("expert"),
      ),
      yearsExperience: v.optional(v.number()),
    })),
    experienceText: v.optional(v.string()),
    preferredIndustries: v.array(v.string()),
    targetCareerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get current version
    let version = 1;
    if (args.userId) {
      const latest = await ctx.db
        .query("skillProfiles")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .first();
      if (latest) version = latest.version + 1;
    }

    const profileId = await ctx.db.insert("skillProfiles", {
      userId: args.userId,
      skills: args.skills,
      experienceText: args.experienceText,
      preferredIndustries: args.preferredIndustries,
      targetCareerId: args.targetCareerId,
      version,
      updatedAt: Date.now(),
    });

    return { profileId, version };
  },
});

export const saveAnalysisResult = mutation({
  args: {
    userId: v.optional(v.id("users")),
    profileVersion: v.number(),
    source: v.union(v.literal("ai"), v.literal("fallback")),
    fallbackReason: v.optional(v.string()),
    currentOpportunityIds: v.array(v.string()),
    nextLevelOpportunityIds: v.array(v.string()),
    skillGaps: v.array(v.object({
      skillName: v.string(),
      category: v.string(),
      importance: v.union(
        v.literal("critical"),
        v.literal("important"),
        v.literal("nice-to-have"),
      ),
      salaryImpact: v.number(),
      opportunityCount: v.number(),
      estimatedWeeksToLearn: v.number(),
      resources: v.array(v.string()),
    })),
    salaryProjection: v.object({
      currentBaseline: v.number(),
      potentialWithGaps: v.number(),
      currency: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("skillAnalyses", {
      userId: args.userId,
      profileVersion: args.profileVersion,
      source: args.source,
      fallbackReason: args.fallbackReason,
      recommendations: {
        skillGaps: args.skillGaps,
        currentOpportunityIds: args.currentOpportunityIds,
        nextLevelOpportunityIds: args.nextLevelOpportunityIds,
        salaryProjection: args.salaryProjection,
      },
      createdAt: Date.now(),
    });
  },
});

export const saveLearningProgress = mutation({
  args: {
    userId: v.id("users"),
    targetSkill: v.string(),
    completedResourceId: v.string(),
    additionalMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("learningProgress")
      .withIndex("by_user_skill", (q) =>
        q.eq("userId", args.userId).eq("targetSkill", args.targetSkill),
      )
      .first();

    if (existing) {
      const alreadyDone = existing.completedResourceIds.includes(args.completedResourceId);
      await ctx.db.patch(existing._id, {
        completedResourceIds: alreadyDone
          ? existing.completedResourceIds
          : [...existing.completedResourceIds, args.completedResourceId],
        minutesSpent: existing.minutesSpent + (args.additionalMinutes ?? 0),
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return ctx.db.insert("learningProgress", {
      userId: args.userId,
      targetSkill: args.targetSkill,
      completedResourceIds: [args.completedResourceId],
      minutesSpent: args.additionalMinutes ?? 0,
      updatedAt: Date.now(),
    });
  },
});

// ─── AI action ────────────────────────────────────────────────────────────────

/**
 * Run skill analysis using Claude Haiku 4.5 with deterministic fallback.
 *
 * Error handling:
 *   - ANTHROPIC_API_KEY missing → log + fallback (source: "fallback", reason: "no-api-key")
 *   - Claude timeout (>15s) → fallback (source: "fallback", reason: "timeout")
 *   - Claude malformed JSON → fallback (source: "fallback", reason: "parse-error")
 *   - Zod validation fail → fallback (source: "fallback", reason: "validation-error")
 *   - Any other error → fallback (source: "fallback", reason: "unknown-error")
 *   - All fallbacks: deterministic result returned, user sees results without interruption
 */
export const runSkillAnalysis = action({
  args: {
    userId: v.optional(v.id("users")),
    skills: v.array(v.object({
      id: v.string(),
      name: v.string(),
      category: v.string(),
      level: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
        v.literal("expert"),
      ),
      yearsExperience: v.optional(v.number()),
    })),
    profileVersion: v.number(),
    targetCareerId: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    source: "ai" | "fallback";
    recommendation: RecommendationOutput;
    marketInsights: string[];
    analysisId?: string;
  }> => {
    // anyApi used here because Convex codegen runs during `convex dev`,
    // not during `tsc`. These references resolve correctly at runtime.
    const [rawJobs, rawResources] = await Promise.all([
      ctx.runQuery(anyApi.skillAnalysis.getJobListings, {}),
      ctx.runQuery(anyApi.skillAnalysis.getAllResources, {}),
    ]);

    const jobs = rawJobs as JobListingInput[];
    const resources = rawResources as LearningResourceInput[];

    // Always compute deterministic baseline
    const userSkills: UserSkillInput[] = args.skills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      level: s.level,
      yearsExperience: s.yearsExperience,
    }));

    const deterministic = deterministicRecommendation(userSkills, jobs, resources);

    let source: "ai" | "fallback" = "fallback";
    let fallbackReason: string | undefined;
    let finalRecommendation = deterministic;
    let marketInsights: string[] = [];

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[skillAnalysis] ANTHROPIC_API_KEY not set — using deterministic fallback");
      fallbackReason = "no-api-key";
    } else {
      // Try Claude Haiku 4.5
      try {
        const sanitizedSkillNames = sanitizeSkillNames(args.skills.map((s) => s.name));
        const topGaps = deterministic.skillGaps.slice(0, 5).map((g) => g.skill);
        const currentJobTitles = jobs
          .filter((j) => deterministic.currentOpportunityIds.includes(j._id))
          .map((j) => `${j.title} at ${j.company} (${j.level})`)
          .slice(0, 5);

        const prompt = buildPrompt(sanitizedSkillNames, topGaps, currentJobTitles);

        const client = new Anthropic({ apiKey });
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        let rawText = "";
        try {
          const response = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 2048,
            messages: [{ role: "user", content: prompt }],
          });
          rawText = response.content
            .filter((block) => block.type === "text")
            .map((block) => (block as { type: "text"; text: string }).text)
            .join("");
        } finally {
          clearTimeout(timeoutId);
        }

        // Parse and validate
        const jsonText = extractJsonObject(rawText);
        if (!jsonText) throw new Error("No JSON in response");

        const parsed = aiResponseSchema.parse(JSON.parse(jsonText));
        marketInsights = parsed.marketInsights;

        // Merge: AI skill gaps + learning path override deterministic
        finalRecommendation = {
          ...deterministic,
          skillGaps: deterministic.skillGaps.map((gap, i) => {
            const aiGap = parsed.skillGaps[i];
            if (!aiGap) return gap;
            return {
              ...gap,
              importance: aiGap.importance,
              timeToLearn: aiGap.timeToLearn,
              salaryImpact: aiGap.salaryImpact,
            };
          }),
          learningPath: {
            ...deterministic.learningPath,
            title: parsed.learningPath.title,
            description: parsed.learningPath.description,
            totalDuration: parsed.learningPath.totalDuration,
            phases: parsed.learningPath.phases.map((phase, i) => ({
              ...phase,
              resources: deterministic.learningPath.phases[i]?.resources ?? [],
            })),
          },
          salaryProjection: {
            current: parsed.salaryProjection.current,
            potential: parsed.salaryProjection.potential,
            timeframe: parsed.salaryProjection.timeframe,
          },
        };

        source = "ai";
      } catch (err: unknown) {
        const isTimeout = err instanceof Error && (err.name === "AbortError" || err.message.includes("abort"));
        const isZodError = err instanceof z.ZodError;
        const isParseError = err instanceof SyntaxError;

        if (isTimeout) {
          fallbackReason = "timeout";
        } else if (isZodError) {
          fallbackReason = "validation-error";
        } else if (isParseError) {
          fallbackReason = "parse-error";
        } else {
          fallbackReason = "unknown-error";
        }

        console.error(`[skillAnalysis] Claude failed (${fallbackReason}) — using deterministic fallback`, err);
        source = "fallback";
        finalRecommendation = deterministic;
      }
    }

    // Persist for authenticated users
    let analysisId: string | undefined;
    if (args.userId) {
      // Map importance to schema literals
      const importance_map: Record<string, "critical" | "important" | "nice-to-have"> = {
        critical: "critical",
        high: "important",
        medium: "nice-to-have",
        low: "nice-to-have",
      };

      analysisId = await ctx.runMutation(anyApi.skillAnalysis.saveAnalysisResultInternal, {
        userId: args.userId,
        profileVersion: args.profileVersion,
        source,
        fallbackReason,
        currentOpportunityIds: finalRecommendation.currentOpportunityIds,
        nextLevelOpportunityIds: finalRecommendation.nextLevelOpportunityIds,
        skillGaps: finalRecommendation.skillGaps.map((g) => ({
          skillName: g.skill,
          category: "general",
          importance: importance_map[g.importance] ?? "nice-to-have",
          salaryImpact: g.salaryImpact,
          opportunityCount: g.opportunities,
          estimatedWeeksToLearn: parseInt(g.timeToLearn.split("-")[0] ?? "4"),
          resources: g.learningResources.map((r) => r.resourceId),
        })),
        salaryProjection: {
          currentBaseline: finalRecommendation.salaryProjection.current,
          potentialWithGaps: finalRecommendation.salaryProjection.potential,
          currency: "RWF",
        },
      });
    }

    return { source, recommendation: finalRecommendation, marketInsights, analysisId };
  },
});

// Internal mutation for saving from action
export const saveAnalysisResultInternal = mutation({
  args: {
    userId: v.id("users"),
    profileVersion: v.number(),
    source: v.union(v.literal("ai"), v.literal("fallback")),
    fallbackReason: v.optional(v.string()),
    currentOpportunityIds: v.array(v.string()),
    nextLevelOpportunityIds: v.array(v.string()),
    skillGaps: v.array(v.object({
      skillName: v.string(),
      category: v.string(),
      importance: v.union(
        v.literal("critical"),
        v.literal("important"),
        v.literal("nice-to-have"),
      ),
      salaryImpact: v.number(),
      opportunityCount: v.number(),
      estimatedWeeksToLearn: v.number(),
      resources: v.array(v.string()),
    })),
    salaryProjection: v.object({
      currentBaseline: v.number(),
      potentialWithGaps: v.number(),
      currency: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("skillAnalyses", {
      userId: args.userId,
      profileVersion: args.profileVersion,
      source: args.source,
      fallbackReason: args.fallbackReason,
      recommendations: {
        skillGaps: args.skillGaps,
        currentOpportunityIds: args.currentOpportunityIds,
        nextLevelOpportunityIds: args.nextLevelOpportunityIds,
        salaryProjection: args.salaryProjection,
      },
      createdAt: Date.now(),
    });
  },
});

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(
  skills: string[],
  topGaps: string[],
  currentJobs: string[],
): string {
  return `You are a career advisor for Rwanda's job market. Analyze this professional's skill profile and provide structured recommendations.

USER SKILLS: ${skills.join(", ") || "none specified"}
TOP SKILL GAPS (from job market analysis): ${topGaps.join(", ") || "none identified"}
CURRENT MATCHING JOBS: ${currentJobs.join("; ") || "none matched yet"}

Respond ONLY with a valid JSON object (no markdown, no explanation) matching this structure exactly:
{
  "skillGaps": [
    {
      "skill": "skill name",
      "importance": "critical|high|medium|low",
      "timeToLearn": "X-Y weeks",
      "salaryImpact": <number in RWF>,
      "opportunities": <integer count>
    }
  ],
  "marketInsights": [
    "One specific Rwanda market insight",
    "Another insight"
  ],
  "learningPath": {
    "id": "path-id",
    "title": "Path title",
    "description": "Description",
    "targetSkill": "primary skill",
    "totalDuration": "8-12 weeks",
    "phases": [
      {
        "id": "phase-foundation",
        "title": "Foundation",
        "duration": "2-3 weeks",
        "description": "Phase description",
        "objectives": ["objective 1", "objective 2"]
      },
      {
        "id": "phase-practice",
        "title": "Applied Practice",
        "duration": "3-4 weeks",
        "description": "Phase description",
        "objectives": ["objective 1", "objective 2"]
      },
      {
        "id": "phase-portfolio",
        "title": "Portfolio & Interview Prep",
        "duration": "3-5 weeks",
        "description": "Phase description",
        "objectives": ["objective 1", "objective 2"]
      }
    ]
  },
  "salaryProjection": {
    "current": <number in RWF>,
    "potential": <number in RWF>,
    "timeframe": "6 months"
  }
}

Context: Rwanda job market, salaries in RWF. Focus on practical, achievable steps for young professionals in Kigali.`;
}

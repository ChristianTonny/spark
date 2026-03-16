import { mutation } from "./_generated/server";

/**
 * Migrate SkillSync career profiles into Spark's careers table.
 *
 * Maps SkillSync's 29 career profiles (riasecProfile, valuesProfile,
 * personalityProfile, environmentProfile) into the corresponding
 * optional fields on Spark's careers table
 * (interestProfile, valueProfile, personalityProfile, workEnvironment).
 *
 * Match strategy: case-insensitive title match against existing careers.
 * If no match found, the profile is skipped (not created as a new career —
 * Spark's careers are richer and should be the source of truth for new entries).
 *
 * Run via: npx convex run migrateCareerProfiles:migrate
 */
export const migrate = mutation({
  args: {},
  handler: async (ctx) => {
    // SkillSync career profiles (29 entries) with RIASEC/values/personality/environment data
    const profiles = [
      { title: "Accountant", riasec: { realistic: 40, investigative: 65, artistic: 20, social: 45, enterprising: 55, conventional: 90 }, values: { impact: 50, income: 70, autonomy: 45, balance: 55, growth: 60, stability: 85 }, personality: { openness: 45, conscientiousness: 90, extraversion: 40 }, env: { teamSize: "small", pace: "deadline-driven" } },
      { title: "Agricultural Officer", riasec: { realistic: 85, investigative: 70, artistic: 20, social: 75, enterprising: 50, conventional: 60 }, values: { impact: 95, income: 50, autonomy: 60, balance: 65, growth: 70, stability: 75 }, personality: { openness: 65, conscientiousness: 70, extraversion: 70 }, env: { teamSize: "small", pace: "steady" } },
      { title: "Architect", riasec: { realistic: 75, investigative: 70, artistic: 85, social: 40, enterprising: 55, conventional: 50 }, values: { impact: 70, income: 75, autonomy: 65, balance: 50, growth: 75, stability: 55 }, personality: { openness: 85, conscientiousness: 80, extraversion: 45 }, env: { teamSize: "small", pace: "deadline-driven" } },
      { title: "Business Analyst", riasec: { realistic: 40, investigative: 80, artistic: 30, social: 55, enterprising: 70, conventional: 65 }, values: { impact: 65, income: 75, autonomy: 55, balance: 60, growth: 75, stability: 60 }, personality: { openness: 65, conscientiousness: 75, extraversion: 55 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Civil Engineer", riasec: { realistic: 90, investigative: 75, artistic: 30, social: 40, enterprising: 55, conventional: 65 }, values: { impact: 80, income: 75, autonomy: 50, balance: 55, growth: 70, stability: 70 }, personality: { openness: 55, conscientiousness: 85, extraversion: 45 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Data Scientist", riasec: { realistic: 50, investigative: 95, artistic: 40, social: 30, enterprising: 45, conventional: 70 }, values: { impact: 65, income: 85, autonomy: 70, balance: 55, growth: 90, stability: 55 }, personality: { openness: 80, conscientiousness: 80, extraversion: 35 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Doctor", riasec: { realistic: 65, investigative: 90, artistic: 25, social: 80, enterprising: 55, conventional: 50 }, values: { impact: 95, income: 80, autonomy: 50, balance: 30, growth: 75, stability: 65 }, personality: { openness: 70, conscientiousness: 90, extraversion: 65 }, env: { teamSize: "small", pace: "intense" } },
      { title: "Entrepreneur", riasec: { realistic: 55, investigative: 65, artistic: 60, social: 65, enterprising: 95, conventional: 35 }, values: { impact: 80, income: 85, autonomy: 95, balance: 40, growth: 90, stability: 25 }, personality: { openness: 90, conscientiousness: 70, extraversion: 80 }, env: { teamSize: "small", pace: "intense" } },
      { title: "Environmental Scientist", riasec: { realistic: 75, investigative: 85, artistic: 40, social: 65, enterprising: 40, conventional: 50 }, values: { impact: 90, income: 55, autonomy: 60, balance: 65, growth: 70, stability: 60 }, personality: { openness: 75, conscientiousness: 75, extraversion: 50 }, env: { teamSize: "small", pace: "steady" } },
      { title: "Financial Analyst", riasec: { realistic: 35, investigative: 85, artistic: 20, social: 40, enterprising: 70, conventional: 80 }, values: { impact: 55, income: 85, autonomy: 55, balance: 55, growth: 80, stability: 65 }, personality: { openness: 55, conscientiousness: 85, extraversion: 50 }, env: { teamSize: "small", pace: "deadline-driven" } },
      { title: "Graphic Designer", riasec: { realistic: 55, investigative: 45, artistic: 95, social: 45, enterprising: 55, conventional: 35 }, values: { impact: 55, income: 60, autonomy: 80, balance: 65, growth: 70, stability: 50 }, personality: { openness: 95, conscientiousness: 65, extraversion: 50 }, env: { teamSize: "small", pace: "flexible" } },
      { title: "Human Resources Manager", riasec: { realistic: 25, investigative: 55, artistic: 35, social: 85, enterprising: 70, conventional: 65 }, values: { impact: 70, income: 65, autonomy: 55, balance: 65, growth: 65, stability: 70 }, personality: { openness: 60, conscientiousness: 75, extraversion: 75 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "IT Support Specialist", riasec: { realistic: 70, investigative: 70, artistic: 25, social: 65, enterprising: 40, conventional: 55 }, values: { impact: 55, income: 55, autonomy: 50, balance: 65, growth: 60, stability: 70 }, personality: { openness: 60, conscientiousness: 70, extraversion: 55 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Journalist", riasec: { realistic: 25, investigative: 75, artistic: 80, social: 70, enterprising: 65, conventional: 30 }, values: { impact: 80, income: 50, autonomy: 70, balance: 50, growth: 65, stability: 35 }, personality: { openness: 85, conscientiousness: 60, extraversion: 75 }, env: { teamSize: "small", pace: "deadline-driven" } },
      { title: "Lawyer", riasec: { realistic: 25, investigative: 80, artistic: 45, social: 65, enterprising: 85, conventional: 60 }, values: { impact: 70, income: 80, autonomy: 60, balance: 35, growth: 75, stability: 60 }, personality: { openness: 70, conscientiousness: 85, extraversion: 70 }, env: { teamSize: "small", pace: "deadline-driven" } },
      { title: "Marketing Manager", riasec: { realistic: 30, investigative: 60, artistic: 70, social: 70, enterprising: 85, conventional: 40 }, values: { impact: 65, income: 75, autonomy: 65, balance: 55, growth: 80, stability: 50 }, personality: { openness: 80, conscientiousness: 70, extraversion: 80 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Nurse", riasec: { realistic: 60, investigative: 55, artistic: 25, social: 90, enterprising: 35, conventional: 50 }, values: { impact: 90, income: 55, autonomy: 35, balance: 40, growth: 60, stability: 70 }, personality: { openness: 55, conscientiousness: 80, extraversion: 70 }, env: { teamSize: "large", pace: "intense" } },
      { title: "Pharmacist", riasec: { realistic: 55, investigative: 80, artistic: 20, social: 70, enterprising: 50, conventional: 80 }, values: { impact: 80, income: 75, autonomy: 45, balance: 55, growth: 65, stability: 80 }, personality: { openness: 55, conscientiousness: 90, extraversion: 55 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Product Manager", riasec: { realistic: 35, investigative: 70, artistic: 55, social: 65, enterprising: 85, conventional: 45 }, values: { impact: 75, income: 80, autonomy: 70, balance: 50, growth: 85, stability: 45 }, personality: { openness: 80, conscientiousness: 75, extraversion: 70 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Project Manager", riasec: { realistic: 40, investigative: 60, artistic: 30, social: 65, enterprising: 80, conventional: 65 }, values: { impact: 70, income: 70, autonomy: 60, balance: 55, growth: 70, stability: 65 }, personality: { openness: 60, conscientiousness: 85, extraversion: 65 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Psychologist", riasec: { realistic: 25, investigative: 80, artistic: 55, social: 90, enterprising: 35, conventional: 30 }, values: { impact: 90, income: 60, autonomy: 65, balance: 60, growth: 70, stability: 55 }, personality: { openness: 80, conscientiousness: 75, extraversion: 65 }, env: { teamSize: "solo", pace: "steady" } },
      { title: "Public Health Officer", riasec: { realistic: 45, investigative: 80, artistic: 30, social: 85, enterprising: 60, conventional: 55 }, values: { impact: 95, income: 55, autonomy: 50, balance: 60, growth: 70, stability: 70 }, personality: { openness: 65, conscientiousness: 80, extraversion: 70 }, env: { teamSize: "large", pace: "moderate" } },
      { title: "Software Developer", riasec: { realistic: 55, investigative: 85, artistic: 55, social: 35, enterprising: 50, conventional: 65 }, values: { impact: 65, income: 85, autonomy: 75, balance: 65, growth: 90, stability: 55 }, personality: { openness: 80, conscientiousness: 80, extraversion: 35 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Social Worker", riasec: { realistic: 35, investigative: 50, artistic: 45, social: 95, enterprising: 50, conventional: 40 }, values: { impact: 95, income: 40, autonomy: 55, balance: 55, growth: 60, stability: 60 }, personality: { openness: 70, conscientiousness: 70, extraversion: 75 }, env: { teamSize: "small", pace: "steady" } },
      { title: "Teacher", riasec: { realistic: 35, investigative: 65, artistic: 65, social: 90, enterprising: 55, conventional: 55 }, values: { impact: 90, income: 45, autonomy: 55, balance: 65, growth: 65, stability: 75 }, personality: { openness: 75, conscientiousness: 75, extraversion: 80 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "UX Designer", riasec: { realistic: 45, investigative: 70, artistic: 90, social: 60, enterprising: 55, conventional: 35 }, values: { impact: 65, income: 70, autonomy: 75, balance: 65, growth: 80, stability: 45 }, personality: { openness: 90, conscientiousness: 70, extraversion: 55 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Veterinarian", riasec: { realistic: 80, investigative: 80, artistic: 25, social: 65, enterprising: 45, conventional: 50 }, values: { impact: 85, income: 65, autonomy: 55, balance: 50, growth: 65, stability: 65 }, personality: { openness: 65, conscientiousness: 85, extraversion: 55 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Web Developer", riasec: { realistic: 55, investigative: 80, artistic: 60, social: 30, enterprising: 45, conventional: 65 }, values: { impact: 55, income: 75, autonomy: 70, balance: 65, growth: 85, stability: 55 }, personality: { openness: 75, conscientiousness: 75, extraversion: 35 }, env: { teamSize: "small", pace: "moderate" } },
      { title: "Youth Worker", riasec: { realistic: 40, investigative: 45, artistic: 55, social: 95, enterprising: 55, conventional: 35 }, values: { impact: 95, income: 35, autonomy: 60, balance: 60, growth: 55, stability: 55 }, personality: { openness: 75, conscientiousness: 65, extraversion: 85 }, env: { teamSize: "small", pace: "flexible" } },
    ];

    let updated = 0;
    let skipped = 0;

    for (const profile of profiles) {
      // Find matching career by title (case-insensitive)
      const allCareers = await ctx.db.query("careers").collect();
      const match = allCareers.find(
        (c) => c.title.toLowerCase() === profile.title.toLowerCase()
      );

      if (!match) {
        skipped++;
        continue;
      }

      // Only patch fields not already set (non-destructive)
      const patch: Record<string, unknown> = {};
      if (!match.interestProfile) {
        patch.interestProfile = profile.riasec;
      }
      if (!match.valueProfile) {
        patch.valueProfile = profile.values;
      }
      if (!match.personalityProfile) {
        patch.personalityProfile = profile.personality;
      }
      if (!match.workEnvironment) {
        patch.workEnvironment = { teamSize: profile.env.teamSize, pace: profile.env.pace };
      }

      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(match._id, patch);
        updated++;
      } else {
        skipped++;
      }
    }

    return { status: "done", updated, skipped };
  },
});

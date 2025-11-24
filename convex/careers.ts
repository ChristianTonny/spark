import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

// Get all careers
export const list = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers;
  },
});

// Get career count
export const count = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers.length;
  },
});

// Get featured careers (first 6)
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").take(6);
    return careers;
  },
});

// Get unique categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    const categories = [...new Set(careers.map(c => c.category))];
    return categories;
  },
});

// Get career by ID
export const getById = query({
  args: { id: v.id("careers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get multiple careers by IDs (for comparison tool)
export const getByIds = query({
  args: { ids: v.array(v.id("careers")) },
  handler: async (ctx, args) => {
    const careers = await Promise.all(
      args.ids.map(id => ctx.db.get(id))
    );
    // Filter out any null results
    return careers.filter(c => c !== null);
  },
});

// Search and filter careers
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
    category: v.optional(v.string()),
    salaryFilter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let careers = await ctx.db.query("careers").collect();

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      careers = careers.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.shortDescription.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (args.category && args.category !== 'All') {
      careers = careers.filter(c => c.category === args.category);
    }

    // Filter by salary range
    if (args.salaryFilter && args.salaryFilter !== 'all') {
      if (args.salaryFilter === 'low') {
        careers = careers.filter(c => c.salaryMax <= 5000000);
      } else if (args.salaryFilter === 'mid') {
        careers = careers.filter(c => c.salaryMin > 5000000 && c.salaryMax <= 10000000);
      } else if (args.salaryFilter === 'high') {
        careers = careers.filter(c => c.salaryMin > 10000000);
      }
    }

    return careers;
  },
});

// Add or update reality quiz for a career
export const addQuizToCareer = mutation({
  args: {
    careerTitle: v.string(),
    quiz: v.any(),
  },
  handler: async (ctx, args) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), args.careerTitle))
      .first();

    if (!career) {
      throw new Error(`Career not found: ${args.careerTitle}`);
    }

    await ctx.db.patch(career._id, {
      realityQuiz: args.quiz,
    });

    return { success: true, careerId: career._id };
  },
});

// Get careers that have reality quizzes
export const getWithQuizzes = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers.filter(c => c.realityQuiz !== undefined);
  },
});

// Get career with associated schools (enriched with cost analysis)
export const getByIdWithSchools = query({
  args: { id: v.id("careers") },
  handler: async (ctx, args) => {
    const career = await ctx.db.get(args.id);
    if (!career || !career.costAnalysis) return career;
    
    // Fetch schools for each stage in breakdown
    const enrichedBreakdown = await Promise.all(
      career.costAnalysis.breakdown.map(async (stage) => {
        const schools = await Promise.all(
          stage.schoolIds.map(async (id) => {
            const school = await ctx.db.get(id);
            return school;
          })
        );
        
        return {
          ...stage,
          schools: schools.filter(s => s !== null),
        };
      })
    );
    
    return { 
      ...career, 
      costAnalysis: { 
        ...career.costAnalysis, 
        breakdown: enrichedBreakdown 
      } 
    };
  },
});

// Get multiple careers with schools (for comparison)
export const getByIdsWithSchools = query({
  args: { ids: v.array(v.id("careers")) },
  handler: async (ctx, args) => {
    const careersWithSchools = await Promise.all(
      args.ids.map(async (id) => {
        const career = await ctx.db.get(id);
        if (!career || !career.costAnalysis) return career;
        
        // Fetch schools for each stage in breakdown
        const enrichedBreakdown = await Promise.all(
          career.costAnalysis.breakdown.map(async (stage) => {
            const schools = await Promise.all(
              stage.schoolIds.map(async (schoolId) => {
                const school = await ctx.db.get(schoolId);
                return school;
              })
            );
            
            return {
              ...stage,
              schools: schools.filter(s => s !== null),
            };
          })
        );
        
        return { 
          ...career, 
          costAnalysis: { 
            ...career.costAnalysis, 
            breakdown: enrichedBreakdown 
          } 
        };
      })
    );
    
    return careersWithSchools.filter(c => c !== null);
  },
});

// Get aggregated schools for multiple careers (useful for assessment results)
export const getSchoolsForCareers = query({
  args: { careerIds: v.array(v.id("careers")) },
  handler: async (ctx, args) => {
    const allSchoolIds = new Set<string>();
    
    // Collect all unique school IDs from all careers
    for (const careerId of args.careerIds) {
      const career = await ctx.db.get(careerId);
      if (career?.costAnalysis) {
        for (const stage of career.costAnalysis.breakdown) {
          for (const schoolId of stage.schoolIds) {
            allSchoolIds.add(schoolId as any);
          }
        }
      }
    }
    
    // Fetch all unique schools
    const schools = await Promise.all(
      Array.from(allSchoolIds).map(async (id) => {
        const school = await ctx.db.get(id as Id<"schools">);
        // Type guard to ensure we're only returning school documents
        if (school && 'name' in school && 'type' in school && 'partnershipTier' in school) {
          return school;
        }
        return null;
      })
    );

    // Sort by tier: featured > partner > listed
    const validSchools = schools.filter((s): s is NonNullable<typeof s> => s !== null && 'isActive' in s && s.isActive);
    return validSchools.sort((a, b) => {
      const tierOrder = { featured: 0, partner: 1, listed: 2 };
      const aTier = tierOrder[a.partnershipTier];
      const bTier = tierOrder[b.partnershipTier];

      if (aTier !== bTier) return aTier - bTier;
      return b.clickCount - a.clickCount;
    });
  },
});
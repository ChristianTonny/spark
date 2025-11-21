import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get schools for a specific career
export const getByCareer = query({
  args: { careerId: v.id("careers") },
  handler: async (ctx, args) => {
    const schools = await ctx.db.query("schools")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Filter schools that have programs leading to this career
    const relevantSchools = schools.filter(school =>
      school.programsOffered.some(program =>
        program.careerIds.includes(args.careerId)
      )
    );

    // Sort by: featured first, then partners, then listed
    return relevantSchools.sort((a, b) => {
      const tierOrder = { featured: 0, partner: 1, listed: 2 };
      const aTier = tierOrder[a.partnershipTier];
      const bTier = tierOrder[b.partnershipTier];
      
      if (aTier !== bTier) return aTier - bTier;
      
      // Within same tier, sort by click count (popularity)
      return b.clickCount - a.clickCount;
    });
  },
});

// Get schools by multiple career IDs
export const getByCareerIds = query({
  args: { careerIds: v.array(v.id("careers")) },
  handler: async (ctx, args) => {
    const schools = await ctx.db.query("schools")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Filter schools that have programs leading to any of these careers
    const relevantSchools = schools.filter(school =>
      school.programsOffered.some(program =>
        program.careerIds.some(careerId => args.careerIds.includes(careerId))
      )
    );

    // Sort by: featured first, then partners, then listed
    return relevantSchools.sort((a, b) => {
      const tierOrder = { featured: 0, partner: 1, listed: 2 };
      const aTier = tierOrder[a.partnershipTier];
      const bTier = tierOrder[b.partnershipTier];
      
      if (aTier !== bTier) return aTier - bTier;
      
      // Within same tier, sort by click count (popularity)
      return b.clickCount - a.clickCount;
    });
  },
});

// Get all schools (for admin/general listing)
export const list = query({
  args: { 
    type: v.optional(v.string()),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let schools = await ctx.db.query("schools").collect();

    // Filter by type if provided
    if (args.type) {
      schools = schools.filter(s => s.type === args.type);
    }

    // Filter by active status
    if (args.activeOnly !== false) {
      schools = schools.filter(s => s.isActive);
    }

    // Sort by tier and popularity
    return schools.sort((a, b) => {
      const tierOrder = { featured: 0, partner: 1, listed: 2 };
      const aTier = tierOrder[a.partnershipTier];
      const bTier = tierOrder[b.partnershipTier];
      
      if (aTier !== bTier) return aTier - bTier;
      return b.clickCount - a.clickCount;
    });
  },
});

// Get school by ID
export const getById = query({
  args: { id: v.id("schools") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get schools by IDs
export const getByIds = query({
  args: { ids: v.array(v.id("schools")) },
  handler: async (ctx, args) => {
    const schools = await Promise.all(
      args.ids.map(id => ctx.db.get(id))
    );
    return schools.filter(s => s !== null);
  },
});

// Get featured schools only
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const schools = await ctx.db.query("schools")
      .filter((q) => 
        q.and(
          q.eq(q.field("isActive"), true),
          q.eq(q.field("featured"), true)
        )
      )
      .collect();

    return schools.sort((a, b) => b.clickCount - a.clickCount);
  },
});

// Track school click (for analytics)
export const trackClick = mutation({
  args: { schoolId: v.id("schools") },
  handler: async (ctx, args) => {
    const school = await ctx.db.get(args.schoolId);
    if (!school) {
      throw new Error("School not found");
    }

    await ctx.db.patch(args.schoolId, {
      clickCount: school.clickCount + 1,
    });

    return { success: true };
  },
});

// Track inquiry (when student clicks "Learn More" or contacts)
export const trackInquiry = mutation({
  args: { schoolId: v.id("schools") },
  handler: async (ctx, args) => {
    const school = await ctx.db.get(args.schoolId);
    if (!school) {
      throw new Error("School not found");
    }

    await ctx.db.patch(args.schoolId, {
      inquiryCount: school.inquiryCount + 1,
    });

    return { success: true };
  },
});

// Create new school (admin only)
export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    location: v.object({
      city: v.string(),
      district: v.string(),
    }),
    website: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    programsOffered: v.array(v.object({
      name: v.string(),
      duration: v.string(),
      tuitionPerYear: v.number(),
      careerIds: v.array(v.id("careers")),
    })),
    partnershipTier: v.string(),
    description: v.string(),
    logo: v.optional(v.string()),
    accreditation: v.optional(v.string()),
    establishedYear: v.optional(v.number()),
    studentCount: v.optional(v.number()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const schoolId = await ctx.db.insert("schools", {
      name: args.name,
      type: args.type as any,
      location: args.location,
      website: args.website,
      contactEmail: args.contactEmail,
      contactPhone: args.contactPhone,
      programsOffered: args.programsOffered,
      partnershipTier: args.partnershipTier as any,
      partnerSince: args.partnershipTier !== "listed" ? now : undefined,
      description: args.description,
      logo: args.logo,
      accreditation: args.accreditation,
      establishedYear: args.establishedYear,
      studentCount: args.studentCount,
      clickCount: 0,
      inquiryCount: 0,
      isActive: true,
      featured: args.featured,
      createdAt: now,
      updatedAt: now,
    });

    return { schoolId };
  },
});

// Update school (admin only)
export const update = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.optional(v.string()),
    type: v.optional(v.string()),
    location: v.optional(v.object({
      city: v.string(),
      district: v.string(),
    })),
    website: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    programsOffered: v.optional(v.array(v.object({
      name: v.string(),
      duration: v.string(),
      tuitionPerYear: v.number(),
      careerIds: v.array(v.id("careers")),
    }))),
    partnershipTier: v.optional(v.string()),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    accreditation: v.optional(v.string()),
    establishedYear: v.optional(v.number()),
    studentCount: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { schoolId, ...updates } = args;
    
    const school = await ctx.db.get(schoolId);
    if (!school) {
      throw new Error("School not found");
    }

    const updateData: any = {
      ...updates,
      updatedAt: Date.now(),
    };

    // Cast type if provided
    if (updates.type) {
      updateData.type = updates.type as any;
    }
    if (updates.partnershipTier) {
      updateData.partnershipTier = updates.partnershipTier as any;
    }

    await ctx.db.patch(schoolId, updateData);

    return { success: true };
  },
});

// Delete school (admin only)
export const remove = mutation({
  args: { schoolId: v.id("schools") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.schoolId);
    return { success: true };
  },
});

// Get school analytics
export const getAnalytics = query({
  args: { schoolId: v.optional(v.id("schools")) },
  handler: async (ctx, args) => {
    if (args.schoolId) {
      // Get analytics for specific school
      const school = await ctx.db.get(args.schoolId);
      if (!school) return null;

      return {
        schoolId: school._id,
        name: school.name,
        clicks: school.clickCount,
        inquiries: school.inquiryCount,
        conversionRate: school.clickCount > 0 
          ? ((school.inquiryCount / school.clickCount) * 100).toFixed(2)
          : "0",
      };
    }

    // Get overall analytics
    const schools = await ctx.db.query("schools").collect();
    
    const totalClicks = schools.reduce((sum, s) => sum + s.clickCount, 0);
    const totalInquiries = schools.reduce((sum, s) => sum + s.inquiryCount, 0);
    
    const topPerforming = schools
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 10)
      .map(s => ({
        schoolId: s._id,
        name: s.name,
        tier: s.partnershipTier,
        clicks: s.clickCount,
        inquiries: s.inquiryCount,
      }));

    return {
      totalSchools: schools.length,
      totalClicks,
      totalInquiries,
      overallConversionRate: totalClicks > 0 
        ? ((totalInquiries / totalClicks) * 100).toFixed(2)
        : "0",
      topPerforming,
    };
  },
});


/**
 * Add African Leadership University (ALU) as a top featured partner
 * Run this to add ALU to the schools database
 */

import { mutation } from "./_generated/server";

export const addALU = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Check if ALU already exists
    const existing = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "African Leadership University"))
      .first();

    if (existing) {
      console.log("ALU already exists");
      return { success: false, message: "ALU already exists" };
    }

    // Get career IDs for linking
    const careers = await ctx.db.query("careers").collect();
    const careerMap = new Map(careers.map(c => [c.title.toLowerCase(), c._id]));

    const softwareDevId = careerMap.get("software developer");
    const businessAnalystId = careerMap.get("business analyst");
    const dataScientistId = careerMap.get("data scientist");
    const marketingManagerId = careerMap.get("marketing manager");

    const aluData = {
      name: "African Leadership University",
      type: "university" as const,
      location: {
        city: "Kigali",
        district: "Gasabo",
      },
      website: "https://www.alueducation.com",
      contactEmail: "admissions@alueducation.com",
      contactPhone: "+250 788 123 456",
      programsOffered: [
        {
          name: "Bachelor of Science in Software Engineering",
          duration: "4 years",
          tuitionPerYear: 3000 * 1000, // $3,000 USD (~3M RWF, using simplified conversion)
          careerIds: [softwareDevId, dataScientistId].filter(Boolean) as any,
        },
        {
          name: "Bachelor of Business Administration",
          duration: "4 years",
          tuitionPerYear: 3000 * 1000,
          careerIds: [businessAnalystId, marketingManagerId].filter(Boolean) as any,
        },
        {
          name: "Bachelor of Arts in Entrepreneurial Leadership",
          duration: "4 years",
          tuitionPerYear: 3000 * 1000,
          careerIds: [businessAnalystId, marketingManagerId].filter(Boolean) as any,
        },
        {
          name: "Bachelor of Science in Global Challenges",
          duration: "4 years",
          tuitionPerYear: 3000 * 1000,
          careerIds: [],
        },
      ],
      partnershipTier: "featured" as const,
      partnerSince: now,
      description:
        "ALU is a pan-African university with a mission to develop 3 million ethical and entrepreneurial leaders for Africa by 2060. The Mastercard Foundation Scholars Program provides comprehensive scholarships covering tuition, room, board, and other expenses for qualified students.",
      logo: "https://placehold.co/200x200/FF6B35/FFFFFF?text=ALU",
      accreditation: "Higher Education Council (HEC) Rwanda",
      establishedYear: 2015,
      studentCount: 1500,
      scholarshipInfo: "Mastercard Foundation Scholars Program covers full tuition, room, board, and other expenses for qualified students. Apply for comprehensive financial support.",
      clickCount: 0,
      inquiryCount: 0,
      isActive: true,
      featured: true,
      createdAt: now,
      updatedAt: now,
    };

    const aluId = await ctx.db.insert("schools", aluData);

    console.log("Successfully added ALU as featured partner");

    return {
      success: true,
      message: "Added African Leadership University",
      schoolId: aluId,
    };
  },
});


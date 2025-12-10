/**
 * December 2025 Data Updates - Research-Based
 * This file PATCHES existing data (does not delete)
 * Run with: npx convex run updateVerifiedData2025:updateAllVerifiedData
 *
 * Research Sources:
 * - JobInRwanda.com job postings (Dec 2025)
 * - University websites and public information
 * - Rwanda market research reports
 * - Tech company salary surveys
 */

import { mutation } from "./_generated/server";

/**
 * Update University of Rwanda with realistic tuition data
 * Research shows UR has government-sponsored and self-pay options
 */
export const updateUniversityOfRwanda = mutation({
  args: {},
  handler: async (ctx) => {
    const ur = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "University of Rwanda"))
      .first();

    if (!ur) {
      return {
        success: false,
        message: "University of Rwanda not found in database",
      };
    }

    // Update programs with researched data
    // Most UR students are government-sponsored, but self-pay exists
    const updatedPrograms = ur.programsOffered.map((program) => {
      if (program.name.includes("Computer Science")) {
        return {
          ...program,
          tuitionPerYear: 1200000, // Self-pay estimate: 1.2M RWF/year
        };
      }
      if (program.name.includes("Civil Engineering")) {
        return {
          ...program,
          tuitionPerYear: 1300000, // Engineering programs slightly higher
        };
      }
      if (program.name.includes("Business Administration")) {
        return {
          ...program,
          tuitionPerYear: 1000000,
        };
      }
      if (program.name.includes("Education")) {
        return {
          ...program,
          tuitionPerYear: 800000, // Education programs typically lower
        };
      }
      if (program.name.includes("Nursing")) {
        return {
          ...program,
          tuitionPerYear: 1100000,
        };
      }
      return program;
    });

    await ctx.db.patch(ur._id, {
      programsOffered: updatedPrograms,
      scholarshipInfo:
        "Most students receive government scholarships through the student loan scheme. Government covers substantial portion of fees for eligible students. Self-sponsored students pay full tuition. Loan repayment begins after graduation and employment.",
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Updated UR tuition with realistic estimates",
      programsUpdated: updatedPrograms.length,
    };
  },
});

/**
 * Update Software Developer salary based on Rwanda tech market
 * Research from JobInRwanda, tech companies, and market reports
 */
export const updateSoftwareDeveloperSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Software Developer"))
      .first();

    if (!career) {
      return { success: false, message: "Software Developer not found" };
    }

    // Research: Rwanda tech salaries range from 4M (junior) to 25M+ (senior/lead)
    await ctx.db.patch(career._id, {
      salaryMin: 4000000, // Junior developers: 4-6M RWF
      salaryMax: 20000000, // Senior developers can reach 20M+

      salaryProgression: [
        {
          level: "Junior Developer",
          years: "0-2",
          range: "4M - 7M RWF/year",
        },
        {
          level: "Mid-level Developer",
          years: "2-5",
          range: "7M - 12M RWF/year",
        },
        {
          level: "Senior Developer",
          years: "5-8",
          range: "12M - 18M RWF/year",
        },
        {
          level: "Lead Developer / Architect",
          years: "8+",
          range: "18M - 25M+ RWF/year",
        },
      ],

      remoteWork: {
        friendly: true,
        percentage: 60,
        notes:
          "Many Rwandan tech companies offer hybrid or remote work. International remote positions can pay significantly more (USD rates).",
      },
    });

    return { success: true, message: "Updated Software Developer salary data" };
  },
});

/**
 * Update Data Scientist salary
 * Emerging field in Rwanda with limited but growing opportunities
 */
export const updateDataScientistSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Data Scientist"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 6000000,
      salaryMax: 20000000,

      salaryProgression: [
        {
          level: "Junior Data Analyst",
          years: "0-2",
          range: "6M - 9M RWF/year",
        },
        { level: "Data Scientist", years: "2-5", range: "9M - 15M RWF/year" },
        {
          level: "Senior Data Scientist",
          years: "5+",
          range: "15M - 20M+ RWF/year",
        },
      ],
    });

    return { success: true };
  },
});

/**
 * Update Registered Nurse salary
 * Based on public and private hospital scales
 */
export const updateNurseSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Registered Nurse"))
      .first();

    if (!career) return { success: false };

    // Public hospitals pay government scale, private hospitals pay more
    await ctx.db.patch(career._id, {
      salaryMin: 3000000, // Entry-level public sector
      salaryMax: 9000000, // Senior nurse private sector

      salaryProgression: [
        {
          level: "Staff Nurse (Public)",
          years: "0-3",
          range: "3M - 4.5M RWF/year",
        },
        {
          level: "Staff Nurse (Private)",
          years: "0-3",
          range: "4M - 6M RWF/year",
        },
        {
          level: "Senior Nurse",
          years: "3-7",
          range: "5M - 7.5M RWF/year",
        },
        {
          level: "Nurse Manager / Specialist",
          years: "7+",
          range: "7M - 9M RWF/year",
        },
      ],
    });

    return { success: true };
  },
});

/**
 * Update Teacher salary
 * Public vs private school significant difference
 */
export const updateTeacherSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Teacher"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 2500000, // Public primary teacher
      salaryMax: 8000000, // Senior public school teacher

      salaryProgression: [
        {
          level: "Primary Teacher (Public)",
          years: "0-5",
          range: "2.5M - 4M RWF/year",
        },
        {
          level: "Secondary Teacher (Public)",
          years: "0-5",
          range: "3.5M - 5.5M RWF/year",
        },
        {
          level: "Private School Teacher",
          years: "0-5",
          range: "4M - 7M RWF/year",
        },
        {
          level: "Senior Teacher / Head of Dept",
          years: "5-10",
          range: "6M - 8M RWF/year",
        },
      ],

      // Add note about international schools
      remoteWork: {
        friendly: false,
        percentage: 5,
        notes:
          "Teaching is primarily in-person. International schools (Green Hills, Kigali International, etc.) pay significantly more (10M-25M RWF/year) but are highly competitive.",
      },
    });

    return { success: true };
  },
});

/**
 * Update Accountant salary
 */
export const updateAccountantSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Accountant"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 3500000,
      salaryMax: 12000000,

      salaryProgression: [
        {
          level: "Junior Accountant",
          years: "0-2",
          range: "3.5M - 5M RWF/year",
        },
        { level: "Accountant", years: "2-5", range: "5M - 8M RWF/year" },
        {
          level: "Senior Accountant / CPA",
          years: "5-8",
          range: "8M - 10M RWF/year",
        },
        { level: "Finance Manager", years: "8+", range: "10M - 15M RWF/year" },
      ],
    });

    return { success: true };
  },
});

/**
 * Update Marketing Manager salary
 */
export const updateMarketingManagerSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Marketing Manager"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 4000000,
      salaryMax: 12000000,

      salaryProgression: [
        { level: "Marketing Officer", years: "0-2", range: "4M - 6M RWF/year" },
        { level: "Marketing Manager", years: "2-5", range: "6M - 9M RWF/year" },
        {
          level: "Senior Marketing Manager",
          years: "5+",
          range: "9M - 12M+ RWF/year",
        },
      ],
    });

    return { success: true };
  },
});

/**
 * Update Digital Marketer salary
 * Growing field in Rwanda
 */
export const updateDigitalMarketerSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Digital Marketer"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 3000000,
      salaryMax: 10000000,

      salaryProgression: [
        {
          level: "Junior Digital Marketer",
          years: "0-2",
          range: "3M - 5M RWF/year",
        },
        {
          level: "Digital Marketing Specialist",
          years: "2-5",
          range: "5M - 8M RWF/year",
        },
        {
          level: "Digital Marketing Manager",
          years: "5+",
          range: "8M - 10M+ RWF/year",
        },
      ],

      remoteWork: {
        friendly: true,
        percentage: 40,
        notes:
          "Many digital marketing roles offer remote or hybrid work options.",
      },
    });

    return { success: true };
  },
});

/**
 * Update Civil Engineer salary
 */
export const updateCivilEngineerSalary = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Civil Engineer"))
      .first();

    if (!career) return { success: false };

    await ctx.db.patch(career._id, {
      salaryMin: 5000000,
      salaryMax: 15000000,

      salaryProgression: [
        { level: "Graduate Engineer", years: "0-2", range: "5M - 7M RWF/year" },
        { level: "Civil Engineer", years: "2-5", range: "7M - 10M RWF/year" },
        {
          level: "Senior Civil Engineer",
          years: "5-10",
          range: "10M - 13M RWF/year",
        },
        {
          level: "Project Manager / Principal Engineer",
          years: "10+",
          range: "13M - 18M RWF/year",
        },
      ],
    });

    return { success: true };
  },
});

/**
 * Update IPRC Kigali with current estimates
 */
export const updateIPRCKigali = mutation({
  args: {},
  handler: async (ctx) => {
    const iprc = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), "IPRC Kigali"))
      .first();

    if (!iprc) return { success: false, message: "IPRC Kigali not found" };

    const updatedPrograms = iprc.programsOffered.map((program) => {
      if (program.name.includes("Information Technology")) {
        return { ...program, tuitionPerYear: 450000 };
      }
      if (program.name.includes("Civil Engineering")) {
        return { ...program, tuitionPerYear: 400000 };
      }
      if (program.name.includes("Electrical")) {
        return { ...program, tuitionPerYear: 350000 };
      }
      if (program.name.includes("Hospitality")) {
        return { ...program, tuitionPerYear: 400000 };
      }
      return program;
    });

    await ctx.db.patch(iprc._id, {
      programsOffered: updatedPrograms,
      scholarshipInfo:
        "Part of Rwanda Polytechnic network. Government scholarships available. More affordable than university degrees.",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Update AUCA tuition (private university - higher fees)
 */
export const updateAUCA = mutation({
  args: {},
  handler: async (ctx) => {
    const auca = await ctx.db
      .query("schools")
      .filter((q) =>
        q.eq(q.field("name"), "Adventist University of Central Africa")
      )
      .first();

    if (!auca) return { success: false };

    const updatedPrograms = auca.programsOffered.map((program) => {
      if (program.name.includes("Business")) {
        return { ...program, tuitionPerYear: 2500000 };
      }
      if (program.name.includes("Education")) {
        return { ...program, tuitionPerYear: 2200000 };
      }
      if (program.name.includes("Public Health")) {
        return { ...program, tuitionPerYear: 2800000 };
      }
      if (program.name.includes("Theology")) {
        return { ...program, tuitionPerYear: 2000000 };
      }
      return program;
    });

    await ctx.db.patch(auca._id, {
      programsOffered: updatedPrograms,
      scholarshipInfo:
        "Private Christian university. Some merit-based scholarships available. Payment plans offered.",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Master update function - runs all updates safely
 * This PATCHES existing data, does not delete anything
 */
export const updateAllVerifiedData = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    // Update schools
    try {
      const urResult = await ctx.runMutation(
        api.updateVerifiedData2025.updateUniversityOfRwanda
      );
      results.push({ task: "University of Rwanda", ...urResult });
    } catch (error) {
      results.push({
        task: "University of Rwanda",
        success: false,
        error: String(error),
      });
    }

    try {
      const iprcResult = await ctx.runMutation(
        api.updateVerifiedData2025.updateIPRCKigali
      );
      results.push({ task: "IPRC Kigali", ...iprcResult });
    } catch (error) {
      results.push({
        task: "IPRC Kigali",
        success: false,
        error: String(error),
      });
    }

    try {
      const aucaResult = await ctx.runMutation(
        api.updateVerifiedData2025.updateAUCA
      );
      results.push({ task: "AUCA", ...aucaResult });
    } catch (error) {
      results.push({ task: "AUCA", success: false, error: String(error) });
    }

    // Update careers
    const careerUpdates = [
      {
        name: "Software Developer",
        fn: api.updateVerifiedData2025.updateSoftwareDeveloperSalary,
      },
      {
        name: "Data Scientist",
        fn: api.updateVerifiedData2025.updateDataScientistSalary,
      },
      {
        name: "Registered Nurse",
        fn: api.updateVerifiedData2025.updateNurseSalary,
      },
      { name: "Teacher", fn: api.updateVerifiedData2025.updateTeacherSalary },
      {
        name: "Accountant",
        fn: api.updateVerifiedData2025.updateAccountantSalary,
      },
      {
        name: "Marketing Manager",
        fn: api.updateVerifiedData2025.updateMarketingManagerSalary,
      },
      {
        name: "Digital Marketer",
        fn: api.updateVerifiedData2025.updateDigitalMarketerSalary,
      },
      {
        name: "Civil Engineer",
        fn: api.updateVerifiedData2025.updateCivilEngineerSalary,
      },
    ];

    for (const update of careerUpdates) {
      try {
        const result = await ctx.runMutation(update.fn);
        results.push({ task: update.name, ...result });
      } catch (error) {
        results.push({
          task: update.name,
          success: false,
          error: String(error),
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    return {
      success: true,
      message: `Data update complete: ${successCount} successful, ${failureCount} failed`,
      totalUpdates: results.length,
      results,
    };
  },
});

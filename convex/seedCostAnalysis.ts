/**
 * Seed cost analysis data for top 10 careers
 * Based on RWANDA_EDUCATION_COSTS.md research
 * Run this AFTER schools are seeded
 */

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addCostAnalysisToCareers = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Get schools for linking
    const schools = await ctx.db.query("schools").collect();
    const urId = schools.find(s => s.name === "University of Rwanda")?._id;
    const iprckigaliId = schools.find(s => s.name === "IPRC Kigali")?._id;
    const aucaId = schools.find(s => s.name === "Adventist University of Central Africa")?._id;
    const uokId = schools.find(s => s.name === "University of Kigali")?._id;
    const tctId = schools.find(s => s.name === "Tumba College of Technology")?._id;

    // Career cost data based on research
    const careerCostData = [
      {
        title: "Software Developer",
        costAnalysis: {
          totalCostMin: 5800000,   // 5.8M RWF
          totalCostMax: 13100000,  // 13.1M RWF
          breakdown: [
            {
              stage: "High School (O-Level & A-Level)",
              duration: "6 years",
              costMin: 300000,    // Public school
              costMax: 1500000,   // Private school
              description: "Complete secondary education with focus on Science/Math combinations for university entry",
              schoolIds: [],  // General high schools
            },
            {
              stage: "University - Computer Science Degree",
              duration: "4 years",
              costMin: 2400000,   // UR public rate
              costMax: 6400000,   // Private university
              description: "Bachelor's degree in Computer Science, Software Engineering, or IT from accredited university",
              schoolIds: [urId, uokId, tctId].filter(Boolean) as any,
            },
            {
              stage: "Professional Certifications",
              duration: "6-12 months",
              costMin: 800000,
              costMax: 2000000,
              description: "AWS, Azure, or other cloud certifications plus specialized training",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 500000,
              max: 1500000,
              description: "Laptop, software licenses, development tools, online learning platforms",
            },
            living: {
              min: 1800000,
              max: 3700000,
              description: "4 years of accommodation, food, and transport during university",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Government scholarships available for top performers. Many tech companies offer internship programs with stipends.",
          lastUpdated: now,
        },
      },
      {
        title: "Teacher",
        costAnalysis: {
          totalCostMin: 3800000,
          totalCostMax: 8700000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education - any combination acceptable for education programs",
              schoolIds: [],
            },
            {
              stage: "University - Education Degree",
              duration: "3 years",
              costMin: 1200000,   // UR Education program
              costMax: 2700000,   // Private university
              description: "Bachelor of Education (B.Ed) or Bachelor of Arts in Education",
              schoolIds: [urId, aucaId].filter(Boolean) as any,
            },
            {
              stage: "Teacher Training & Certification",
              duration: "6 months",
              costMin: 300000,
              costMax: 600000,
              description: "Professional teacher training certificate and licensing",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 400000,
              max: 800000,
              description: "Books, educational materials, teaching resources",
            },
            living: {
              min: 1600000,
              max: 3100000,
              description: "3 years of living expenses during university training",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "REB offers teacher training scholarships. Many schools sponsor promising candidates.",
          lastUpdated: now,
        },
      },
      {
        title: "Nurse",
        costAnalysis: {
          totalCostMin: 4900000,
          totalCostMax: 11200000,
          breakdown: [
            {
              stage: "High School (Science Focus)",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education with Biology, Chemistry, and Physics required",
              schoolIds: [],
            },
            {
              stage: "Nursing School - Bachelor's Degree",
              duration: "4 years",
              costMin: 2400000,   // UR Nursing
              costMax: 5200000,   // Private institution
              description: "Bachelor of Science in Nursing (BSN) from accredited institution",
              schoolIds: [urId, aucaId].filter(Boolean) as any,
            },
            {
              stage: "Nursing License & Registration",
              duration: "3 months",
              costMin: 50000,
              costMax: 100000,
              description: "Professional licensing exam and registration with nursing council",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 350000,
              max: 700000,
              description: "Medical equipment (stethoscope, etc.), uniforms, medical textbooks",
            },
            living: {
              min: 1800000,
              max: 3700000,
              description: "4 years of accommodation, food, and transportation",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Health sector scholarships available. Hospitals often sponsor nursing students.",
          lastUpdated: now,
        },
      },
      {
        title: "Business Analyst",
        costAnalysis: {
          totalCostMin: 4800000,
          totalCostMax: 10700000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education - Economics or Math combinations recommended",
              schoolIds: [],
            },
            {
              stage: "University - Business/Economics Degree",
              duration: "4 years",
              costMin: 2000000,   // UR Business
              costMax: 5600000,   // Private university
              description: "Bachelor in Business Administration, Economics, or related field",
              schoolIds: [urId, aucaId, uokId].filter(Boolean) as any,
            },
            {
              stage: "Professional Certifications",
              duration: "6-12 months",
              costMin: 600000,
              costMax: 1200000,
              description: "Business analysis certifications, data analytics training",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 500000,
              max: 1000000,
              description: "Laptop, business software, professional books and resources",
            },
            living: {
              min: 1400000,
              max: 1400000,
              description: "4 years of student living expenses",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Business school scholarships available based on merit and need.",
          lastUpdated: now,
        },
      },
      {
        title: "Accountant",
        costAnalysis: {
          totalCostMin: 5200000,
          totalCostMax: 12500000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education with Math and Economics recommended",
              schoolIds: [],
            },
            {
              stage: "University - Accounting Degree",
              duration: "4 years",
              costMin: 2000000,
              costMax: 5600000,
              description: "Bachelor of Accounting, Finance, or Business with Accounting focus",
              schoolIds: [urId, uokId].filter(Boolean) as any,
            },
            {
              stage: "Professional Certification (CPA/ACCA)",
              duration: "2-3 years",
              costMin: 1500000,
              costMax: 3000000,
              description: "CPA Rwanda or ACCA certification for professional practice",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 400000,
              max: 900000,
              description: "Accounting software, textbooks, exam preparation materials",
            },
            living: {
              min: 1000000,
              max: 1500000,
              description: "Living costs during university and certification period",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Professional accounting bodies offer study loans and scholarships.",
          lastUpdated: now,
        },
      },
      {
        title: "Civil Engineer",
        costAnalysis: {
          totalCostMin: 5300000,
          totalCostMax: 11800000,
          breakdown: [
            {
              stage: "High School (Science Focus)",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Physics, Chemistry, and Mathematics required for engineering",
              schoolIds: [],
            },
            {
              stage: "University/Technical College - Engineering",
              duration: "4 years",
              costMin: 2800000,   // UR Engineering or IPRC
              costMax: 6000000,   // Private university
              description: "Bachelor's in Civil Engineering or Advanced Diploma from technical college",
              schoolIds: [urId, iprckigaliId].filter(Boolean) as any,
            },
            {
              stage: "Professional Engineering License",
              duration: "6 months",
              costMin: 200000,
              costMax: 400000,
              description: "Engineering registration and professional licensing",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 600000,
              max: 1200000,
              description: "Engineering tools, CAD software, site visit gear, reference materials",
            },
            living: {
              min: 1400000,
              max: 2700000,
              description: "4 years of accommodation and living expenses",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Engineering scholarships available. Some construction firms sponsor students.",
          lastUpdated: now,
        },
      },
      {
        title: "Graphic Designer",
        costAnalysis: {
          totalCostMin: 3800000,
          totalCostMax: 9500000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education - Art or general studies acceptable",
              schoolIds: [],
            },
            {
              stage: "Design Training/University",
              duration: "2-4 years",
              costMin: 800000,    // Bootcamp/technical training
              costMax: 4000000,   // University degree
              description: "Graphic Design diploma, degree, or professional training program",
              schoolIds: [iprckigaliId].filter(Boolean) as any,
            },
            {
              stage: "Portfolio Development & Freelance Setup",
              duration: "6-12 months",
              costMin: 400000,
              costMax: 1000000,
              description: "Building professional portfolio, online presence, freelance tools",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 1500000,
              max: 3000000,
              description: "Professional laptop, Adobe Creative Cloud, design tools, drawing tablet",
            },
            living: {
              min: 800000,
              max: 1000000,
              description: "2-3 years of basic living expenses during training",
            },
          },
          financialAidAvailable: false,
          scholarshipInfo: "Limited scholarships. Many designers learn through online platforms and bootcamps.",
          lastUpdated: now,
        },
      },
      {
        title: "Marketing Manager",
        costAnalysis: {
          totalCostMin: 4600000,
          totalCostMax: 10300000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education - any combination acceptable",
              schoolIds: [],
            },
            {
              stage: "University - Marketing/Business Degree",
              duration: "4 years",
              costMin: 2000000,
              costMax: 5600000,
              description: "Bachelor in Marketing, Business Administration, or Communications",
              schoolIds: [urId, aucaId, uokId].filter(Boolean) as any,
            },
            {
              stage: "Digital Marketing Certifications",
              duration: "3-6 months",
              costMin: 300000,
              costMax: 600000,
              description: "Google Ads, Facebook Blueprint, digital marketing certifications",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 600000,
              max: 1200000,
              description: "Laptop, marketing software, online course subscriptions",
            },
            living: {
              min: 1400000,
              max: 1400000,
              description: "4 years of university living expenses",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Business school scholarships available. Some agencies sponsor promising marketers.",
          lastUpdated: now,
        },
      },
      {
        title: "Data Scientist",
        costAnalysis: {
          totalCostMin: 6200000,
          totalCostMax: 14500000,
          breakdown: [
            {
              stage: "High School (Math & Science)",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Strong foundation in Mathematics and Sciences",
              schoolIds: [],
            },
            {
              stage: "University - Math/CS/Statistics Degree",
              duration: "4 years",
              costMin: 2400000,
              costMax: 6400000,
              description: "Bachelor's in Mathematics, Computer Science, Statistics, or related field",
              schoolIds: [urId, uokId].filter(Boolean) as any,
            },
            {
              stage: "Data Science Certifications & Masters (Optional)",
              duration: "1-2 years",
              costMin: 1500000,
              costMax: 3000000,
              description: "Specialized data science training, bootcamps, or master's degree",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 1000000,
              max: 2000000,
              description: "High-performance laptop, cloud computing credits, course subscriptions",
            },
            living: {
              min: 1000000,
              max: 1600000,
              description: "Living expenses during extended education period",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "STEM scholarships available. Tech companies often sponsor data science training.",
          lastUpdated: now,
        },
      },
      {
        title: "Lawyer",
        costAnalysis: {
          totalCostMin: 5700000,
          totalCostMax: 13200000,
          breakdown: [
            {
              stage: "High School",
              duration: "6 years",
              costMin: 300000,
              costMax: 1500000,
              description: "Secondary education - Languages and Social Studies recommended",
              schoolIds: [],
            },
            {
              stage: "University - Law Degree (LLB)",
              duration: "4 years",
              costMin: 2400000,   // UR Law
              costMax: 6000000,   // Private university
              description: "Bachelor of Laws (LLB) from accredited law school",
              schoolIds: [urId, uokId].filter(Boolean) as any,
            },
            {
              stage: "Bar Exam & Legal Practice Course",
              duration: "1 year",
              costMin: 700000,
              costMax: 1400000,
              description: "Rwanda Bar examination preparation and legal practice training",
              schoolIds: [],
            },
          ],
          additionalCosts: {
            materials: {
              min: 800000,
              max: 1500000,
              description: "Law books, legal research databases, professional attire",
            },
            living: {
              min: 1500000,
              max: 2800000,
              description: "5 years of living expenses during education and training",
            },
          },
          financialAidAvailable: true,
          scholarshipInfo: "Law school scholarships available. Some law firms sponsor promising students.",
          lastUpdated: now,
        },
      },
    ];

    const updates = [];
    let notFound = [];

    // Update each career with cost analysis
    for (const careerData of careerCostData) {
      const career = await ctx.db
        .query("careers")
        .filter((q) => q.eq(q.field("title"), careerData.title))
        .first();

      if (career) {
        await ctx.db.patch(career._id, {
          costAnalysis: careerData.costAnalysis as any,
        });
        updates.push(careerData.title);
      } else {
        notFound.push(careerData.title);
      }
    }

    return {
      success: true,
      message: `Added cost analysis to ${updates.length} careers`,
      updatedCareers: updates,
      notFound: notFound.length > 0 ? notFound : undefined,
    };
  },
});


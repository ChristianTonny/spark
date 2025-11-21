/**
 * Add cost analysis to ALL careers in the database
 * This fills in any careers missing cost data
 */

import { mutation } from "./_generated/server";

export const addCostToAllCareers = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Get all careers
    const allCareers = await ctx.db.query("careers").collect();
    
    // Get schools for linking
    const schools = await ctx.db.query("schools").collect();
    const urId = schools.find(s => s.name === "University of Rwanda")?._id;
    const iprckigaliId = schools.find(s => s.name === "IPRC Kigali")?._id;
    const aucaId = schools.find(s => s.name === "Adventist University of Central Africa")?._id;
    const uokId = schools.find(s => s.name === "University of Kigali")?._id;
    const tctId = schools.find(s => s.name === "Tumba College of Technology")?._id;
    const aluId = schools.find(s => s.name.includes("African Leadership"))?._id;

    // Cost templates by category
    const costTemplates: Record<string, any> = {
      "Registered Nurse": {
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
            costMin: 2400000,
            costMax: 5200000,
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
          materials: { min: 350000, max: 700000, description: "Medical equipment, uniforms, medical textbooks" },
          living: { min: 1800000, max: 3700000, description: "4 years of accommodation, food, and transportation" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Health sector scholarships available. Hospitals often sponsor nursing students.",
        lastUpdated: now,
      },
      
      "Secondary School Teacher": {
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
            costMin: 1200000,
            costMax: 2700000,
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
          materials: { min: 400000, max: 800000, description: "Books, educational materials, teaching resources" },
          living: { min: 1600000, max: 3100000, description: "3 years of living expenses during university training" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "REB offers teacher training scholarships. Many schools sponsor promising candidates.",
        lastUpdated: now,
      },

      "Medical Doctor": {
        totalCostMin: 12000000,
        totalCostMax: 28000000,
        breakdown: [
          {
            stage: "High School (Science)",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Strong performance in Biology, Chemistry, Physics required",
            schoolIds: [],
          },
          {
            stage: "Medical School",
            duration: "6 years",
            costMin: 8000000,
            costMax: 18000000,
            description: "Doctor of Medicine (MD) degree",
            schoolIds: [urId].filter(Boolean) as any,
          },
          {
            stage: "Internship & Residency",
            duration: "3-5 years",
            costMin: 1500000,
            costMax: 4000000,
            description: "Supervised clinical training",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 1000000, max: 2500000, description: "Medical equipment, textbooks, licensing exams" },
          living: { min: 1200000, max: 2000000, description: "Living expenses during extended training" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Medical scholarships available. Government sponsorship for top students.",
        lastUpdated: now,
      },

      "Architect": {
        totalCostMin: 5500000,
        totalCostMax: 12000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Focus on Mathematics, Physics, and Art",
            schoolIds: [],
          },
          {
            stage: "Architecture Degree",
            duration: "5 years",
            costMin: 2500000,
            costMax: 7000000,
            description: "Bachelor of Architecture",
            schoolIds: [urId, uokId].filter(Boolean) as any,
          },
          {
            stage: "Professional Licensing",
            duration: "1 year",
            costMin: 500000,
            costMax: 1000000,
            description: "Architecture registration and certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 1200000, max: 2500000, description: "Design software, drawing tools, portfolio materials" },
          living: { min: 1000000, max: 0, description: "Living expenses during studies" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Some architectural firms sponsor students.",
        lastUpdated: now,
      },

      "Financial Analyst": {
        totalCostMin: 4800000,
        totalCostMax: 11500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Strong Mathematics and Economics background",
            schoolIds: [],
          },
          {
            stage: "University - Finance/Economics",
            duration: "4 years",
            costMin: 2000000,
            costMax: 6000000,
            description: "Bachelor in Finance, Economics, or Business",
            schoolIds: [urId, aucaId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Professional Certifications",
            duration: "1-2 years",
            costMin: 800000,
            costMax: 2000000,
            description: "CFA or financial analysis certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 500000, max: 1000000, description: "Financial software, exam materials, books" },
          living: { min: 1200000, max: 1000000, description: "Living expenses during education" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Business school scholarships available.",
        lastUpdated: now,
      },

      "Agricultural Officer": {
        totalCostMin: 4200000,
        totalCostMax: 9800000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Science background preferred",
            schoolIds: [],
          },
          {
            stage: "Agriculture Degree",
            duration: "4 years",
            costMin: 2000000,
            costMax: 5000000,
            description: "Bachelor in Agriculture or Agronomy",
            schoolIds: [urId].filter(Boolean) as any,
          },
          {
            stage: "Field Training",
            duration: "6 months",
            costMin: 200000,
            costMax: 500000,
            description: "Practical agricultural training",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 500000, max: 1200000, description: "Field equipment, protective gear, transportation" },
          living: { min: 1200000, max: 1600000, description: "Accommodation during studies" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Agriculture sector scholarships available from government and NGOs.",
        lastUpdated: now,
      },

      "Tourism & Hospitality Manager": {
        totalCostMin: 4000000,
        totalCostMax: 9500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination acceptable",
            schoolIds: [],
          },
          {
            stage: "Hospitality Management Degree",
            duration: "3-4 years",
            costMin: 1800000,
            costMax: 5000000,
            description: "Bachelor in Tourism/Hospitality Management",
            schoolIds: [urId, iprckigaliId].filter(Boolean) as any,
          },
          {
            stage: "Industry Certifications",
            duration: "6 months",
            costMin: 300000,
            costMax: 700000,
            description: "Professional hospitality certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 400000, max: 900000, description: "Uniforms, training materials, software" },
          living: { min: 1200000, max: 1400000, description: "Living expenses" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Some hotels offer training sponsorships.",
        lastUpdated: now,
      },

      "Renewable Energy Technician": {
        totalCostMin: 3800000,
        totalCostMax: 8500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Physics and Mathematics focus",
            schoolIds: [],
          },
          {
            stage: "Technical Training",
            duration: "2-3 years",
            costMin: 1200000,
            costMax: 3500000,
            description: "Diploma in Renewable Energy/Electrical Engineering",
            schoolIds: [iprckigaliId, tctId].filter(Boolean) as any,
          },
          {
            stage: "Certifications",
            duration: "6 months",
            costMin: 400000,
            costMax: 800000,
            description: "Solar/wind energy certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 700000, max: 1500000, description: "Safety equipment, testing tools, technical gear" },
          living: { min: 1200000, max: 1200000, description: "Basic living expenses" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Green energy initiatives offer some scholarships.",
        lastUpdated: now,
      },

      "Mining Engineer": {
        totalCostMin: 5500000,
        totalCostMax: 12000000,
        breakdown: [
          {
            stage: "High School (Science)",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Strong Physics, Chemistry, Mathematics",
            schoolIds: [],
          },
          {
            stage: "Mining Engineering Degree",
            duration: "4 years",
            costMin: 2800000,
            costMax: 6500000,
            description: "Bachelor in Mining Engineering",
            schoolIds: [urId].filter(Boolean) as any,
          },
          {
            stage: "Professional Training",
            duration: "1 year",
            costMin: 600000,
            costMax: 1500000,
            description: "Mining safety and operations certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 800000, max: 1500000, description: "Safety gear, field equipment, software" },
          living: { min: 1000000, max: 1000000, description: "Accommodation" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Mining companies sponsor engineering students.",
        lastUpdated: now,
      },

      "Mobile Money Agent / Fintech Specialist": {
        totalCostMin: 2500000,
        totalCostMax: 7500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Basic education required",
            schoolIds: [],
          },
          {
            stage: "Business/IT Training",
            duration: "2-3 years",
            costMin: 800000,
            costMax: 3000000,
            description: "Diploma in Business/IT or Fintech certification",
            schoolIds: [iprckigaliId, tctId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Platform-Specific Training",
            duration: "3 months",
            costMin: 100000,
            costMax: 500000,
            description: "Mobile money systems training",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 500000, max: 1000000, description: "Smartphone, point-of-sale device, float capital" },
          living: { min: 800000, max: 1500000, description: "Basic living costs" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Some fintech companies provide agent training.",
        lastUpdated: now,
      },

      "Construction Manager": {
        totalCostMin: 5000000,
        totalCostMax: 11000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Mathematics and Physics preferred",
            schoolIds: [],
          },
          {
            stage: "Construction Management Degree",
            duration: "4 years",
            costMin: 2400000,
            costMax: 6000000,
            description: "Bachelor in Construction Management or Civil Engineering",
            schoolIds: [urId, iprckigaliId].filter(Boolean) as any,
          },
          {
            stage: "Project Management Certification",
            duration: "6 months",
            costMin: 500000,
            costMax: 1200000,
            description: "PMP or construction management certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 600000, max: 1300000, description: "Safety gear, project management software, tools" },
          living: { min: 1200000, max: 1000000, description: "Living expenses" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Construction firms sometimes sponsor students.",
        lastUpdated: now,
      },

      "Environmental Scientist": {
        totalCostMin: 5200000,
        totalCostMax: 11500000,
        breakdown: [
          {
            stage: "High School (Science)",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Biology, Chemistry, Geography focus",
            schoolIds: [],
          },
          {
            stage: "Environmental Science Degree",
            duration: "4 years",
            costMin: 2400000,
            costMax: 6000000,
            description: "Bachelor in Environmental Science",
            schoolIds: [urId].filter(Boolean) as any,
          },
          {
            stage: "Specialized Training",
            duration: "1 year",
            costMin: 700000,
            costMax: 1500000,
            description: "Environmental impact assessment certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 800000, max: 1500000, description: "Field equipment, testing kits, software" },
          living: { min: 1000000, max: 1000000, description: "Accommodation" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Environmental NGOs offer scholarships.",
        lastUpdated: now,
      },

      "Logistics Coordinator": {
        totalCostMin: 4000000,
        totalCostMax: 9000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination",
            schoolIds: [],
          },
          {
            stage: "Logistics/Supply Chain Degree",
            duration: "3-4 years",
            costMin: 1800000,
            costMax: 5000000,
            description: "Bachelor in Logistics, Supply Chain, or Business",
            schoolIds: [urId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Professional Certifications",
            duration: "6 months",
            costMin: 400000,
            costMax: 800000,
            description: "Supply chain management certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 500000, max: 900000, description: "Software, training materials" },
          living: { min: 1000000, max: 800000, description: "Living costs" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Limited scholarships available.",
        lastUpdated: now,
      },

      "Digital Marketer": {
        totalCostMin: 3500000,
        totalCostMax: 8500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination",
            schoolIds: [],
          },
          {
            stage: "Marketing/Communications Degree",
            duration: "3-4 years",
            costMin: 1500000,
            costMax: 4500000,
            description: "Bachelor in Marketing, Communications, or Business",
            schoolIds: [urId, aucaId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Digital Marketing Certifications",
            duration: "6 months",
            costMin: 400000,
            costMax: 1000000,
            description: "Google Ads, Facebook Blueprint, SEO certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 700000, max: 1500000, description: "Laptop, marketing tools, course subscriptions" },
          living: { min: 600000, max: 0, description: "Living expenses" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Many learn through online platforms and boot camps.",
        lastUpdated: now,
      },

      "Healthcare Administrator": {
        totalCostMin: 5000000,
        totalCostMax: 11000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Science or Business combinations",
            schoolIds: [],
          },
          {
            stage: "Healthcare Administration Degree",
            duration: "4 years",
            costMin: 2200000,
            costMax: 6000000,
            description: "Bachelor in Healthcare Administration or Public Health",
            schoolIds: [urId, aucaId].filter(Boolean) as any,
          },
          {
            stage: "Healthcare Management Certification",
            duration: "6 months",
            costMin: 500000,
            costMax: 1200000,
            description: "Healthcare management professional certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 600000, max: 1300000, description: "Management software, professional books" },
          living: { min: 1400000, max: 1000000, description: "Accommodation" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Health sector offers some administrative scholarships.",
        lastUpdated: now,
      },

      "Project Manager": {
        totalCostMin: 4800000,
        totalCostMax: 10500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination",
            schoolIds: [],
          },
          {
            stage: "University Degree",
            duration: "4 years",
            costMin: 2000000,
            costMax: 6000000,
            description: "Bachelor in Business, Engineering, or related field",
            schoolIds: [urId, aucaId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "PMP Certification",
            duration: "6-12 months",
            costMin: 800000,
            costMax: 1500000,
            description: "Project Management Professional certification",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 600000, max: 1000000, description: "PM software, training materials, laptop" },
          living: { min: 1100000, max: 500000, description: "Living expenses" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Business school scholarships available.",
        lastUpdated: now,
      },

      "UX Designer": {
        totalCostMin: 4000000,
        totalCostMax: 9500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination, Art/Design helpful",
            schoolIds: [],
          },
          {
            stage: "Design Degree or Bootcamp",
            duration: "2-4 years",
            costMin: 1500000,
            costMax: 5000000,
            description: "Bachelor in Design, HCI, or UX Bootcamp",
            schoolIds: [iprckigaliId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Portfolio & Certifications",
            duration: "6 months",
            costMin: 500000,
            costMax: 1000000,
            description: "Build portfolio, get UX certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 1200000, max: 2000000, description: "Laptop, design software, prototyping tools" },
          living: { min: 500000, max: 0, description: "Living costs" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Tech companies sometimes sponsor design bootcamps.",
        lastUpdated: now,
      },

      "Product Manager": {
        totalCostMin: 5000000,
        totalCostMax: 11500000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination",
            schoolIds: [],
          },
          {
            stage: "University Degree",
            duration: "4 years",
            costMin: 2200000,
            costMax: 6500000,
            description: "Bachelor in Business, CS, Engineering, or related",
            schoolIds: [urId, aucaId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "Product Management Training",
            duration: "6-12 months",
            costMin: 800000,
            costMax: 2000000,
            description: "PM certifications and specialized training",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 700000, max: 1500000, description: "Laptop, PM software, course subscriptions" },
          living: { min: 1000000, max: 0, description: "Living expenses" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Business school scholarships available.",
        lastUpdated: now,
      },

      "HR Manager": {
        totalCostMin: 4500000,
        totalCostMax: 10000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Any combination",
            schoolIds: [],
          },
          {
            stage: "HR/Business Degree",
            duration: "4 years",
            costMin: 2000000,
            costMax: 6000000,
            description: "Bachelor in Human Resources, Psychology, or Business",
            schoolIds: [urId, aucaId, uokId, aluId].filter(Boolean) as any,
          },
          {
            stage: "HR Certifications",
            duration: "6-12 months",
            costMin: 500000,
            costMax: 1200000,
            description: "SHRM or HRCI professional certifications",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 500000, max: 800000, description: "HR software, training materials" },
          living: { min: 1200000, max: 500000, description: "Living expenses" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Business school scholarships available.",
        lastUpdated: now,
      },

      "Pharmacist": {
        totalCostMin: 8000000,
        totalCostMax: 16000000,
        breakdown: [
          {
            stage: "High School (Science)",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Chemistry, Biology, Physics required",
            schoolIds: [],
          },
          {
            stage: "Pharmacy Degree",
            duration: "5 years",
            costMin: 4500000,
            costMax: 10000000,
            description: "Bachelor of Pharmacy (BPharm)",
            schoolIds: [urId].filter(Boolean) as any,
          },
          {
            stage: "Licensing & Internship",
            duration: "1 year",
            costMin: 500000,
            costMax: 1500000,
            description: "Pharmacy board exam and supervised practice",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 800000, max: 1500000, description: "Lab equipment, textbooks, licensing fees" },
          living: { min: 1900000, max: 1500000, description: "Extended education living costs" },
        },
        financialAidAvailable: true,
        scholarshipInfo: "Health sector scholarships available.",
        lastUpdated: now,
      },

      "Journalist": {
        totalCostMin: 4000000,
        totalCostMax: 9000000,
        breakdown: [
          {
            stage: "High School",
            duration: "6 years",
            costMin: 300000,
            costMax: 1500000,
            description: "Languages and Social Studies helpful",
            schoolIds: [],
          },
          {
            stage: "Journalism/Communications Degree",
            duration: "3-4 years",
            costMin: 1800000,
            costMax: 5000000,
            description: "Bachelor in Journalism, Mass Communication, or Media Studies",
            schoolIds: [urId, aucaId].filter(Boolean) as any,
          },
          {
            stage: "Media Training & Portfolio",
            duration: "6 months",
            costMin: 300000,
            costMax: 700000,
            description: "Specialized media training and portfolio building",
            schoolIds: [],
          },
        ],
        additionalCosts: {
          materials: { min: 800000, max: 1300000, description: "Recording equipment, laptop, camera, editing software" },
          living: { min: 800000, max: 500000, description: "Living expenses" },
        },
        financialAidAvailable: false,
        scholarshipInfo: "Some media organizations offer internships and training.",
        lastUpdated: now,
      },
    };

    const updates = [];
    let skipped = [];

    // Update careers that don't have cost analysis yet
    for (const career of allCareers) {
      // Skip if already has cost analysis
      if (career.costAnalysis) {
        skipped.push(career.title);
        continue;
      }

      // Check if we have a template for this career
      const template = costTemplates[career.title];
      
      if (template) {
        await ctx.db.patch(career._id, {
          costAnalysis: template as any,
        });
        updates.push(career.title);
      }
    }

    return {
      success: true,
      message: `Added cost analysis to ${updates.length} more careers`,
      updatedCareers: updates,
      skippedCareers: `${skipped.length} careers already had cost data`,
      totalCareers: allCareers.length,
    };
  },
});


/**
 * Update incomplete career profiles (Product Manager, HR Manager, Pharmacist, Journalist)
 * with complete data like Software Developer
 * Run with: npx convex run updateIncompleteProfiles:updateAllProfiles
 */

import { mutation } from "./_generated/server";

export const updateAllProfiles = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    // Product Manager - Complete Profile
    const productManager = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Product Manager"))
      .first();

    if (productManager) {
      await ctx.db.patch(productManager._id, {
        category: "Business & Technology",
        shortDescription: "Define product vision and drive cross-functional execution to deliver user value.",
        fullDescription: "Product Managers are the CEOs of their product. They define strategy, prioritize features, and coordinate engineering, design, marketing, and sales to deliver products users love. PMs must balance user needs with business goals and technical constraints, making data-driven decisions under uncertainty. The role requires analytical thinking, communication skills, and the ability to influence without authority.",
        videoUrl: "https://www.youtube.com/watch?v=yUOC-Y0f5ZQ",
        videoThumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        salaryMin: 5000000,
        salaryMax: 20000000,
        currency: "RWF",
        requiredEducation: "Bachelor's degree in Business, Computer Science, or related field; MBA often preferred",
        requiredSkills: [
          "Product Strategy",
          "Data Analysis",
          "User Research",
          "Roadmap Planning",
          "Stakeholder Management",
          "Agile/Scrum",
          "SQL",
          "A/B Testing",
          "Wireframing",
          "Communication"
        ],
        careerPath: [
          { stage: "Associate PM", duration: "0-2 years", description: "Learn product fundamentals, assist senior PMs, conduct user research" },
          { stage: "Product Manager", duration: "2-5 years", description: "Own product features, manage roadmaps, coordinate teams" },
          { stage: "Senior Product Manager", duration: "5-8 years", description: "Lead major product initiatives, mentor junior PMs, drive strategy" },
          { stage: "Lead/Principal PM", duration: "8-12 years", description: "Define product vision, manage PM team, influence company direction" },
          { stage: "VP/Director of Product", duration: "12+ years", description: "Own entire product portfolio, build PM organization, executive leadership" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: {
          realistic: 30,
          investigative: 80,
          artistic: 50,
          social: 70,
          enterprising: 85,
          conventional: 60
        },
        valueProfile: {
          impact: 85,
          income: 75,
          autonomy: 70,
          balance: 50,
          growth: 90,
          stability: 60
        },
        personalityProfile: {
          openness: 85,
          conscientiousness: 80,
          extraversion: 70
        },
        workEnvironment: {
          teamSize: "medium",
          pace: "intense",
          structure: "flexible"
        }
      });
      results.push({ title: "Product Manager", status: "updated", careerId: productManager._id });
    }

    // HR Manager - Complete Profile
    const hrManager = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "HR Manager"))
      .first();

    if (hrManager) {
      await ctx.db.patch(hrManager._id, {
        category: "Business & Management",
        shortDescription: "Build organizational culture, manage employee relations, and ensure compliance.",
        fullDescription: "HR Managers are responsible for all people-related functions: recruitment, onboarding, performance management, employee relations, compensation, and compliance. They balance employee advocacy with business needs, handle sensitive situations, and shape organizational culture. Modern HR requires both strategic thinking and operational excellence, combining empathy with business acumen to build high-performing teams.",
        videoUrl: "https://www.youtube.com/watch?v=cLMCbUO_-8g",
        videoThumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        salaryMin: 4000000,
        salaryMax: 15000000,
        currency: "RWF",
        requiredEducation: "Bachelor's degree in HR, Business, Psychology; SHRM-CP or PHR certification preferred",
        requiredSkills: [
          "Employee Relations",
          "Recruitment & Talent Acquisition",
          "Performance Management",
          "Labor Law & Compliance",
          "Conflict Resolution",
          "HRIS Systems",
          "Compensation & Benefits",
          "Training & Development",
          "Organizational Development",
          "Communication"
        ],
        careerPath: [
          { stage: "HR Coordinator", duration: "0-2 years", description: "Handle administrative HR tasks, assist with recruiting, maintain records" },
          { stage: "HR Generalist", duration: "2-5 years", description: "Manage employee relations, conduct recruitment, handle HR processes" },
          { stage: "HR Manager", duration: "5-8 years", description: "Lead HR function, develop policies, manage employee issues, oversee compliance" },
          { stage: "Senior HR Manager", duration: "8-12 years", description: "Strategic HR leadership, shape culture, build HR team, advise executives" },
          { stage: "HR Director/VP", duration: "12+ years", description: "Own entire people strategy, build HR department, executive team member" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: {
          realistic: 25,
          investigative: 60,
          artistic: 40,
          social: 90,
          enterprising: 65,
          conventional: 75
        },
        valueProfile: {
          impact: 80,
          income: 65,
          autonomy: 60,
          balance: 60,
          growth: 70,
          stability: 75
        },
        personalityProfile: {
          openness: 70,
          conscientiousness: 85,
          extraversion: 75
        },
        workEnvironment: {
          teamSize: "small",
          pace: "moderate",
          structure: "balanced"
        }
      });
      results.push({ title: "HR Manager", status: "updated", careerId: hrManager._id });
    }

    // Pharmacist - Complete Profile
    const pharmacist = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Pharmacist"))
      .first();

    if (pharmacist) {
      await ctx.db.patch(pharmacist._id, {
        category: "Healthcare",
        shortDescription: "Dispense medications, counsel patients, and ensure safe drug therapy.",
        fullDescription: "Pharmacists are medication experts who dispense prescriptions, counsel patients on proper drug use, monitor for interactions, and serve as accessible healthcare professionals. They work in retail pharmacies, hospitals, clinics, and pharmaceutical companies. The role combines clinical knowledge with patient care and business operations, requiring both scientific expertise and communication skills to ensure medication safety.",
        videoUrl: "https://www.youtube.com/watch?v=VQxHZV7hIb4",
        videoThumbnail: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
        salaryMin: 6000000,
        salaryMax: 18000000,
        currency: "RWF",
        requiredEducation: "Doctor of Pharmacy (PharmD) degree, 6 years; License required; Residency for hospital/clinical roles",
        requiredSkills: [
          "Pharmacology & Drug Interactions",
          "Patient Counseling",
          "Prescription Verification",
          "Clinical Assessment",
          "Medication Therapy Management",
          "Pharmacy Law & Ethics",
          "Compounding",
          "Inventory Management",
          "Insurance & Billing",
          "Communication"
        ],
        careerPath: [
          { stage: "Pharmacy Intern", duration: "During PharmD", description: "Gain supervised experience, learn dispensing, assist pharmacists" },
          { stage: "Staff Pharmacist", duration: "0-3 years", description: "Dispense medications, counsel patients, verify prescriptions" },
          { stage: "Senior/Lead Pharmacist", duration: "3-7 years", description: "Clinical specialization, supervise staff, quality improvement" },
          { stage: "Pharmacy Manager", duration: "7-12 years", description: "Manage pharmacy operations, staff, inventory, financial performance" },
          { stage: "Director of Pharmacy", duration: "12+ years", description: "Oversee multiple pharmacies, strategic leadership, policy development" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: {
          realistic: 40,
          investigative: 85,
          artistic: 25,
          social: 75,
          enterprising: 50,
          conventional: 80
        },
        valueProfile: {
          impact: 85,
          income: 75,
          autonomy: 55,
          balance: 65,
          growth: 65,
          stability: 85
        },
        personalityProfile: {
          openness: 65,
          conscientiousness: 95,
          extraversion: 60
        },
        workEnvironment: {
          teamSize: "small",
          pace: "intense",
          structure: "structured"
        }
      });
      results.push({ title: "Pharmacist", status: "updated", careerId: pharmacist._id });
    }

    // Journalist - Complete Profile
    const journalist = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Journalist"))
      .first();

    if (journalist) {
      await ctx.db.patch(journalist._id, {
        category: "Media & Communications",
        shortDescription: "Investigate stories, interview sources, and report news to inform the public.",
        fullDescription: "Journalists research, investigate, and report on news and issues of public interest. They interview sources, verify facts, write stories, and increasingly produce multimedia content. Modern journalism spans traditional newspapers, digital publications, broadcast media, and independent platforms. The profession requires curiosity, integrity, and resilience, balancing speed with accuracy while serving as democracy's watchdog.",
        videoUrl: "https://www.youtube.com/watch?v=IEoZUWPVeXk",
        videoThumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
        salaryMin: 2500000,
        salaryMax: 10000000,
        currency: "RWF",
        requiredEducation: "Bachelor's degree in Journalism, Communications, or related field; Portfolio more important than degree",
        requiredSkills: [
          "News Writing & Reporting",
          "Interviewing",
          "Research & Fact-Checking",
          "Source Development",
          "AP Style",
          "Video/Audio Production",
          "Social Media",
          "Ethics & Law",
          "Storytelling",
          "Deadline Management"
        ],
        careerPath: [
          { stage: "Reporter/Junior Journalist", duration: "0-3 years", description: "Cover assigned beats, write daily stories, develop sources" },
          { stage: "Staff Reporter", duration: "3-6 years", description: "Specialized beat coverage, longer investigations, multimedia stories" },
          { stage: "Senior Reporter/Correspondent", duration: "6-10 years", description: "Lead investigations, mentor juniors, break major stories" },
          { stage: "Editor/Assignment Editor", duration: "10-15 years", description: "Assign stories, edit work, shape coverage strategy" },
          { stage: "Managing/Executive Editor", duration: "15+ years", description: "Oversee entire newsroom, set editorial direction, leadership" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: {
          realistic: 30,
          investigative: 95,
          artistic: 75,
          social: 80,
          enterprising: 60,
          conventional: 40
        },
        valueProfile: {
          impact: 95,
          income: 40,
          autonomy: 65,
          balance: 35,
          growth: 70,
          stability: 30
        },
        personalityProfile: {
          openness: 90,
          conscientiousness: 75,
          extraversion: 70
        },
        workEnvironment: {
          teamSize: "small",
          pace: "intense",
          structure: "flexible"
        }
      });
      results.push({ title: "Journalist", status: "updated", careerId: journalist._id });
    }

    return {
      message: "All 4 career profiles updated with complete information",
      results,
      summary: {
        total: results.length,
        updated: results.filter(r => r.status === "updated").length
      }
    };
  }
});

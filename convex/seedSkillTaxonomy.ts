import { mutation } from "./_generated/server";

// Skill taxonomy — 7 categories calibrated to Rwanda market
// Source: SkillSync data/curated/skills.taxonomy.v1.json
// Run via: npx convex run seedSkillTaxonomy:seed
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("skillTaxonomy").first();
    if (existing) return { status: "already seeded", count: 0 };

    const categories = [
      {
        categoryId: "web-development",
        name: "Web Development",
        description: "Frontend and backend web technologies",
        demandLevel: "very-high" as const,
        avgSalaryImpact: 350000,
        skills: [
          { id: "html-css", name: "HTML/CSS", aliases: ["HTML", "CSS", "HTML5", "CSS3"] },
          { id: "javascript", name: "JavaScript", aliases: ["JS", "ES6", "TypeScript"] },
          { id: "react", name: "React", aliases: ["ReactJS", "React.js"] },
          { id: "nodejs", name: "Node.js", aliases: ["Node", "NodeJS", "Express"] },
          { id: "typescript", name: "TypeScript", aliases: ["TS"] },
          { id: "nextjs", name: "Next.js", aliases: ["NextJS"] },
          { id: "mysql", name: "MySQL", aliases: ["SQL", "Database"] },
          { id: "mongodb", name: "MongoDB", aliases: ["Mongo", "NoSQL"] },
        ],
      },
      {
        categoryId: "data-analysis",
        name: "Data Analysis & Analytics",
        description: "Data processing, analytics, and business intelligence",
        demandLevel: "very-high" as const,
        avgSalaryImpact: 400000,
        skills: [
          { id: "excel", name: "Excel Advanced", aliases: ["Excel", "Spreadsheets", "Google Sheets"] },
          { id: "sql", name: "SQL", aliases: ["MySQL", "PostgreSQL", "Database queries"] },
          { id: "python", name: "Python", aliases: ["Python 3", "Pandas", "NumPy"] },
          { id: "power-bi", name: "Power BI", aliases: ["PowerBI", "Power BI Desktop"] },
          { id: "tableau", name: "Tableau", aliases: ["Tableau Desktop"] },
          { id: "data-viz", name: "Data Visualization", aliases: ["Charts", "Dashboards"] },
          { id: "statistics", name: "Statistics", aliases: ["Statistical Analysis", "R"] },
        ],
      },
      {
        categoryId: "digital-marketing",
        name: "Digital Marketing",
        description: "Online marketing and social media operations",
        demandLevel: "high" as const,
        avgSalaryImpact: 280000,
        skills: [
          { id: "social-media", name: "Social Media Marketing", aliases: ["Social Media", "Facebook Ads", "Instagram"] },
          { id: "google-ads", name: "Google Ads", aliases: ["Google AdWords", "PPC", "SEM"] },
          { id: "seo", name: "SEO", aliases: ["Search Engine Optimization"] },
          { id: "content-marketing", name: "Content Marketing", aliases: ["Content Creation", "Blogging"] },
          { id: "marketing-analytics", name: "Marketing Analytics", aliases: ["Google Analytics", "GA4"] },
          { id: "copywriting", name: "Copywriting", aliases: ["Writing", "Copy"] },
        ],
      },
      {
        categoryId: "fintech",
        name: "FinTech & Mobile Money",
        description: "Financial technology and payments infrastructure",
        demandLevel: "very-high" as const,
        avgSalaryImpact: 500000,
        skills: [
          { id: "mobile-money", name: "Mobile Money Integration", aliases: ["MTN MoMo", "Airtel Money", "M-Pesa"] },
          { id: "payment-apis", name: "Payment APIs", aliases: ["Payment Gateway", "Stripe", "Flutterwave"] },
          { id: "financial-apis", name: "Financial APIs", aliases: ["Banking API", "Open Banking"] },
          { id: "regulatory-compliance", name: "Regulatory Compliance", aliases: ["KYC", "AML", "Compliance"] },
          { id: "risk-management", name: "Risk Management", aliases: ["Financial Risk", "Risk Analysis"] },
          { id: "api-development", name: "API Development", aliases: ["REST API", "APIs", "Microservices"] },
        ],
      },
      {
        categoryId: "mobile-development",
        name: "Mobile App Development",
        description: "Android and cross-platform development",
        demandLevel: "high" as const,
        avgSalaryImpact: 450000,
        skills: [
          { id: "react-native", name: "React Native", aliases: ["RN", "React Native CLI"] },
          { id: "flutter", name: "Flutter", aliases: ["Dart", "Flutter SDK"] },
          { id: "kotlin", name: "Kotlin", aliases: ["Android", "Android Studio"] },
          { id: "firebase", name: "Firebase", aliases: ["Firebase Auth", "Firestore"] },
          { id: "mobile-uiux", name: "Mobile UI/UX", aliases: ["Mobile Design", "UX", "Figma"] },
          { id: "mobile-security", name: "Mobile Security", aliases: ["App Security", "Secure Coding"] },
        ],
      },
      {
        categoryId: "cybersecurity",
        name: "Cybersecurity",
        description: "Information security and resilience",
        demandLevel: "high" as const,
        avgSalaryImpact: 600000,
        skills: [
          { id: "network-security", name: "Network Security", aliases: ["Networking", "Firewalls", "VPN"] },
          { id: "security-auditing", name: "Security Auditing", aliases: ["Penetration Testing", "Pen Testing"] },
          { id: "incident-response", name: "Incident Response", aliases: ["IR", "SIEM", "SOC"] },
          { id: "risk-assessment", name: "Risk Assessment", aliases: ["Vulnerability Assessment", "Risk Analysis"] },
          { id: "cloud-security", name: "Cloud Security", aliases: ["AWS Security", "Azure Security"] },
        ],
      },
      {
        categoryId: "project-management",
        name: "Project Management",
        description: "Delivery and stakeholder management",
        demandLevel: "high" as const,
        avgSalaryImpact: 320000,
        skills: [
          { id: "agile-scrum", name: "Agile/Scrum", aliases: ["Agile", "Scrum", "Kanban", "Sprint"] },
          { id: "project-planning", name: "Project Planning", aliases: ["MS Project", "Planning"] },
          { id: "stakeholder-mgmt", name: "Stakeholder Management", aliases: ["Stakeholders", "Client Management"] },
          { id: "budget-mgmt", name: "Budget Management", aliases: ["Budgeting", "Cost Control"] },
          { id: "jira", name: "JIRA", aliases: ["Jira", "Atlassian", "Confluence"] },
          { id: "communication", name: "Communication", aliases: ["Presentation", "Report Writing"] },
        ],
      },
    ];

    let count = 0;
    for (const cat of categories) {
      await ctx.db.insert("skillTaxonomy", cat);
      count++;
    }
    return { status: "seeded", count };
  },
});

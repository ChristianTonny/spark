import { mutation } from "./_generated/server";

// Learning resources — curated list for Rwanda skill gaps
// Source: SkillSync data/curated/learning.resources.v1.json
// Run via: npx convex run seedLearningResources:seed
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("learningResources").first();
    if (existing) return { status: "already seeded", count: 0 };

    const resources = [
      {
        resourceId: "rw-react-course-001",
        title: "React Fundamentals",
        provider: "freeCodeCamp",
        type: "course" as const,
        url: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
        duration: "30 hours",
        difficulty: "beginner" as const,
        cost: "free" as const,
        rating: 4.8,
        tags: ["React", "JavaScript", "Frontend"],
      },
      {
        resourceId: "rw-node-course-002",
        title: "Node.js and Express APIs",
        provider: "Coursera",
        type: "course" as const,
        url: "https://www.coursera.org/specializations/meta-back-end-developer",
        duration: "40 hours",
        difficulty: "intermediate" as const,
        cost: "paid" as const,
        rating: 4.6,
        tags: ["Node.js", "API Development", "JavaScript"],
      },
      {
        resourceId: "rw-sql-path-003",
        title: "SQL for Data Analysis",
        provider: "Khan Academy",
        type: "course" as const,
        url: "https://www.khanacademy.org/computing/computer-programming/sql",
        duration: "18 hours",
        difficulty: "beginner" as const,
        cost: "free" as const,
        rating: 4.5,
        tags: ["SQL", "Data Analysis"],
      },
      {
        resourceId: "rw-python-course-004",
        title: "Python for Everybody",
        provider: "Coursera",
        type: "course" as const,
        url: "https://www.coursera.org/specializations/python",
        duration: "36 hours",
        difficulty: "beginner" as const,
        cost: "paid" as const,
        rating: 4.8,
        tags: ["Python", "Data Analysis", "Programming"],
      },
      {
        resourceId: "rw-powerbi-course-005",
        title: "Microsoft Power BI Desktop",
        provider: "Udemy",
        type: "course" as const,
        url: "https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/",
        duration: "22 hours",
        difficulty: "beginner" as const,
        cost: "paid" as const,
        rating: 4.7,
        tags: ["Power BI", "Data Visualization", "Business Intelligence"],
      },
      {
        resourceId: "rw-reactnative-course-006",
        title: "React Native - The Practical Guide",
        provider: "Udemy",
        type: "course" as const,
        url: "https://www.udemy.com/course/react-native-the-practical-guide/",
        duration: "45 hours",
        difficulty: "intermediate" as const,
        cost: "paid" as const,
        rating: 4.7,
        tags: ["React Native", "Mobile Development", "JavaScript"],
      },
      {
        resourceId: "rw-security-course-007",
        title: "CompTIA Security+ Prep",
        provider: "Professor Messer",
        type: "course" as const,
        url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/",
        duration: "20 hours",
        difficulty: "intermediate" as const,
        cost: "free" as const,
        rating: 4.9,
        tags: ["Network Security", "Cybersecurity", "Security Auditing"],
      },
      {
        resourceId: "rw-agile-course-008",
        title: "Agile Project Management",
        provider: "Google on Coursera",
        type: "course" as const,
        url: "https://www.coursera.org/learn/agile-project-management",
        duration: "25 hours",
        difficulty: "beginner" as const,
        cost: "paid" as const,
        rating: 4.8,
        tags: ["Agile/Scrum", "Project Management", "Stakeholder Management"],
      },
      {
        resourceId: "rw-seo-guide-009",
        title: "SEO Starter Guide",
        provider: "Google",
        type: "article" as const,
        url: "https://developers.google.com/search/docs/beginner/seo-starter-guide",
        duration: "3 hours",
        difficulty: "beginner" as const,
        cost: "free" as const,
        rating: 4.5,
        tags: ["SEO", "Digital Marketing"],
      },
      {
        resourceId: "rw-flutter-course-010",
        title: "Flutter & Dart - The Complete Guide",
        provider: "Udemy",
        type: "course" as const,
        url: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
        duration: "42 hours",
        difficulty: "beginner" as const,
        cost: "paid" as const,
        rating: 4.8,
        tags: ["Flutter", "Mobile Development", "Dart"],
      },
    ];

    let count = 0;
    for (const resource of resources) {
      await ctx.db.insert("learningResources", resource);
      count++;
    }
    return { status: "seeded", count };
  },
});

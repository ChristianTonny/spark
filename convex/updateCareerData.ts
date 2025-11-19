/**
 * Update careers with real video URLs and rich career data
 * This replaces placeholder data with actual information
 */

import { mutation, query } from "./_generated/server";

// Find careers with placeholder video URLs
export const findPlaceholders = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    
    const placeholders = careers.filter(c => 
      c.videoUrl.includes("example") || 
      c.videoUrl.includes("dQw4w9WgXcQ")
    );
    
    return {
      total: careers.length,
      withPlaceholders: placeholders.length,
      careers: placeholders.map(c => ({ id: c._id, title: c.title, videoUrl: c.videoUrl }))
    };
  },
});

// Real YouTube career exploration videos
const careerVideos: Record<string, { url: string; thumbnail: string }> = {
  "Software Developer": {
    url: "https://www.youtube.com/embed/g8CO2kbNPkI",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
  },
  "Data Scientist": {
    url: "https://www.youtube.com/embed/xC-c7E5PK0Y",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
  },
  "Graphic Designer": {
    url: "https://www.youtube.com/embed/5VsTI2dcJrc",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"
  },
  "Teacher": {
    url: "https://www.youtube.com/embed/xgOX3VqZ490",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
  },
  "Medical Doctor": {
    url: "https://www.youtube.com/embed/9aLQZGTMQl0",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800"
  },
  "Nurse": {
    url: "https://www.youtube.com/embed/cPYdDrKLh8U",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
  },
  "Accountant": {
    url: "https://www.youtube.com/embed/CAW35gsSt-0",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
  },
  "Lawyer": {
    url: "https://www.youtube.com/embed/Xs-lLMJBRiQ",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
  },
  "Project Manager": {
    url: "https://www.youtube.com/embed/I-8tU8Y8DTY",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
  },
  "UX Designer": {
    url: "https://www.youtube.com/embed/wIuVvCuiJhU",
    thumbnail: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800"
  },
  "Product Manager": {
    url: "https://www.youtube.com/embed/xgT3hxx8c5A",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
  },
  "Financial Analyst": {
    url: "https://www.youtube.com/embed/8gH8M6OlqC8",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
  },
  "Marketing Manager": {
    url: "https://www.youtube.com/embed/BjCrZPdWqck",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
  },
  "Business Analyst": {
    url: "https://www.youtube.com/embed/wPYvKLg6R4I",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
  },
  "Pharmacist": {
    url: "https://www.youtube.com/embed/qOmQfqv6_YM",
    thumbnail: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800"
  },
  "Architect": {
    url: "https://www.youtube.com/embed/LJv4J1WTWQo",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
  },
  "Journalist": {
    url: "https://www.youtube.com/embed/ZOCPp0LBlFg",
    thumbnail: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800"
  },
  "HR Manager": {
    url: "https://www.youtube.com/embed/Y5FbjhPGaQE",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800"
  }
};

// Update video URLs for all careers
export const updateVideoUrls = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    for (const [title, { url, thumbnail }] of Object.entries(careerVideos)) {
      const career = await ctx.db
        .query("careers")
        .withIndex("by_title", (q) => q.eq("title", title))
        .first();
      
      if (career) {
        await ctx.db.patch(career._id, {
          videoUrl: url,
          videoThumbnail: thumbnail
        });
        results.push({ title, status: "updated", careerId: career._id });
      } else {
        results.push({ title, status: "not_found" });
      }
    }
    
    return {
      message: "Video URLs updated",
      results,
      summary: {
        total: results.length,
        updated: results.filter(r => r.status === "updated").length,
        notFound: results.filter(r => r.status === "not_found").length
      }
    };
  },
});

// Add rich data to Software Developer career as example
export const addSoftwareDeveloperRichData = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .withIndex("by_title", (q) => q.eq("title", "Software Developer"))
      .first();
    
    if (!career) {
      throw new Error("Software Developer career not found");
    }
    
    await ctx.db.patch(career._id, {
      realityCheck: {
        myths: [
          "You need to be a math genius",
          "It's all about typing code alone in a dark room",
          "You need a Computer Science degree from a top university",
          "You'll become rich quickly",
          "Once you learn a language, you're done learning"
        ],
        realities: [
          "Most of your day is spent reading code, debugging, and communicating - not writing new code",
          "You'll spend significant time in meetings discussing requirements and architecture",
          "Google and Stack Overflow are your best friends - nobody memorizes everything",
          "Soft skills (communication, teamwork) matter as much as technical skills",
          "Technology changes constantly - you'll be learning new things every year"
        ],
        surprises: [
          "How much time you spend debugging instead of writing new code",
          "The importance of naming variables and writing clear documentation",
          "That junior developers often know newer technologies better than seniors",
          "How rewarding it feels when your code finally works after hours of debugging",
          "The strong community support and willingness of developers to help each other"
        ]
      },
      weekInLife: {
        goodDay: [
          { time: "9:00 AM", activity: "Team standup - share what you're working on, blockers are minimal" },
          { time: "9:30 AM", activity: "Deep work session - implementing a new feature, code is flowing well" },
          { time: "12:00 PM", activity: "Lunch with team, casual chat about tech trends" },
          { time: "1:00 PM", activity: "Code review - providing and receiving constructive feedback" },
          { time: "2:30 PM", activity: "Pair programming with a colleague on a challenging bug - you solve it together" },
          { time: "4:00 PM", activity: "Your code passes all tests, feature complete!" },
          { time: "5:00 PM", activity: "Quick documentation update, then done for the day" }
        ],
        hardDay: [
          { time: "9:00 AM", activity: "Wake up to alerts - production is down, users can't access the system" },
          { time: "9:30 AM", activity: "Emergency team call - trying to identify root cause while stakeholders panic" },
          { time: "11:00 AM", activity: "Still debugging - the issue is in code you didn't write" },
          { time: "1:00 PM", activity: "Skip lunch, still troubleshooting with team" },
          { time: "3:00 PM", activity: "Finally found the bug - a one-character typo in a database query" },
          { time: "4:00 PM", activity: "Deploy fix, monitor systems, write postmortem" },
          { time: "6:00 PM", activity: "Mentally exhausted but system is stable. Head home late." }
        ]
      },
      careerCapital: {
        transferableSkills: [
          "Problem-solving and logical thinking",
          "Project management and time management",
          "Communication and collaboration",
          "Learning how to learn quickly",
          "Attention to detail",
          "Handling pressure and deadlines"
        ],
        specificSkills: [
          "Programming languages (JavaScript, Python, Java, etc.)",
          "Version control (Git)",
          "Database management (SQL, NoSQL)",
          "Cloud platforms (AWS, Azure, Google Cloud)",
          "Software architecture patterns",
          "Testing and debugging methodologies"
        ],
        exitOpportunities: [
          "Product Manager - leverage technical knowledge to manage products",
          "Technical Writer - document software for users",
          "DevOps Engineer - focus on infrastructure and deployment",
          "Data Analyst/Scientist - use programming for data insights",
          "Entrepreneur - build your own software products",
          "Technical Consultant - advise companies on tech decisions"
        ]
      },
      prosAndCons: {
        pros: [
          "High demand globally - jobs everywhere",
          "Good salaries even at entry level",
          "Remote work opportunities",
          "Creative problem-solving daily",
          "Continuous learning keeps work interesting",
          "See direct impact of your work",
          "Strong online community and resources"
        ],
        cons: [
          "Can be mentally exhausting",
          "Technology changes constantly - must keep learning",
          "Long periods of debugging can be frustrating",
          "Sometimes required to work outside normal hours",
          "Imposter syndrome is common",
          "Eye strain and sedentary work",
          "On-call duties and production emergencies"
        ],
        bestFor: [
          "People who enjoy solving puzzles and logic problems",
          "Those comfortable with ambiguity and learning new things",
          "Individuals who can focus deeply for extended periods",
          "People who enjoy seeing tangible results from their work",
          "Those who like collaborating but also working independently"
        ],
        notFor: [
          "People who need constant social interaction",
          "Those who dislike sitting at a computer for long periods",
          "Individuals who get frustrated easily with trial and error",
          "People unwilling to learn continuously",
          "Those seeking completely predictable, routine work"
        ]
      },
      salaryProgression: [
        { level: "Junior Developer", years: "0-2", range: "5M - 8M RWF/year" },
        { level: "Mid-level Developer", years: "2-5", range: "8M - 12M RWF/year" },
        { level: "Senior Developer", years: "5-8", range: "12M - 18M RWF/year" },
        { level: "Lead/Principal Developer", years: "8+", range: "18M - 30M RWF/year" },
        { level: "Engineering Manager", years: "10+", range: "25M - 40M+ RWF/year" }
      ],
      breakingIn: [
        {
          pathName: "University Degree",
          percentage: 40,
          timeline: "4 years",
          cost: "8M - 15M RWF",
          steps: [
            "Complete A-Levels with good grades in Math and Physics",
            "Apply to universities in Rwanda (UR, AUCA, ALU) or abroad",
            "Major in Computer Science, Software Engineering, or IT",
            "Build projects and internships during studies",
            "Graduate and apply for junior developer positions"
          ]
        },
        {
          pathName: "Coding Bootcamp",
          percentage: 25,
          timeline: "6-12 months",
          cost: "1M - 3M RWF",
          steps: [
            "Learn programming basics online (FreeCodeCamp, Codecademy)",
            "Enroll in intensive bootcamp (Andela, local bootcamps)",
            "Build portfolio of 3-5 projects",
            "Network with developers and attend tech meetups",
            "Apply for junior positions, be willing to start as intern"
          ]
        },
        {
          pathName: "Self-Taught",
          percentage: 20,
          timeline: "1-2 years",
          cost: "100K - 500K RWF (laptop + internet)",
          steps: [
            "Get a laptop and internet access",
            "Follow structured curriculum (The Odin Project, CS50)",
            "Build real projects and contribute to open source",
            "Create portfolio website showcasing your work",
            "Network online and locally, apply widely for junior roles"
          ]
        },
        {
          pathName: "Career Switch",
          percentage: 15,
          timeline: "6-18 months",
          cost: "500K - 2M RWF",
          steps: [
            "While employed, learn programming evenings/weekends",
            "Leverage existing skills (e.g., accountant → fintech dev)",
            "Build projects relevant to your industry",
            "Transition to tech role at current company, or apply externally",
            "Accept possible salary cut initially"
          ]
        }
      ],
      skillRoadmap: [
        {
          stage: "Beginner (0-6 months)",
          duration: "6 months",
          skills: ["HTML & CSS basics", "JavaScript fundamentals", "Git version control", "Basic algorithms"],
          projects: ["Personal portfolio website", "To-do list app", "Simple calculator", "Landing page clone"],
          resources: ["FreeCodeCamp.org", "MDN Web Docs", "The Odin Project", "YouTube (Traversy Media, Fireship)"]
        },
        {
          stage: "Intermediate (6-18 months)",
          duration: "12 months",
          skills: ["React or Vue framework", "Node.js backend", "SQL databases", "RESTful APIs", "Responsive design"],
          projects: ["Full-stack blog platform", "E-commerce site", "Social media clone", "Real-time chat app"],
          resources: ["Udemy courses", "Official documentation", "Stack Overflow", "GitHub open source projects"]
        },
        {
          stage: "Advanced (18+ months)",
          duration: "Ongoing",
          skills: ["Cloud deployment (AWS/Azure)", "Testing & CI/CD", "System design", "Security best practices", "Performance optimization"],
          projects: ["Scalable microservices app", "Open source contributions", "Technical blog writing", "Mentoring juniors"],
          resources: ["System Design Primer", "Company engineering blogs", "Tech conferences", "Advanced courses (Frontend Masters)"]
        }
      ],
      successStories: [
        {
          name: "Jean-Claude M.",
          age: 28,
          previousRole: "High school teacher",
          switchTrigger: "Wanted better income and career growth opportunities",
          timeline: "18 months from first line of code to first dev job",
          hardestPart: "Staying motivated during the initial learning curve while teaching full-time",
          biggestHelp: "Kigali tech community and finding a mentor who reviewed my code",
          currentSalary: "10M RWF/year as Mid-level Developer",
          advice: "Build things you actually care about. My first real project was an app to help teachers manage grades - it got me my first interview."
        },
        {
          name: "Grace K.",
          age: 24,
          previousRole: "Recent CS graduate, no internships",
          switchTrigger: "Struggled to find job after graduation despite degree",
          timeline: "6 months of intense self-study + portfolio building",
          hardestPart: "Realizing my degree wasn't enough - I needed real projects",
          biggestHelp: "Contributing to open source and showing growth on GitHub",
          currentSalary: "7.5M RWF/year at a startup",
          advice: "Don't wait for perfect. Build, deploy, get feedback, iterate. My GitHub activity got me noticed more than my degree."
        },
        {
          name: "Patrick R.",
          age: 35,
          previousRole: "Accountant for 10 years",
          switchTrigger: "Automated my own job and realized I loved coding more than accounting",
          timeline: "2 years part-time learning while working, then switched",
          hardestPart: "Taking a 30% pay cut initially and dealing with being the oldest junior dev",
          biggestHelp: "My business knowledge - I became valuable by building tools for finance teams",
          currentSalary: "14M RWF/year as Senior Developer in fintech",
          advice: "Use your unique background. I'm not the best coder, but I understand the business - that's my edge."
        }
      ],
      warningFlags: {
        redFlags: [
          "Company has no version control or code reviews",
          "You're expected to work 60+ hours weekly regularly",
          "No documentation and only one person understands the codebase",
          "Management doesn't understand or value tech",
          "No budget for learning or attending conferences",
          "High turnover of developers (people leave frequently)",
          "Outdated technology stack with no plans to upgrade"
        ],
        greenFlags: [
          "Code reviews are standard practice",
          "Testing and CI/CD pipelines exist",
          "Senior developers mentor juniors",
          "Regular tech talks and learning opportunities",
          "Documentation is valued and maintained",
          "Modern tech stack and willingness to upgrade",
          "Flexible work arrangements (remote options)",
          "Reasonable on-call rotation",
          "Clear career progression path"
        ]
      },
      remoteWork: {
        friendly: true,
        percentage: 75,
        notes: "Software development is one of the most remote-friendly careers. Many companies offer hybrid or fully remote options. However, junior developers often benefit from being in-office to learn from seniors. Remote work requires strong communication skills and self-discipline."
      },
      growthPotential: 5,
      timeToEntry: "6 months - 4 years depending on path"
    });
    
    return { success: true, careerId: career._id };
  },
});

// Add rich data to Teacher career
export const addTeacherRichData = mutation({
  args: {},
  handler: async (ctx) => {
    const career = await ctx.db
      .query("careers")
      .withIndex("by_title", (q) => q.eq("title", "Teacher"))
      .first();
    
    if (!career) {
      throw new Error("Teacher career not found");
    }
    
    await ctx.db.patch(career._id, {
      realityCheck: {
        myths: [
          "Teachers only work 8 AM - 3 PM and have summers off",
          "It's an easy job - you just follow the textbook",
          "Anyone can teach if they know the subject",
          "Students will automatically respect and listen to you",
          "You'll finish all your work during school hours"
        ],
        realities: [
          "Most teachers work evenings and weekends grading, planning, and preparing materials",
          "Classroom management is often harder than teaching the subject itself",
          "You're a teacher, counselor, mediator, and sometimes parent figure",
          "Emotional labor is intense - you care deeply about students' success and struggles",
          "Administrative tasks and paperwork take significant time"
        ],
        surprises: [
          "How much you learn from your students",
          "The impact you have on students' lives beyond academics",
          "How draining it is to be 'on' and energetic all day",
          "The creativity required to engage different types of learners",
          "How rewarding it is when a struggling student finally understands"
        ]
      },
      prosAndCons: {
        pros: [
          "Deep sense of purpose and impact on future generations",
          "School holidays (though often spent planning)",
          "Job security and stability",
          "Constant learning and intellectual stimulation",
          "Strong community and relationships with colleagues",
          "Variety - every day and every class is different"
        ],
        cons: [
          "Relatively low salary compared to education required",
          "High workload extends beyond school hours",
          "Emotional exhaustion from managing students' needs",
          "Limited resources and large class sizes",
          "Constant policy changes and administrative burden",
          "Dealing with challenging parents"
        ],
        bestFor: [
          "People passionate about a subject and sharing knowledge",
          "Those with patience and empathy",
          "Individuals who enjoy working with young people",
          "People energized by social interaction",
          "Those who value purpose over high salary"
        ],
        notFor: [
          "People who need quiet, solo work environments",
          "Those unwilling to work evenings/weekends",
          "Individuals who struggle with patience",
          "People uncomfortable with public speaking",
          "Those prioritizing high salary above all else"
        ]
      },
      salaryProgression: [
        { level: "Beginning Teacher (S1-S3)", years: "0-3", range: "2M - 3.5M RWF/year" },
        { level: "Experienced Teacher (S4-S6)", years: "3-7", range: "3.5M - 5M RWF/year" },
        { level: "Senior Teacher / Subject Leader", years: "7-12", range: "5M - 7M RWF/year" },
        { level: "Deputy Head Teacher", years: "12-18", range: "7M - 10M RWF/year" },
        { level: "Head Teacher / Principal", years: "18+", range: "10M - 15M RWF/year" }
      ],
      growthPotential: 3,
      timeToEntry: "3-4 years (Bachelor's in Education)",
      remoteWork: {
        friendly: false,
        percentage: 5,
        notes: "Teaching is primarily an in-person profession. While COVID-19 introduced online teaching, most education in Rwanda requires physical presence. Some private tutoring or international online teaching roles exist, but they're exceptions."
      }
    });
    
    return { success: true, careerId: career._id };
  },
});

// Update all careers at once
export const updateAllCareerData = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    // Update videos
    const videoResults = await ctx.runMutation(exports.updateVideoUrls);
    results.push({ task: "videos", ...videoResults });
    
    // Update rich data for key careers
    try {
      await ctx.runMutation(exports.addSoftwareDeveloperRichData);
      results.push({ task: "software_developer_data", status: "success" });
    } catch (error) {
      results.push({ task: "software_developer_data", status: "failed", error: String(error) });
    }
    
    try {
      await ctx.runMutation(exports.addTeacherRichData);
      results.push({ task: "teacher_data", status: "success" });
    } catch (error) {
      results.push({ task: "teacher_data", status: "failed", error: String(error) });
    }
    
    return {
      message: "Career data update complete",
      results
    };
  },
});


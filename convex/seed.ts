import { internalMutation } from "./_generated/server";

// Run this ONCE from Convex dashboard to populate database
export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Insert careers
    const careerIds = [];

    // Career 1: Software Developer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Software Developer",
      category: "Technology",
      shortDescription: "Build applications and solve problems with code to create digital solutions.",
      fullDescription: "Software developers design, create, and maintain computer programs and applications. You'll write code, debug software, collaborate with teams, and continuously learn new technologies.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      salaryMin: 5000000,
      salaryMax: 15000000,
      currency: "RWF",
      requiredEducation: "Bachelor's Degree in Computer Science",
      requiredSkills: ["JavaScript", "Python", "Problem Solving", "Git", "Teamwork"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Focus on mathematics, physics, and computer science. Join coding clubs.",
          requirements: ["Good grades in Math", "Basic computer skills"],
        },
        {
          stage: "University",
          duration: "4 years",
          description: "Earn Bachelor's in Computer Science, Software Engineering, or IT.",
          requirements: ["A-Level certificate", "Strong performance in Math and Physics"],
          estimatedCost: 8000000,
        },
      ],
      relatedCareerIds: ["career-2", "career-3"],
      views: 1247,
      saves: 89,
      // Assessment metadata
      interestProfile: {
        realistic: 30,
        investigative: 90,
        artistic: 60,
        social: 40,
        enterprising: 50,
        conventional: 40,
      },
      valueProfile: {
        impact: 70,
        income: 80,
        autonomy: 75,
        balance: 60,
        growth: 90,
        stability: 70,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "moderate",
        structure: "flexible",
      },
    }));

    // Career 2: Data Scientist
    careerIds.push(await ctx.db.insert("careers", {
      title: "Data Scientist",
      category: "Technology",
      shortDescription: "Analyze data to extract insights and help businesses make informed decisions.",
      fullDescription: "Data scientists collect, process, and analyze large datasets to uncover patterns and trends.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      salaryMin: 6000000,
      salaryMax: 18000000,
      currency: "RWF",
      requiredEducation: "Bachelor's Degree in Mathematics or Statistics",
      requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
      careerPath: [],
      relatedCareerIds: ["career-1"],
      views: 0,
      saves: 0,
      // Assessment metadata
      interestProfile: {
        realistic: 25,
        investigative: 95,
        artistic: 50,
        social: 35,
        enterprising: 55,
        conventional: 70,
      },
      valueProfile: {
        impact: 75,
        income: 85,
        autonomy: 70,
        balance: 55,
        growth: 95,
        stability: 65,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "moderate",
        structure: "flexible",
      },
    }));

    // Career 3: Registered Nurse
    careerIds.push(await ctx.db.insert("careers", {
      title: "Registered Nurse",
      category: "Healthcare",
      shortDescription: "Provide patient care and support in hospitals and clinics.",
      fullDescription: "Nurses assess patient health, administer medications, and work with doctors to provide quality healthcare.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      salaryMin: 3000000,
      salaryMax: 8000000,
      currency: "RWF",
      requiredEducation: "Bachelor of Nursing",
      requiredSkills: ["Patient Care", "Medical Knowledge", "Communication"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata
      interestProfile: {
        realistic: 50,
        investigative: 70,
        artistic: 30,
        social: 95,
        enterprising: 40,
        conventional: 60,
      },
      valueProfile: {
        impact: 95,
        income: 55,
        autonomy: 50,
        balance: 50,
        growth: 70,
        stability: 85,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "intense",
        structure: "structured",
      },
    }));

    // Career 4: Medical Doctor
    careerIds.push(await ctx.db.insert("careers", {
      title: "Medical Doctor",
      category: "Healthcare",
      shortDescription: "Diagnose and treat illnesses, save lives.",
      fullDescription: "Doctors examine patients, diagnose diseases, and provide treatments.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
      salaryMin: 10000000,
      salaryMax: 30000000,
      currency: "RWF",
      requiredEducation: "Doctor of Medicine",
      requiredSkills: ["Medical Knowledge", "Decision Making", "Communication"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata (following ASSESSMENT_RESEARCH.md example)
      interestProfile: {
        realistic: 60,
        investigative: 95,
        artistic: 30,
        social: 90,
        enterprising: 40,
        conventional: 50,
      },
      valueProfile: {
        impact: 95,
        income: 80,
        autonomy: 50,
        balance: 30,
        growth: 85,
        stability: 90,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "intense",
        structure: "structured",
      },
    }));

    // Career 5: Civil Engineer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Civil Engineer",
      category: "Engineering",
      shortDescription: "Design infrastructure like roads and bridges.",
      fullDescription: "Civil engineers plan and oversee construction projects.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
      salaryMin: 4000000,
      salaryMax: 12000000,
      currency: "RWF",
      requiredEducation: "Bachelor in Civil Engineering",
      requiredSkills: ["AutoCAD", "Project Management", "Mathematics"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata
      interestProfile: {
        realistic: 80,
        investigative: 75,
        artistic: 45,
        social: 35,
        enterprising: 55,
        conventional: 70,
      },
      valueProfile: {
        impact: 80,
        income: 70,
        autonomy: 60,
        balance: 65,
        growth: 75,
        stability: 80,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "moderate",
        structure: "structured",
      },
    }));

    // Career 6: Architect
    careerIds.push(await ctx.db.insert("careers", {
      title: "Architect",
      category: "Engineering",
      shortDescription: "Design beautiful and functional buildings.",
      fullDescription: "Architects create building plans balancing aesthetics and functionality.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      salaryMin: 5000000,
      salaryMax: 15000000,
      currency: "RWF",
      requiredEducation: "Bachelor of Architecture",
      requiredSkills: ["Design", "3D Modeling", "Creativity"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata
      interestProfile: {
        realistic: 55,
        investigative: 70,
        artistic: 90,
        social: 40,
        enterprising: 60,
        conventional: 50,
      },
      valueProfile: {
        impact: 75,
        income: 75,
        autonomy: 85,
        balance: 60,
        growth: 80,
        stability: 65,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "flexible",
        structure: "flexible",
      },
    }));

    // Career 7: Teacher
    careerIds.push(await ctx.db.insert("careers", {
      title: "Secondary School Teacher",
      category: "Education",
      shortDescription: "Educate and inspire students.",
      fullDescription: "Teachers prepare lessons and create positive learning environments.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      salaryMin: 2500000,
      salaryMax: 6000000,
      currency: "RWF",
      requiredEducation: "Bachelor in Education",
      requiredSkills: ["Communication", "Patience", "Subject Expertise"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata (following ASSESSMENT_RESEARCH.md example)
      interestProfile: {
        realistic: 30,
        investigative: 50,
        artistic: 60,
        social: 95,
        enterprising: 55,
        conventional: 45,
      },
      valueProfile: {
        impact: 95,
        income: 50,
        autonomy: 60,
        balance: 70,
        growth: 75,
        stability: 80,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "moderate",
        structure: "structured",
      },
    }));

    // Career 8: Financial Analyst
    careerIds.push(await ctx.db.insert("careers", {
      title: "Financial Analyst",
      category: "Business",
      shortDescription: "Analyze financial data for businesses.",
      fullDescription: "Financial analysts study market trends and provide recommendations.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      salaryMin: 4000000,
      salaryMax: 12000000,
      currency: "RWF",
      requiredEducation: "Bachelor in Finance or Economics",
      requiredSkills: ["Financial Modeling", "Excel", "Analytical Thinking"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata (similar to Accountant from ASSESSMENT_RESEARCH.md)
      interestProfile: {
        realistic: 30,
        investigative: 80,
        artistic: 35,
        social: 40,
        enterprising: 60,
        conventional: 90,
      },
      valueProfile: {
        impact: 50,
        income: 80,
        autonomy: 55,
        balance: 70,
        growth: 75,
        stability: 90,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "steady",
        structure: "structured",
      },
    }));

    // Career 9: Marketing Manager
    careerIds.push(await ctx.db.insert("careers", {
      title: "Marketing Manager",
      category: "Business",
      shortDescription: "Promote products and build brands.",
      fullDescription: "Marketing managers develop strategies to promote products and manage campaigns.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      salaryMin: 3500000,
      salaryMax: 10000000,
      currency: "RWF",
      requiredEducation: "Bachelor in Marketing or Business",
      requiredSkills: ["Marketing Strategy", "Social Media", "Communication"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata (Enterprising + Social + Artistic)
      interestProfile: {
        realistic: 25,
        investigative: 50,
        artistic: 75,
        social: 70,
        enterprising: 90,
        conventional: 50,
      },
      valueProfile: {
        impact: 60,
        income: 75,
        autonomy: 70,
        balance: 65,
        growth: 85,
        stability: 60,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "intense",
        structure: "flexible",
      },
    }));

    // Career 10: Graphic Designer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Graphic Designer",
      category: "Creative",
      shortDescription: "Create visual content for brands.",
      fullDescription: "Graphic designers develop visual concepts for marketing and branding.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoThumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      salaryMin: 2500000,
      salaryMax: 7000000,
      currency: "RWF",
      requiredEducation: "Diploma in Graphic Design",
      requiredSkills: ["Adobe Creative Suite", "Creativity", "Typography"],
      careerPath: [],
      relatedCareerIds: [],
      views: 0,
      saves: 0,
      // Assessment metadata (following ASSESSMENT_RESEARCH.md example)
      interestProfile: {
        realistic: 30,
        investigative: 50,
        artistic: 95,
        social: 45,
        enterprising: 60,
        conventional: 40,
      },
      valueProfile: {
        impact: 60,
        income: 60,
        autonomy: 90,
        balance: 70,
        growth: 80,
        stability: 50,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "flexible",
        structure: "flexible",
      },
    }));

    // Create demo student user
    const demoStudentId = await ctx.db.insert("users", {
      tokenIdentifier: "demo-token-student-123",
      clerkId: "demo-clerk-student-123",
      email: "demo@student.com",
      firstName: "Jane",
      lastName: "Mukarwego",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JM&backgroundColor=ffb627",
      createdAt: Date.now(),
    });

    // Create student profile
    await ctx.db.insert("studentProfiles", {
      userId: demoStudentId,
      gradeLevel: "S5",
      school: "Lycée de Kigali",
      district: "Gasabo",
      interests: ["Technology", "Business"],
      careersExplored: 0,
      chatsCompleted: 0,
      chatsUpcoming: 0,
      assessmentsTaken: 0,
    });

    // Create professionals with users
    const professionals = [];

    // Prof 1: Jean Claude
    const user1Id = await ctx.db.insert("users", {
      tokenIdentifier: "demo-token-mentor-1",
      clerkId: "demo-clerk-mentor-1",
      email: "jean@andela.com",
      firstName: "Jean Claude",
      lastName: "Niyonsenga",
      role: "mentor",
      avatar: "https://i.pravatar.cc/150?img=12",
      createdAt: Date.now(),
    });
    professionals.push(await ctx.db.insert("professionals", {
      userId: user1Id,
      company: "Andela",
      jobTitle: "Senior Software Engineer",
      careerIds: ["career-1"],
      rating: 4.9,
      chatsCompleted: 47,
      availability: [{ dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }],
      bio: "8 years building scalable web applications.",
      yearsExperience: 8,
      calendlyUrl: "https://calendly.com/opportunitymap-demo/15min",
      totalEarnings: 4350000,
      earningsThisMonth: 420000,
      earningsLastMonth: 380000,
    }));

    // Prof 2: Marie Claire
    const user2Id = await ctx.db.insert("users", {
      tokenIdentifier: "demo-token-mentor-2",
      clerkId: "demo-clerk-mentor-2",
      email: "marie@zipline.com",
      firstName: "Marie Claire",
      lastName: "Uwase",
      role: "mentor",
      avatar: "https://i.pravatar.cc/150?img=45",
      createdAt: Date.now(),
    });
    professionals.push(await ctx.db.insert("professionals", {
      userId: user2Id,
      company: "Zipline",
      jobTitle: "Full Stack Developer",
      careerIds: ["career-1"],
      rating: 4.8,
      chatsCompleted: 32,
      availability: [{ dayOfWeek: 2, startTime: "10:00", endTime: "16:00" }],
      bio: "Building life-saving drone delivery systems.",
      yearsExperience: 5,
      calendlyUrl: "https://calendly.com/opportunitymap-demo/15min",
      totalEarnings: 2100000,
      earningsThisMonth: 280000,
      earningsLastMonth: 320000,
    }));

    // Prof 3: Patrick
    const user3Id = await ctx.db.insert("users", {
      tokenIdentifier: "demo-token-mentor-3",
      clerkId: "demo-clerk-mentor-3",
      email: "patrick@mtn.com",
      firstName: "Patrick",
      lastName: "Mugisha",
      role: "mentor",
      avatar: "https://i.pravatar.cc/150?img=33",
      createdAt: Date.now(),
    });
    professionals.push(await ctx.db.insert("professionals", {
      userId: user3Id,
      company: "MTN Rwanda",
      jobTitle: "Data Scientist",
      careerIds: ["career-2"],
      rating: 4.7,
      chatsCompleted: 28,
      availability: [{ dayOfWeek: 1, startTime: "13:00", endTime: "17:00" }],
      bio: "Analyzing telecom data to improve customer experience.",
      yearsExperience: 6,
      calendlyUrl: "https://calendly.com/opportunitymap-demo/15min",
      totalEarnings: 1800000,
      earningsThisMonth: 210000,
      earningsLastMonth: 240000,
    }));

    // Create assessment - 12-question RIASEC system
    const assessmentId = await ctx.db.insert("assessments", {
      type: "interests",
      title: "Career Discovery Assessment",
      description: "Discover careers that match your interests, skills, and goals using the RIASEC framework",
      icon: "❤️",
      duration: 5,
      questionCount: 12,
      questions: [
        // SECTION 1: INTERESTS (RIASEC) - Questions 1-8
        {
          id: "q1",
          text: "Which of these activities sounds most interesting to you?",
          type: "multiple_choice",
          options: [
            "Building or repairing things with your hands",
            "Researching how things work",
            "Creating art, music, or designs",
            "Helping people solve their problems",
            "Leading a team or starting a project",
            "Organizing data and keeping records",
          ],
        },
        {
          id: "q2",
          text: "You encounter a challenging problem. How do you prefer to solve it?",
          type: "multiple_choice",
          options: [
            "Try different solutions hands-on until something works",
            "Research and analyze data to find the best solution",
            "Think creatively and come up with innovative approaches",
            "Ask others for advice and collaborate",
            "Take charge and make quick decisions",
            "Follow proven procedures and guidelines",
          ],
        },
        {
          id: "q3",
          text: "Which work environment appeals to you most?",
          type: "multiple_choice",
          options: [
            "Workshop or outdoor setting with tools and equipment",
            "Laboratory or office with data and research",
            "Creative studio with freedom to express ideas",
            "Community setting helping and teaching others",
            "Dynamic office with meetings and presentations",
            "Structured office with clear processes",
          ],
        },
        {
          id: "q4",
          text: "Which daily activity would you find most fulfilling?",
          type: "multiple_choice",
          options: [
            "Operating machinery or equipment",
            "Analyzing data and finding patterns",
            "Designing, writing, or creating content",
            "Teaching or mentoring others",
            "Presenting ideas and convincing people",
            "Managing schedules and organizing tasks",
          ],
        },
        {
          id: "q5",
          text: "Which skill do you most enjoy using?",
          type: "multiple_choice",
          options: [
            "Physical coordination and technical skills",
            "Critical thinking and research skills",
            "Creative and artistic skills",
            "Communication and empathy",
            "Leadership and persuasion",
            "Attention to detail and organization",
          ],
        },
        {
          id: "q6",
          text: "You're assigned a group project. What role do you naturally take?",
          type: "multiple_choice",
          options: [
            "The builder - making the physical product",
            "The researcher - gathering information",
            "The designer - creating the visual/creative elements",
            "The communicator - presenting and coordinating",
            "The leader - organizing the team and delegating",
            "The planner - tracking deadlines and details",
          ],
        },
        {
          id: "q7",
          text: "How do you prefer to learn new things?",
          type: "multiple_choice",
          options: [
            "Hands-on practice and experimentation",
            "Reading, research, and independent study",
            "Creative exploration and self-expression",
            "Group discussions and collaborative learning",
            "Leading projects and learning by doing",
            "Step-by-step instructions and structured courses",
          ],
        },
        {
          id: "q8",
          text: "You feel most accomplished when you:",
          type: "multiple_choice",
          options: [
            "Build or fix something that works perfectly",
            "Discover new information or solve a complex problem",
            "Create something beautiful or original",
            "Help someone overcome a challenge",
            "Achieve a goal and lead others to success",
            "Complete tasks efficiently and accurately",
          ],
        },
        // SECTION 2: VALUES & PRIORITIES - Questions 9-12
        {
          id: "q9",
          text: "What matters most to you in a career?",
          type: "multiple_choice",
          options: [
            "High salary and financial security",
            "Making a positive impact on society",
            "Creative freedom and self-expression",
            "Work-life balance and personal time",
            "Career growth and advancement opportunities",
            "Job stability and clear expectations",
          ],
        },
        {
          id: "q10",
          text: "Where do you see yourself in 10-15 years?",
          type: "multiple_choice",
          options: [
            "Running my own business or being financially independent",
            "Being an expert/specialist in my field",
            "Creating work that inspires others",
            "Leading a team or organization making a difference",
            "Having a balanced life with time for family and hobbies",
            "Holding a respected position in a stable organization",
          ],
        },
        {
          id: "q11",
          text: "What work pace suits you best?",
          type: "multiple_choice",
          options: [
            "Fast-paced with variety and new challenges daily",
            "Moderate pace with focused deep work",
            "Flexible pace where I control my schedule",
            "Steady pace with regular routines",
            "Intense bursts with clear deadlines",
            "Predictable pace with minimal surprises",
          ],
        },
        {
          id: "q12",
          text: "How do you prefer to work?",
          type: "multiple_choice",
          options: [
            "Mostly alone with occasional collaboration",
            "Independently but part of a larger team",
            "In small teams (2-5 people)",
            "In large teams with lots of interaction",
            "Leading teams and managing people",
            "Following clear procedures with minimal interaction",
          ],
        },
      ],
    });

    return {
      message: "Database seeded successfully!",
      careers: careerIds.length,
      professionals: professionals.length,
      demoStudentId,
      assessmentId,
    };
  },
});

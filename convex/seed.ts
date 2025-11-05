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
    }));

    // Create demo student user
    const demoStudentId = await ctx.db.insert("users", {
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

    // Create assessment
    const assessmentId = await ctx.db.insert("assessments", {
      type: "interests",
      title: "Career Discovery Assessment",
      description: "Discover careers that match your interests, skills, and goals",
      icon: "❤️",
      duration: 10,
      questionCount: 5,
      questions: [
        {
          id: "q1",
          text: "Which activities do you enjoy most in your free time?",
          type: "multiple_choice",
          options: [
            "Writing code, solving puzzles, or working with technology",
            "Helping others, teaching, or volunteering",
            "Creating art, designing, or making things",
            "Organizing events, leading groups, or planning projects",
          ],
        },
        {
          id: "q2",
          text: "What subjects do you find most interesting in school?",
          type: "multiple_choice",
          options: [
            "Mathematics and Physics",
            "Biology and Chemistry",
            "Languages and Literature",
            "History and Social Studies",
          ],
        },
        {
          id: "q3",
          text: "How do you prefer to work?",
          type: "multiple_choice",
          options: [
            "Independently, with minimal supervision",
            "In a small team with close collaboration",
            "In a large organization with clear structure",
            "Mix of independent and team work",
          ],
        },
        {
          id: "q4",
          text: "What kind of work environment appeals to you?",
          type: "multiple_choice",
          options: [
            "Office or indoor workspace",
            "Outdoor or field work",
            "Mix of office and travel",
            "Remote or work from anywhere",
          ],
        },
        {
          id: "q5",
          text: "Which skill comes most naturally to you?",
          type: "multiple_choice",
          options: [
            "Analyzing problems and finding solutions",
            "Communicating and connecting with people",
            "Creating and designing new things",
            "Managing and organizing tasks",
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

import { internalMutation } from "./_generated/server";

// Clear all assessments from database
export const clearAssessments = internalMutation({
  args: {},
  handler: async (ctx) => {
    const assessments = await ctx.db.query("assessments").collect();
    let deleted = 0;
    
    for (const assessment of assessments) {
      await ctx.db.delete(assessment._id);
      deleted++;
    }
    
    return { deleted };
  },
});

// Clear all careers from database
export const clearCareers = internalMutation({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    let deleted = 0;
    
    for (const career of careers) {
      await ctx.db.delete(career._id);
      deleted++;
    }
    
    return { deleted };
  },
});

// Clear all professionals from database (except real users)
export const clearProfessionals = internalMutation({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();
    let deleted = 0;
    
    // Only delete demo/seed professionals
    for (const prof of professionals) {
      const user = await ctx.db.get(prof.userId);
      if (user) {
        // Delete if it's a demo user (has demo identifiers) OR if email is from demo domain
        const isDemoUser = 
          user.clerkId?.startsWith('demo-clerk-mentor') || 
          user.tokenIdentifier?.startsWith('demo-token-mentor') ||
          user.email?.includes('@andela.com') ||
          user.email?.includes('@zipline.com') ||
          user.email?.includes('@mtn.com');
        
        if (isDemoUser) {
          await ctx.db.delete(prof._id);
          // Also delete the associated user
          await ctx.db.delete(prof.userId);
          deleted++;
        }
      }
    }
    return { deleted };
  },
});

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

    // Career 11: Agricultural Officer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Agricultural Officer",
      category: "Agriculture",
      shortDescription: "Improve farming practices and crop yields across Rwanda.",
      fullDescription: "Agricultural officers work with farmers to implement modern farming techniques, improve crop yields, and ensure food security. You'll provide training, manage agricultural projects, and promote sustainable farming practices across rural communities.",
      videoUrl: "https://www.youtube.com/embed/wVjnr4HV-k8",
      videoThumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      salaryMin: 3000000,
      salaryMax: 8000000,
      currency: "RWF",
      requiredEducation: "Bachelor's Degree in Agriculture or Agronomy",
      requiredSkills: ["Crop Management", "Soil Science", "Community Training", "Project Management", "Sustainability"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Focus on Biology, Chemistry, and Agriculture. Join FFA or 4-H clubs.",
          requirements: ["Good grades in Sciences", "Interest in farming"],
        },
        {
          stage: "University",
          duration: "4 years",
          description: "Earn Bachelor's in Agriculture, Agronomy, or Agricultural Economics.",
          requirements: ["A-Level certificate in Sciences"],
          estimatedCost: 6000000,
        },
        {
          stage: "Field Training",
          duration: "1-2 years",
          description: "Work with NGOs or Ministry of Agriculture gaining practical experience.",
          requirements: ["University degree", "Field work experience"],
          estimatedCost: 500000,
        },
        {
          stage: "Senior Agricultural Officer",
          duration: "3-5 years",
          description: "Lead agricultural programs, manage teams, and advise government policy.",
          requirements: ["5+ years experience", "Proven project success"],
        },
      ],
      relatedCareerIds: ["career-11", "career-12", "career-13"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 85,
        investigative: 70,
        artistic: 20,
        social: 75,
        enterprising: 50,
        conventional: 60,
      },
      valueProfile: {
        impact: 95,
        income: 50,
        autonomy: 60,
        balance: 65,
        growth: 70,
        stability: 75,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "steady",
        structure: "structured",
      },
      dayInLife: [
        { time: "07:00 AM", activity: "Visit farms and inspect crop conditions" },
        { time: "09:30 AM", activity: "Train farmers on modern irrigation techniques" },
        { time: "12:00 PM", activity: "Lunch break and field notes documentation" },
        { time: "01:30 PM", activity: "Meet with cooperative leaders to discuss harvest plans" },
        { time: "03:30 PM", activity: "Analyze soil samples and recommend fertilizers" },
        { time: "05:00 PM", activity: "Prepare reports for Ministry of Agriculture" },
      ],
    }));

    // Career 12: Tourism & Hospitality Manager
    careerIds.push(await ctx.db.insert("careers", {
      title: "Tourism & Hospitality Manager",
      category: "Tourism",
      shortDescription: "Manage hotels, lodges, and tourism experiences showcasing Rwanda.",
      fullDescription: "Tourism managers oversee operations at hotels, lodges, and tourism sites, ensuring exceptional guest experiences. You'll manage staff, coordinate bookings, develop marketing strategies, and promote Rwanda's natural beauty and cultural heritage to international visitors.",
      videoUrl: "https://www.youtube.com/embed/BnDkFfFpqRw",
      videoThumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      salaryMin: 4000000,
      salaryMax: 12000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Tourism Management or Hospitality",
      requiredSkills: ["Customer Service", "Operations Management", "Marketing", "Languages", "Cultural Knowledge"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Study Languages, Business, and Geography. Work part-time in hospitality.",
          requirements: ["Good communication skills", "Interest in tourism"],
        },
        {
          stage: "University/Diploma",
          duration: "3-4 years",
          description: "Earn degree in Tourism Management, Hospitality, or Business Administration.",
          requirements: ["A-Level certificate", "Language proficiency"],
          estimatedCost: 7000000,
        },
        {
          stage: "Front Desk/Assistant Manager",
          duration: "2-3 years",
          description: "Start in operations roles at hotels or lodges, learn the business.",
          requirements: ["University degree", "Customer service experience"],
          estimatedCost: 1000000,
        },
        {
          stage: "General Manager",
          duration: "5+ years",
          description: "Oversee entire property operations, staff, and guest experiences.",
          requirements: ["5+ years hospitality experience", "Management certification"],
        },
      ],
      relatedCareerIds: ["career-12", "career-13", "career-9"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 30,
        investigative: 40,
        artistic: 60,
        social: 90,
        enterprising: 85,
        conventional: 55,
      },
      valueProfile: {
        impact: 70,
        income: 75,
        autonomy: 65,
        balance: 60,
        growth: 80,
        stability: 70,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "intense",
        structure: "flexible",
      },
      dayInLife: [
        { time: "08:00 AM", activity: "Review overnight occupancy reports and guest feedback" },
        { time: "09:30 AM", activity: "Walk through property checking cleanliness and service quality" },
        { time: "11:00 AM", activity: "Meet with department heads (housekeeping, kitchen, front desk)" },
        { time: "01:00 PM", activity: "Lunch with VIP guests or travel agents" },
        { time: "02:30 PM", activity: "Review marketing campaigns and booking analytics" },
        { time: "05:00 PM", activity: "Handle guest complaints and ensure issue resolution" },
      ],
    }));

    // Career 13: Renewable Energy Technician
    careerIds.push(await ctx.db.insert("careers", {
      title: "Renewable Energy Technician",
      category: "Energy",
      shortDescription: "Install and maintain solar panels, biogas systems, and clean energy solutions.",
      fullDescription: "Renewable energy technicians install, maintain, and repair solar panels, biogas systems, and other clean energy infrastructure. You'll work on rural electrification projects, troubleshoot technical issues, and help Rwanda achieve its clean energy goals.",
      videoUrl: "https://www.youtube.com/embed/eC9_hNijEy8",
      videoThumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      salaryMin: 3500000,
      salaryMax: 9000000,
      currency: "RWF",
      requiredEducation: "Diploma in Electrical Engineering or Renewable Energy",
      requiredSkills: ["Electrical Systems", "Solar Installation", "Troubleshooting", "Safety Protocols", "Technical Documentation"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Focus on Physics, Mathematics, and Technical Drawing. Join STEM clubs.",
          requirements: ["Strong in Math and Physics", "Hands-on interest"],
        },
        {
          stage: "Technical Training/Diploma",
          duration: "2-3 years",
          description: "Complete diploma in Electrical Engineering, Renewable Energy, or Technical Skills.",
          requirements: ["A-Level certificate in Sciences"],
          estimatedCost: 4000000,
        },
        {
          stage: "Field Technician",
          duration: "2-4 years",
          description: "Install and maintain solar systems with companies like Bboxx or Ignite.",
          requirements: ["Diploma", "Certification in solar installation"],
          estimatedCost: 800000,
        },
        {
          stage: "Senior Technician/Project Lead",
          duration: "3-5 years",
          description: "Manage installation teams and oversee large-scale energy projects.",
          requirements: ["5+ years experience", "Project management skills"],
        },
      ],
      relatedCareerIds: ["career-4", "career-13", "career-14"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 90,
        investigative: 75,
        artistic: 20,
        social: 40,
        enterprising: 50,
        conventional: 60,
      },
      valueProfile: {
        impact: 90,
        income: 65,
        autonomy: 55,
        balance: 70,
        growth: 75,
        stability: 80,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "moderate",
        structure: "structured",
      },
      dayInLife: [
        { time: "07:30 AM", activity: "Load tools and equipment into service vehicle" },
        { time: "09:00 AM", activity: "Drive to installation site and inspect solar panel placement" },
        { time: "11:00 AM", activity: "Install solar panels, inverters, and battery systems" },
        { time: "01:00 PM", activity: "Lunch break at site" },
        { time: "02:00 PM", activity: "Test system performance and troubleshoot issues" },
        { time: "04:30 PM", activity: "Train customer on system operation and maintenance" },
      ],
    }));

    // Career 14: Mining Engineer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Mining Engineer",
      category: "Engineering",
      shortDescription: "Extract minerals safely and sustainably from Rwanda's rich deposits.",
      fullDescription: "Mining engineers design and manage mining operations for minerals like cassiterite, coltan, and tungsten. You'll ensure safe extraction, environmental compliance, and efficient processing of mineral resources while supporting Rwanda's mining industry growth.",
      videoUrl: "https://www.youtube.com/embed/6JwEYamjXpA",
      videoThumbnail: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800",
      salaryMin: 6000000,
      salaryMax: 18000000,
      currency: "RWF",
      requiredEducation: "Bachelor's Degree in Mining Engineering or Geology",
      requiredSkills: ["Mining Operations", "Geology", "Safety Management", "Environmental Compliance", "CAD Software"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Excel in Physics, Chemistry, Mathematics. Visit mining sites if possible.",
          requirements: ["Top grades in Sciences", "Interest in geology"],
        },
        {
          stage: "University",
          duration: "4-5 years",
          description: "Earn Bachelor's in Mining Engineering, Geological Engineering, or Geology.",
          requirements: ["A-Level in Sciences", "University entrance exam"],
          estimatedCost: 10000000,
        },
        {
          stage: "Junior Mining Engineer",
          duration: "3-5 years",
          description: "Work on mining sites with companies supervising extraction operations.",
          requirements: ["Engineering degree", "Mining safety certification"],
          estimatedCost: 1500000,
        },
        {
          stage: "Senior Mining Engineer/Site Manager",
          duration: "5+ years",
          description: "Lead mining projects, manage teams, and ensure regulatory compliance.",
          requirements: ["Professional Engineering license", "5+ years experience"],
        },
      ],
      relatedCareerIds: ["career-4", "career-14", "career-13"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 80,
        investigative: 85,
        artistic: 20,
        social: 40,
        enterprising: 60,
        conventional: 70,
      },
      valueProfile: {
        impact: 70,
        income: 90,
        autonomy: 60,
        balance: 50,
        growth: 75,
        stability: 80,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "intense",
        structure: "structured",
      },
      dayInLife: [
        { time: "06:30 AM", activity: "Morning safety briefing with mining crew" },
        { time: "08:00 AM", activity: "Inspect mining site and equipment for safety compliance" },
        { time: "10:00 AM", activity: "Review geological surveys and plan extraction zones" },
        { time: "12:00 PM", activity: "Lunch break and administrative work" },
        { time: "01:30 PM", activity: "Supervise drilling and blasting operations" },
        { time: "04:00 PM", activity: "Analyze mineral samples and update production reports" },
      ],
    }));

    // Career 15: Mobile Money Agent/Fintech Specialist
    careerIds.push(await ctx.db.insert("careers", {
      title: "Mobile Money Agent / Fintech Specialist",
      category: "Finance",
      shortDescription: "Manage mobile banking services and digital financial solutions.",
      fullDescription: "Mobile money agents operate MoMo kiosks and help customers with digital transactions. Fintech specialists develop and manage digital financial products, expand cashless payment systems, and improve financial inclusion across Rwanda.",
      videoUrl: "https://www.youtube.com/embed/tS7BTmgS2Cw",
      videoThumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      salaryMin: 2500000,
      salaryMax: 10000000,
      currency: "RWF",
      requiredEducation: "Diploma in Business or Finance (Agent), Bachelor's for Specialist",
      requiredSkills: ["Customer Service", "Financial Literacy", "Mobile Technology", "Risk Management", "Digital Systems"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Study Mathematics, Economics, and Computer Science. Use mobile money daily.",
          requirements: ["Good numeracy", "Interest in technology"],
        },
        {
          stage: "Agent Training/Diploma",
          duration: "6 months - 3 years",
          description: "Complete agent certification (MTN, Airtel) or Business/Finance diploma.",
          requirements: ["High school certificate", "Capital for agent setup"],
          estimatedCost: 3000000,
        },
        {
          stage: "Mobile Money Agent/Junior Fintech Analyst",
          duration: "2-4 years",
          description: "Operate MoMo kiosk or work at fintech company on digital products.",
          requirements: ["Agent license or degree", "Customer service experience"],
          estimatedCost: 1000000,
        },
        {
          stage: "Fintech Manager/Senior Agent Network",
          duration: "5+ years",
          description: "Manage agent networks, develop new products, or expand operations.",
          requirements: ["Proven success in digital finance", "Management skills"],
        },
      ],
      relatedCareerIds: ["career-8", "career-15", "career-1"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 40,
        investigative: 60,
        artistic: 30,
        social: 80,
        enterprising: 85,
        conventional: 75,
      },
      valueProfile: {
        impact: 85,
        income: 70,
        autonomy: 75,
        balance: 65,
        growth: 90,
        stability: 70,
      },
      workEnvironment: {
        teamSize: "independent",
        pace: "intense",
        structure: "flexible",
      },
      dayInLife: [
        { time: "08:00 AM", activity: "Open MoMo kiosk and verify cash float" },
        { time: "09:30 AM", activity: "Process customer withdrawals, deposits, and bill payments" },
        { time: "12:00 PM", activity: "Balance transactions and reconcile accounts" },
        { time: "01:00 PM", activity: "Lunch break and restock supplies" },
        { time: "02:00 PM", activity: "Assist customers with mobile wallet issues" },
        { time: "05:30 PM", activity: "Close kiosk, submit daily reports to network" },
      ],
    }));

    // Career 16: Construction Manager
    careerIds.push(await ctx.db.insert("careers", {
      title: "Construction Manager",
      category: "Construction",
      shortDescription: "Oversee building projects from roads to housing developments.",
      fullDescription: "Construction managers plan, coordinate, and supervise building projects including roads, bridges, housing, and commercial developments. You'll manage budgets, schedules, contractors, and ensure projects meet safety and quality standards.",
      videoUrl: "https://www.youtube.com/embed/K7GNfRKhJN0",
      videoThumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
      salaryMin: 5000000,
      salaryMax: 15000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Civil Engineering or Construction Management",
      requiredSkills: ["Project Management", "Budgeting", "Blueprint Reading", "Team Leadership", "Safety Compliance"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Focus on Math, Physics, and Technical Drawing. Visit construction sites.",
          requirements: ["Strong in Mathematics", "Interest in building"],
        },
        {
          stage: "University",
          duration: "4 years",
          description: "Earn Bachelor's in Civil Engineering or Construction Management.",
          requirements: ["A-Level in Sciences", "University entrance exam"],
          estimatedCost: 9000000,
        },
        {
          stage: "Site Engineer/Assistant Manager",
          duration: "3-5 years",
          description: "Work on construction sites supervising teams and ensuring quality.",
          requirements: ["Engineering degree", "Site experience"],
          estimatedCost: 1000000,
        },
        {
          stage: "Construction Manager/Project Director",
          duration: "5+ years",
          description: "Lead entire construction projects managing budgets and timelines.",
          requirements: ["5+ years experience", "PMP certification"],
        },
      ],
      relatedCareerIds: ["career-4", "career-5", "career-16"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 75,
        investigative: 60,
        artistic: 40,
        social: 50,
        enterprising: 80,
        conventional: 70,
      },
      valueProfile: {
        impact: 80,
        income: 85,
        autonomy: 70,
        balance: 50,
        growth: 75,
        stability: 75,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "deadline-driven",
        structure: "structured",
      },
      dayInLife: [
        { time: "07:00 AM", activity: "Site walk and safety inspection before crew arrives" },
        { time: "08:30 AM", activity: "Morning meeting with contractors and subcontractors" },
        { time: "10:00 AM", activity: "Review blueprints and address construction challenges" },
        { time: "12:00 PM", activity: "Lunch break and budget review" },
        { time: "01:30 PM", activity: "Supervise concrete pouring or structural work" },
        { time: "04:00 PM", activity: "Update project timeline and order materials" },
      ],
    }));

    // Career 17: Environmental Scientist
    careerIds.push(await ctx.db.insert("careers", {
      title: "Environmental Scientist",
      category: "Environment",
      shortDescription: "Protect Rwanda's ecosystems through research and conservation.",
      fullDescription: "Environmental scientists study air, water, and soil quality, conduct environmental impact assessments, and develop conservation strategies. You'll work on protecting Rwanda's biodiversity, managing national parks, and ensuring sustainable development practices.",
      videoUrl: "https://www.youtube.com/embed/nMdoxX6mAhw",
      videoThumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      salaryMin: 4000000,
      salaryMax: 11000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Environmental Science or Biology",
      requiredSkills: ["Research Methods", "Data Analysis", "Environmental Policy", "GIS Software", "Report Writing"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Excel in Biology, Chemistry, and Geography. Join environmental clubs.",
          requirements: ["Strong in Sciences", "Passion for conservation"],
        },
        {
          stage: "University",
          duration: "4 years",
          description: "Earn Bachelor's in Environmental Science, Biology, or Ecology.",
          requirements: ["A-Level in Sciences", "Field research interest"],
          estimatedCost: 8000000,
        },
        {
          stage: "Research Assistant/Field Officer",
          duration: "2-4 years",
          description: "Conduct field research with Rwanda Development Board or conservation NGOs.",
          requirements: ["University degree", "Research experience"],
          estimatedCost: 1000000,
        },
        {
          stage: "Environmental Consultant/Senior Scientist",
          duration: "5+ years",
          description: "Lead environmental impact assessments and conservation programs.",
          requirements: ["Master's degree (optional)", "5+ years experience"],
        },
      ],
      relatedCareerIds: ["career-11", "career-17", "career-3"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 50,
        investigative: 90,
        artistic: 30,
        social: 60,
        enterprising: 40,
        conventional: 65,
      },
      valueProfile: {
        impact: 95,
        income: 60,
        autonomy: 70,
        balance: 75,
        growth: 75,
        stability: 70,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "moderate",
        structure: "flexible",
      },
      dayInLife: [
        { time: "08:00 AM", activity: "Review environmental monitoring data from field stations" },
        { time: "10:00 AM", activity: "Conduct water quality tests at Lake Kivu" },
        { time: "12:00 PM", activity: "Lunch break and data entry" },
        { time: "01:30 PM", activity: "Visit Volcanoes National Park for gorilla habitat assessment" },
        { time: "03:30 PM", activity: "Meet with community leaders about conservation practices" },
        { time: "05:00 PM", activity: "Write environmental impact report for new project" },
      ],
    }));

    // Career 18: Logistics Coordinator
    careerIds.push(await ctx.db.insert("careers", {
      title: "Logistics Coordinator",
      category: "Supply Chain",
      shortDescription: "Manage supply chains and transportation for businesses across Rwanda.",
      fullDescription: "Logistics coordinators plan and manage the movement of goods, coordinate shipments, optimize supply chains, and ensure timely delivery. You'll work with importers, exporters, and local businesses to streamline operations and reduce costs.",
      videoUrl: "https://www.youtube.com/embed/g5Xpbqwl_Bs",
      videoThumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
      salaryMin: 3500000,
      salaryMax: 10000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Supply Chain Management or Business",
      requiredSkills: ["Supply Chain Planning", "Inventory Management", "Negotiation", "ERP Systems", "Problem Solving"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Study Business, Economics, and Mathematics. Learn about trade.",
          requirements: ["Good organizational skills", "Interest in business"],
        },
        {
          stage: "University/Diploma",
          duration: "3-4 years",
          description: "Earn degree in Supply Chain, Logistics, or Business Administration.",
          requirements: ["A-Level certificate", "Business aptitude"],
          estimatedCost: 7000000,
        },
        {
          stage: "Logistics Assistant/Coordinator",
          duration: "2-4 years",
          description: "Manage shipments and coordinate with warehouses and transport companies.",
          requirements: ["University degree", "ERP software knowledge"],
          estimatedCost: 800000,
        },
        {
          stage: "Logistics Manager/Supply Chain Director",
          duration: "5+ years",
          description: "Oversee entire supply chain operations for companies or branches.",
          requirements: ["5+ years experience", "Professional certification (CSCMP)"],
        },
      ],
      relatedCareerIds: ["career-8", "career-18", "career-16"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 40,
        investigative: 60,
        artistic: 20,
        social: 55,
        enterprising: 75,
        conventional: 85,
      },
      valueProfile: {
        impact: 65,
        income: 75,
        autonomy: 60,
        balance: 70,
        growth: 80,
        stability: 80,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "deadline-driven",
        structure: "structured",
      },
      dayInLife: [
        { time: "08:00 AM", activity: "Check shipment status and track deliveries in system" },
        { time: "09:30 AM", activity: "Coordinate with customs for import clearance" },
        { time: "11:00 AM", activity: "Negotiate rates with transport companies" },
        { time: "12:30 PM", activity: "Lunch break and review inventory levels" },
        { time: "01:30 PM", activity: "Plan next week's shipment schedule and routes" },
        { time: "04:00 PM", activity: "Resolve delivery delays and update clients" },
      ],
    }));

    // Career 19: Digital Marketer
    careerIds.push(await ctx.db.insert("careers", {
      title: "Digital Marketer",
      category: "Marketing",
      shortDescription: "Grow brands online through social media, SEO, and digital campaigns.",
      fullDescription: "Digital marketers create and execute online marketing strategies using social media, search engines, email, and content. You'll help Rwandan businesses reach customers, build brand awareness, and drive sales through digital channels.",
      videoUrl: "https://www.youtube.com/embed/iYdyQYGGSMo",
      videoThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      salaryMin: 3000000,
      salaryMax: 9000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Marketing, Communications, or self-taught",
      requiredSkills: ["Social Media Marketing", "SEO/SEM", "Content Creation", "Analytics", "Copywriting"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Study Languages, Business, and ICT. Build social media presence.",
          requirements: ["Good communication", "Interest in online trends"],
        },
        {
          stage: "University/Bootcamp",
          duration: "3 years or 3-6 months",
          description: "Earn Marketing degree or complete digital marketing bootcamp/courses.",
          requirements: ["A-Level certificate or self-learning"],
          estimatedCost: 5000000,
        },
        {
          stage: "Social Media Coordinator/Digital Marketing Associate",
          duration: "2-3 years",
          description: "Manage social accounts, run ads, and create content for brands.",
          requirements: ["Portfolio of campaigns", "Google Ads/Meta certification"],
          estimatedCost: 500000,
        },
        {
          stage: "Digital Marketing Manager",
          duration: "3-5 years",
          description: "Lead marketing teams, manage budgets, and develop strategies.",
          requirements: ["Proven campaign success", "Team management skills"],
        },
      ],
      relatedCareerIds: ["career-10", "career-19", "career-9"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 20,
        investigative: 50,
        artistic: 75,
        social: 70,
        enterprising: 85,
        conventional: 45,
      },
      valueProfile: {
        impact: 70,
        income: 70,
        autonomy: 80,
        balance: 75,
        growth: 90,
        stability: 60,
      },
      workEnvironment: {
        teamSize: "small",
        pace: "flexible",
        structure: "flexible",
      },
      dayInLife: [
        { time: "08:30 AM", activity: "Check social media analytics and engagement metrics" },
        { time: "10:00 AM", activity: "Create content calendar and draft posts" },
        { time: "11:30 AM", activity: "Design graphics using Canva or Adobe Creative Suite" },
        { time: "01:00 PM", activity: "Lunch break and competitor research" },
        { time: "02:00 PM", activity: "Launch Facebook/Instagram ad campaigns" },
        { time: "04:30 PM", activity: "Analyze campaign performance and optimize ads" },
      ],
    }));

    // Career 20: Healthcare Administrator
    careerIds.push(await ctx.db.insert("careers", {
      title: "Healthcare Administrator",
      category: "Healthcare",
      shortDescription: "Manage hospital operations, clinics, and healthcare facilities.",
      fullDescription: "Healthcare administrators oversee the business side of hospitals and clinics, managing budgets, staff, patient services, and regulatory compliance. You'll ensure healthcare facilities run efficiently while maintaining quality patient care.",
      videoUrl: "https://www.youtube.com/embed/bGnF0tr5uyQ",
      videoThumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
      salaryMin: 4500000,
      salaryMax: 13000000,
      currency: "RWF",
      requiredEducation: "Bachelor's in Healthcare Administration or Public Health",
      requiredSkills: ["Healthcare Management", "Budgeting", "Policy Compliance", "Staff Management", "Healthcare IT"],
      careerPath: [
        {
          stage: "High School (S4-S6)",
          duration: "3 years",
          description: "Study Biology, Business, and Mathematics. Volunteer at health centers.",
          requirements: ["Good grades", "Interest in healthcare and management"],
        },
        {
          stage: "University",
          duration: "4 years",
          description: "Earn Bachelor's in Healthcare Administration, Public Health, or Business.",
          requirements: ["A-Level certificate", "Healthcare interest"],
          estimatedCost: 8000000,
        },
        {
          stage: "Administrative Assistant/Department Coordinator",
          duration: "2-4 years",
          description: "Work in hospital departments managing schedules, budgets, staff.",
          requirements: ["University degree", "Healthcare knowledge"],
          estimatedCost: 1000000,
        },
        {
          stage: "Hospital Administrator/Health Center Director",
          duration: "5+ years",
          description: "Lead entire healthcare facility operations and strategic planning.",
          requirements: ["Master's degree (optional)", "5+ years experience"],
        },
      ],
      relatedCareerIds: ["career-3", "career-20", "career-2"],
      views: 0,
      saves: 0,
      interestProfile: {
        realistic: 25,
        investigative: 60,
        artistic: 30,
        social: 80,
        enterprising: 75,
        conventional: 85,
      },
      valueProfile: {
        impact: 90,
        income: 75,
        autonomy: 65,
        balance: 65,
        growth: 75,
        stability: 85,
      },
      workEnvironment: {
        teamSize: "large",
        pace: "intense",
        structure: "structured",
      },
      dayInLife: [
        { time: "07:30 AM", activity: "Review overnight patient admissions and bed availability" },
        { time: "09:00 AM", activity: "Meet with department heads (nursing, pharmacy, lab)" },
        { time: "11:00 AM", activity: "Review budget reports and approve purchases" },
        { time: "01:00 PM", activity: "Lunch break and policy review" },
        { time: "02:00 PM", activity: "Handle patient complaints and staff issues" },
        { time: "04:30 PM", activity: "Plan staffing schedules and quality improvement initiatives" },
      ],
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
      rating: 5.0,
      chatsCompleted: 0,
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
      rating: 5.0,
      chatsCompleted: 0,
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
      rating: 5.0,
      chatsCompleted: 0,
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

// Refresh assessments: Clear old ones and create ONE clean 12-question RIASEC assessment
export const refreshAssessments = internalMutation({
  args: {},
  handler: async (ctx) => {
    // First, clear all existing assessments
    const assessments = await ctx.db.query("assessments").collect();
    let deleted = 0;
    
    for (const assessment of assessments) {
      await ctx.db.delete(assessment._id);
      deleted++;
    }

    // Create ONE clean 12-question RIASEC assessment
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
      message: "Assessments refreshed successfully!",
      deleted,
      created: 1,
      assessmentId,
    };
  },
});

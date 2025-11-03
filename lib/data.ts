import { Career, Professional, Assessment } from "./types";

// CAREERS DATA - 20+ career profiles
export const careers: Career[] = [
  {
    id: "career-1",
    title: "Software Developer",
    category: "Technology",
    shortDescription: "Build applications and solve problems with code to create digital solutions.",
    fullDescription: "Software developers design, create, and maintain computer programs and applications. You'll write code, debug software, collaborate with teams, and continuously learn new technologies. This career offers flexibility, high earning potential, and the ability to work remotely.",
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
      {
        stage: "Junior Developer",
        duration: "1-3 years",
        description: "Start building real applications, learn from senior developers.",
        requirements: ["Bachelor's degree", "Portfolio of projects", "Internship experience"],
      },
      {
        stage: "Senior Developer",
        duration: "3-5 years",
        description: "Lead projects, mentor juniors, architect complex systems.",
      },
    ],
    professionalsAvailable: ["prof-1", "prof-2"],
    relatedCareers: ["career-2", "career-3", "career-19"],
    sponsoredBy: {
      companyName: "Andela",
      companyLogo: "https://via.placeholder.com/150?text=Andela",
    },
    views: 1247,
    saves: 89,
  },
  {
    id: "career-2",
    title: "Data Scientist",
    category: "Technology",
    shortDescription: "Analyze data to extract insights and help businesses make informed decisions.",
    fullDescription: "Data scientists collect, process, and analyze large datasets to uncover patterns and trends. You'll use statistics, machine learning, and programming to solve business problems.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    salaryMin: 6000000,
    salaryMax: 18000000,
    currency: "RWF",
    requiredEducation: "Bachelor's Degree in Mathematics or Statistics",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    careerPath: [
      {
        stage: "High School",
        duration: "3 years",
        description: "Excel in mathematics and statistics.",
      },
      {
        stage: "University",
        duration: "4 years",
        description: "Study Mathematics, Statistics, or Data Science.",
        estimatedCost: 9000000,
      },
    ],
    professionalsAvailable: ["prof-3"],
    relatedCareers: ["career-1", "career-3"],
  },
  {
    id: "career-3",
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
    professionalsAvailable: ["prof-5"],
    relatedCareers: ["career-4"],
  },
  {
    id: "career-4",
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
    professionalsAvailable: ["prof-6"],
    relatedCareers: ["career-3"],
  },
  {
    id: "career-5",
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
    professionalsAvailable: ["prof-8"],
    relatedCareers: ["career-6"],
  },
  {
    id: "career-6",
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
    professionalsAvailable: ["prof-9"],
    relatedCareers: ["career-5"],
  },
  {
    id: "career-7",
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
    professionalsAvailable: [],
    relatedCareers: [],
  },
  {
    id: "career-8",
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
    professionalsAvailable: [],
    relatedCareers: [],
  },
  {
    id: "career-9",
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
    professionalsAvailable: [],
    relatedCareers: [],
  },
  {
    id: "career-10",
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
    professionalsAvailable: [],
    relatedCareers: [],
  },
];

// PROFESSIONALS DATA
export const professionals: Professional[] = [
  {
    id: "prof-1",
    name: "Jean Claude Niyonsenga",
    avatar: "https://i.pravatar.cc/150?img=12",
    company: "Andela",
    jobTitle: "Senior Software Engineer",
    careerIds: ["career-1"],
    rating: 4.9,
    chatsCompleted: 47,
    bio: "8 years building scalable web applications.",
    yearsExperience: 8,
    availability: [
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
    ],
  },
  {
    id: "prof-2",
    name: "Marie Claire Uwase",
    avatar: "https://i.pravatar.cc/150?img=45",
    company: "Zipline",
    jobTitle: "Full Stack Developer",
    careerIds: ["career-1"],
    rating: 4.8,
    chatsCompleted: 32,
    bio: "Building life-saving drone delivery systems.",
    yearsExperience: 5,
    availability: [
      { dayOfWeek: 2, startTime: "10:00", endTime: "16:00" },
    ],
  },
  {
    id: "prof-3",
    name: "Patrick Mugisha",
    avatar: "https://i.pravatar.cc/150?img=33",
    company: "MTN Rwanda",
    jobTitle: "Data Scientist",
    careerIds: ["career-2"],
    rating: 4.7,
    chatsCompleted: 28,
    bio: "Analyzing telecom data to improve customer experience.",
    yearsExperience: 6,
    availability: [
      { dayOfWeek: 1, startTime: "13:00", endTime: "17:00" },
    ],
  },
  {
    id: "prof-5",
    name: "Grace Mukamazera",
    avatar: "https://i.pravatar.cc/150?img=38",
    company: "King Faisal Hospital",
    jobTitle: "Registered Nurse",
    careerIds: ["career-3"],
    rating: 4.9,
    chatsCompleted: 41,
    bio: "10 years in emergency and intensive care.",
    yearsExperience: 10,
    availability: [
      { dayOfWeek: 1, startTime: "08:00", endTime: "12:00" },
    ],
  },
  {
    id: "prof-6",
    name: "Dr. David Gasana",
    avatar: "https://i.pravatar.cc/150?img=60",
    company: "Rwanda Military Hospital",
    jobTitle: "General Practitioner",
    careerIds: ["career-4"],
    rating: 5.0,
    chatsCompleted: 23,
    bio: "Family medicine physician serving communities.",
    yearsExperience: 12,
    availability: [
      { dayOfWeek: 0, startTime: "10:00", endTime: "14:00" },
    ],
  },
  {
    id: "prof-8",
    name: "Eric Habimana",
    avatar: "https://i.pravatar.cc/150?img=56",
    company: "MININFRA",
    jobTitle: "Civil Engineer",
    careerIds: ["career-5"],
    rating: 4.7,
    chatsCompleted: 26,
    bio: "Building Rwanda's infrastructure.",
    yearsExperience: 9,
    availability: [
      { dayOfWeek: 2, startTime: "14:00", endTime: "17:00" },
    ],
  },
  {
    id: "prof-9",
    name: "Sandrine Uwamahoro",
    avatar: "https://i.pravatar.cc/150?img=44",
    company: "Mass Design Group",
    jobTitle: "Architect",
    careerIds: ["career-6"],
    rating: 4.9,
    chatsCompleted: 34,
    bio: "Designing sustainable buildings.",
    yearsExperience: 8,
    availability: [
      { dayOfWeek: 1, startTime: "10:00", endTime: "14:00" },
    ],
  },
];

// ASSESSMENTS DATA
export const assessments: Assessment[] = [
  {
    id: "assessment-1",
    type: "interests",
    title: "Interest Assessment",
    description: "Discover careers that match what you enjoy doing",
    icon: "❤️",
    duration: 10,
    questionCount: 15,
    questions: [
      {
        id: "q1",
        text: "Which activities do you enjoy most?",
        type: "multiple_choice",
        options: [
          "Writing code or solving puzzles",
          "Helping others or teaching",
          "Creating art or design",
          "Organizing events or leading teams",
        ],
      },
    ],
  },
  {
    id: "assessment-2",
    type: "skills",
    title: "Skills Assessment",
    description: "Identify your strengths",
    icon: "💪",
    duration: 12,
    questionCount: 18,
    questions: [
      {
        id: "q1",
        text: "How would you rate your problem-solving skills?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Beginner", max: "Expert" },
      },
    ],
  },
];

// Helper functions
export function getCareerById(id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}

export function getProfessionalById(id: string): Professional | undefined {
  return professionals.find((p) => p.id === id);
}

export function getCareersByCategory(category: string): Career[] {
  return careers.filter((c) => c.category === category);
}

export function getProfessionalsByCareer(careerId: string): Professional[] {
  return professionals.filter((p) => p.careerIds.includes(careerId));
}

export function getAssessmentById(id: string): Assessment | undefined {
  return assessments.find((a) => a.id === id);
}

export function searchCareers(query: string): Career[] {
  const lowerQuery = query.toLowerCase();
  return careers.filter(
    (c) =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.shortDescription.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(careers.map((c) => c.category)));
}

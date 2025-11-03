// OpportunityMap Type Definitions

export type UserRole = 'student' | 'mentor' | 'company' | 'partner';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
}

export interface StudentProfile {
  userId: string;
  gradeLevel: string; // "S4", "S5", "S6"
  school?: string;
  district?: string;
  interests?: string[];
  stats: {
    careersExplored: number;
    chatsCompleted: number;
    chatsUpcoming: number;
    assessmentsTaken: number;
    savedCareers: number;
  };
  savedCareerIds: string[];
  assessmentResultIds: string[];
}

export interface PathwayStep {
  stage: string; // "High School", "University", "Entry Level"
  duration: string; // "2-4 years"
  description: string;
  requirements?: string[];
  estimatedCost?: number;
}

export interface Career {
  id: string;
  title: string;
  category: string; // "Technology", "Healthcare", "Business", etc.
  shortDescription: string;
  fullDescription: string;
  videoUrl: string; // YouTube embed URL
  videoThumbnail: string;
  salaryMin: number; // In RWF
  salaryMax: number;
  currency: string; // "RWF"
  requiredEducation: string; // "Bachelor's Degree", "Diploma", etc.
  requiredSkills: string[];
  careerPath: PathwayStep[];
  professionalsAvailable: string[]; // Professional IDs
  relatedCareers: string[]; // Career IDs
  sponsoredBy?: {
    companyName: string;
    companyLogo: string;
  };
  views?: number;
  saves?: number;
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  company: string;
  jobTitle: string;
  careerIds: string[]; // Careers they can discuss
  rating: number; // Average rating 1-5
  chatsCompleted: number;
  availability: AvailabilitySlot[];
  bio?: string;
  yearsExperience?: number;
  calendlyUrl?: string; // Calendly booking link
}

export interface AvailabilitySlot {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
}

export interface MentorProfile extends Professional {
  userId: string;
  ratePerChat?: number; // In RWF
  bankDetails?: string;
  earnings: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
}

export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

export interface CareerChat {
  id: string;
  studentId: string;
  professionalId: string;
  careerId: string;
  scheduledAt: Date;
  duration: number; // 15 minutes
  status: ChatStatus;
  meetingUrl?: string; // Jitsi URL
  rating?: number; // 1-5
  feedback?: string;
  completedAt?: Date;
}

export type AssessmentType = 'interests' | 'skills' | 'values' | 'personality';

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'scale' | 'ranking';
  options?: string[]; // For multiple choice
  scaleMin?: number; // For scale (1)
  scaleMax?: number; // For scale (5)
  scaleLabels?: { min: string; max: string }; // "Strongly Disagree" - "Strongly Agree"
}

export interface Assessment {
  id: string;
  type: AssessmentType;
  title: string;
  description: string;
  icon: string; // Emoji or icon name
  duration: number; // In minutes
  questionCount: number;
  questions: AssessmentQuestion[];
}

export interface CareerMatch {
  careerId: string;
  careerTitle: string;
  careerCategory: string;
  matchPercentage: number; // 0-100
  matchReasons: string[]; // ["Strong tech interest", "Problem-solving skills"]
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  answers: Record<string, string | number>; // questionId -> answer
  careerMatches: CareerMatch[];
  completedAt: Date;
  scores?: Record<string, number>; // Category scores
}

export interface SavedCareer {
  studentId: string;
  careerId: string;
  savedAt: Date;
  notes?: string;
}

export interface CompanyProfile {
  userId: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  website?: string;
  sponsoredCareerIds: string[];
  subscriptionTier: 'basic' | 'premium' | 'enterprise';
  stats: {
    totalViews: number;
    totalBookings: number;
    studentsReached: number;
  };
}

export interface PartnerProfile {
  userId: string;
  company: string;
  jobTitle: string;
  careerIds: string[];
  yearsExperience: number;
  contributedContent: {
    videos: number;
    careerInfo: number;
  };
}

// UI Component Props Types
export interface CareerCardProps {
  career: Career;
  onClick?: () => void;
  showSaveButton?: boolean;
  isSaved?: boolean;
  onSave?: (careerId: string) => void;
}

export interface ProfessionalCardProps {
  professional: Professional;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export interface AssessmentCardProps {
  assessment: Assessment;
  onClick?: () => void;
  completed?: boolean;
}

export interface QuestionCardProps {
  question: AssessmentQuestion;
  currentAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
}

export interface BookingStep {
  step: number;
  title: string;
  description: string;
}

// Filter Types
export interface CareerFilters {
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  educationLevel?: string;
  searchQuery?: string;
}

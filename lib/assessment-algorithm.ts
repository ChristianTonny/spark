/**
 * Assessment Algorithm - RIASEC Career Matching System
 *
 * This implements the Holland Code (RIASEC) methodology combined with
 * 80,000 Hours framework for matching students to careers.
 *
 * Based on ASSESSMENT_RESEARCH.md
 */

export interface RIASECScore {
  realistic: number;      // 0-180 scale
  investigative: number;  // 0-180 scale
  artistic: number;       // 0-180 scale
  social: number;         // 0-180 scale
  enterprising: number;   // 0-180 scale
  conventional: number;   // 0-180 scale
  [key: string]: number;  // Index signature for compatibility
}

export interface ValueScore {
  impact: number;      // 0-60 scale
  income: number;      // 0-60 scale
  autonomy: number;    // 0-60 scale
  balance: number;     // 0-60 scale
  growth: number;      // 0-60 scale
  stability: number;   // 0-60 scale
  [key: string]: number;  // Index signature for compatibility
}

export interface BigFiveScore {
  openness: number;         // 0-100 scale
  conscientiousness: number; // 0-100 scale
  extraversion: number;      // 0-100 scale
  [key: string]: number;     // Index signature for compatibility
}

export interface WorkStyleScore {
  leadership: number;      // 0-100 scale
  collaboration: number;   // 0-100 scale
  independence: number;    // 0-100 scale
  [key: string]: number;   // Index signature for compatibility
}

export interface EnvironmentPreference {
  teamSize: 'solo' | 'independent' | 'small' | 'large' | 'leader' | 'minimal';
  pace: 'steady' | 'moderate' | 'intense' | 'flexible' | 'deadline-driven' | 'predictable';
}

export interface AssessmentProfile {
  riasec: RIASECScore;
  values: ValueScore;
  bigFive?: BigFiveScore;        // Optional for backward compatibility
  workStyle?: WorkStyleScore;    // Optional for backward compatibility
  environment: EnvironmentPreference;
}

export interface Career {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  interestProfile?: RIASECScore;
  valueProfile?: ValueScore;
  personalityProfile?: BigFiveScore;  // NEW
  workEnvironment?: {
    teamSize: string;
    pace: string;
  };
}

export interface MatchResult {
  careerId: string;
  matchPercentage: number;
  interestScore: number;
  valueScore: number;
  personalityScore: number;        // NEW
  environmentScore: number;
  topRIASEC: string[];
  matchReasons: string[];
}

/**
 * Normalize a vector to unit length
 */
function normalize(vector: Record<string, number>): number[] {
  const values = Object.values(vector);
  const magnitude = Math.sqrt(values.reduce((sum, val) => sum + val * val, 0));

  if (magnitude === 0) return values.map(() => 0);

  return values.map(val => val / magnitude);
}

/**
 * Calculate cosine similarity between two vectors
 * Returns a value between 0 and 1
 */
function cosineSimilarity(vector1: Record<string, number>, vector2: Record<string, number>): number {
  const norm1 = normalize(vector1);
  const norm2 = normalize(vector2);

  const dotProduct = norm1.reduce((sum, val, i) => sum + val * norm2[i], 0);

  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, dotProduct));
}

/**
 * Get top 3 RIASEC types from a profile
 */
export function getTop3RIASEC(profile: RIASECScore): string[] {
  const types: Array<[string, number]> = [
    ['Realistic', profile.realistic],
    ['Investigative', profile.investigative],
    ['Artistic', profile.artistic],
    ['Social', profile.social],
    ['Enterprising', profile.enterprising],
    ['Conventional', profile.conventional],
  ];

  return types
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type);
}

/**
 * Get the top value from a value profile
 */
function getTopValue(values: ValueScore): string {
  const entries: Array<[string, number]> = Object.entries(values);
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

/**
 * Generate specific match reasons based on student profile and career
 */
function generateReasons(
  studentProfile: AssessmentProfile,
  career: Career
): string[] {
  const reasons: string[] = [];

  // Skip if no metadata
  if (!career.interestProfile || !career.valueProfile || !career.workEnvironment) {
    return ['Career assessment data is being updated'];
  }

  // RIASEC alignment
  const studentTop = getTop3RIASEC(studentProfile.riasec);
  const careerTop = getTop3RIASEC(career.interestProfile);

  const overlap = studentTop.filter(type => careerTop.includes(type));

  if (overlap.length >= 2) {
    reasons.push(
      `Your ${overlap.join(' and ')} interests strongly align with this career`
    );
  } else if (overlap.length === 1) {
    reasons.push(
      `Your ${overlap[0]} interests match well with this career's requirements`
    );
  }

  // Value alignment
  const topStudentValue = getTopValue(studentProfile.values);
  const topCareerValue = getTopValue(career.valueProfile);

  if (topStudentValue === topCareerValue) {
    const valueDescriptions: Record<string, string> = {
      impact: 'making a positive impact on society',
      income: 'financial security and high earnings',
      autonomy: 'independence and creative freedom',
      balance: 'work-life balance',
      growth: 'continuous learning and career advancement',
      stability: 'job security and predictability',
    };
    reasons.push(
      `This career matches your priority for ${valueDescriptions[topStudentValue]}`
    );
  }

  // Specific interest matches
  const { riasec } = studentProfile;
  const careerInterests = career.interestProfile;

  if (riasec.investigative > 100 && careerInterests.investigative > 70) {
    reasons.push('Strong match for your analytical and research interests');
  }

  if (riasec.social > 100 && careerInterests.social > 70) {
    reasons.push('Great fit for your desire to help and work with people');
  }

  if (riasec.artistic > 100 && careerInterests.artistic > 70) {
    reasons.push('Excellent match for your creative and artistic abilities');
  }

  if (riasec.enterprising > 100 && careerInterests.enterprising > 70) {
    reasons.push('Aligns with your leadership and entrepreneurial spirit');
  }

  if (riasec.realistic > 100 && careerInterests.realistic > 70) {
    reasons.push('Matches your hands-on and practical work style');
  }

  if (riasec.conventional > 100 && careerInterests.conventional > 70) {
    reasons.push('Suits your organized and detail-oriented approach');
  }

  // Environment fit
  if (studentProfile.environment.teamSize === career.workEnvironment.teamSize) {
    const sizeDescriptions: Record<string, string> = {
      solo: 'preference for independent work',
      independent: 'desire to work independently',
      small: 'preference for small team collaboration',
      large: 'enjoyment of large team dynamics',
      leader: 'leadership aspirations',
      minimal: 'preference for minimal interaction',
    };
    reasons.push(
      `Work environment matches your ${sizeDescriptions[career.workEnvironment.teamSize as keyof typeof sizeDescriptions]}`
    );
  }

  // Return top 4 most relevant reasons
  return reasons.slice(0, 4);
}

/**
 * Calculate career match score for a student profile
 *
 * Uses weighted scoring (research-recommended from assessment.md):
 * - 40% Interest alignment (RIASEC)
 * - 25% Value alignment
 * - 20% Personality fit (Big Five)
 * - 15% Environment fit
 */
export function calculateCareerMatch(
  studentProfile: AssessmentProfile,
  career: Career
): MatchResult {
  // Skip careers without metadata
  if (!career.interestProfile || !career.valueProfile || !career.workEnvironment) {
    return {
      careerId: career._id,
      matchPercentage: 0,
      interestScore: 0,
      valueScore: 0,
      personalityScore: 0,
      environmentScore: 0,
      topRIASEC: getTop3RIASEC(studentProfile.riasec),
      matchReasons: ['This career needs updated assessment data'],
    };
  }

  // 1. RIASEC Interest Match (40% weight)
  const interestMatch = cosineSimilarity(
    studentProfile.riasec,
    career.interestProfile
  );

  // 2. Value Alignment (25% weight)
  const valueMatch = cosineSimilarity(
    studentProfile.values,
    career.valueProfile
  );

  // 3. Personality Fit (20% weight) - NEW
  let personalityMatch = 0.5; // Default neutral if no data
  if (studentProfile.bigFive && career.personalityProfile) {
    personalityMatch = cosineSimilarity(
      studentProfile.bigFive,
      career.personalityProfile
    );
  }

  // 4. Environment Fit (15% weight)
  let environmentMatch = 0;
  if (studentProfile.environment.teamSize === career.workEnvironment.teamSize) {
    environmentMatch += 0.5;
  }
  if (studentProfile.environment.pace === career.workEnvironment.pace) {
    environmentMatch += 0.5;
  }

  // Weighted total (40% + 25% + 20% + 15% = 100%)
  const totalScore = (
    (interestMatch * 0.40) +
    (valueMatch * 0.25) +
    (personalityMatch * 0.20) +
    (environmentMatch * 0.15)
  ) * 100;

  return {
    careerId: career._id,
    matchPercentage: Math.round(totalScore),
    interestScore: Math.round(interestMatch * 100),
    valueScore: Math.round(valueMatch * 100),
    personalityScore: Math.round(personalityMatch * 100),
    environmentScore: Math.round(environmentMatch * 100),
    topRIASEC: getTop3RIASEC(studentProfile.riasec),
    matchReasons: generateReasons(studentProfile, career),
  };
}

/**
 * Calculate RIASEC, values, Big Five, and work style scores from 25-question assessment
 *
 * Answer format: { [questionId]: optionIndex }
 * Questions 1-12: RIASEC interest questions (2 per type)
 * Questions 13-18: Work values (forced choice)
 * Questions 19-22: Big Five personality (Openness, Conscientiousness, Extraversion)
 * Questions 23-25: Work style scenarios
 */
export function calculateProfileFromAnswers(answers: Record<string, number>): AssessmentProfile {
  // Initialize scores
  const riasec: RIASECScore = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  };

  const values: ValueScore = {
    impact: 0,
    income: 0,
    autonomy: 0,
    balance: 0,
    growth: 0,
    stability: 0,
  };

  const bigFive: BigFiveScore = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
  };

  const workStyle: WorkStyleScore = {
    leadership: 0,
    collaboration: 0,
    independence: 0,
  };

  let teamSize: EnvironmentPreference['teamSize'] = 'small';
  let pace: EnvironmentPreference['pace'] = 'moderate';

  // Scoring rules for 25-question assessment based on ASSESSMENT_RESEARCH.md
  const scoringRules: Record<string, Array<{
    riasec?: Partial<RIASECScore>;
    values?: Partial<ValueScore>;
    bigFive?: Partial<BigFiveScore>;
    workStyle?: Partial<WorkStyleScore>;
    environment?: Partial<EnvironmentPreference>;
  }>> = {
    // ===== RIASEC INTEREST QUESTIONS (Q1-Q12: 2 per type) =====
    // Questions use Likert scale: 0=Strongly Disagree, 1=Disagree, 2=Neutral, 3=Agree, 4=Strongly Agree
    // Q1-2: Realistic (hands-on, practical work)
    'q1': [ // Likert: "I would enjoy repairing mechanical equipment or electronics"
      { riasec: { realistic: 0 } },   // Strongly Disagree
      { riasec: { realistic: 5 } },   // Disagree
      { riasec: { realistic: 10 } },  // Neutral
      { riasec: { realistic: 15 } },  // Agree
      { riasec: { realistic: 20 } },  // Strongly Agree
    ],
    'q2': [ // Likert: "I prefer outdoor work over desk work"
      { riasec: { realistic: 0 } },
      { riasec: { realistic: 5 } },
      { riasec: { realistic: 10 } },
      { riasec: { realistic: 15 } },
      { riasec: { realistic: 20 } },
    ],
    
    // Q3-4: Investigative (analytical, research)
    'q3': [ // Likert: "I enjoy researching complex problems to find solutions"
      { riasec: { investigative: 0 } },
      { riasec: { investigative: 5 } },
      { riasec: { investigative: 10 } },
      { riasec: { investigative: 15 } },
      { riasec: { investigative: 20 } },
    ],
    'q4': [ // Likert: "Reading scientific articles or research papers interests me"
      { riasec: { investigative: 0 } },
      { riasec: { investigative: 5 } },
      { riasec: { investigative: 10 } },
      { riasec: { investigative: 15 } },
      { riasec: { investigative: 20 } },
    ],
    
    // Q5-6: Artistic (creative, expressive)
    'q5': [ // Likert: "I enjoy creating visual designs, artwork, or creative content"
      { riasec: { artistic: 0 } },
      { riasec: { artistic: 5 } },
      { riasec: { artistic: 10 } },
      { riasec: { artistic: 15 } },
      { riasec: { artistic: 20 } },
    ],
    'q6': [ // Likert: "Writing stories, poetry, or creative content is enjoyable to me"
      { riasec: { artistic: 0 } },
      { riasec: { artistic: 5 } },
      { riasec: { artistic: 10 } },
      { riasec: { artistic: 15 } },
      { riasec: { artistic: 20 } },
    ],
    
    // Q7-8: Social (helping, teaching)
    'q7': [ // Likert: "I find satisfaction in teaching or explaining concepts to others"
      { riasec: { social: 0 } },
      { riasec: { social: 5 } },
      { riasec: { social: 10 } },
      { riasec: { social: 15 } },
      { riasec: { social: 20 } },
    ],
    'q8': [ // Likert: "Working in healthcare or counseling appeals to me"
      { riasec: { social: 0 } },
      { riasec: { social: 5 } },
      { riasec: { social: 10 } },
      { riasec: { social: 15 } },
      { riasec: { social: 20 } },
    ],
    
    // Q9-10: Enterprising (leadership, business)
    'q9': [ // Likert: "I enjoy leading teams and making strategic decisions"
      { riasec: { enterprising: 0 } },
      { riasec: { enterprising: 5 } },
      { riasec: { enterprising: 10 } },
      { riasec: { enterprising: 15 } },
      { riasec: { enterprising: 20 } },
    ],
    'q10': [ // Likert: "Selling products or services and persuading others sounds interesting"
      { riasec: { enterprising: 0 } },
      { riasec: { enterprising: 5 } },
      { riasec: { enterprising: 10 } },
      { riasec: { enterprising: 15 } },
      { riasec: { enterprising: 20 } },
    ],
    
    // Q11-12: Conventional (organized, detail-oriented)
    'q11': [ // Likert: "I like organizing information, files, or data in systematic ways"
      { riasec: { conventional: 0 } },
      { riasec: { conventional: 5 } },
      { riasec: { conventional: 10 } },
      { riasec: { conventional: 15 } },
      { riasec: { conventional: 20 } },
    ],
    'q12': [ // Likert: "Following established procedures and guidelines is important to me"
      { riasec: { conventional: 0 } },
      { riasec: { conventional: 5 } },
      { riasec: { conventional: 10 } },
      { riasec: { conventional: 15 } },
      { riasec: { conventional: 20 } },
    ],

    // ===== WORK VALUES QUESTIONS (Q13-18: Forced choice) =====
    'q13': [ // "Which matters more in a career?"
      { values: { income: 15 } },      // High salary even if routine
      { values: { impact: 15 } },      // Lower salary doing meaningful work
    ],
    'q14': [ // "Choose one:"
      { values: { balance: 15 } },     // Work-life balance with steady income
      { values: { growth: 15 } },      // Career advancement with longer hours
    ],
    'q15': [ // "What's more important?"
      { values: { autonomy: 15 } },    // Creative freedom and independence
      { values: { stability: 15 } },   // Job security and predictability
    ],
    'q16': [ // "Prefer:" 
      { values: { impact: 10, growth: 5 } },    // Help individuals solve problems
      { values: { income: 10, growth: 5 } },    // Build wealth through business
    ],
    'q17': [ // "Would you rather:"
      { values: { autonomy: 10, balance: 5 } }, // Set your own schedule
      { values: { stability: 10, income: 5 } }, // Reliable 9-5 with benefits
    ],
    'q18': [ // "Choose:"
      { values: { growth: 10, impact: 5 } },    // Rapidly developing skills
      { values: { balance: 10, stability: 5 } }, // Maintaining work-life harmony
    ],

    // ===== BIG FIVE PERSONALITY (Q19-22) =====
    'q19': [ // Openness: "I enjoy exploring new ideas and trying unconventional approaches"
      { bigFive: { openness: 0 } },
      { bigFive: { openness: 25 } },
      { bigFive: { openness: 50 } },
      { bigFive: { openness: 75 } },
      { bigFive: { openness: 100 } },
    ],
    'q20': [ // Conscientiousness: "I make detailed plans before starting projects"
      { bigFive: { conscientiousness: 0 } },
      { bigFive: { conscientiousness: 25 } },
      { bigFive: { conscientiousness: 50 } },
      { bigFive: { conscientiousness: 75 } },
      { bigFive: { conscientiousness: 100 } },
    ],
    'q21': [ // Conscientiousness (reversed): "I often complete tasks at the last minute"
      { bigFive: { conscientiousness: 100 } },  // Strongly Disagree = High C
      { bigFive: { conscientiousness: 75 } },
      { bigFive: { conscientiousness: 50 } },
      { bigFive: { conscientiousness: 25 } },
      { bigFive: { conscientiousness: 0 } },    // Strongly Agree = Low C
    ],
    'q22': [ // Extraversion: "I feel energized after spending time with large groups"
      { bigFive: { extraversion: 0 } },
      { bigFive: { extraversion: 25 } },
      { bigFive: { extraversion: 50 } },
      { bigFive: { extraversion: 75 } },
      { bigFive: { extraversion: 100 } },
    ],

    // ===== WORK STYLE SCENARIOS (Q23-25) =====
    'q23': [ // "Your group project is falling behind. You typically:"
      { workStyle: { leadership: 25, collaboration: 5 }, riasec: { enterprising: 5 } },        // Take charge and delegate
      { workStyle: { collaboration: 25, leadership: 5 }, riasec: { social: 5 } },              // Facilitate team discussion
      { workStyle: { independence: 25 }, riasec: { realistic: 5 } },                           // Focus on your part
      { workStyle: { collaboration: 15, leadership: 10 }, riasec: { social: 5 } },             // Help resolve conflicts
    ],
    'q24': [ // "When facing a complex problem, you prefer to:"
      { workStyle: { independence: 20 }, riasec: { investigative: 5 }, bigFive: { openness: 10 } },     // Research thoroughly first
      { workStyle: { independence: 15, collaboration: 5 }, riasec: { artistic: 5 } },                    // Try different approaches
      { workStyle: { collaboration: 20 }, riasec: { social: 5 }, bigFive: { extraversion: 10 } },       // Discuss with others
      { workStyle: { independence: 20 }, riasec: { investigative: 5, conventional: 3 } },                // Break into parts systematically
    ],
    'q25': [ // "Which work environment sounds most appealing?"
      { environment: { teamSize: 'independent', pace: 'predictable' }, riasec: { conventional: 5 } },    // Quiet office, clear tasks
      { environment: { teamSize: 'large', pace: 'intense' }, riasec: { enterprising: 5 }, workStyle: { collaboration: 10 } },  // Dynamic, frequent collaboration
      { environment: { teamSize: 'small', pace: 'moderate' }, workStyle: { collaboration: 10, independence: 10 } },             // Mix of independent and team work
      { environment: { teamSize: 'solo', pace: 'flexible' }, riasec: { artistic: 5 }, workStyle: { independence: 15 } },       // Flexible remote work
    ],
  };

  // Process each answer
  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const rules = scoringRules[questionId];
    if (!rules || optionIndex >= rules.length) return;

    const rule = rules[optionIndex];

    // Add RIASEC scores
    if (rule.riasec) {
      Object.entries(rule.riasec).forEach(([key, value]) => {
        if (value !== undefined) {
          riasec[key as keyof RIASECScore] += value;
        }
      });
    }

    // Add value scores
    if (rule.values) {
      Object.entries(rule.values).forEach(([key, value]) => {
        if (value !== undefined) {
          values[key as keyof ValueScore] += value;
        }
      });
    }

    // Add Big Five scores (NEW)
    if (rule.bigFive) {
      Object.entries(rule.bigFive).forEach(([key, value]) => {
        if (value !== undefined) {
          bigFive[key as keyof BigFiveScore] += value;
        }
      });
    }

    // Add work style scores (NEW)
    if (rule.workStyle) {
      Object.entries(rule.workStyle).forEach(([key, value]) => {
        if (value !== undefined) {
          workStyle[key as keyof WorkStyleScore] += value;
        }
      });
    }

    // Set environment preferences (most recent wins)
    if (rule.environment) {
      if (rule.environment.teamSize) teamSize = rule.environment.teamSize;
      if (rule.environment.pace) pace = rule.environment.pace;
    }
  });

  // Normalize Big Five scores (average across questions)
  // Q19: 1 question for openness = 0-100
  // Q20-21: 2 questions for conscientiousness = 0-200, normalize to 0-100
  // Q22: 1 question for extraversion = 0-100
  bigFive.conscientiousness = bigFive.conscientiousness / 2;

  return {
    riasec,
    values,
    bigFive,
    workStyle,
    environment: { teamSize, pace },
  };
}

/**
 * Match student to all careers and return sorted results
 */
export function matchStudentToCareers(
  studentProfile: AssessmentProfile,
  careers: Career[],
  limit: number = 10
): MatchResult[] {
  const matches = careers.map(career => calculateCareerMatch(studentProfile, career));

  // Sort by match percentage (descending)
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Return top N matches
  return matches.slice(0, limit);
}

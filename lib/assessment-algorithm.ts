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
 * Calculate skill profile from 20-question skills assessment
 *
 * Answer format: { [questionId]: optionIndex }
 * Q1-Q4: How You Think (Cognitive Style)
 * Q5-Q8: How You Work (Work Style)
 * Q9-Q12: What Energizes You (Motivation)
 * Q13-Q16: Your Values (Priorities)
 * Q17-Q20: Future Skills & Adaptability
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

  // New scoring rules for 20-question skills assessment
  const scoringRules: Record<string, Array<{
    riasec?: Partial<RIASECScore>;
    values?: Partial<ValueScore>;
    bigFive?: Partial<BigFiveScore>;
    workStyle?: Partial<WorkStyleScore>;
    environment?: Partial<EnvironmentPreference>;
  }>> = {
    // ===== SECTION 1: HOW YOU THINK (Cognitive Style) - Q1-Q4 =====
    'q1': [ // Decision making style
      { riasec: { investigative: 20 }, bigFive: { conscientiousness: 25 } },  // Research thoroughly
      { riasec: { artistic: 15, enterprising: 10 }, bigFive: { openness: 25 } },  // Trust intuition
      { riasec: { social: 20 }, bigFive: { extraversion: 25 } },  // Talk it through
      { riasec: { conventional: 20 }, bigFive: { conscientiousness: 25 } },  // List pros/cons
    ],
    'q2': [ // Learning preference
      { riasec: { realistic: 15, enterprising: 10 }, bigFive: { openness: 20 } },  // Jump in
      { riasec: { investigative: 15 }, bigFive: { conscientiousness: 20 } },  // Tutorials first
      { riasec: { social: 20 }, bigFive: { extraversion: 15 } },  // Learn with someone
      { riasec: { investigative: 20 }, bigFive: { conscientiousness: 15 } },  // Theory first
    ],
    'q3': [ // Adaptability
      { riasec: { artistic: 15, enterprising: 10 }, bigFive: { openness: 25 } },  // Try different
      { riasec: { investigative: 20 }, bigFive: { conscientiousness: 20 } },  // Analyze first
      { riasec: { social: 20 }, bigFive: { extraversion: 15 } },  // Ask others
      { riasec: { conventional: 15 }, values: { stability: 10 } },  // Stick with it
    ],
    'q4': [ // Communication style
      { riasec: { enterprising: 15 }, workStyle: { leadership: 15 } },  // Big picture
      { riasec: { conventional: 15 }, bigFive: { conscientiousness: 15 } },  // Step by step
      { riasec: { social: 15, artistic: 10 } },  // Stories
      { riasec: { artistic: 20 } },  // Diagrams
    ],

    // ===== SECTION 2: HOW YOU WORK (Work Style) - Q5-Q8 =====
    'q5': [ // Group role
      { riasec: { enterprising: 25 }, workStyle: { leadership: 25 } },  // Take lead
      { riasec: { investigative: 15 }, workStyle: { independence: 20 } },  // Focus on part
      { riasec: { social: 25 }, workStyle: { collaboration: 25 } },  // Team harmony
      { riasec: { artistic: 20 }, bigFive: { openness: 20 } },  // Generate ideas
    ],
    'q6': [ // Best work conditions
      { workStyle: { independence: 25 }, environment: { teamSize: 'solo' } },  // Independent
      { workStyle: { collaboration: 25 }, bigFive: { extraversion: 20 } },  // Collaborating
      { riasec: { conventional: 15 }, environment: { pace: 'deadline-driven' } },  // Deadlines
      { values: { autonomy: 15 }, environment: { pace: 'flexible' } },  // Flexibility
    ],
    'q7': [ // Deadline behavior
      { riasec: { enterprising: 15 }, environment: { pace: 'intense' } },  // Thrive pressure
      { bigFive: { conscientiousness: 10 } },  // Stressed but push
      { environment: { pace: 'steady' }, bigFive: { conscientiousness: 20 } },  // Plan ahead
      { workStyle: { collaboration: 15 }, bigFive: { extraversion: 10 } },  // Need push
    ],
    'q8': [ // Workspace preference
      { workStyle: { independence: 20 }, environment: { teamSize: 'solo' } },  // Quiet
      { bigFive: { extraversion: 25 }, environment: { teamSize: 'large' } },  // Busy
      { environment: { teamSize: 'small' } },  // Flexible
      { riasec: { conventional: 15 }, environment: { pace: 'predictable' } },  // Structured
    ],

    // ===== SECTION 3: WHAT ENERGIZES YOU (Motivation) - Q9-Q12 =====
    'q9': [ // Fulfillment source
      { riasec: { artistic: 25 }, bigFive: { openness: 20 } },  // Create new
      { riasec: { social: 25 }, values: { impact: 15 } },  // Help others
      { riasec: { investigative: 25 } },  // Solve problems
      { riasec: { conventional: 20 } },  // Organize
    ],
    'q10': [ // Monday motivation
      { riasec: { artistic: 20 }, values: { autonomy: 15 } },  // Creative project
      { riasec: { social: 20 }, bigFive: { extraversion: 15 } },  // Meetings
      { riasec: { investigative: 20 } },  // Complex challenge
      { riasec: { conventional: 15 }, bigFive: { conscientiousness: 10 } },  // Clear goals
    ],
    'q11': [ // Recognition preference
      { riasec: { artistic: 20 }, bigFive: { openness: 15 } },  // Innovator
      { riasec: { social: 25 }, values: { impact: 15 } },  // Helping others
      { riasec: { investigative: 25 }, values: { growth: 10 } },  // Expert
      { riasec: { conventional: 20 }, values: { stability: 10 } },  // Reliable
    ],
    'q12': [ // Outside interests
      { riasec: { artistic: 30 }, bigFive: { openness: 15 } },  // Creating
      { riasec: { social: 30 }, bigFive: { extraversion: 15 } },  // Connecting
      { riasec: { investigative: 30 } },  // Learning
      { riasec: { conventional: 25 } },  // Organizing
    ],

    // ===== SECTION 4: YOUR VALUES (Priorities) - Q13-Q16 =====
    'q13': [ // Top priority
      { values: { income: 30, stability: 15 } },  // Financial security
      { values: { impact: 30 }, riasec: { social: 10 } },  // Meaningful impact
      { values: { growth: 30 }, bigFive: { openness: 10 } },  // Personal growth
      { values: { balance: 30 } },  // Work-life balance
    ],
    'q14': [ // Risk tolerance
      { riasec: { enterprising: 25 }, values: { autonomy: 15 } },  // Start business
      { values: { growth: 20 }, bigFive: { openness: 15 } },  // Move cities
      { values: { autonomy: 20 }, riasec: { artistic: 10 } },  // Pursue passion
      { values: { growth: 25 }, riasec: { enterprising: 10 } },  // Challenging role
    ],
    'q15': [ // 10-year pride
      { riasec: { enterprising: 25 }, values: { autonomy: 15 } },  // Build something
      { riasec: { investigative: 25 }, values: { growth: 15 } },  // Expert
      { riasec: { social: 25 }, values: { impact: 15 } },  // Helped many
      { values: { balance: 30 } },  // Balanced life
    ],
    'q16': [ // What bothers you
      { values: { growth: 20 }, riasec: { enterprising: 10 } },  // Wasted potential
      { values: { impact: 20 }, riasec: { social: 15 } },  // Unfairness
      { riasec: { conventional: 20 } },  // Disorganization
      { riasec: { social: 20 }, bigFive: { extraversion: 10 } },  // Isolation
    ],

    // ===== SECTION 5: FUTURE SKILLS & ADAPTABILITY - Q17-Q20 =====
    'q17': [ // Tech adoption
      { bigFive: { openness: 30 }, riasec: { investigative: 15 } },  // Try immediately
      { bigFive: { conscientiousness: 20 } },  // Wait for reviews
      { values: { balance: 10 } },  // Only if needed
      { riasec: { conventional: 15 }, values: { stability: 10 } },  // Stick with known
    ],
    'q18': [ // AI attitude
      { bigFive: { openness: 25 }, riasec: { investigative: 10 } },  // Excited
      { bigFive: { openness: 15 } },  // Curious
      { riasec: { social: 15 }, values: { impact: 10 } },  // Cautious
      { riasec: { investigative: 15 }, bigFive: { conscientiousness: 10 } },  // Focused human skills
    ],
    'q19': [ // Skill to master
      { riasec: { investigative: 25, realistic: 15 } },  // Coding/technical
      { riasec: { social: 20, artistic: 10 } },  // Communication
      { riasec: { investigative: 25, conventional: 10 } },  // Data analysis
      { riasec: { enterprising: 25 }, workStyle: { leadership: 15 } },  // Leadership
    ],
    'q20': [ // Learning approach
      { bigFive: { conscientiousness: 25 }, riasec: { investigative: 10 } },  // Deep dive
      { bigFive: { openness: 25 } },  // Broad exploration
      { values: { balance: 10 } },  // Just-in-time
      { riasec: { social: 20 }, bigFive: { extraversion: 15 } },  // Social learning
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

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
}

export interface ValueScore {
  impact: number;      // 0-60 scale
  income: number;      // 0-60 scale
  autonomy: number;    // 0-60 scale
  balance: number;     // 0-60 scale
  growth: number;      // 0-60 scale
  stability: number;   // 0-60 scale
}

export interface EnvironmentPreference {
  teamSize: 'solo' | 'independent' | 'small' | 'large' | 'leader' | 'minimal';
  pace: 'steady' | 'moderate' | 'intense' | 'flexible' | 'deadline-driven' | 'predictable';
}

export interface AssessmentProfile {
  riasec: RIASECScore;
  values: ValueScore;
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
 * Uses weighted scoring:
 * - 50% Interest alignment (RIASEC)
 * - 30% Value alignment
 * - 20% Environment fit
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
      environmentScore: 0,
      topRIASEC: getTop3RIASEC(studentProfile.riasec),
      matchReasons: ['This career needs updated assessment data'],
    };
  }

  // 1. RIASEC Interest Match (50% weight)
  const interestMatch = cosineSimilarity(
    studentProfile.riasec,
    career.interestProfile
  );

  // 2. Value Alignment (30% weight)
  const valueMatch = cosineSimilarity(
    studentProfile.values,
    career.valueProfile
  );

  // 3. Environment Fit (20% weight)
  let environmentMatch = 0;
  if (studentProfile.environment.teamSize === career.workEnvironment.teamSize) {
    environmentMatch += 0.5;
  }
  if (studentProfile.environment.pace === career.workEnvironment.pace) {
    environmentMatch += 0.5;
  }

  // Weighted total
  const totalScore = (
    (interestMatch * 0.5) +
    (valueMatch * 0.3) +
    (environmentMatch * 0.2)
  ) * 100;

  return {
    careerId: career._id,
    matchPercentage: Math.round(totalScore),
    interestScore: Math.round(interestMatch * 100),
    valueScore: Math.round(valueMatch * 100),
    environmentScore: Math.round(environmentMatch * 100),
    topRIASEC: getTop3RIASEC(studentProfile.riasec),
    matchReasons: generateReasons(studentProfile, career),
  };
}

/**
 * Calculate RIASEC and value scores from 12-question assessment answers
 *
 * Answer format: { [questionId]: optionIndex }
 * Questions 1-8: RIASEC interest questions
 * Questions 9-12: Values and environment questions
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

  let teamSize: EnvironmentPreference['teamSize'] = 'small';
  let pace: EnvironmentPreference['pace'] = 'moderate';

  // Scoring rules for each question based on ASSESSMENT_RESEARCH.md
  const scoringRules: Record<string, Array<{
    riasec?: Partial<RIASECScore>;
    values?: Partial<ValueScore>;
    environment?: Partial<EnvironmentPreference>;
  }>> = {
    'q1': [
      { riasec: { realistic: 15, investigative: 5 } },
      { riasec: { investigative: 15, realistic: 5 } },
      { riasec: { artistic: 15, investigative: 5 } },
      { riasec: { social: 15, artistic: 5 } },
      { riasec: { enterprising: 15, social: 5 } },
      { riasec: { conventional: 15, enterprising: 5 } },
    ],
    'q2': [
      { riasec: { realistic: 12, investigative: 5 } },
      { riasec: { investigative: 15, conventional: 5 } },
      { riasec: { artistic: 15, investigative: 5 } },
      { riasec: { social: 15, enterprising: 5 } },
      { riasec: { enterprising: 15, social: 5 } },
      { riasec: { conventional: 15, realistic: 5 } },
    ],
    'q3': [
      { riasec: { realistic: 15, conventional: 3 } },
      { riasec: { investigative: 15, conventional: 5 } },
      { riasec: { artistic: 15, enterprising: 3 } },
      { riasec: { social: 15, artistic: 5 } },
      { riasec: { enterprising: 15, social: 5 } },
      { riasec: { conventional: 15, investigative: 3 } },
    ],
    'q4': [
      { riasec: { realistic: 15, conventional: 5 } },
      { riasec: { investigative: 15, conventional: 8 } },
      { riasec: { artistic: 15, investigative: 3 } },
      { riasec: { social: 15, artistic: 3 } },
      { riasec: { enterprising: 15, conventional: 5 } },
      { riasec: { conventional: 15, enterprising: 5 } },
    ],
    'q5': [
      { riasec: { realistic: 15, investigative: 3 } },
      { riasec: { investigative: 15, artistic: 3 } },
      { riasec: { artistic: 15, social: 3 } },
      { riasec: { social: 15, enterprising: 3 } },
      { riasec: { enterprising: 15, social: 3 } },
      { riasec: { conventional: 15, investigative: 5 } },
    ],
    'q6': [
      { riasec: { realistic: 15, enterprising: 5 } },
      { riasec: { investigative: 15, conventional: 5 } },
      { riasec: { artistic: 15, social: 3 } },
      { riasec: { social: 15, enterprising: 8 } },
      { riasec: { enterprising: 15, conventional: 5 } },
      { riasec: { conventional: 15, investigative: 5 } },
    ],
    'q7': [
      { riasec: { realistic: 12, investigative: 5 } },
      { riasec: { investigative: 15, artistic: 3 } },
      { riasec: { artistic: 15, social: 3 } },
      { riasec: { social: 15, enterprising: 3 } },
      { riasec: { enterprising: 12, realistic: 5 } },
      { riasec: { conventional: 15, investigative: 5 } },
    ],
    'q8': [
      { riasec: { realistic: 15, conventional: 3 } },
      { riasec: { investigative: 15, artistic: 3 } },
      { riasec: { artistic: 15, investigative: 3 } },
      { riasec: { social: 15, artistic: 5 } },
      { riasec: { enterprising: 15, social: 3 } },
      { riasec: { conventional: 15, enterprising: 3 } },
    ],
    'q9': [
      { riasec: { enterprising: 10, conventional: 8 }, values: { income: 20 } },
      { riasec: { social: 10, investigative: 8 }, values: { impact: 20 } },
      { riasec: { artistic: 12, enterprising: 5 }, values: { autonomy: 20 } },
      { riasec: { social: 8, conventional: 8 }, values: { balance: 20 } },
      { riasec: { enterprising: 12, investigative: 8 }, values: { growth: 20 } },
      { riasec: { conventional: 12, realistic: 5 }, values: { stability: 20 } },
    ],
    'q10': [
      { riasec: { enterprising: 15, investigative: 5 }, values: { autonomy: 15, income: 15 } },
      { riasec: { investigative: 15, conventional: 5 }, values: { growth: 20 } },
      { riasec: { artistic: 15, social: 5 }, values: { impact: 15, autonomy: 10 } },
      { riasec: { enterprising: 12, social: 10 }, values: { impact: 20 } },
      { riasec: { social: 10, artistic: 8 }, values: { balance: 20 } },
      { riasec: { conventional: 12, enterprising: 8 }, values: { stability: 20 } },
    ],
    'q11': [
      { riasec: { enterprising: 12, realistic: 8 }, environment: { pace: 'intense' } },
      { riasec: { investigative: 12, artistic: 8 }, environment: { pace: 'moderate' } },
      { riasec: { artistic: 10, enterprising: 8 }, environment: { pace: 'flexible' } },
      { riasec: { conventional: 12, social: 8 }, environment: { pace: 'steady' } },
      { riasec: { enterprising: 10, investigative: 10 }, environment: { pace: 'deadline-driven' } },
      { riasec: { conventional: 15, realistic: 5 }, environment: { pace: 'predictable' } },
    ],
    'q12': [
      { riasec: { investigative: 12, artistic: 10 }, environment: { teamSize: 'solo' } },
      { riasec: { realistic: 10, conventional: 10 }, environment: { teamSize: 'independent' } },
      { riasec: { artistic: 10, social: 10 }, environment: { teamSize: 'small' } },
      { riasec: { social: 15, enterprising: 8 }, environment: { teamSize: 'large' } },
      { riasec: { enterprising: 15, social: 8 }, environment: { teamSize: 'leader' } },
      { riasec: { conventional: 15, realistic: 5 }, environment: { teamSize: 'minimal' } },
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
        riasec[key as keyof RIASECScore] += value;
      });
    }

    // Add value scores
    if (rule.values) {
      Object.entries(rule.values).forEach(([key, value]) => {
        values[key as keyof ValueScore] += value;
      });
    }

    // Set environment preferences (most recent wins)
    if (rule.environment) {
      if (rule.environment.teamSize) teamSize = rule.environment.teamSize;
      if (rule.environment.pace) pace = rule.environment.pace;
    }
  });

  return {
    riasec,
    values,
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

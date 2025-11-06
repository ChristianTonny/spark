/**
 * Real career matching algorithm based on assessment answers
 * Maps user answers to career attributes and calculates match scores
 */

interface Answer {
  questionId: string;
  selectedOption: number;
}

interface Career {
  _id: string;
  title: string;
  category: string;
  requiredSkills: string[];
  shortDescription: string;
}

interface CareerMatch {
  careerId: string;
  matchPercentage: number;
  matchReasons: string[];
}

/**
 * Maps answer options to career categories and attributes
 */
const ANSWER_MAPPINGS = {
  // Q1: Which activities do you enjoy most in your free time?
  q1: {
    0: { // "Writing code, solving puzzles, or working with technology"
      categories: ["Technology", "Engineering"],
      skills: ["problem solving", "analytical", "technical", "coding", "programming"],
      interests: ["technology", "computers", "software", "systems"]
    },
    1: { // "Helping others, teaching, or volunteering"
      categories: ["Healthcare", "Education"],
      skills: ["communication", "empathy", "teaching", "patient care", "counseling"],
      interests: ["people", "helping", "supporting", "caring"]
    },
    2: { // "Creating art, designing, or making things"
      categories: ["Creative", "Engineering"],
      skills: ["creativity", "design", "artistic", "visualization", "aesthetics"],
      interests: ["art", "design", "creative", "visual", "making"]
    },
    3: { // "Organizing events, leading groups, or planning projects"
      categories: ["Business", "Education"],
      skills: ["leadership", "management", "organizing", "planning", "coordination"],
      interests: ["leadership", "organization", "management", "events"]
    }
  },

  // Q2: What subjects do you find most interesting in school?
  q2: {
    0: { // "Mathematics and Physics"
      categories: ["Technology", "Engineering"],
      skills: ["analytical", "mathematics", "physics", "problem solving", "quantitative"],
      interests: ["science", "math", "logic", "analysis"]
    },
    1: { // "Biology and Chemistry"
      categories: ["Healthcare", "Engineering"],
      skills: ["scientific", "research", "biological", "medical knowledge", "analytical"],
      interests: ["science", "medicine", "health", "biology"]
    },
    2: { // "Languages and Literature"
      categories: ["Education", "Creative", "Business"],
      skills: ["communication", "writing", "languages", "expression", "literacy"],
      interests: ["language", "writing", "literature", "communication"]
    },
    3: { // "History and Social Studies"
      categories: ["Education", "Business"],
      skills: ["research", "critical thinking", "analysis", "communication"],
      interests: ["society", "history", "culture", "people"]
    }
  },

  // Q3: How do you prefer to work?
  q3: {
    0: { // "Independently, with minimal supervision"
      workStyle: "independent",
      preferences: ["autonomy", "self-directed", "solo"]
    },
    1: { // "In a small team with close collaboration"
      workStyle: "collaborative",
      preferences: ["teamwork", "collaboration", "team"]
    },
    2: { // "In a large organization with clear structure"
      workStyle: "structured",
      preferences: ["organization", "structured", "corporate"]
    },
    3: { // "Mix of independent and team work"
      workStyle: "flexible",
      preferences: ["flexibility", "varied", "teamwork"]
    }
  },

  // Q4: What kind of work environment appeals to you?
  q4: {
    0: { // "Office or indoor workspace"
      environment: "office",
      categories: ["Technology", "Business", "Creative"]
    },
    1: { // "Outdoor or field work"
      environment: "outdoor",
      categories: ["Engineering", "Healthcare"]
    },
    2: { // "Mix of office and travel"
      environment: "mixed",
      categories: ["Business", "Healthcare", "Engineering"]
    },
    3: { // "Remote or work from anywhere"
      environment: "remote",
      categories: ["Technology", "Creative", "Business"]
    }
  },

  // Q5: Which skill comes most naturally to you?
  q5: {
    0: { // "Analyzing problems and finding solutions"
      categories: ["Technology", "Engineering"],
      skills: ["problem solving", "analytical", "troubleshooting", "technical", "critical thinking"]
    },
    1: { // "Communicating and connecting with people"
      categories: ["Healthcare", "Education", "Business"],
      skills: ["communication", "interpersonal", "networking", "empathy", "people"]
    },
    2: { // "Creating and designing new things"
      categories: ["Creative", "Technology", "Engineering"],
      skills: ["creativity", "innovation", "design", "artistic", "ideation"]
    },
    3: { // "Managing and organizing tasks"
      categories: ["Business", "Education"],
      skills: ["management", "organization", "planning", "coordination", "leadership"]
    }
  }
};

/**
 * Calculate match score between user answers and a career
 */
function calculateCareerScore(career: Career, answers: Answer[]): {
  score: number;
  reasons: string[];
} {
  let totalScore = 0;
  const reasons: string[] = [];
  const maxScorePerQuestion = 10;

  // Process each answer
  answers.forEach((answer) => {
    const mapping = ANSWER_MAPPINGS[answer.questionId as keyof typeof ANSWER_MAPPINGS];
    if (!mapping) return;

    const selectedMapping = mapping[answer.selectedOption as keyof typeof mapping];
    if (!selectedMapping) return;

    let questionScore = 0;

    // Check category matches
    if ('categories' in selectedMapping && selectedMapping.categories) {
      if (selectedMapping.categories.includes(career.category)) {
        questionScore += 5;

        // Add specific reason based on question
        if (answer.questionId === 'q1') {
          reasons.push(`Your interest aligns with the ${career.category.toLowerCase()} field`);
        } else if (answer.questionId === 'q2') {
          reasons.push(`Your academic interests match this career's requirements`);
        } else if (answer.questionId === 'q4') {
          reasons.push(`Work environment suits your preferences`);
        } else if (answer.questionId === 'q5') {
          reasons.push(`Your natural skills align with this role`);
        }
      }
    }

    // Check skill matches
    if ('skills' in selectedMapping && selectedMapping.skills) {
      const careerSkillsLower = career.requiredSkills.map(s => s.toLowerCase());
      const matchedSkills = selectedMapping.skills.filter(skill =>
        careerSkillsLower.some(cs =>
          cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs)
        )
      );

      if (matchedSkills.length > 0) {
        questionScore += Math.min(5, matchedSkills.length * 2);

        if (matchedSkills.length === 1) {
          reasons.push(`Requires ${matchedSkills[0]} skills you possess`);
        } else if (matchedSkills.length > 1) {
          reasons.push(`Matches ${matchedSkills.length} of your key skills`);
        }
      }
    }

    totalScore += Math.min(questionScore, maxScorePerQuestion);
  });

  // Calculate percentage (max possible score is maxScorePerQuestion * number of questions)
  const maxPossibleScore = maxScorePerQuestion * answers.length;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Remove duplicate reasons and limit to top 3
  const uniqueReasons = Array.from(new Set(reasons)).slice(0, 3);

  // Add generic reason if we don't have enough specific ones
  if (uniqueReasons.length === 0) {
    uniqueReasons.push(`Based on your assessment profile`);
  }

  return {
    score: percentage,
    reasons: uniqueReasons
  };
}

/**
 * Main function: Match careers to user answers
 * Returns top N career matches sorted by score
 */
export function matchCareersToAnswers(
  careers: Career[],
  answers: Answer[],
  topN: number = 15
): CareerMatch[] {
  // Calculate scores for all careers
  const scoredCareers = careers.map(career => {
    const { score, reasons } = calculateCareerScore(career, answers);
    return {
      careerId: career._id,
      matchPercentage: score,
      matchReasons: reasons,
      career // Keep for sorting/filtering
    };
  });

  // Sort by score (highest first) and take top N
  const topMatches = scoredCareers
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, topN)
    .map(({ careerId, matchPercentage, matchReasons }) => ({
      careerId,
      matchPercentage,
      matchReasons
    }));

  return topMatches;
}

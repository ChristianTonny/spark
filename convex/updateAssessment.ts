import { internalMutation } from "./_generated/server";

/**
 * Updates the assessment to the new 25-question format
 * Run this from Convex dashboard after deployment
 * 
 * Usage: Run as internal mutation from dashboard
 */
export const updateTo25Questions = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing assessments
    const assessments = await ctx.db.query("assessments").collect();
    for (const assessment of assessments) {
      await ctx.db.delete(assessment._id);
    }

    // Create new 25-question assessment
    const assessmentId = await ctx.db.insert("assessments", {
      type: "interests",
      title: "Career Discovery Assessment",
      description: "Discover careers that match your interests, personality, and work values through 25 research-backed questions",
      icon: "🎯",
      duration: 15,
      questionCount: 25,
      questions: [
        // ===== RIASEC INTERESTS (Q1-Q12) =====
        // Q1-2: Realistic
        {
          id: "q1",
          text: "I would enjoy repairing mechanical equipment or electronics",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q2",
          text: "I prefer outdoor work over desk work",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // Q3-4: Investigative
        {
          id: "q3",
          text: "I enjoy researching complex problems to find solutions",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q4",
          text: "Reading scientific articles or research papers interests me",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // Q5-6: Artistic
        {
          id: "q5",
          text: "I enjoy creating visual designs, artwork, or creative content",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q6",
          text: "Writing stories, poetry, or creative content is enjoyable to me",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // Q7-8: Social
        {
          id: "q7",
          text: "I find satisfaction in teaching or explaining concepts to others",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q8",
          text: "Working in healthcare or counseling appeals to me",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // Q9-10: Enterprising
        {
          id: "q9",
          text: "I enjoy leading teams and making strategic decisions",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q10",
          text: "Selling products or services and persuading others sounds interesting",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // Q11-12: Conventional
        {
          id: "q11",
          text: "I like organizing information, files, or data in systematic ways",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q12",
          text: "Following established procedures and guidelines is important to me",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // ===== WORK VALUES (Q13-Q18) - Forced Choice =====
        {
          id: "q13",
          text: "Which matters more to you in a career?",
          type: "multiple_choice",
          options: [
            "High salary even if the work is routine",
            "Lower salary doing meaningful work",
          ],
        },
        {
          id: "q14",
          text: "Choose one:",
          type: "multiple_choice",
          options: [
            "Work-life balance with steady income",
            "Career advancement with longer hours",
          ],
        },
        {
          id: "q15",
          text: "What's more important to you?",
          type: "multiple_choice",
          options: [
            "Creative freedom and independence",
            "Job security and predictability",
          ],
        },
        {
          id: "q16",
          text: "Which career path appeals more?",
          type: "multiple_choice",
          options: [
            "Help individuals solve their problems",
            "Build wealth through business ventures",
          ],
        },
        {
          id: "q17",
          text: "Would you rather:",
          type: "multiple_choice",
          options: [
            "Set your own schedule and work independently",
            "Have a reliable 9-5 job with benefits and structure",
          ],
        },
        {
          id: "q18",
          text: "Choose what matters most:",
          type: "multiple_choice",
          options: [
            "Rapidly developing new skills and advancing",
            "Maintaining work-life balance and harmony",
          ],
        },

        // ===== BIG FIVE PERSONALITY (Q19-Q22) =====
        {
          id: "q19",
          text: "I enjoy exploring new ideas and trying unconventional approaches",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q20",
          text: "I make detailed plans before starting projects",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q21",
          text: "I often complete tasks at the last minute",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },
        {
          id: "q22",
          text: "I feel energized after spending time with large groups of people",
          type: "scale",
          scaleMin: 0,
          scaleMax: 4,
          scaleLabels: {
            min: "Strongly Disagree",
            max: "Strongly Agree",
          },
        },

        // ===== WORK STYLE SCENARIOS (Q23-Q25) =====
        {
          id: "q23",
          text: "Your group project is falling behind schedule. You typically:",
          type: "multiple_choice",
          options: [
            "Take charge and assign tasks to get back on track",
            "Facilitate a team discussion to find solutions together",
            "Focus on completing your part excellently",
            "Help resolve conflicts and keep the team motivated",
          ],
        },
        {
          id: "q24",
          text: "When facing a complex problem, you prefer to:",
          type: "multiple_choice",
          options: [
            "Research thoroughly before attempting solutions",
            "Try different approaches quickly to see what works",
            "Discuss with others to get diverse perspectives",
            "Break it into smaller parts and solve systematically",
          ],
        },
        {
          id: "q25",
          text: "Which work environment sounds most appealing?",
          type: "multiple_choice",
          options: [
            "Quiet office with clear tasks and minimal interruptions",
            "Dynamic environment with frequent collaboration and change",
            "Mix of independent work and team interaction",
            "Flexible remote work with occasional meetings",
          ],
        },
      ],
    });

    return {
      message: "Successfully updated to 25-question assessment!",
      assessmentId,
      questionCount: 25,
    };
  },
});


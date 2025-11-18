/**
 * UX Designer Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (medium)
 * - Pressure handling (medium)
 * - Collaboration (high)
 * - Creativity (very high)
 * - Independence (medium-high)
 * - Work-life balance (good)
 */

export const uxDesignerQuiz = {
  careerTitle: "UX Designer",
  questions: [
    {
      id: 1,
      question: "You spent 2 weeks designing a beautiful interface. User testing shows people are confused by your navigation. What do you do?",
      options: [
        {
          text: "Set ego aside, analyze the test results, redesign the navigation based on user behavior patterns, test again",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 3,
            creativity: 4,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Defend your design to the team - the users just need better onboarding tutorials",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Make minor tweaks to the existing design rather than starting over to save time",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Question whether the test participants represent real users and request another round with 'better' participants",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 2,
      question: "Engineering says your design will take 3 months to build. Marketing wants it in 3 weeks. How do you respond?",
      options: [
        {
          text: "Facilitate a meeting to identify MVP features, create a phased rollout plan that satisfies both timeline and user needs",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Simplify the design dramatically to meet the 3-week deadline, even if it compromises UX quality",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Side with engineering - proper UX takes time, marketing needs to adjust their expectations",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 1,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Create the design you want and let engineering and marketing fight it out",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 0,
            creativity: 3,
            independence: 4,
            workLifeBalance: 4
          }
        }
      ]
    },
    {
      id: 3,
      question: "The CEO loves a design pattern that you know will confuse users (and data backs you up). What do you do?",
      options: [
        {
          text: "Present the user research data professionally, offer alternative designs that achieve the CEO's goals while maintaining usability",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 4,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Implement the CEO's preference but document your concerns - they're the boss",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Refuse to implement it on principle - you're the UX expert and won't compromise user experience",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 0,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Implement it but make it look bad enough that they'll change their mind when they see it",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 0,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 4,
      question: "You're designing a mobile app but your only device is an iPhone. The majority of users will be on Android. What's your approach?",
      options: [
        {
          text: "Request Android devices for testing, study Material Design guidelines, collaborate with Android users, use responsive design principles",
          scores: {
            technical: 4,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Design for iPhone first, then adapt for Android later - iOS sets the design standards anyway",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Use platform-agnostic design principles that work everywhere, even if not perfectly optimized for either",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 2,
            creativity: 3,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Ask engineering to handle platform differences - that's their job",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 4
          }
        }
      ]
    },
    {
      id: 5,
      question: "Accessibility requirements mean adding features that will 'clutter' your minimal design aesthetic. How do you handle this?",
      options: [
        {
          text: "View accessibility as a design challenge, research inclusive design patterns, create solutions that are both accessible and beautiful",
          scores: {
            technical: 4,
            pressure: 3,
            collaboration: 3,
            creativity: 4,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Add the minimum required accessibility features in the most subtle way possible",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Question whether the company really needs to prioritize accessibility given the target audience",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Create a separate 'accessible version' of the site so it doesn't affect the main design",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "You're passionate about a design direction, but A/B testing shows the 'boring' alternative performs 15% better. What do you do?",
      options: [
        {
          text: "Go with the data, analyze why it performs better, apply those learnings to future designs",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Advocate for your design anyway - metrics don't capture long-term brand value and user delight",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 4,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Request more testing with different metrics that might favor your design",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Question the validity of the A/B test methodology and sample size",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 2.0,
      description: "Understanding design systems, accessibility, and technical constraints"
    },
    pressure: {
      weight: 1.5,
      description: "Handling tight deadlines and changing requirements"
    },
    collaboration: {
      weight: 2.5,
      description: "Working with engineering, product, marketing, and users"
    },
    creativity: {
      weight: 3.0,
      description: "Solving design problems innovatively"
    },
    independence: {
      weight: 2.0,
      description: "Making design decisions with authority"
    },
    workLifeBalance: {
      weight: 2.0,
      description: "Managing workload and boundaries"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong UX Designer Potential",
      message: "You show excellent UX instincts! Your responses show you can balance user needs, business goals, and technical constraints while maintaining creativity. Great UX designers must be able to defend their decisions with data while staying humble enough to admit when they're wrong."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Design Philosophy",
      message: "You have some UX skills, but may struggle with the balance between creativity and constraints. UX design requires ego management - your beautiful design means nothing if users can't use it. Consider whether you're more interested in artistic expression or user-centered problem solving."
    },
    low: {
      threshold: 0,
      title: "UX May Not Be The Right Fit",
      message: "Based on your responses, you might find UX design frustrating. The role requires constant compromise, data-driven decisions that override personal preference, and collaboration with non-designers. Consider graphic design, illustration, or roles with more creative autonomy."
    }
  }
};

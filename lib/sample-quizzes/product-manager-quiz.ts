/**
 * Product Manager Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (medium-high)
 * - Pressure handling (very high)
 * - Collaboration (very high)
 * - Creativity (high)
 * - Independence (high)
 * - Work-life balance (challenging)
 */

export const productManagerQuiz = {
  careerTitle: "Product Manager",
  questions: [
    {
      id: 1,
      question: "You have to choose: Build a feature that 80% of users want but is technically complex, or a feature that 20% of power users desperately need but is simple to build. 2-week timeline. What do you prioritize?",
      options: [
        {
          text: "Analyze revenue impact, user engagement metrics, and strategic value of each segment, then make data-driven decision and communicate reasoning to all stakeholders",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Build the simple feature for power users to show quick wins, add the complex feature to next sprint",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Build what the majority wants - 80% of users should always take priority",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Let engineering decide based on technical complexity - they know what's best",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 0,
            independence: 1,
            workLifeBalance: 4
          }
        }
      ]
    },
    {
      id: 2,
      question: "Sales promised a major enterprise client a custom feature to close a $500K deal. Engineering says it will derail the product roadmap for 2 months. What do you do?",
      options: [
        {
          text: "Facilitate discussion between sales, engineering, and leadership. Explore if the feature aligns with product strategy, can be generalized for others, or if alternative solutions exist",
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
          text: "Say no - sales shouldn't make product commitments without PM approval. Protect the roadmap",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 1,
            creativity: 1,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Build the custom feature - $500K is too valuable to lose over roadmap purity",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Escalate to your VP immediately - this is too big a decision for you to make",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 2,
            creativity: 0,
            independence: 1,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 3,
      question: "User research, customer support data, and your gut all tell you different things about what feature to build next. How do you decide?",
      options: [
        {
          text: "Dig deeper into each source: Why do they differ? Look for patterns, talk to customers directly, run a small experiment to validate assumptions",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 4,
            creativity: 4,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Trust the quantitative data over qualitative - numbers don't lie",
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
          text: "Go with your gut - you're the PM, that's why they hired you",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 3,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Build all three features in parallel with small tests to see what performs best",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 1,
            creativity: 2,
            independence: 2,
            workLifeBalance: 1
          }
        }
      ]
    },
    {
      id: 4,
      question: "Your competitor just launched the exact feature you've been planning for months. Your version is better but won't be ready for 6 weeks. What do you do?",
      options: [
        {
          text: "Assess if 'better' matters or if speed matters more. Consider MVP version in 2 weeks vs. waiting 6 weeks. Make strategic call based on market dynamics",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 4,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Stick to the plan - launching a rushed version will hurt your brand more than being second",
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
          text: "Pivot to a different feature where you can still be first",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 3,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Push the team to launch in 3 weeks instead of 6 - this is an emergency",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 1,
            creativity: 2,
            independence: 3,
            workLifeBalance: 1
          }
        }
      ]
    },
    {
      id: 5,
      question: "Engineering says your requested feature is 'technically impossible.' You've seen competitors do similar things. How do you respond?",
      options: [
        {
          text: "Ask questions to understand the constraints. Research competitor solutions. Explore alternative approaches. Find if it's impossible or just difficult with current architecture",
          scores: {
            technical: 4,
            pressure: 3,
            collaboration: 4,
            creativity: 4,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Accept their assessment - they're the technical experts, not you",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 2,
            creativity: 0,
            independence: 1,
            workLifeBalance: 4
          }
        },
        {
          text: "Show them proof that competitors did it and push them to figure it out",
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
          text: "Escalate to the CTO - if competitors can do it, so can you",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 0,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "It's Sunday night. You're reviewing metrics and notice a critical bug affecting 30% of users. It's been there for 3 days. What do you do?",
      options: [
        {
          text: "Immediately notify engineering lead and on-call, assess impact and workarounds, prepare customer communication, coordinate fix prioritization for Monday morning",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 0
          }
        },
        {
          text: "Document it thoroughly and make it the first thing discussed Monday morning",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 4
          }
        },
        {
          text: "Check if anyone else has noticed it. If not, it might not be as critical as it seems",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Call an emergency fix - everyone needs to get online now to resolve this",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 0
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 2.0,
      description: "Understanding technical trade-offs and constraints"
    },
    pressure: {
      weight: 2.5,
      description: "Making decisions with incomplete data under time pressure"
    },
    collaboration: {
      weight: 3.0,
      description: "Balancing needs of engineering, sales, support, users, leadership"
    },
    creativity: {
      weight: 2.5,
      description: "Finding innovative solutions to product challenges"
    },
    independence: {
      weight: 2.0,
      description: "Making tough decisions with authority"
    },
    workLifeBalance: {
      weight: 1.5,
      description: "Managing always-on responsibilities"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong PM Potential",
      message: "You show excellent product management instincts! Your responses indicate you can balance competing stakeholder needs, make data-driven decisions, and take ownership of outcomes. PMs are 'mini-CEOs' of their product - you seem ready for that responsibility."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Decision-Making Style",
      message: "You have some PM skills, but may struggle with the constant ambiguity and competing priorities. PM roles require making decisions with incomplete information while satisfying engineering, sales, support, and users simultaneously. Consider whether you're comfortable being the 'bad guy' who has to say no frequently."
    },
    low: {
      threshold: 0,
      title: "PM May Not Be The Right Path",
      message: "Based on your responses, you might find product management frustrating. The role requires being accountable for outcomes you don't directly control, constant context switching, and mediating conflicts. Consider roles with clearer responsibilities like project management, business analysis, or specialized technical roles."
    }
  }
};

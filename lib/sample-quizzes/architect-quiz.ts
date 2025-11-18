/**
 * Architect Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (very high)
 * - Pressure handling (high)
 * - Collaboration (very high)
 * - Creativity (very high)
 * - Independence (high)
 * - Work-life balance (challenging)
 */

export const architectQuiz = {
  careerTitle: "Architect",
  questions: [
    {
      id: 1,
      question: "Your beautiful, award-worthy design is over budget by 30%. The client loves it but can't afford it. What do you do?",
      options: [
        {
          text: "Work with client and contractor to value-engineer: identify which elements are essential to the design vision, find cost-effective alternatives for others, present options with trade-offs clearly explained",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 4,
            creativity: 4,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Simplify the design dramatically to meet budget, even if it loses the original vision",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Push the client to increase their budget - good design costs money",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 3,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Tell the contractor to find ways to reduce costs without changing your design",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 0,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 2,
      question: "The structural engineer says your cantilevered design is feasible but will require expensive specialized engineering. The client wants it but the contractor says it's 'unnecessarily complicated.' How do you respond?",
      options: [
        {
          text: "Present cost-benefit analysis of the design feature, explore if there are simpler structural solutions that achieve similar aesthetic effect, facilitate informed decision by client",
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
          text: "Side with the engineer - if it's structurally sound and client can afford it, build it as designed",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 2,
            creativity: 3,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Redesign with a simpler solution - contractors usually know what's practical",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 3,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Insist on the original design - architecture is about pushing boundaries, not taking the easy path",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 4,
            independence: 4,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 3,
      question: "You're 2 weeks from deadline for permit submission. You discover the MEP (mechanical, electrical, plumbing) engineer made errors that require redesigning several spaces. What do you do?",
      options: [
        {
          text: "Immediately coordinate with MEP engineer and team, assess extent of changes, determine if deadline can be met or if extension is needed, communicate transparently with client about situation and options",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 1
          }
        },
        {
          text: "Work around the clock to fix everything and make the deadline without telling the client about the problem",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 2,
            creativity: 3,
            independence: 3,
            workLifeBalance: 0
          }
        },
        {
          text: "Submit the drawings as-is and fix the errors during construction administration",
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
          text: "Request deadline extension from the permitting department and inform client",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 3,
            creativity: 1,
            independence: 2,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 4,
      question: "During construction, the contractor proposes a 'minor' change that will save $50K but significantly impact your design intent. The client is tempted by the savings. How do you handle it?",
      options: [
        {
          text: "Explain the design impact clearly with visuals, present the trade-offs honestly, offer alternative cost savings that don't compromise the design, let client make informed decision",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 4,
            creativity: 4,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Fight against the change - you're being paid for your design expertise and this compromise weakens the project",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 1,
            creativity: 3,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Accept the change - $50K is significant and client satisfaction matters more than design purity",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 3,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Redesign to incorporate the cost savings while maintaining design quality",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 3,
            creativity: 4,
            independence: 3,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 5,
      question: "A building code official rejects part of your design citing an interpretation of code you disagree with. This will require significant redesign. What's your approach?",
      options: [
        {
          text: "Research the code thoroughly, prepare documentation supporting your interpretation, request formal meeting with code official, consider alternatives if official maintains position, consult code consultant if needed",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Just redesign it - fighting with code officials rarely works and delays the project",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Have the client's lawyer send a letter - code officials often back down when lawyers get involved",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 0,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Appeal to the code official's supervisor or the board of appeals",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 2,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "You're working on a sustainability-focused project. The client loves the concept but keeps adding features that increase energy consumption. How do you address this?",
      options: [
        {
          text: "Use data to show energy impact of each addition, explain how it affects sustainability goals and certifications, offer alternative features that align with both desires and efficiency",
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
          text: "Let them add what they want - it's their building and their utility bills",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 2,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Refuse to add features that contradict the sustainability mission",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Add the features but compensate with additional green technology to maintain targets",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 2,
            workLifeBalance: 2
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 3.0,
      description: "Understanding of building systems, codes, and construction methods"
    },
    pressure: {
      weight: 2.0,
      description: "Handling deadlines, budget constraints, and unexpected issues"
    },
    collaboration: {
      weight: 2.5,
      description: "Working with clients, engineers, contractors, and officials"
    },
    creativity: {
      weight: 3.0,
      description: "Balancing artistic vision with practical constraints"
    },
    independence: {
      weight: 2.0,
      description: "Making design decisions and standing firm when needed"
    },
    workLifeBalance: {
      weight: 1.5,
      description: "Managing project deadlines and iterations"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong Architecture Potential",
      message: "You show excellent architectural instincts! Your responses indicate you can balance creative vision with technical constraints, client needs, and budget realities. Great architects must be both artists and pragmatists - you seem to understand that duality."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Design Philosophy",
      message: "You have some architectural skills, but may struggle with the constant compromise required. Architecture requires defending your vision while being flexible enough to adapt to constraints. Projects take years and require patience with bureaucracy, contractors, and client changes. Consider whether you're more interested in pure design or the full complexity of building realization."
    },
    low: {
      threshold: 0,
      title: "Architecture May Not Be The Right Path",
      message: "Based on your responses, you might find architecture practice frustrating. The role requires balancing artistic vision with codes, budgets, engineering realities, and client preferences. Very few projects get built exactly as initially designed. Consider graphic design, industrial design, or conceptual art where you have more creative control, or construction management if you're more interested in the building process."
    }
  }
};

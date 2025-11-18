/**
 * HR Manager Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (low-medium)
 * - Pressure handling (very high)
 * - Collaboration (very high)
 * - Creativity (medium)
 * - Independence (high)
 * - Work-life balance (challenging)
 */

export const hrManagerQuiz = {
  careerTitle: "HR Manager",
  questions: [
    {
      id: 1,
      question: "A top performer files a harassment complaint against their manager. The manager is also a strong performer bringing in significant revenue. What's your approach?",
      options: [
        {
          text: "Immediately launch formal investigation, interview witnesses, document everything, ensure complainant is protected, take appropriate action based on findings regardless of revenue impact",
          scores: {
            technical: 2,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 4,
            workLifeBalance: 1
          }
        },
        {
          text: "Talk to both parties informally first to see if it can be resolved without formal investigation",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Consult with legal team and let them decide how to proceed",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Consider transferring the complainant to a different team to separate them from the situation",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 2,
      question: "Your company needs to reduce headcount by 15% due to budget cuts. How do you approach this?",
      options: [
        {
          text: "Work with leadership to establish fair criteria, consider business impact and individual circumstances, ensure legal compliance, plan compassionate communication and severance packages",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 3,
            workLifeBalance: 1
          }
        },
        {
          text: "Use performance ratings to identify bottom 15% and let them go - most objective approach",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Let each department manager decide who to cut from their teams",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Recommend alternatives like salary cuts or furloughs before layoffs",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 2,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 3,
      question: "An employee tells you confidentially they're dealing with serious mental health issues affecting their work. Their manager is getting frustrated with their performance. What do you do?",
      options: [
        {
          text: "Discuss accommodation options, connect them with EAP resources, work with manager on temporary adjustments while maintaining confidentiality, document everything properly",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Tell the manager about the situation so they understand and can be more patient",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Suggest they take medical leave until they're better",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Sympathize but explain that performance standards still apply - suggest they talk to their manager directly",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 4,
      question: "Two departments have completely different pay scales for similar roles due to different managers' negotiation styles. Employees are starting to find out. How do you address this?",
      options: [
        {
          text: "Conduct compensation analysis across company, develop standardized pay bands and leveling system, create transition plan to address inequities over time with budget constraints in mind",
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
          text: "Raise the lower-paid employees to match the higher-paid ones immediately",
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
          text: "Explain that compensation is confidential and based on individual negotiation and performance",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 0,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Institute policy that no one discusses salaries to prevent these situations",
          scores: {
            technical: 0,
            pressure: 1,
            collaboration: 0,
            creativity: 0,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 5,
      question: "Your CEO wants to implement a return-to-office policy. 40% of employees say they'll quit if forced to return. What do you recommend?",
      options: [
        {
          text: "Present data on retention risk vs. business needs, propose hybrid options, survey employees on specific concerns, develop phased approach with team-by-team flexibility",
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
          text: "Support the CEO's decision - they set company culture and direction",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 0,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Call their bluff - people rarely quit over office policies when they actually face the decision",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Recommend delaying decision until the job market cools down",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "It's 8pm on Friday. An employee emails that they were just fired by their manager over text message with no warning. How do you respond?",
      options: [
        {
          text: "Respond immediately, investigate what happened, contact the manager, review documentation, determine if termination was proper, prepare to address situation first thing Monday regardless of weekend",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 4,
            workLifeBalance: 0
          }
        },
        {
          text: "Send a brief response acknowledging receipt, promise to investigate Monday morning",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Contact the manager immediately to get their side before responding to the employee",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 1
          }
        },
        {
          text: "This is why you don't check email on Friday nights - respond Monday",
          scores: {
            technical: 0,
            pressure: 0,
            collaboration: 0,
            creativity: 0,
            independence: 2,
            workLifeBalance: 4
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 1.5,
      description: "Understanding employment law, compensation systems, and HR processes"
    },
    pressure: {
      weight: 3.0,
      description: "Handling sensitive situations and crises"
    },
    collaboration: {
      weight: 3.0,
      description: "Balancing employee needs with business needs"
    },
    creativity: {
      weight: 1.5,
      description: "Finding solutions to people problems"
    },
    independence: {
      weight: 2.5,
      description: "Making difficult decisions with legal and ethical implications"
    },
    workLifeBalance: {
      weight: 1.5,
      description: "Managing crisis-driven schedule"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong HR Leadership Potential",
      message: "You show excellent HR instincts! Your responses indicate you can balance legal compliance, employee wellbeing, and business needs while handling sensitive situations with discretion. HR roles require being trusted with confidential information and making decisions that profoundly impact people's lives."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Comfort with Conflict",
      message: "You have some HR skills, but may struggle with the emotional weight and constant conflict mediation required. HR professionals often deal with people at their worst - layoffs, harassment complaints, terminations, and personal crises. Consider whether you can maintain objectivity while still showing empathy."
    },
    low: {
      threshold: 0,
      title: "HR May Not Be The Right Fit",
      message: "Based on your responses, you might find HR management overwhelming. The role requires navigating complex legal issues, handling confidential matters, and making decisions that can end someone's career. Consider roles in recruiting, training, or organizational development that focus more on the positive aspects of people management."
    }
  }
};

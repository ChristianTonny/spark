/**
 * Project Manager Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (basic)
 * - Pressure handling (high)
 * - Collaboration (very high)
 * - Creativity (medium)
 * - Independence (medium)
 * - Work-life balance (challenging)
 */

export const projectManagerQuiz = {
  careerTitle: "Project Manager",
  questions: [
    {
      id: 1,
      question: "Your project is behind schedule due to unexpected technical issues. The client meeting is tomorrow. What do you do?",
      options: [
        {
          text: "Call an emergency team meeting, assess what can realistically be delivered, prepare honest client update with recovery plan",
          scores: {
            technical: 1,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Ask the technical team to work overtime to catch up, promise the client everything will be ready",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 1,
            workLifeBalance: 0
          }
        },
        {
          text: "Reschedule the client meeting to buy more time without telling the team why",
          scores: {
            technical: 0,
            pressure: 1,
            collaboration: 0,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Blame the technical issues on specific team members in a group email to justify the delay",
          scores: {
            technical: 0,
            pressure: 0,
            collaboration: 0,
            creativity: 0,
            independence: 2,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 2,
      question: "Two key team members are in constant conflict, affecting the entire project. How do you handle it?",
      options: [
        {
          text: "Meet with each privately to understand their perspectives, then facilitate a structured conversation to resolve the root issues",
          scores: {
            technical: 1,
            pressure: 3,
            collaboration: 4,
            creativity: 3,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Tell them both to 'be professional' and threaten to escalate to HR if they can't get along",
          scores: {
            technical: 0,
            pressure: 2,
            collaboration: 1,
            creativity: 0,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Separate them by assigning completely different tasks, avoiding the underlying issue",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Ignore it and hope they work it out themselves - adults should handle their own problems",
          scores: {
            technical: 0,
            pressure: 0,
            collaboration: 0,
            creativity: 0,
            independence: 4,
            workLifeBalance: 4
          }
        }
      ]
    },
    {
      id: 3,
      question: "Your boss asks for a detailed progress report, but you're in back-to-back meetings all day managing urgent issues. What's your approach?",
      options: [
        {
          text: "Block 30 minutes between meetings to compile a concise report with key metrics and risks, even if it means staying late",
          scores: {
            technical: 2,
            pressure: 4,
            collaboration: 3,
            creativity: 2,
            independence: 3,
            workLifeBalance: 1
          }
        },
        {
          text: "Delegate the report writing to a senior team member who knows the project well",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 3,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Send a quick email with bullet points saying you'll provide details when meetings allow",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Skip some of the meetings to focus on the report - the report is what management sees",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 1,
            creativity: 1,
            independence: 4,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 4,
      question: "The client requests a major feature change mid-project that would require 3 extra weeks. Your deadline is fixed. What do you do?",
      options: [
        {
          text: "Analyze the impact, present options (reduced scope, later delivery, or additional resources), and facilitate a decision that works for everyone",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Accept the change and have the team work weekends and late nights to meet the original deadline",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 0
          }
        },
        {
          text: "Tell the client no without exploring alternatives - the scope is locked",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 0,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Secretly ask the dev team to cut corners on quality to fit in the new feature",
          scores: {
            technical: 0,
            pressure: 1,
            collaboration: 0,
            creativity: 1,
            independence: 3,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 5,
      question: "You discover that your project manager predecessor made unrealistic promises to the client about timeline and features. How do you address this?",
      options: [
        {
          text: "Schedule a reset meeting with stakeholders to align expectations based on realistic assessment, present revised plan with clear reasoning",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Try to deliver on the original promises by pushing the team harder and cutting features quietly",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 1,
            creativity: 2,
            independence: 2,
            workLifeBalance: 0
          }
        },
        {
          text: "Document the previous manager's mistakes in detail and present to leadership to cover yourself",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 0,
            creativity: 0,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Keep quiet and hope things work out, maybe the previous manager knew something you don't",
          scores: {
            technical: 0,
            pressure: 0,
            collaboration: 1,
            creativity: 0,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "It's Friday evening, you have weekend plans, but a critical bug was just found in production. What's your realistic response?",
      options: [
        {
          text: "Stay to coordinate the fix team, assess impact, communicate to stakeholders, and ensure issue is resolved before leaving",
          scores: {
            technical: 2,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 2,
            workLifeBalance: 0
          }
        },
        {
          text: "Set up the team to handle it, check in remotely during the weekend, be available if needed",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 3,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Delegate to the on-call engineer and go on with your plans - that's what on-call is for",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 4
          }
        },
        {
          text: "Put your phone on silent and deal with it Monday - production bugs happen",
          scores: {
            technical: 0,
            pressure: 0,
            collaboration: 0,
            creativity: 0,
            independence: 4,
            workLifeBalance: 4
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 1.5,
      description: "Understanding technical concepts and constraints"
    },
    pressure: {
      weight: 2.5,
      description: "Handling multiple deadlines, conflicts, and emergencies"
    },
    collaboration: {
      weight: 3.0,
      description: "Managing teams, stakeholders, and conflicts"
    },
    creativity: {
      weight: 1.5,
      description: "Finding solutions to project constraints"
    },
    independence: {
      weight: 1.5,
      description: "Making decisions with authority"
    },
    workLifeBalance: {
      weight: 2.0,
      description: "Managing time and boundaries"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong PM Potential",
      message: "You show strong project management instincts! Your responses indicate you can handle pressure, facilitate collaboration, and make tough decisions while maintaining team morale. PM roles require constant juggling of competing priorities."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Priorities",
      message: "You have some PM skills, but your work-life balance expectations may conflict with the realities of the role. PMs are often the first called during crises and need to balance team needs with stakeholder demands. Consider whether you're ready for that level of responsibility."
    },
    low: {
      threshold: 0,
      title: "PM May Not Be The Best Fit",
      message: "Based on your responses, you might find project management frustrating. The role requires constant coordination, conflict resolution, and accountability for others' work. Consider roles with more independent work or clearer boundaries."
    }
  }
};

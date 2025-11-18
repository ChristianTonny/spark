/**
 * Journalist Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (medium)
 * - Pressure handling (very high)
 * - Collaboration (high)
 * - Creativity (high)
 * - Independence (high)
 * - Work-life balance (very challenging)
 */

export const journalistQuiz = {
  careerTitle: "Journalist",
  questions: [
    {
      id: 1,
      question: "You have a source with explosive information about local government corruption. They'll only talk if you guarantee anonymity. How do you proceed?",
      options: [
        {
          text: "Verify information through at least two additional independent sources, consult editor about protecting source, document everything, prepare for potential legal pressure to reveal source",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 4,
            workLifeBalance: 2
          }
        },
        {
          text: "Agree to anonymity immediately and publish - this is too important to delay with bureaucracy",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 1,
            creativity: 3,
            independence: 4,
            workLifeBalance: 2
          }
        },
        {
          text: "Tell them you can't guarantee anonymity - no story is worth compromising journalistic ethics",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Take the information but try to find someone willing to go on record with similar claims",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 2,
      question: "It's 6pm Friday. Your editor says the morning front-page story fell through and you need to deliver a replacement by 9pm. What do you do?",
      options: [
        {
          text: "Quickly assess what stories you've been developing could be accelerated, make necessary calls, write efficiently, focus on what can be verified in the time available",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 3,
            creativity: 4,
            independence: 3,
            workLifeBalance: 0
          }
        },
        {
          text: "Tell your editor this is unfair and likely to result in poor journalism - push back on the deadline",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Pull together something quickly from press releases and existing material you can verify rapidly",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        },
        {
          text: "Suggest they run with a previously published piece and update it - better than rushing a new story",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 3,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 3,
      question: "You're covering a story where your findings contradict the narrative being pushed by your publication's major advertiser. What's your approach?",
      options: [
        {
          text: "Report the story accurately based on facts, inform editor of potential advertiser conflict, let editorial leadership decide how to proceed, document everything",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 4,
            creativity: 2,
            independence: 4,
            workLifeBalance: 2
          }
        },
        {
          text: "Publish it anyway - editorial and advertising should be completely separate",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 1,
            creativity: 2,
            independence: 4,
            workLifeBalance: 3
          }
        },
        {
          text: "Find ways to soften the story while still being technically accurate",
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
          text: "Pitch the story to a different publication that doesn't have that advertiser",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 3,
            independence: 4,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 4,
      question: "During an interview, your subject says something potentially defamatory about a third party off-record. Later, you find evidence it might be true. Can you use it?",
      options: [
        {
          text: "Go back to the source to see if they'll go on-record, independently verify the claim through other sources, consult legal team about defamation risk, only publish if properly verified and legally sound",
          scores: {
            technical: 4,
            pressure: 3,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Use it without attribution - if it's true and you can prove it, off-record doesn't matter",
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
          text: "Don't use it - off-record means off-record regardless of verification",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 3,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Report the allegation exists without using the off-record quote or naming your source",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 3,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 5,
      question: "You're assigned to cover a sensitive story about a tragedy. Family members don't want to talk, but your editor says you need quotes from them. How do you approach this?",
      options: [
        {
          text: "Respect their wishes initially, explain your role compassionately, offer them opportunity to share their perspective when they're ready, find alternative sources for context, push back on editor if family firmly declines",
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
          text: "Persist professionally - the public has a right to know and families often want their story told eventually",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 2,
            creativity: 2,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Write the story without family quotes - you don't need their permission to cover news",
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
          text: "Use quotes from social media or other public sources instead of direct interviews",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 3,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 6,
      question: "You witness something newsworthy while off-duty at a family event. Covering it means leaving the event and potentially damaging personal relationships. What do you do?",
      options: [
        {
          text: "Assess the news value and time sensitivity, make quick calls/photos if possible, notify editor, decide based on whether it's truly urgent or can wait until you're back on duty",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 3,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Cover it immediately - journalists are never truly off-duty, this is part of the job",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 2,
            creativity: 3,
            independence: 4,
            workLifeBalance: 0
          }
        },
        {
          text: "Tip off the newsroom so another reporter can cover it while you stay at the event",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 3,
            creativity: 3,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Enjoy your family time - there will always be news and you need boundaries",
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
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 2.0,
      description: "Understanding verification, sourcing, and journalism ethics"
    },
    pressure: {
      weight: 3.0,
      description: "Meeting deadlines and handling breaking news"
    },
    collaboration: {
      weight: 2.5,
      description: "Working with sources, editors, and subjects"
    },
    creativity: {
      weight: 2.5,
      description: "Finding stories and angles others miss"
    },
    independence: {
      weight: 2.5,
      description: "Making ethical decisions under pressure"
    },
    workLifeBalance: {
      weight: 1.5,
      description: "Managing unpredictable hours and always-on culture"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong Journalism Potential",
      message: "You show excellent journalistic instincts! Your responses indicate you understand the balance between getting the story and maintaining ethical standards. Good journalists must be persistent yet respectful, fast yet accurate, and able to handle pressure while making sound ethical decisions."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Boundaries",
      message: "You have some journalism skills, but may struggle with the lifestyle demands and ethical dilemmas. Journalism often requires working nights, weekends, and during personal time for breaking news. The job also involves regularly dealing with people during difficult moments and making quick decisions with incomplete information. Consider whether you're ready for that reality."
    },
    low: {
      threshold: 0,
      title: "Journalism May Not Be The Right Fit",
      message: "Based on your responses, you might find journalism stressful or ethically challenging. The role requires being comfortable with confrontation, tight deadlines, erratic schedules, and constant pressure to produce under uncertain conditions. Consider roles in communications, public relations, content marketing, or publishing where you can use writing skills with more predictable schedules and clearer boundaries."
    }
  }
};

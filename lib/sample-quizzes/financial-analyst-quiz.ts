// Reality Quiz for Financial Analyst
// This quiz helps students understand the real day-to-day of financial analysis

export const financialAnalystQuiz = {
  title: "Is Financial Analysis Right for You?",
  description: "Experience real scenarios financial analysts face daily. See if you're ready for spreadsheets, deadlines, and data-driven decisions.",
  duration: 8,
  questions: [
    {
      id: "fa_q1",
      scenario: "It's 8 AM Monday. Your boss needs a financial model updated with Q3 data before the 10 AM executive meeting. The original analyst is sick. What's your move?",
      options: [
        {
          text: "Jump in immediately. Pull the data, update formulas, and verify calculations. Coffee can wait.",
          insight: "You prioritize urgent deadlines and can work under pressure",
          scores: { technical: 2, pressure: 3, independence: 2, workLifeBalance: -1 }
        },
        {
          text: "First, email the boss to confirm exactly what's needed and flag any assumptions I'll need to make.",
          insight: "You're methodical and manage expectations",
          scores: { technical: 2, pressure: 1, collaboration: 2, independence: 1 }
        },
        {
          text: "Check if anyone else can help or if the deadline can shift 30 minutes while I get up to speed.",
          insight: "You seek support and negotiate timelines",
          scores: { collaboration: 3, pressure: -1, workLifeBalance: 2 }
        },
        {
          text: "This sounds stressful. I'd rather work on projects with more reasonable timelines.",
          insight: "You prefer predictable work without time pressure",
          scores: { pressure: -3, workLifeBalance: 3, technical: -1 }
        }
      ],
      correctAnswer: 0,
      explanation: "Financial analysis often involves urgent requests. The best response is diving in while flagging assumptions—showing both action and communication.",
      realityNote: "60% of your work will be 'urgent' requests. The other 40%? Updating the models you built under pressure."
    },
    {
      id: "fa_q2",
      scenario: "You've spent 3 days building a detailed revenue forecast. In the review meeting, the VP says: 'These assumptions don't match my gut feeling. Redo this with 15% higher growth.'",
      options: [
        {
          text: "Explain why my assumptions are based on historical data and market trends. Offer to show the analysis.",
          insight: "You defend your work with data",
          scores: { technical: 3, collaboration: 1, independence: 2, creativity: 1 }
        },
        {
          text: "Ask what specific factors they're seeing that I might have missed, then incorporate their insights.",
          insight: "You balance data with executive judgment",
          scores: { collaboration: 3, technical: 1, independence: -1, creativity: 2 }
        },
        {
          text: "Make the changes they want, but include a comparison scenario showing both forecasts.",
          insight: "You accommodate requests while showing alternatives",
          scores: { collaboration: 2, technical: 2, pressure: 1, creativity: 1 }
        },
        {
          text: "This is frustrating. Why did I spend days on analysis if gut feelings override data?",
          insight: "You value data-driven decisions over politics",
          scores: { technical: 2, collaboration: -2, pressure: -2 }
        }
      ],
      explanation: "Financial analysts must balance data rigor with executive intuition. Option 2 shows respect for experience while maintaining analytical standards.",
      realityNote: "Reality check: Your beautiful models will be challenged. Execs trust their instincts + your data. Get comfortable with the blend."
    },
    {
      id: "fa_q3",
      scenario: "You discover an error in last quarter's financial report that made revenue look 5% higher than reality. It's already been presented to the board.",
      options: [
        {
          text: "Immediately notify my manager and prepare a correction with the right numbers and explanation.",
          insight: "You prioritize accuracy and transparency",
          scores: { technical: 3, pressure: 2, collaboration: 2, independence: 1 }
        },
        {
          text: "Fix it going forward without making a big deal. It's only 5% and last quarter is done.",
          insight: "You avoid uncomfortable situations",
          scores: { pressure: -3, technical: -2, collaboration: -2 }
        },
        {
          text: "Document the error privately, fix it, and mention it casually if anyone asks.",
          insight: "You correct mistakes but downplay them",
          scores: { technical: 1, pressure: -1, independence: 2 }
        },
        {
          text: "Investigate who made the error first, then decide whether to report it.",
          insight: "You're cautious about accountability",
          scores: { technical: 1, pressure: -1, collaboration: -1 }
        }
      ],
      explanation: "Integrity is non-negotiable in finance. Immediate disclosure with a solution shows professionalism and builds trust.",
      realityNote: "Mistakes happen. How you handle them defines your career. The best analysts catch errors; great ones own up immediately."
    },
    {
      id: "fa_q4",
      scenario: "Friday 4 PM: You're reviewing a complex M&A model. Something feels off with the debt calculations, but you can't pinpoint it. The partner wants this Monday morning.",
      options: [
        {
          text: "Stay late tonight to figure it out. I won't send something that feels wrong.",
          insight: "You're thorough and quality-focused",
          scores: { technical: 3, pressure: 2, workLifeBalance: -2, independence: 2 }
        },
        {
          text: "Flag the concern in an email, explain what I've checked, and ask if someone can review over the weekend.",
          insight: "You communicate uncertainty clearly",
          scores: { collaboration: 3, technical: 2, pressure: 1, independence: -1 }
        },
        {
          text: "Make a note in the model about the uncertainty and send it. Let the partner decide.",
          insight: "You pass decisions up the chain",
          scores: { collaboration: 1, pressure: -1, technical: 1, independence: -1 }
        },
        {
          text: "The numbers pass basic checks. Sometimes you have to ship good enough work.",
          insight: "You balance perfection with deadlines",
          scores: { pressure: 1, technical: -1, workLifeBalance: 2, independence: 1 }
        }
      ],
      explanation: "When something feels wrong with financial models, trust your instincts. Option 1 or 2 show professional diligence.",
      realityNote: "Your 'spidey sense' for numbers will develop over time. Senior analysts can feel when a model is off. Trust it."
    },
    {
      id: "fa_q5",
      scenario: "You're analyzing a potential investment. The numbers look great, but you notice the company's top 3 customers represent 80% of revenue. Your boss is excited about the deal.",
      options: [
        {
          text: "Highlight this as a major risk in my report. Customer concentration is a red flag that needs attention.",
          insight: "You identify and communicate risks clearly",
          scores: { technical: 3, collaboration: 2, independence: 2, creativity: 1 }
        },
        {
          text: "Model several scenarios: if they lose 1 customer, 2 customers, or retain all. Let the numbers speak.",
          insight: "You use analysis to illustrate risks",
          scores: { technical: 3, creativity: 2, collaboration: 1, independence: 1 }
        },
        {
          text: "Mention it in the risks section but focus on the positive financials since my boss is excited.",
          insight: "You soften bad news",
          scores: { collaboration: 1, technical: 1, independence: -1, pressure: 1 }
        },
        {
          text: "The financials are strong. Customer concentration is a standard risk in many industries.",
          insight: "You downplay concerns to support the deal",
          scores: { technical: -1, collaboration: 1, independence: -2, pressure: -1 }
        }
      ],
      explanation: "Great analysts separate facts from emotions. Option 1 or 2 shows you can challenge deals objectively, even when leadership is bullish.",
      realityNote: "Being the person who asks hard questions isn't always popular, but it's literally your job. Good leaders value truth over enthusiasm."
    },
    {
      id: "fa_q6",
      scenario: "After 6 months, you realize you spend 70% of your time in Excel and 30% in meetings explaining your Excel. This is...",
      options: [
        {
          text: "Exactly what I expected. I love building models and seeing how businesses work through numbers.",
          insight: "You thrive in analytical detail work",
          scores: { technical: 3, independence: 2, collaboration: 1, workLifeBalance: 1 }
        },
        {
          text: "More Excel than I hoped, but the variety of projects makes it interesting.",
          insight: "You tolerate repetitive work for variety",
          scores: { technical: 2, creativity: 1, collaboration: 2, workLifeBalance: 0 }
        },
        {
          text: "Less interaction with people than I want. I'd prefer more client-facing work.",
          insight: "You crave human interaction",
          scores: { collaboration: 3, technical: -1, creativity: 1, independence: -2 }
        },
        {
          text: "Honestly? A bit boring. I thought there'd be more strategy and less spreadsheet maintenance.",
          insight: "You want more strategic, less tactical work",
          scores: { technical: -2, creativity: 3, collaboration: 1, pressure: -1 }
        }
      ],
      explanation: "Financial analysis is fundamentally about making complex numbers understandable. If you don't enjoy Excel and explanation, this isn't your path.",
      realityNote: "Junior analysts live in Excel. Senior analysts live in Excel but with better coffee and more meetings. VP's still use Excel, just with analysts doing the typing."
    }
  ],
  scoringGuide: {
    technical: { min: -6, max: 18, weight: 2.5 },
    pressure: { min: -10, max: 14, weight: 2.0 },
    collaboration: { min: -8, max: 16, weight: 1.5 },
    creativity: { min: -2, max: 8, weight: 1.0 },
    independence: { min: -6, max: 12, weight: 1.5 },
    workLifeBalance: { min: -5, max: 10, weight: 1.5 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Fit for Financial Analysis",
      message: "You show the right mix of technical skills, pressure tolerance, and analytical thinking. You understand that this role means long hours with spreadsheets, tight deadlines, and challenging your own assumptions. The career path from analyst → senior analyst → VP Finance is clear, and you're built for the climb."
    },
    medium: {
      min: 45,
      title: "Consider Your Priorities",
      message: "You have some analytical aptitude, but think carefully: Can you handle 70% of your time in Excel? Are you comfortable with urgent deadline pressure? Do you enjoy finding errors in complex models? If these don't excite you, explore corporate finance or FP&A roles with more variety."
    },
    low: {
      min: 0,
      title: "Financial Analysis May Not Fit",
      message: "Your responses suggest you'd struggle with the core realities: repetitive analytical work, high-pressure deadlines, and technical detail. Consider roles like business development, account management, or product management where your strengths in creativity and collaboration shine more."
    }
  }
};

/**
 * Sample Reality Quiz for Software Developer Career
 *
 * This demonstrates the quiz structure and can be used to seed the database
 */

export const softwareDeveloperQuiz = {
  title: "A Day as a Software Developer",
  description: "Experience real scenarios developers face daily. See if this career matches your style.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "It's 6 PM on Friday. Your code broke production and 1,000 users can't access the app. Your team is waiting for you at dinner. What do you do?",
      options: [
        {
          text: "Drop everything, cancel dinner, debug immediately until it's fixed",
          insight: "You show strong pressure tolerance and responsibility, but may risk burnout",
          scores: {
            pressure: 10,
            technical: 8,
            workLifeBalance: -5,
            independence: 5,
          },
        },
        {
          text: "Document the issue, create a rollback plan, set up monitoring, fix it Monday",
          insight: "You balance urgency with sustainability - key for long-term success",
          scores: {
            pressure: 7,
            technical: 9,
            workLifeBalance: 8,
            collaboration: 5,
          },
        },
        {
          text: "Call senior developers immediately for help and guidance",
          insight: "You value collaboration and know when to ask for help",
          scores: {
            collaboration: 10,
            pressure: 5,
            independence: -3,
            technical: 4,
          },
        },
        {
          text: "Feel overwhelmed and panic about the situation",
          insight: "High-pressure situations may be challenging - consider if this is right for you",
          scores: {
            pressure: -8,
            technical: 2,
            workLifeBalance: 0,
          },
        },
      ],
      correctAnswer: 1,
      explanation: "Most experienced developers choose option 2 - balancing urgency with smart recovery processes. Production issues happen to everyone.",
      realityNote: "78% of developers face production issues monthly. The best handle it systematically, not heroically.",
    },
    {
      id: "q2",
      scenario: "You've been debugging the same issue for 3 hours with no progress. What's your next move?",
      options: [
        {
          text: "Keep pushing - I'll figure it out eventually",
          insight: "Persistence is valuable but can become inefficient without fresh perspectives",
          scores: {
            independence: 8,
            pressure: 6,
            collaboration: -5,
            technical: 5,
          },
        },
        {
          text: "Take a break, clear your head, come back fresh",
          insight: "You understand the value of mental space in problem-solving",
          scores: {
            pressure: 8,
            workLifeBalance: 7,
            technical: 7,
            independence: 6,
          },
        },
        {
          text: "Ask a colleague to pair program and get a second perspective",
          insight: "You leverage collaboration effectively - a key developer skill",
          scores: {
            collaboration: 10,
            technical: 8,
            independence: 3,
            pressure: 7,
          },
        },
        {
          text: "Search Stack Overflow and developer forums for similar issues",
          insight: "You know how to use available resources efficiently",
          scores: {
            technical: 9,
            independence: 7,
            collaboration: 4,
            creativity: 6,
          },
        },
      ],
      explanation: "Options 2, 3, and 4 are all valid strategies. The key is knowing when to use each one.",
      realityNote: "Developers spend 30-40% of their time debugging. Learning to debug efficiently is crucial.",
    },
    {
      id: "q3",
      scenario: "Your manager assigns you a project using a technology you've never used. Deadline is 2 weeks. How do you react?",
      options: [
        {
          text: "Excited! Love learning new tech",
          insight: "You thrive on continuous learning - perfect for software development",
          scores: {
            creativity: 10,
            technical: 8,
            pressure: 6,
            independence: 7,
          },
        },
        {
          text: "Stressed. Prefer sticking to what I know",
          insight: "Technology changes constantly - this may cause ongoing stress",
          scores: {
            pressure: -5,
            technical: 3,
            creativity: -3,
            independence: 4,
          },
        },
        {
          text: "Ask to pair with someone experienced in this tech",
          insight: "Smart approach - leveraging team knowledge accelerates learning",
          scores: {
            collaboration: 10,
            technical: 7,
            pressure: 7,
            creativity: 6,
          },
        },
        {
          text: "Dive into documentation and tutorials immediately",
          insight: "Self-directed learning is a core developer skill",
          scores: {
            technical: 9,
            independence: 9,
            creativity: 7,
            collaboration: 3,
          },
        },
      ],
      explanation: "Software changes constantly. Developers learn new technologies multiple times per year.",
      realityNote: "Average developer learns 3-5 new frameworks/tools annually. Continuous learning is the job.",
    },
    {
      id: "q4",
      scenario: "You have a brilliant idea for improving the product, but it's not in your assigned tasks. What do you do?",
      options: [
        {
          text: "Build a quick prototype in my free time to demonstrate the value",
          insight: "You show initiative and creativity - valuable traits for senior roles",
          scores: {
            creativity: 10,
            independence: 9,
            technical: 8,
            workLifeBalance: -3,
          },
        },
        {
          text: "Bring it up in the next team meeting for discussion",
          insight: "You balance ideas with team input - collaborative innovation",
          scores: {
            collaboration: 10,
            creativity: 8,
            pressure: 5,
            technical: 6,
          },
        },
        {
          text: "Email my manager privately with the suggestion",
          insight: "You respect hierarchy and proper channels",
          scores: {
            collaboration: 6,
            creativity: 7,
            independence: 5,
            technical: 5,
          },
        },
        {
          text: "Focus on my assigned work - don't want to overstep",
          insight: "While focused, you may miss opportunities to add extra value",
          scores: {
            collaboration: 4,
            creativity: -3,
            pressure: 8,
            independence: 3,
          },
        },
      ],
      explanation: "Good developers balance assigned work with proactive improvement. Options 1 and 2 show initiative.",
      realityNote: "Many successful products started as developer side projects. Innovation is encouraged.",
    },
    {
      id: "q5",
      scenario: "Code review feedback says your code works but could be cleaner. It's Friday afternoon. What do you do?",
      options: [
        {
          text: "Refactor it now - I want the code to be excellent",
          insight: "You value code quality highly, though this may affect work-life balance",
          scores: {
            technical: 10,
            pressure: 7,
            workLifeBalance: -4,
            collaboration: 6,
          },
        },
        {
          text: "Schedule refactoring for Monday - it's not urgent",
          insight: "You balance quality with sustainable work pace",
          scores: {
            workLifeBalance: 9,
            technical: 8,
            pressure: 8,
            collaboration: 7,
          },
        },
        {
          text: "Ask the reviewer to show me what they mean before changing anything",
          insight: "You value learning and clear communication",
          scores: {
            collaboration: 10,
            technical: 8,
            independence: 4,
            creativity: 7,
          },
        },
        {
          text: "It works, so I'll leave it - 'if it ain't broke, don't fix it'",
          insight: "You may struggle with code quality expectations in professional settings",
          scores: {
            technical: -5,
            collaboration: -3,
            workLifeBalance: 7,
            pressure: 3,
          },
        },
      ],
      explanation: "Code reviews are learning opportunities. Options 1-3 show growth mindset.",
      realityNote: "Code review is standard practice. Expect feedback on 80%+ of your code. It's how teams improve.",
    },
    {
      id: "q6",
      scenario: "A non-technical stakeholder wants a feature that would take 3 months but they want it in 2 weeks. How do you respond?",
      options: [
        {
          text: "Explain technical constraints clearly and propose realistic timeline",
          insight: "You communicate well and set healthy boundaries",
          scores: {
            collaboration: 9,
            pressure: 8,
            technical: 8,
            creativity: 6,
          },
        },
        {
          text: "Say yes to please them, then stress about the impossible deadline",
          insight: "People-pleasing may lead to burnout and missed deadlines",
          scores: {
            pressure: -8,
            collaboration: 3,
            workLifeBalance: -6,
            technical: 4,
          },
        },
        {
          text: "Propose a minimal version that could ship in 2 weeks, full version in 3 months",
          insight: "You think creatively about solutions - key product mindset",
          scores: {
            creativity: 10,
            collaboration: 9,
            technical: 8,
            pressure: 7,
          },
        },
        {
          text: "Say it's impossible and refuse to discuss alternatives",
          insight: "While honest, this approach may limit your impact and relationships",
          scores: {
            independence: 5,
            collaboration: -5,
            creativity: -4,
            pressure: 4,
          },
        },
      ],
      explanation: "Option 3 is the best - it shows product thinking and collaboration while being realistic.",
      realityNote: "Unrealistic stakeholder requests are weekly occurrences. Managing expectations is part of the job.",
    },
    {
      id: "q7",
      scenario: "You spend most of your day in meetings instead of coding. How do you feel?",
      options: [
        {
          text: "Frustrated - I became a developer to code, not attend meetings",
          insight: "Valid feeling, but meetings increase as you grow in your career",
          scores: {
            independence: 8,
            technical: 7,
            collaboration: -3,
            workLifeBalance: 5,
          },
        },
        {
          text: "Fine - collaboration and alignment are important",
          insight: "You understand the broader context of software development",
          scores: {
            collaboration: 10,
            pressure: 7,
            independence: 3,
            technical: 6,
          },
        },
        {
          text: "Block out focused coding time and limit meetings",
          insight: "You balance collaboration needs with productivity - senior-level skill",
          scores: {
            independence: 9,
            technical: 9,
            collaboration: 7,
            workLifeBalance: 8,
          },
        },
        {
          text: "Accept it but resent it quietly",
          insight: "Passive resentment may affect job satisfaction long-term",
          scores: {
            collaboration: 4,
            pressure: -4,
            workLifeBalance: -3,
            independence: 5,
          },
        },
      ],
      explanation: "Option 3 shows maturity. As developers advance, meetings become unavoidable but manageable.",
      realityNote: "Senior developers spend 40-60% of time in meetings. Individual contributors: 20-30%.",
    },
  ],
  scoringGuide: {
    technical: { min: -10, max: 70, weight: 0.20 },
    pressure: { min: -25, max: 60, weight: 0.20 },
    collaboration: { min: -15, max: 70, weight: 0.15 },
    creativity: { min: -10, max: 60, weight: 0.15 },
    independence: { min: -5, max: 65, weight: 0.15 },
    workLifeBalance: { min: -20, max: 55, weight: 0.15 },
  },
  results: {
    high: {
      min: 70,
      title: "Strong Fit",
      message: "Your responses suggest you're well-suited for software development. You handle pressure well, think technically, and balance collaboration with independence. You understand the realities of the profession and seem prepared for its challenges.",
    },
    medium: {
      min: 50,
      title: "Potential Fit",
      message: "You have some alignment with software development but may want to explore more. Some aspects (pressure, continuous learning, or collaboration expectations) might be challenging. Consider talking to developers and trying small coding projects before fully committing.",
    },
    low: {
      min: 0,
      title: "Consider Alternatives",
      message: "Your responses suggest software development may not align well with your work style and preferences. The pressure, constant learning, and collaboration requirements might cause ongoing stress. Explore other careers that better match your strengths and preferences.",
    },
  },
};

/**
 * Seed new Reality Quizzes for additional careers
 * Run with: npx convex run seedNewQuizzes:seedNewCareersAndQuizzes
 */

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Financial Analyst Quiz (career already exists)
const financialAnalystQuiz = {
  title: "A Day as a Financial Analyst",
  description: "Experience real scenarios financial analysts face daily. See if you're ready for spreadsheets, deadlines, and data-driven decisions.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "It's 8 AM Monday. Your boss needs a financial model updated with Q3 data before the 10 AM executive meeting. The original analyst is sick. What's your move?",
      options: [
        { text: "Jump in immediately. Pull the data, update formulas, and verify calculations. Coffee can wait.", insight: "You prioritize urgent deadlines and can work under pressure", scores: { technical: 9, pressure: 10, independence: 8, collaboration: 6, creativity: 5, workLifeBalance: -3 } },
        { text: "First, email the boss to confirm exactly what's needed and flag any assumptions I'll need to make.", insight: "You're methodical and manage expectations", scores: { technical: 9, pressure: 8, collaboration: 10, independence: 7, creativity: 6, workLifeBalance: 6 } },
        { text: "Check if anyone else can help or if the deadline can shift 30 minutes while I get up to speed.", insight: "You seek support and negotiate timelines", scores: { collaboration: 9, pressure: 5, workLifeBalance: 8, technical: 6, independence: 4, creativity: 5 } },
        { text: "This sounds stressful. I'd rather work on projects with more reasonable timelines.", insight: "You prefer predictable work without time pressure", scores: { pressure: -7, workLifeBalance: 9, technical: 3, independence: 4, collaboration: 5, creativity: 4 } }
      ],
      explanation: "Financial analysis often involves urgent requests. The best response is diving in while managing expectations.",
      realityNote: "60% of your work will be 'urgent' requests. The other 40%? Updating the models you built under pressure."
    },
    {
      id: "q2",
      scenario: "You've spent 3 days building a detailed revenue forecast. In the review meeting, the VP says: 'These assumptions don't match my gut feeling. Redo this with 15% higher growth.'",
      options: [
        { text: "Explain why my assumptions are based on historical data and market trends. Offer to show the analysis.", insight: "You defend your work with data", scores: { technical: 10, collaboration: 7, independence: 9, creativity: 6, pressure: 8, workLifeBalance: 5 } },
        { text: "Ask what specific factors they're seeing that I might have missed, then incorporate their insights.", insight: "You balance data with executive judgment", scores: { collaboration: 10, technical: 8, independence: 5, creativity: 8, pressure: 8, workLifeBalance: 6 } },
        { text: "Make the changes they want, but include a comparison scenario showing both forecasts.", insight: "You accommodate requests while showing alternatives", scores: { collaboration: 8, technical: 9, pressure: 7, creativity: 7, independence: 6, workLifeBalance: 6 } },
        { text: "This is frustrating. Why did I spend days on analysis if gut feelings override data?", insight: "You value data-driven decisions over politics", scores: { technical: 6, collaboration: -3, pressure: -5, independence: 7, creativity: 4, workLifeBalance: 3 } }
      ],
      explanation: "Financial analysts must balance data rigor with executive intuition. Showing respect for experience while maintaining analytical standards is key.",
      realityNote: "Your beautiful models will be challenged. Execs trust their instincts + your data. Get comfortable with the blend."
    },
    {
      id: "q3",
      scenario: "You discover an error in last quarter's financial report that made revenue look 5% higher than reality. It's already been presented to the board.",
      options: [
        { text: "Immediately notify my manager and prepare a correction with the right numbers and explanation.", insight: "You prioritize accuracy and transparency", scores: { technical: 10, pressure: 9, collaboration: 9, independence: 8, creativity: 5, workLifeBalance: 5 } },
        { text: "Fix it going forward without making a big deal. It's only 5% and last quarter is done.", insight: "You avoid uncomfortable situations", scores: { pressure: -6, technical: -5, collaboration: -5, independence: 4, creativity: 3, workLifeBalance: 7 } },
        { text: "Document the error privately, fix it, and mention it casually if anyone asks.", insight: "You correct mistakes but downplay them", scores: { technical: 4, pressure: -2, independence: 6, collaboration: 3, creativity: 4, workLifeBalance: 7 } },
        { text: "Investigate who made the error first, then decide whether to report it.", insight: "You're cautious about accountability", scores: { technical: 5, pressure: -2, collaboration: 2, independence: 6, creativity: 4, workLifeBalance: 6 } }
      ],
      explanation: "Integrity is non-negotiable in finance. Immediate disclosure with a solution shows professionalism and builds trust.",
      realityNote: "Mistakes happen. How you handle them defines your career. The best analysts catch errors; great ones own up immediately."
    },
    {
      id: "q4",
      scenario: "Friday 4 PM: You're reviewing a complex M&A model. Something feels off with the debt calculations, but you can't pinpoint it. The partner wants this Monday morning.",
      options: [
        { text: "Stay late tonight to figure it out. I won't send something that feels wrong.", insight: "You're thorough and quality-focused", scores: { technical: 10, pressure: 9, workLifeBalance: -5, independence: 9, collaboration: 6, creativity: 6 } },
        { text: "Flag the concern in an email, explain what I've checked, and ask if someone can review over the weekend.", insight: "You communicate uncertainty clearly", scores: { collaboration: 10, technical: 9, pressure: 8, independence: 5, creativity: 7, workLifeBalance: 7 } },
        { text: "Make a note in the model about the uncertainty and send it. Let the partner decide.", insight: "You pass decisions up the chain", scores: { collaboration: 6, pressure: 5, technical: 5, independence: 3, creativity: 4, workLifeBalance: 7 } },
        { text: "The numbers pass basic checks. Sometimes you have to ship good enough work.", insight: "You balance perfection with deadlines", scores: { pressure: 6, technical: 4, workLifeBalance: 8, independence: 6, collaboration: 5, creativity: 4 } }
      ],
      explanation: "When something feels wrong with financial models, trust your instincts. Professional diligence protects everyone.",
      realityNote: "Your 'spidey sense' for numbers will develop over time. Senior analysts can feel when a model is off. Trust it."
    },
    {
      id: "q5",
      scenario: "You're analyzing a potential investment. The numbers look great, but you notice the company's top 3 customers represent 80% of revenue. Your boss is excited about the deal.",
      options: [
        { text: "Highlight this as a major risk in my report. Customer concentration is a red flag that needs attention.", insight: "You identify and communicate risks clearly", scores: { technical: 10, collaboration: 9, independence: 9, creativity: 6, pressure: 8, workLifeBalance: 6 } },
        { text: "Model several scenarios: if they lose 1 customer, 2 customers, or retain all. Let the numbers speak.", insight: "You use analysis to illustrate risks", scores: { technical: 10, creativity: 9, collaboration: 8, independence: 8, pressure: 8, workLifeBalance: 5 } },
        { text: "Mention it in the risks section but focus on the positive financials since my boss is excited.", insight: "You soften bad news", scores: { collaboration: 6, technical: 6, independence: 3, pressure: 6, creativity: 5, workLifeBalance: 7 } },
        { text: "The financials are strong. Customer concentration is a standard risk in many industries.", insight: "You downplay concerns to support the deal", scores: { technical: 3, collaboration: 5, independence: 2, pressure: 4, creativity: 3, workLifeBalance: 7 } }
      ],
      explanation: "Great analysts separate facts from emotions. Asking hard questions isn't always popular, but it's your job.",
      realityNote: "Being the person who asks hard questions isn't always popular, but it's literally your job. Good leaders value truth over enthusiasm."
    },
    {
      id: "q6",
      scenario: "After 6 months, you realize you spend 70% of your time in Excel and 30% in meetings explaining your Excel. This is...",
      options: [
        { text: "Exactly what I expected. I love building models and seeing how businesses work through numbers.", insight: "You thrive in analytical detail work", scores: { technical: 10, independence: 8, collaboration: 7, workLifeBalance: 6, pressure: 7, creativity: 6 } },
        { text: "More Excel than I hoped, but the variety of projects makes it interesting.", insight: "You tolerate repetitive work for variety", scores: { technical: 7, creativity: 6, collaboration: 7, workLifeBalance: 6, pressure: 6, independence: 6 } },
        { text: "Less interaction with people than I want. I'd prefer more client-facing work.", insight: "You crave human interaction", scores: { collaboration: 10, technical: 3, creativity: 6, independence: 3, pressure: 5, workLifeBalance: 7 } },
        { text: "Honestly? A bit boring. I thought there'd be more strategy and less spreadsheet maintenance.", insight: "You want more strategic, less tactical work", scores: { technical: 2, creativity: 8, collaboration: 6, pressure: 3, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Financial analysis is fundamentally about making complex numbers understandable. If you don't enjoy Excel and explanation, this isn't your path.",
      realityNote: "Junior analysts live in Excel. Senior analysts live in Excel but with better coffee and more meetings. VPs still use Excel, just with analysts doing the typing."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 60, weight: 0.25 },
    pressure: { min: -20, max: 55, weight: 0.20 },
    collaboration: { min: -10, max: 60, weight: 0.15 },
    creativity: { min: -5, max: 50, weight: 0.15 },
    independence: { min: -5, max: 55, weight: 0.15 },
    workLifeBalance: { min: -10, max: 50, weight: 0.10 }
  },
  results: {
    high: { min: 70, title: "Strong Financial Analyst Potential", message: "You show the right mix of technical skills, pressure tolerance, and analytical thinking. You understand that this role means long hours with spreadsheets, tight deadlines, and challenging your own assumptions." },
    medium: { min: 45, title: "Consider Your Priorities", message: "You have some analytical aptitude, but think carefully: Can you handle 70% of your time in Excel? Are you comfortable with urgent deadline pressure? Consider corporate finance or FP&A roles with more variety." },
    low: { min: 0, title: "Financial Analysis May Not Fit", message: "Your responses suggest you'd struggle with the core realities: repetitive analytical work, high-pressure deadlines, and technical detail. Consider roles like business development or account management where your strengths shine more." }
  }
};

// Project Manager Quiz (needs career created)
const projectManagerQuiz = {
  title: "A Day as a Project Manager",
  description: "Navigate team conflicts, deadline pressure, and stakeholder expectations. See if you can keep everything on track.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "Your project is behind schedule due to unexpected technical issues. The client meeting is tomorrow. What do you do?",
      options: [
        { text: "Call an emergency team meeting, assess what can realistically be delivered, prepare honest client update with recovery plan", insight: "You balance transparency with solution-oriented thinking", scores: { pressure: 10, collaboration: 10, creativity: 7, technical: 6, independence: 7, workLifeBalance: 5 } },
        { text: "Ask the technical team to work overtime to catch up, promise the client everything will be ready", insight: "You push for results but may burn out your team", scores: { pressure: 7, collaboration: 4, creativity: 4, technical: 5, independence: 7, workLifeBalance: -5 } },
        { text: "Reschedule the client meeting to buy more time without telling the team why", insight: "You avoid difficult conversations", scores: { pressure: 3, collaboration: -3, creativity: 4, technical: 3, independence: 6, workLifeBalance: 7 } },
        { text: "Blame the technical issues on specific team members in a group email to justify the delay", insight: "You deflect responsibility and damage trust", scores: { pressure: -5, collaboration: -8, creativity: 2, technical: 3, independence: 5, workLifeBalance: 6 } }
      ],
      explanation: "Great PMs communicate problems early and focus on solutions, not blame.",
      realityNote: "Projects go off-track constantly. Your job is recovering gracefully while keeping trust intact."
    },
    {
      id: "q2",
      scenario: "Two key team members are in constant conflict, affecting the entire project. How do you handle it?",
      options: [
        { text: "Meet with each privately to understand their perspectives, then facilitate a structured conversation to resolve the root issues", insight: "You address conflict directly and constructively", scores: { collaboration: 10, pressure: 9, creativity: 8, technical: 5, independence: 7, workLifeBalance: 5 } },
        { text: "Tell them both to 'be professional' and threaten to escalate to HR if they can't get along", insight: "You use authority but don't address root causes", scores: { collaboration: 3, pressure: 6, creativity: 3, technical: 4, independence: 8, workLifeBalance: 7 } },
        { text: "Separate them by assigning completely different tasks, avoiding the underlying issue", insight: "You sidestep conflict rather than resolving it", scores: { collaboration: 4, pressure: 5, creativity: 5, technical: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Let them work it out themselves - they're adults", insight: "You avoid people management responsibilities", scores: { collaboration: -3, pressure: 3, creativity: 3, technical: 4, independence: 5, workLifeBalance: 8 } }
      ],
      explanation: "Team conflict is a PM's responsibility. Avoiding it makes everything worse.",
      realityNote: "You'll spend 40% of your time managing personalities, not just tasks. Get comfortable with difficult conversations."
    },
    {
      id: "q3",
      scenario: "Stakeholders keep adding 'small' features mid-project. The scope has grown 30% but timeline hasn't changed. What do you do?",
      options: [
        { text: "Document all changes, present the scope impact with data, negotiate timeline extension or feature cuts", insight: "You manage scope creep with clear boundaries", scores: { technical: 8, collaboration: 9, pressure: 9, creativity: 7, independence: 9, workLifeBalance: 6 } },
        { text: "Accommodate everything to keep stakeholders happy, ask team to work harder", insight: "You please stakeholders at team's expense", scores: { collaboration: 5, pressure: 5, creativity: 4, technical: 4, independence: 4, workLifeBalance: -7 } },
        { text: "Secretly deprioritize some original features to fit the new ones", insight: "You make unilateral decisions without transparency", scores: { creativity: 6, pressure: 6, collaboration: -3, technical: 5, independence: 7, workLifeBalance: 5 } },
        { text: "Complain to your manager about unreasonable stakeholders", insight: "You escalate instead of managing directly", scores: { pressure: -3, collaboration: -2, creativity: 3, technical: 4, independence: 3, workLifeBalance: 6 } }
      ],
      explanation: "Scope management is a core PM skill. Good PMs make trade-offs visible and involve stakeholders in decisions.",
      realityNote: "Scope creep kills projects. Learning to say 'yes, if...' instead of just 'yes' is essential."
    },
    {
      id: "q4",
      scenario: "You realize the project will miss the deadline by 2 weeks. You're 3 days from the original delivery date. What do you do?",
      options: [
        { text: "Immediately inform all stakeholders, present the reasons and recovery plan, take responsibility", insight: "You communicate bad news early with accountability", scores: { collaboration: 10, pressure: 10, independence: 9, technical: 7, creativity: 7, workLifeBalance: 6 } },
        { text: "Work with team to see if we can still hit it with extra effort before announcing any delays", insight: "You try to solve problems before escalating", scores: { pressure: 7, collaboration: 6, creativity: 6, technical: 6, independence: 7, workLifeBalance: -3 } },
        { text: "Deliver something incomplete on time rather than admitting the delay", insight: "You prioritize dates over quality", scores: { pressure: 5, collaboration: 3, creativity: 4, technical: -3, independence: 6, workLifeBalance: 4 } },
        { text: "Feel stressed and avoid the conversation until forced to have it", insight: "You struggle with accountability under pressure", scores: { pressure: -6, collaboration: -5, creativity: 3, technical: 4, independence: 2, workLifeBalance: 3 } }
      ],
      explanation: "Bad news doesn't age well. The earlier you communicate problems, the more options you have.",
      realityNote: "PMs who communicate problems early are trusted. Those who hide them are replaced."
    },
    {
      id: "q5",
      scenario: "Your team wants to use new technology that would improve the product but add risk and learning curve. What do you do?",
      options: [
        { text: "Assess the benefits, risks, and timeline impact. If it aligns with project goals, support it with risk mitigation plan", insight: "You balance innovation with pragmatism", scores: { creativity: 9, technical: 8, collaboration: 9, pressure: 8, independence: 8, workLifeBalance: 6 } },
        { text: "Support the team's technical judgment - they know better than I do", insight: "You defer to technical expertise", scores: { collaboration: 7, technical: 5, creativity: 7, pressure: 6, independence: 4, workLifeBalance: 7 } },
        { text: "Deny the request - stick to proven technology to minimize risk", insight: "You prioritize safety over innovation", scores: { pressure: 7, technical: 5, creativity: 3, collaboration: 4, independence: 7, workLifeBalance: 7 } },
        { text: "Let them experiment but make it clear any delays are on them", insight: "You shift responsibility without collaboration", scores: { collaboration: 3, pressure: 5, creativity: 5, technical: 4, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "Good PMs facilitate informed decisions about risk and innovation rather than dictating answers.",
      realityNote: "You're not the technical expert, but you're accountable for technical decisions. Learn to ask the right questions."
    },
    {
      id: "q6",
      scenario: "It's 8 PM on your anniversary. A critical production bug is affecting customers. Your team is debugging. What do you do?",
      options: [
        { text: "Stay available by phone, trust the team to handle it, check in periodically but don't micromanage", insight: "You balance responsibility with trust and boundaries", scores: { collaboration: 8, workLifeBalance: 7, pressure: 8, technical: 6, independence: 7, creativity: 6 } },
        { text: "Go home as planned - the team has this covered and you deserve personal time", insight: "You maintain strong work-life boundaries", scores: { workLifeBalance: 10, collaboration: 5, pressure: 5, technical: 5, independence: 8, creativity: 5 } },
        { text: "Cancel plans immediately and join the team until it's resolved", insight: "You show up in crisis but may struggle with boundaries", scores: { collaboration: 9, pressure: 9, workLifeBalance: -5, technical: 6, independence: 6, creativity: 6 } },
        { text: "Feel torn between personal and work responsibilities", insight: "You struggle with work-life integration", scores: { pressure: -3, workLifeBalance: -3, collaboration: 6, technical: 5, independence: 5, creativity: 5 } }
      ],
      explanation: "PM work includes crisis management. The key is knowing when your presence adds value vs. when you should trust your team.",
      realityNote: "You'll miss some personal events. The question is: Does it happen constantly or occasionally? Set boundaries early."
    }
  ],
  scoringGuide: {
    technical: { min: -10, max: 50, weight: 0.15 },
    pressure: { min: -15, max: 60, weight: 0.25 },
    collaboration: { min: -25, max: 65, weight: 0.25 },
    creativity: { min: -5, max: 50, weight: 0.15 },
    independence: { min: -5, max: 55, weight: 0.10 },
    workLifeBalance: { min: -20, max: 50, weight: 0.10 }
  },
  results: {
    high: { min: 70, title: "Strong Project Manager Potential", message: "You demonstrate excellent PM instincts: clear communication, conflict resolution, scope management, and accountability. You understand that this role is about enabling others while taking responsibility for outcomes." },
    medium: { min: 50, title: "PM Role Possible With Development", message: "You have some PM aptitudes but may find constant firefighting or difficult conversations challenging. Consider assistant PM or coordinator roles to develop skills while learning the craft." },
    low: { min: 0, title: "Consider Different Roles", message: "Your responses suggest PM work may not suit you. The role requires comfortable handling conflict, delivering bad news, and working under sustained pressure. Consider individual contributor roles where you control your own work." }
  }
};

// UX Designer, Product Manager, HR Manager, Pharmacist, Journalist, and Architect quizzes would follow...
// For brevity, I'll add mapping logic

// UX Designer Quiz
const uxDesignerQuiz = {
  title: "A Day as a UX Designer",
  description: "Navigate user testing feedback, timeline pressure, and design trade-offs. See if you can balance user needs with business constraints.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You spent 2 weeks designing a beautiful interface. User testing shows people are confused by your navigation. What do you do?",
      options: [
        { text: "Set ego aside, analyze the test results, redesign the navigation based on user behavior patterns, test again", insight: "You prioritize users over ego", scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 7, workLifeBalance: 6 } },
        { text: "Defend your design to the team - the users just need better onboarding tutorials", insight: "You resist feedback", scores: { technical: 4, pressure: 6, collaboration: 3, creativity: 5, independence: 10, workLifeBalance: 7 } },
        { text: "Make minor tweaks to the existing design rather than starting over to save time", insight: "You compromise between feedback and efficiency", scores: { technical: 6, pressure: 6, collaboration: 6, creativity: 6, independence: 8, workLifeBalance: 7 } },
        { text: "Question whether the test participants represent real users and request another round with 'better' participants", insight: "You doubt the data", scores: { technical: 4, pressure: 4, collaboration: 3, creativity: 4, independence: 8, workLifeBalance: 7 } }
      ],
      explanation: "User testing exists to challenge our assumptions. The best UX designers view testing as discovery, not validation.",
      realityNote: "80% of initial designs fail user testing. How you respond to that failure determines your success."
    },
    {
      id: "q2",
      scenario: "Engineering says your design will take 3 months to build. Marketing wants it in 3 weeks. How do you respond?",
      options: [
        { text: "Facilitate a meeting to identify MVP features, create a phased rollout plan that satisfies both timeline and user needs", insight: "You find win-win solutions", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 7, workLifeBalance: 7 } },
        { text: "Simplify the design dramatically to meet the 3-week deadline, even if it compromises UX quality", insight: "You prioritize speed over quality", scores: { technical: 6, pressure: 8, collaboration: 6, creativity: 3, independence: 6, workLifeBalance: 6 } },
        { text: "Side with engineering - proper UX takes time, marketing needs to adjust their expectations", insight: "You fight for quality", scores: { technical: 8, pressure: 6, collaboration: 3, creativity: 6, independence: 10, workLifeBalance: 7 } },
        { text: "Design two versions: a quick minimal one for 3 weeks, and the full version for later", insight: "You create options", scores: { technical: 8, pressure: 9, collaboration: 8, creativity: 8, independence: 8, workLifeBalance: 4 } }
      ],
      explanation: "UX designers constantly balance ideal experiences with business reality. The best find creative compromises.",
      realityNote: "You'll hear 'we need it faster' on every project. Learn to negotiate scope, not just timelines."
    },
    {
      id: "q3",
      scenario: "Data shows users want feature A, but stakeholders are convinced feature B is more important. What do you do?",
      options: [
        { text: "Present the user data clearly, explain the methodology, offer to do additional research if they have concerns", insight: "You advocate with data", scores: { technical: 10, pressure: 8, collaboration: 9, creativity: 7, independence: 9, workLifeBalance: 7 } },
        { text: "Design both and test which performs better", insight: "You test assumptions", scores: { technical: 9, pressure: 8, collaboration: 7, creativity: 9, independence: 8, workLifeBalance: 5 } },
        { text: "Go with stakeholder preference - they understand business strategy better", insight: "You defer to authority", scores: { technical: 4, pressure: 6, collaboration: 7, creativity: 4, independence: 3, workLifeBalance: 7 } },
        { text: "Try to find a compromise that incorporates elements of both", insight: "You seek middle ground", scores: { technical: 6, pressure: 7, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "UX designers are advocates for users, but must also understand business needs. The best use data to inform, not dictate, decisions.",
      realityNote: "User needs and business goals conflict constantly. Your job is bridging that gap, not picking sides."
    },
    {
      id: "q4",
      scenario: "You're redesigning a feature that's been the same for 5 years. Users say they want it improved, but also resist any change. How do you approach this?",
      options: [
        { text: "Design gradual transitions, provide clear education about changes, offer opt-in periods, gather feedback iteratively", insight: "You manage change thoughtfully", scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 } },
        { text: "Make the improvements but keep the interface visually similar to reduce change shock", insight: "You minimize disruption", scores: { technical: 8, pressure: 7, collaboration: 7, creativity: 6, independence: 7, workLifeBalance: 7 } },
        { text: "Implement the new design fully - sometimes users don't know what's best until they experience it", insight: "You push through resistance", scores: { technical: 7, pressure: 8, collaboration: 4, creativity: 8, independence: 10, workLifeBalance: 7 } },
        { text: "Offer both old and new versions and let users choose", insight: "You give users control", scores: { technical: 6, pressure: 6, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "Change management is part of UX. Users often resist change even when they requested improvements.",
      realityNote: "Redesigning established features is harder than creating new ones. Expect pushback even when your design is better."
    },
    {
      id: "q5",
      scenario: "Your accessibility audit shows the design fails several WCAG standards. Fixing it will delay launch by 2 weeks. What do you do?",
      options: [
        { text: "Prioritize accessibility fixes before launch - designing for everyone is non-negotiable", insight: "You champion inclusive design", scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 8, independence: 10, workLifeBalance: 5 } },
        { text: "Launch with current design, create backlog of accessibility fixes for next sprint", insight: "You defer accessibility", scores: { technical: 5, pressure: 7, collaboration: 6, creativity: 5, independence: 5, workLifeBalance: 7 } },
        { text: "Fix critical accessibility issues now, schedule others for later", insight: "You prioritize impact", scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 7, independence: 7, workLifeBalance: 6 } },
        { text: "Present the trade-offs to leadership and let them decide based on user base and legal risk", insight: "You escalate the decision", scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 6, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Accessibility isn't optional. How you prioritize it reflects your design values and professional ethics.",
      realityNote: "15% of users have accessibility needs. Designing for them often improves experience for everyone."
    },
    {
      id: "q6",
      scenario: "After launch, users are praising the design on social media, but analytics show engagement is actually down 10%. What's your response?",
      options: [
        { text: "Dig into the analytics to understand what specific behaviors changed, conduct follow-up research, identify and fix issues", insight: "You trust data over praise", scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 9, independence: 9, workLifeBalance: 6 } },
        { text: "Give it more time - users need to adjust to new designs before patterns stabilize", insight: "You're patient with adoption", scores: { technical: 7, pressure: 6, collaboration: 6, creativity: 6, independence: 7, workLifeBalance: 7 } },
        { text: "Focus on the positive feedback - users are happy even if metrics are temporarily down", insight: "You prioritize sentiment", scores: { technical: 4, pressure: 5, collaboration: 6, creativity: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Run A/B tests comparing old and new designs to get clearer data", insight: "You test systematically", scores: { technical: 10, pressure: 8, collaboration: 8, creativity: 8, independence: 8, workLifeBalance: 6 } }
      ],
      explanation: "Praise feels good but data tells the truth. Great UX designers follow behavioral metrics, not opinions.",
      realityNote: "Users often say they like designs they don't actually use. Behavior > sentiment every time."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 60, weight: 0.20 },
    pressure: { min: -5, max: 60, weight: 0.15 },
    collaboration: { min: -5, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 60, weight: 0.25 },
    independence: { min: -5, max: 60, weight: 0.15 },
    workLifeBalance: { min: -10, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong UX Designer Potential", message: "You demonstrate excellent UX instincts: user-centered thinking, data-driven decisions, and collaborative problem-solving. You understand that UX is about serving users within business constraints." },
    medium: { min: 50, title: "UX Design Possible With Development", message: "You have creative aptitude but may find user testing feedback or timeline pressure challenging. Consider UI design or visual design roles while building UX research and strategy skills." },
    low: { min: 0, title: "Consider Different Design Paths", message: "Your responses suggest UX design may not suit you. The role requires ego-free iteration, constant user research, and balancing many competing voices. Consider graphic design, brand design, or art direction." }
  }
};

// Product Manager, HR Manager, Pharmacist, and Journalist quizzes would be similarly comprehensive
// For now, adding career data structure

const newCareerData = [
  {
    title: "Project Manager",
    category: "Business & Technology",
    shortDescription: "Lead cross-functional teams to deliver projects on time and within budget.",
    fullDescription: "Project Managers coordinate people, processes, and resources to complete projects successfully. They work across industries managing software development, construction, marketing campaigns, and organizational change. PMs balance stakeholder expectations with team capacity while navigating risks and unknowns.",
    videoUrl: "https://www.youtube.com/embed/I-8tU8Y8DTY",
    videoThumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    salaryMin: 4500000,
    salaryMax: 15000000,
    currency: "RWF",
    requiredEducation: "Bachelor's degree, PMP certification preferred",
    requiredSkills: ["Stakeholder Management", "Risk Management", "Agile/Scrum", "Communication", "Problem Solving", "Time Management"],
    careerPath: [],
    relatedCareerIds: [],
    views: 0,
    saves: 0,
    interestProfile: { realistic: 35, investigative: 60, artistic: 40, social: 75, enterprising: 70, conventional: 65 },
    valueProfile: { impact: 70, income: 70, autonomy: 60, balance: 45, growth: 75, stability: 70 },
    personalityProfile: { openness: 65, conscientiousness: 85, extraversion: 70 },
    workEnvironment: { teamSize: "medium", pace: "intense", structure: "balanced" },
    quiz: projectManagerQuiz
  },
  {
    title: "UX Designer",
    category: "Design & Creative",
    shortDescription: "Design intuitive digital experiences based on user research and data.",
    fullDescription: "UX Designers create digital products that are useful, usable, and enjoyable. They conduct user research, create wireframes and prototypes, run usability tests, and iterate based on feedback. UX designers work closely with developers, product managers, and stakeholders to balance user needs with business goals and technical constraints.",
    videoUrl: "https://www.youtube.com/embed/wIuVvCuiJhU",
    videoThumbnail: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800",
    salaryMin: 3500000,
    salaryMax: 12000000,
    currency: "RWF",
    requiredEducation: "Bachelor's in Design, HCI, or related field; portfolio required",
    requiredSkills: ["User Research", "Wireframing", "Prototyping", "Figma/Sketch", "Usability Testing", "Information Architecture"],
    careerPath: [],
    relatedCareerIds: [],
    views: 0,
    saves: 0,
    interestProfile: { realistic: 30, investigative: 65, artistic: 85, social: 70, enterprising: 55, conventional: 45 },
    valueProfile: { impact: 75, income: 65, autonomy: 70, balance: 65, growth: 80, stability: 60 },
    personalityProfile: { openness: 90, conscientiousness: 75, extraversion: 60 },
    workEnvironment: { teamSize: "small", pace: "moderate", structure: "flexible" },
    quiz: uxDesignerQuiz
  }
];

export const seedNewCareersAndQuizzes = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    // Add Financial Analyst quiz to existing career
    const financialAnalyst = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Financial Analyst"))
      .first();

    if (financialAnalyst) {
      await ctx.db.patch(financialAnalyst._id, {
        realityQuiz: financialAnalystQuiz,
      });
      results.push({ title: "Financial Analyst", status: "quiz_added", careerId: financialAnalyst._id });
    }

    // Add Architect quiz to existing career
    const architect = await ctx.db
      .query("careers")
      .filter((q) => q.eq(q.field("title"), "Architect"))
      .first();

    if (architect) {
      // Architect quiz converted to match format
      const architectQuiz = {
        title: "A Day as an Architect",
        description: "Navigate design conflicts, building codes, and budget constraints. See if you can balance creativity with reality.",
        duration: 6,
        questions: [
          {
            id: "q1",
            scenario: "Your beautiful, award-worthy design is over budget by 30%. The client loves it but can't afford it. What do you do?",
            options: [
              { text: "Work with client and contractor to value-engineer: identify which elements are essential to the design vision, find cost-effective alternatives for others, present options with trade-offs clearly explained", insight: "You balance artistic vision with practical constraints", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 7, workLifeBalance: 5 } },
              { text: "Simplify the design dramatically to meet budget, even if it loses the original vision", insight: "You prioritize budget over design integrity", scores: { technical: 7, pressure: 6, collaboration: 6, creativity: 3, independence: 5, workLifeBalance: 7 } },
              { text: "Push the client to increase their budget - good design costs money", insight: "You prioritize design over client constraints", scores: { technical: 6, pressure: 6, collaboration: 3, creativity: 8, independence: 10, workLifeBalance: 7 } },
              { text: "Tell the contractor to find ways to reduce costs without changing your design", insight: "You shift responsibility rather than collaborating", scores: { technical: 5, pressure: 6, collaboration: -3, creativity: 6, independence: 8, workLifeBalance: 7 } }
            ],
            explanation: "Great architects find creative solutions within constraints rather than compromising vision or ignoring reality.",
            realityNote: "95% of projects go over initial budget. Your job is finding value, not perfection."
          },
          {
            id: "q2",
            scenario: "The structural engineer says your cantilevered design is feasible but will require expensive specialized engineering. The client wants it but the contractor says it's 'unnecessarily complicated.' How do you respond?",
            options: [
              { text: "Present cost-benefit analysis of the design feature, explore if there are simpler structural solutions that achieve similar aesthetic effect, facilitate informed decision by client", insight: "You balance design ambition with practical analysis", scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 } },
              { text: "Side with the engineer - if it's structurally sound and client can afford it, build it as designed", insight: "You trust technical expertise and client judgment", scores: { technical: 8, pressure: 8, collaboration: 6, creativity: 8, independence: 10, workLifeBalance: 7 } },
              { text: "Redesign with a simpler solution - contractors usually know what's practical", insight: "You defer to construction expertise", scores: { technical: 7, pressure: 6, collaboration: 8, creativity: 5, independence: 5, workLifeBalance: 7 } },
              { text: "Insist on the original design - architecture is about pushing boundaries, not taking the easy path", insight: "You prioritize design vision over practical concerns", scores: { technical: 6, pressure: 6, collaboration: 3, creativity: 10, independence: 10, workLifeBalance: 7 } }
            ],
            explanation: "Architecture requires balancing creative ambition with engineering reality and budget constraints.",
            realityNote: "You'll hear 'that's too complicated' on every innovative design. Learn when to fight and when to adapt."
          },
          {
            id: "q3",
            scenario: "You're 2 weeks from deadline for permit submission. You discover the MEP (mechanical, electrical, plumbing) engineer made errors that require redesigning several spaces. What do you do?",
            options: [
              { text: "Immediately coordinate with MEP engineer and team, assess extent of changes, determine if deadline can be met or if extension is needed, communicate transparently with client about situation and options", insight: "You handle crises with transparency and coordination", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: -3 } },
              { text: "Work around the clock to fix everything and make the deadline without telling the client about the problem", insight: "You sacrifice yourself to hide problems", scores: { technical: 8, pressure: 10, collaboration: 5, creativity: 8, independence: 8, workLifeBalance: -8 } },
              { text: "Submit the drawings as-is and fix the errors during construction administration", insight: "You take dangerous shortcuts under pressure", scores: { technical: -5, pressure: 3, collaboration: 3, creativity: 3, independence: 5, workLifeBalance: 7 } },
              { text: "Request deadline extension from the permitting department and inform client", insight: "You communicate problems but may not explore all options", scores: { technical: 6, pressure: 6, collaboration: 8, creativity: 4, independence: 5, workLifeBalance: 6 } }
            ],
            explanation: "Permit deadlines are serious, but submitting incorrect drawings causes bigger problems later. Transparency and coordination are key.",
            realityNote: "Design errors happen. How you handle them determines if you get repeat clients."
          },
          {
            id: "q4",
            scenario: "During construction, the contractor proposes a 'minor' change that will save $50K but significantly impact your design intent. The client is tempted by the savings. How do you handle it?",
            options: [
              { text: "Explain the design impact clearly with visuals, present the trade-offs honestly, offer alternative cost savings that don't compromise the design, let client make informed decision", insight: "You educate clients to make informed decisions", scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 } },
              { text: "Fight against the change - you're being paid for your design expertise and this compromise weakens the project", insight: "You stand firm for design integrity", scores: { technical: 8, pressure: 8, collaboration: 3, creativity: 8, independence: 10, workLifeBalance: 7 } },
              { text: "Accept the change - $50K is significant and client satisfaction matters more than design purity", insight: "You prioritize client relationships over design", scores: { technical: 5, pressure: 6, collaboration: 8, creativity: 3, independence: 3, workLifeBalance: 7 } },
              { text: "Redesign to incorporate the cost savings while maintaining design quality", insight: "You view constraints as creative challenges", scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 10, independence: 8, workLifeBalance: 4 } }
            ],
            explanation: "Construction phase changes are constant. Great architects maintain design quality while respecting budget realities.",
            realityNote: "Contractors will propose hundreds of changes. Learn to identify which ones matter to design integrity."
          },
          {
            id: "q5",
            scenario: "A building code official rejects part of your design citing an interpretation of code you disagree with. This will require significant redesign. What's your approach?",
            options: [
              { text: "Research the code thoroughly, prepare documentation supporting your interpretation, request formal meeting with code official, consider alternatives if official maintains position, consult code consultant if needed", insight: "You advocate with preparation and professionalism", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 9, workLifeBalance: 5 } },
              { text: "Just redesign it - fighting with code officials rarely works and delays the project", insight: "You avoid conflict even when you're right", scores: { technical: 6, pressure: 6, collaboration: 6, creativity: 5, independence: 3, workLifeBalance: 7 } },
              { text: "Have the client's lawyer send a letter - code officials often back down when lawyers get involved", insight: "You escalate to confrontation quickly", scores: { technical: 4, pressure: 6, collaboration: -3, creativity: 4, independence: 8, workLifeBalance: 7 } },
              { text: "Appeal to the code official's supervisor or the board of appeals", insight: "You use proper channels for disputes", scores: { technical: 8, pressure: 8, collaboration: 6, creativity: 6, independence: 10, workLifeBalance: 7 } }
            ],
            explanation: "Code officials have significant power. Professional advocacy with solid research works better than confrontation.",
            realityNote: "You'll disagree with code interpretations regularly. Build good relationships with officials while knowing when to stand firm."
          },
          {
            id: "q6",
            scenario: "You're working on a sustainability-focused project. The client loves the concept but keeps adding features that increase energy consumption. How do you address this?",
            options: [
              { text: "Use data to show energy impact of each addition, explain how it affects sustainability goals and certifications, offer alternative features that align with both desires and efficiency", insight: "You educate with data and offer creative alternatives", scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 } },
              { text: "Let them add what they want - it's their building and their utility bills", insight: "You abdicate professional responsibility", scores: { technical: 3, pressure: 3, collaboration: 5, creativity: 3, independence: 3, workLifeBalance: 7 } },
              { text: "Refuse to add features that contradict the sustainability mission", insight: "You take rigid stance on principles", scores: { technical: 6, pressure: 6, collaboration: 3, creativity: 5, independence: 10, workLifeBalance: 7 } },
              { text: "Add the features but compensate with additional green technology to maintain targets", insight: "You problem-solve within constraints", scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 8, independence: 6, workLifeBalance: 5 } }
            ],
            explanation: "Sustainability requires educating clients about trade-offs while finding creative solutions that satisfy multiple goals.",
            realityNote: "Clients often want contradictory things. Your job is showing them the consequences and offering better alternatives."
          }
        ],
        scoringGuide: {
          technical: { min: -10, max: 60, weight: 0.25 },
          pressure: { min: -5, max: 60, weight: 0.20 },
          collaboration: { min: -10, max: 60, weight: 0.20 },
          creativity: { min: -5, max: 60, weight: 0.20 },
          independence: { min: -5, max: 60, weight: 0.10 },
          workLifeBalance: { min: -15, max: 45, weight: 0.05 }
        },
        results: {
          high: { min: 70, title: "Strong Architecture Potential", message: "You show excellent architectural instincts! Your responses indicate you can balance creative vision with technical constraints, client needs, and budget realities. Great architects must be both artists and pragmatists - you seem to understand that duality." },
          medium: { min: 45, title: "Consider Your Design Philosophy", message: "You have some architectural skills, but may struggle with the constant compromise required. Architecture requires defending your vision while being flexible enough to adapt to constraints. Projects take years and require patience with bureaucracy, contractors, and client changes." },
          low: { min: 0, title: "Architecture May Not Be The Right Path", message: "Based on your responses, you might find architecture practice frustrating. The role requires balancing artistic vision with codes, budgets, engineering realities, and client preferences. Very few projects get built exactly as initially designed. Consider graphic design, industrial design, or conceptual art where you have more creative control." }
        }
      };

      await ctx.db.patch(architect._id, {
        realityQuiz: architectQuiz,
      });
      results.push({ title: "Architect", status: "quiz_added", careerId: architect._id });
    }

    // Create new careers with quizzes
    for (const careerData of newCareerData) {
      const existing = await ctx.db
        .query("careers")
        .filter((q) => q.eq(q.field("title"), careerData.title))
        .first();

      if (!existing) {
        const { quiz, ...careerInfo } = careerData;
        const careerId = await ctx.db.insert("careers", {
          ...careerInfo,
          realityQuiz: quiz,
        });
        results.push({ title: careerData.title, status: "created_with_quiz", careerId });
      } else {
        await ctx.db.patch(existing._id, {
          realityQuiz: careerData.quiz,
        });
        results.push({ title: careerData.title, status: "quiz_added", careerId: existing._id });
      }
    }

    return {
      message: "New careers and quizzes seeded successfully",
      results,
      summary: {
        total: results.length,
        created: results.filter((r) => r.status === "created_with_quiz").length,
        updated: results.filter((r) => r.status === "quiz_added").length,
      },
    };
  },
});

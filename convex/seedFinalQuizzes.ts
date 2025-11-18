/**
 * Seed remaining Reality Quizzes (Product Manager, HR Manager, Pharmacist, Journalist)
 * Run with: npx convex run seedFinalQuizzes:seedRemainingQuizzes
 */

import { mutation } from "./_generated/server";

// Product Manager Quiz
const productManagerQuiz = {
  title: "A Day as a Product Manager",
  description: "Navigate feature prioritization, stakeholder pressure, and strategic trade-offs. See if you can balance users, business, and technology.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You have to choose: Build a feature that 80% of users want but is technically complex, or a feature that 20% of power users desperately need but is simple to build. 2-week timeline. What do you prioritize?",
      options: [
        { text: "Analyze revenue impact, user engagement metrics, and strategic value of each segment, then make data-driven decision and communicate reasoning to all stakeholders", insight: "You use comprehensive analysis to guide decisions", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 6 } },
        { text: "Build the simple feature for power users to show quick wins, add the complex feature to next sprint", insight: "You prioritize quick delivery", scores: { technical: 7, pressure: 8, collaboration: 6, creativity: 6, independence: 8, workLifeBalance: 7 } },
        { text: "Build what the majority wants - 80% of users should always take priority", insight: "You use simple majority rule", scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 4, independence: 8, workLifeBalance: 7 } },
        { text: "Let engineering decide based on technical complexity - they know what's best", insight: "You defer technical decisions", scores: { technical: 4, pressure: 5, collaboration: 4, creativity: 3, independence: 3, workLifeBalance: 8 } }
      ],
      explanation: "Great PMs use data, strategy, and stakeholder impact to prioritize, not just majority rule or technical ease.",
      realityNote: "Product decisions shape company direction. 70% of your job is saying no to good ideas for better ones."
    },
    {
      id: "q2",
      scenario: "Sales promised a major enterprise client a custom feature to close a $500K deal. Engineering says it will derail the product roadmap for 2 months. What do you do?",
      options: [
        { text: "Facilitate discussion between sales, engineering, and leadership. Explore if the feature aligns with product strategy, can be generalized for others, or if alternative solutions exist", insight: "You broker strategic conversations", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 7, workLifeBalance: 5 } },
        { text: "Say no - sales shouldn't make product commitments without PM approval. Protect the roadmap", insight: "You enforce process boundaries", scores: { technical: 7, pressure: 8, collaboration: 3, creativity: 4, independence: 10, workLifeBalance: 7 } },
        { text: "Build the custom feature - $500K is too valuable to lose over roadmap purity", insight: "You prioritize revenue", scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 4, independence: 6, workLifeBalance: 6 } },
        { text: "Find a way to deliver 80% of what they need using existing platform capabilities", insight: "You seek creative compromises", scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 10, independence: 8, workLifeBalance: 6 } }
      ],
      explanation: "PMs constantly balance sales deals with product vision. The best find solutions that serve both.",
      realityNote: "Sales will promise features you don't have. Your job is turning that chaos into strategic advantage."
    },
    {
      id: "q3",
      scenario: "User research says your new feature is confusing. Engineering says it's too late to change without missing launch. Marketing has already promoted it. What do you do?",
      options: [
        { text: "Delay launch to fix the UX issues - launching a confusing product damages brand more than missing a date", insight: "You prioritize quality over timelines", scores: { technical: 9, pressure: 10, collaboration: 8, creativity: 8, independence: 10, workLifeBalance: 5 } },
        { text: "Launch with improved onboarding and tooltips to help users navigate the confusing parts", insight: "You find middle ground solutions", scores: { technical: 8, pressure: 9, collaboration: 9, creativity: 9, independence: 7, workLifeBalance: 6 } },
        { text: "Launch as planned - initial confusion is normal and metrics will show if it's a real problem", insight: "You trust post-launch iteration", scores: { technical: 6, pressure: 7, collaboration: 7, creativity: 5, independence: 7, workLifeBalance: 7 } },
        { text: "Soft launch to a small user group first, iterate based on real feedback, then full launch", insight: "You de-risk with phased rollout", scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 9, independence: 8, workLifeBalance: 6 } }
      ],
      explanation: "Launch dilemmas reveal your product philosophy. Great PMs find creative ways to validate before committing fully.",
      realityNote: "You'll face this situation monthly. The PMs who thrive have frameworks for making these calls quickly."
    },
    {
      id: "q4",
      scenario: "Your competitor just launched a feature that's better than yours. Leadership wants you to copy it immediately. What's your response?",
      options: [
        { text: "Analyze why users prefer their approach, understand what problem it solves, then design our version that fits our product strategy and UX patterns", insight: "You learn from competitors strategically", scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 6 } },
        { text: "Copy their feature quickly to maintain competitive parity while working on improvements", insight: "You prioritize speed to market", scores: { technical: 6, pressure: 8, collaboration: 7, creativity: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Resist copying - focus on our unique differentiation instead of feature parity", insight: "You protect product vision", scores: { technical: 7, pressure: 7, collaboration: 5, creativity: 8, independence: 10, workLifeBalance: 7 } },
        { text: "Talk to customers about what they actually need before reacting to competitor moves", insight: "You stay customer-focused", scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 8, independence: 9, workLifeBalance: 7 } }
      ],
      explanation: "Competitor moves create pressure to react. The best PMs let strategy, not panic, guide responses.",
      realityNote: "Feature parity is a trap. Successful products differentiate, they don't copycat."
    },
    {
      id: "q5",
      scenario: "You discovered a major technical limitation that means a core product promise can't be delivered as planned. You're 3 months from launch. What do you do?",
      options: [
        { text: "Immediately inform all stakeholders, present the issue clearly, propose alternative approaches, and reset expectations transparently", insight: "You handle bad news with accountability", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 10, workLifeBalance: 6 } },
        { text: "Work with engineering to find workarounds before escalating - maybe we can still deliver something close", insight: "You try to solve problems first", scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 9, independence: 8, workLifeBalance: 5 } },
        { text: "Pivot the product positioning to emphasize what we can deliver well instead of what we can't", insight: "You reframe limitations as focus", scores: { technical: 7, pressure: 8, collaboration: 7, creativity: 9, independence: 8, workLifeBalance: 7 } },
        { text: "Push back on engineering - technical limitations can usually be overcome with more resources or time", insight: "You challenge constraints", scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 6, independence: 9, workLifeBalance: 6 } }
      ],
      explanation: "How you handle product failures defines your leadership. Transparency and creative problem-solving build trust.",
      realityNote: "Products fail to deliver promises constantly. PMs who own problems early and offer solutions survive."
    },
    {
      id: "q6",
      scenario: "You have 10 competing priorities: customer requests, technical debt, new features, bug fixes, and strategic bets. How do you decide what to build?",
      options: [
        { text: "Create framework evaluating impact, effort, strategic alignment, and user pain. Score everything, prioritize ruthlessly, communicate clearly why some things aren't being done", insight: "You prioritize systematically", scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 10, workLifeBalance: 6 } },
        { text: "Focus on what customers are asking for most - they fund the product", insight: "You follow customer voice", scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 6, independence: 7, workLifeBalance: 7 } },
        { text: "Balance across categories - some of each to keep all stakeholders satisfied", insight: "You spread resources thin", scores: { technical: 5, pressure: 6, collaboration: 7, creativity: 5, independence: 5, workLifeBalance: 7 } },
        { text: "Trust your instinct about what will have biggest impact and go all-in on that", insight: "You make bold bets", scores: { technical: 7, pressure: 8, collaboration: 6, creativity: 8, independence: 10, workLifeBalance: 7 } }
      ],
      explanation: "Prioritization is THE core PM skill. Great PMs have clear frameworks and communicate trade-offs explicitly.",
      realityNote: "You'll always have 10x more ideas than capacity. Learning to say no elegantly is how you survive."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 60, weight: 0.20 },
    pressure: { min: -5, max: 60, weight: 0.20 },
    collaboration: { min: -5, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 60, weight: 0.20 },
    independence: { min: -5, max: 60, weight: 0.15 },
    workLifeBalance: { min: -10, max: 50, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Product Manager Potential", message: "You demonstrate excellent PM instincts: strategic thinking, stakeholder management, data-driven prioritization, and creative problem-solving. You understand that PM work is about enabling teams while making difficult trade-off decisions." },
    medium: { min: 50, title: "PM Role Possible With Development", message: "You have some PM aptitudes but may find constant prioritization or stakeholder pressure challenging. Consider associate PM or product analyst roles to build strategic thinking and communication skills." },
    low: { min: 0, title: "Consider Different Roles", message: "Your responses suggest PM work may not suit you. The role requires comfort with ambiguity, constant trade-offs, and being accountable for decisions with incomplete information. Consider project management, business analysis, or specialist roles." }
  }
};

// HR Manager Quiz
const hrManagerQuiz = {
  title: "A Day as an HR Manager",
  description: "Navigate employee conflicts, legal compliance, and sensitive situations. See if you can balance empathy with company needs.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "A top performer files a harassment complaint against their manager. The manager is also a strong performer bringing in significant revenue. What's your approach?",
      options: [
        { text: "Immediately launch formal investigation, interview witnesses, document everything, ensure complainant is protected, take appropriate action based on findings regardless of revenue impact", insight: "You prioritize employee safety over business metrics", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 5 } },
        { text: "Talk to both parties informally first to see if it can be resolved without formal investigation", insight: "You seek informal resolution", scores: { technical: 4, pressure: 6, collaboration: 6, creativity: 6, independence: 5, workLifeBalance: 7 } },
        { text: "Consult with legal team and let them decide how to proceed", insight: "You defer to legal expertise", scores: { technical: 7, pressure: 6, collaboration: 5, creativity: 4, independence: 3, workLifeBalance: 7 } },
        { text: "Consider transferring the complainant to a different team to separate them from the situation", insight: "You avoid the core issue", scores: { technical: 3, pressure: 5, collaboration: 4, creativity: 5, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Harassment complaints require immediate, thorough investigation. Revenue can never excuse misconduct.",
      realityNote: "How you handle the first complaint sets precedent for your entire tenure. Protect employees first, always."
    },
    {
      id: "q2",
      scenario: "Your company needs to reduce headcount by 15% due to budget cuts. How do you approach this?",
      options: [
        { text: "Work with leadership to establish fair criteria, consider business impact and individual circumstances, ensure legal compliance, plan compassionate communication and severance packages", insight: "You approach layoffs with structure and empathy", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 9, workLifeBalance: 3 } },
        { text: "Use performance ratings to identify bottom 15% and let them go - most objective approach", insight: "You use simple metrics", scores: { technical: 7, pressure: 7, collaboration: 6, creativity: 4, independence: 8, workLifeBalance: 6 } },
        { text: "Let each department manager decide who to cut from their teams", insight: "You distribute the burden", scores: { technical: 5, pressure: 5, collaboration: 5, creativity: 4, independence: 4, workLifeBalance: 7 } },
        { text: "Recommend alternatives like salary cuts or furloughs before layoffs", insight: "You explore all options first", scores: { technical: 8, pressure: 8, collaboration: 9, creativity: 9, independence: 7, workLifeBalance: 6 } }
      ],
      explanation: "Layoffs are the hardest HR work. Combining fair process with genuine compassion separates good HR from bad.",
      realityNote: "You'll remember every person you laid off. Do it with enough care that they remember your compassion, not just the pain."
    },
    {
      id: "q3",
      scenario: "An employee tells you confidentially they're dealing with serious mental health issues affecting their work. Their manager is getting frustrated with their performance. What do you do?",
      options: [
        { text: "Discuss accommodation options, connect them with EAP resources, work with manager on temporary adjustments while maintaining confidentiality, document everything properly", insight: "You balance support with compliance", scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 6 } },
        { text: "Tell the manager about the situation so they understand and can be more patient", insight: "You breach confidentiality", scores: { technical: 3, pressure: 6, collaboration: 6, creativity: 4, independence: 5, workLifeBalance: 7 } },
        { text: "Suggest they take medical leave until they're better", insight: "You focus on removal", scores: { technical: 6, pressure: 5, collaboration: 5, creativity: 4, independence: 6, workLifeBalance: 7 } },
        { text: "Coach them on performance expectations while privately being more understanding", insight: "You try to help without formal accommodations", scores: { technical: 5, pressure: 7, collaboration: 7, creativity: 6, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "Mental health accommodations require balancing privacy, legal compliance, and practical workplace needs.",
      realityNote: "Mental health issues are increasingly common in workplaces. Learning to support people while protecting the business is essential."
    },
    {
      id: "q4",
      scenario: "Two employees are dating and now one is promoted to manage the other. What's your response?",
      options: [
        { text: "Implement conflict of interest policy, require disclosure, reassign reporting structure to avoid direct reports dating, document everything", insight: "You enforce professional boundaries", scores: { technical: 10, pressure: 8, collaboration: 8, creativity: 7, independence: 9, workLifeBalance: 7 } },
        { text: "Talk to both about maintaining professionalism and monitor the situation for issues", insight: "You trust them to manage it", scores: { technical: 6, pressure: 6, collaboration: 7, creativity: 6, independence: 6, workLifeBalance: 7 } },
        { text: "Require one of them to transfer to a different team or department", insight: "You separate them immediately", scores: { technical: 7, pressure: 7, collaboration: 5, creativity: 5, independence: 8, workLifeBalance: 7 } },
        { text: "Let them handle it professionally - it's their personal business", insight: "You avoid involvement", scores: { technical: 3, pressure: 5, collaboration: 4, creativity: 4, independence: 4, workLifeBalance: 8 } }
      ],
      explanation: "Workplace relationships require clear policies to prevent favoritism and potential harassment claims.",
      realityNote: "Workplace romances happen. Having clear policies before problems arise protects everyone."
    },
    {
      id: "q5",
      scenario: "You discover a manager has been inflating performance reviews for their team to secure bigger bonuses. What do you do?",
      options: [
        { text: "Investigate thoroughly, review all their past evaluations, implement calibration process, address with manager and their leadership, potentially revise ratings and bonus allocations", insight: "You enforce performance integrity", scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 10, workLifeBalance: 5 } },
        { text: "Have a private conversation with the manager about proper rating standards for future reviews", insight: "You address it quietly", scores: { technical: 6, pressure: 6, collaboration: 6, creativity: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Implement company-wide calibration to prevent this but don't single out the manager", insight: "You fix the system", scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 8, independence: 7, workLifeBalance: 7 } },
        { text: "Document the issue and escalate to their leadership to handle", insight: "You escalate accountability", scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 5, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Performance integrity affects compensation fairness and employee trust. Addressing abuse requires courage.",
      realityNote: "Rating inflation is common. HR professionals who enforce standards build credible performance systems."
    },
    {
      id: "q6",
      scenario: "Leadership wants to implement return-to-office policy but 70% of employees prefer remote work. How do you advise?",
      options: [
        { text: "Present employee sentiment data, benchmark industry trends, propose hybrid compromise, help leadership understand retention risks, facilitate decision with clear communication plan", insight: "You broker evidence-based policy", scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 } },
        { text: "Support leadership's decision - they understand business needs better than employees", insight: "You side with authority", scores: { technical: 5, pressure: 6, collaboration: 5, creativity: 4, independence: 4, workLifeBalance: 7 } },
        { text: "Advocate strongly for remote work to protect employee satisfaction", insight: "You champion employees", scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 6, independence: 9, workLifeBalance: 7 } },
        { text: "Implement the policy but create generous exceptions to minimize disruption", insight: "You soften the mandate", scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 8, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "HR's role is bringing employee voice to leadership decisions while helping implement business needs.",
      realityNote: "Work flexibility is now a top retention factor. HR that ignores employee preferences loses talent."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 60, weight: 0.20 },
    pressure: { min: -5, max: 60, weight: 0.25 },
    collaboration: { min: -5, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 55, weight: 0.15 },
    independence: { min: -5, max: 60, weight: 0.15 },
    workLifeBalance: { min: -10, max: 50, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong HR Manager Potential", message: "You demonstrate excellent HR judgment: balancing empathy with business needs, legal compliance with flexibility, and employee advocacy with organizational goals. You understand that HR work requires both backbone and heart." },
    medium: { min: 50, title: "HR Role Possible With Development", message: "You have some HR aptitudes but may find difficult conversations or policy enforcement challenging. Consider HR coordinator or specialist roles to build experience with employee relations and legal frameworks." },
    low: { min: 0, title: "Consider Different People Roles", message: "Your responses suggest HR management may not suit you. The role requires comfort with conflict, confidential information, and being the bearer of bad news. Consider training & development, recruiting, or organizational development roles." }
  }
};

// Pharmacist and Journalist quizzes (abbreviated for file length, following same pattern)
const pharmacistQuiz = {
  title: "A Day as a Pharmacist",
  description: "Navigate drug interactions, patient counseling, and ethical dilemmas. See if you can balance clinical expertise with patient care.",
  duration: 5,
  questions: [
    {
      id: "q1",
      scenario: "A patient presents a prescription for a medication that could interact dangerously with another medication on their profile. The prescribing doctor is known to be defensive. What do you do?",
      options: [
        { text: "Refuse to dispense, call the doctor to discuss the interaction with specific clinical reasoning, document everything, explain the situation professionally to the patient", insight: "You prioritize patient safety above all", scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 6, independence: 10, workLifeBalance: 6 } },
        { text: "Dispense the medication but counsel the patient extensively about warning signs", insight: "You trust the prescriber", scores: { technical: 5, pressure: 6, collaboration: 6, creativity: 6, independence: 5, workLifeBalance: 7 } },
        { text: "Ask another pharmacist for their opinion before making a decision", insight: "You seek peer input", scores: { technical: 8, pressure: 6, collaboration: 9, creativity: 5, independence: 4, workLifeBalance: 7 } },
        { text: "Dispense as written - the doctor knows the patient's full medical history better than you do", insight: "You defer to physician authority", scores: { technical: 3, pressure: 4, collaboration: 5, creativity: 3, independence: 2, workLifeBalance: 8 } }
      ],
      explanation: "Pharmacists are the last line of defense against medication errors. Speaking up saves lives.",
      realityNote: "You'll catch errors doctors make every week. Learning to communicate diplomatically while standing firm on safety is essential."
    },
    {
      id: "q2",
      scenario: "You're 30 minutes from closing, there's a line of 8 people, and a patient arrives with a complex insurance issue that will take 20 minutes to resolve. How do you handle it?",
      options: [
        { text: "Apologize to those waiting, efficiently help the complex case, keep everyone updated on wait times, stay late if needed", insight: "You serve everyone with patience", scores: { technical: 8, pressure: 10, collaboration: 10, creativity: 6, independence: 8, workLifeBalance: -3 } },
        { text: "Ask the complex case to come back tomorrow when you have more time", insight: "You protect closing time", scores: { technical: 5, pressure: 6, collaboration: 5, creativity: 4, independence: 6, workLifeBalance: 8 } },
        { text: "Have a technician help the simpler cases while you work on the complex one in parallel", insight: "You delegate efficiently", scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: 6 } },
        { text: "Spend 5 minutes on their case, then tell them to call their insurance company", insight: "You minimize your involvement", scores: { technical: 4, pressure: 6, collaboration: 3, creativity: 4, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Retail pharmacy requires balancing patient needs with practical constraints. Great pharmacists find solutions.",
      realityNote: "The last customer before closing will always have the most complex problem. How you handle it defines your reputation."
    },
    {
      id: "q3",
      scenario: "A regular patient asks for your recommendation on an over-the-counter supplement they saw advertised online. You know it's not evidence-based and potentially unsafe.",
      options: [
        { text: "Explain why it's not recommended citing specific evidence, offer proven alternatives, educate about evaluating health claims", insight: "You educate with evidence", scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 7, independence: 9, workLifeBalance: 7 } },
        { text: "Tell them it's their choice but you wouldn't recommend it", insight: "You provide minimal guidance", scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 4, independence: 6, workLifeBalance: 7 } },
        { text: "Sell them the product if they insist - they're adults", insight: "You prioritize sales", scores: { technical: 2, pressure: 4, collaboration: 4, creativity: 3, independence: 4, workLifeBalance: 8 } },
        { text: "Suggest they ask their doctor before trying any new supplement", insight: "You defer to physicians", scores: { technical: 7, pressure: 6, collaboration: 6, creativity: 5, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Pharmacists are trusted advisors. Providing evidence-based guidance even when inconvenient builds that trust.",
      realityNote: "Patients get health information from everywhere now. Your expertise helps them separate science from marketing."
    },
    {
      id: "q4",
      scenario: "A patient's insurance denied coverage for a life-saving medication. The cash price is $800 they can't afford. What do you do?",
      options: [
        { text: "Research patient assistance programs, contact the manufacturer, look for generic alternatives or therapeutic substitutes, work with doctor on prior authorization", insight: "You exhaust all options", scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 5 } },
        { text: "Give them information about patient assistance programs and let them handle it", insight: "You provide resources", scores: { technical: 7, pressure: 6, collaboration: 6, creativity: 6, independence: 6, workLifeBalance: 7 } },
        { text: "Contact the doctor to see if there's a covered alternative they can prescribe", insight: "You facilitate solutions", scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: 7 } },
        { text: "Explain there's nothing you can do about insurance decisions", insight: "You accept limitations", scores: { technical: 4, pressure: 5, collaboration: 4, creativity: 3, independence: 4, workLifeBalance: 8 } }
      ],
      explanation: "Insurance barriers are daily pharmacy reality. Great pharmacists become experts at finding solutions.",
      realityNote: "Helping patients navigate insurance and affordability is now as important as clinical knowledge."
    },
    {
      id: "q5",
      scenario: "You notice a pattern: a patient is filling multiple opioid prescriptions from different doctors. What's your approach?",
      options: [
        { text: "Review prescription monitoring database, discuss concerns privately with patient, contact prescribers, document everything, potentially refuse to fill if inappropriate", insight: "You intervene professionally", scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 10, workLifeBalance: 6 } },
        { text: "Report to prescription monitoring authorities and let them handle it", insight: "You escalate to authorities", scores: { technical: 8, pressure: 7, collaboration: 6, creativity: 5, independence: 7, workLifeBalance: 7 } },
        { text: "Fill the prescriptions - they're all legitimate from licensed doctors", insight: "You trust the system", scores: { technical: 3, pressure: 5, collaboration: 5, creativity: 3, independence: 3, workLifeBalance: 8 } },
        { text: "Have a compassionate conversation about addiction resources while filling the current prescription", insight: "You offer help", scores: { technical: 7, pressure: 8, collaboration: 9, creativity: 8, independence: 7, workLifeBalance: 7 } }
      ],
      explanation: "Opioid diversion and addiction are serious public health issues. Pharmacists play a critical role in prevention.",
      realityNote: "You'll face addiction, diversion, and doctor shopping regularly. Your response can save lives or enable harm."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 55, weight: 0.30 },
    pressure: { min: -5, max: 60, weight: 0.20 },
    collaboration: { min: -5, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 55, weight: 0.15 },
    independence: { min: -5, max: 60, weight: 0.10 },
    workLifeBalance: { min: -10, max: 50, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Pharmacist Potential", message: "You demonstrate excellent pharmaceutical judgment: clinical knowledge, patient advocacy, ethical reasoning, and problem-solving under pressure. You understand that pharmacy is clinical expertise in service of patient care." },
    medium: { min: 50, title: "Pharmacy Possible With Development", message: "You have some aptitudes but may find the clinical responsibility or interpersonal aspects challenging. Consider pharmacy technician or pharmaceutical research roles to explore the field." },
    low: { min: 0, title: "Consider Different Healthcare Roles", message: "Your responses suggest retail pharmacy may not suit you. The role requires clinical confidence, patient interaction, and standing up to prescribers. Consider pharmaceutical industry, research, or other healthcare roles." }
  }
};

const journalistQuiz = {
  title: "A Day as a Journalist",
  description: "Navigate source protection, deadline pressure, and ethical dilemmas. See if you can balance truth-seeking with story-telling.",
  duration: 5,
  questions: [
    {
      id: "q1",
      scenario: "You have a source with explosive information about local government corruption. They'll only talk if you guarantee anonymity. How do you proceed?",
      options: [
        { text: "Verify information through at least two additional independent sources, consult editor about protecting source, document everything, prepare for potential legal pressure", insight: "You protect sources while verifying facts", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 10, workLifeBalance: 6 } },
        { text: "Agree to anonymity immediately and publish - this is too important to delay", insight: "You prioritize speed over verification", scores: { technical: 5, pressure: 8, collaboration: 4, creativity: 8, independence: 9, workLifeBalance: 6 } },
        { text: "Tell them you can't guarantee anonymity - no story is worth compromising ethics", insight: "You maintain strict policies", scores: { technical: 8, pressure: 6, collaboration: 5, creativity: 4, independence: 8, workLifeBalance: 7 } },
        { text: "Take the information but try to find someone willing to go on record", insight: "You prefer attributed sources", scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 8, independence: 8, workLifeBalance: 7 } }
      ],
      explanation: "Source protection is sacred in journalism, but verification and editorial oversight are equally important.",
      realityNote: "Anonymous sources break big stories but also create legal liability. Getting this balance right defines your career."
    },
    {
      id: "q2",
      scenario: "It's 6pm Friday. Your editor says the morning front-page story fell through and you need to deliver a replacement by 9pm. What do you do?",
      options: [
        { text: "Quickly assess what stories you've been developing could be accelerated, make necessary calls, write efficiently, focus on what can be verified", insight: "You deliver under extreme pressure", scores: { technical: 9, pressure: 10, collaboration: 8, creativity: 10, independence: 9, workLifeBalance: -5 } },
        { text: "Tell your editor this is unfair and likely to result in poor journalism - push back on the deadline", insight: "You protect quality standards", scores: { technical: 7, pressure: 6, collaboration: 4, creativity: 4, independence: 9, workLifeBalance: 7 } },
        { text: "Pull together something quickly from press releases and existing material you can verify rapidly", insight: "You find quick solutions", scores: { technical: 6, pressure: 8, collaboration: 6, creativity: 6, independence: 7, workLifeBalance: 6 } },
        { text: "Suggest they run with a previously published piece and update it", insight: "You propose alternatives", scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 6, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "Journalism is deadline-driven. The ability to produce quality work under extreme time pressure is essential.",
      realityNote: "Breaking news doesn't wait for your schedule. If you can't write clean copy under pressure, this isn't your field."
    },
    {
      id: "q3",
      scenario: "You're covering a story where your findings contradict the narrative being pushed by your publication's major advertiser. What's your approach?",
      options: [
        { text: "Report the story accurately based on facts, inform editor of potential advertiser conflict, let editorial leadership decide, document everything", insight: "You maintain editorial independence", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 6 } },
        { text: "Publish it anyway - editorial and advertising should be completely separate", insight: "You enforce strict separation", scores: { technical: 8, pressure: 9, collaboration: 4, creativity: 6, independence: 10, workLifeBalance: 7 } },
        { text: "Find ways to soften the story while still being technically accurate", insight: "You seek compromise", scores: { technical: 5, pressure: 7, collaboration: 7, creativity: 6, independence: 4, workLifeBalance: 7 } },
        { text: "Request that the story be assigned to another reporter to avoid conflict appearance", insight: "You remove yourself from conflict", scores: { technical: 7, pressure: 6, collaboration: 8, creativity: 5, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "Editorial independence from advertising is fundamental to journalism credibility. Protecting it requires courage.",
      realityNote: "Advertisers will pressure editorial. Publications that cave lose credibility. Stand firm or find a publication that will."
    },
    {
      id: "q4",
      scenario: "You're interviewing a victim of trauma who's sharing painful details. They're becoming visibly distressed. What do you do?",
      options: [
        { text: "Pause the interview, check if they want to continue, offer breaks, show compassion while maintaining professional boundaries", insight: "You balance empathy with journalism", scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 7 } },
        { text: "Continue the interview - people need to hear their story and they agreed to speak", insight: "You prioritize the story", scores: { technical: 6, pressure: 8, collaboration: 5, creativity: 6, independence: 8, workLifeBalance: 7 } },
        { text: "End the interview immediately to protect them from further distress", insight: "You prioritize their wellbeing", scores: { technical: 6, pressure: 6, collaboration: 8, creativity: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Acknowledge their distress but keep asking questions - they chose to share their story", insight: "You push through discomfort", scores: { technical: 7, pressure: 9, collaboration: 5, creativity: 7, independence: 9, workLifeBalance: 7 } }
      ],
      explanation: "Trauma journalism requires balancing public interest with human dignity. Great journalists never exploit sources.",
      realityNote: "You'll interview people on the worst days of their lives. How you treat them defines what kind of journalist you are."
    },
    {
      id: "q5",
      scenario: "You discover your biggest story has a factual error after publication. It doesn't change the core narrative but it's wrong. What do you do?",
      options: [
        { text: "Immediately publish a correction, explain the error transparently, update the story, inform your editor", insight: "You prioritize accuracy above ego", scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 6 } },
        { text: "Fix it quietly in the online version without drawing attention to the error", insight: "You minimize embarrassment", scores: { technical: 5, pressure: 6, collaboration: 5, creativity: 5, independence: 5, workLifeBalance: 7 } },
        { text: "Wait to see if anyone notices before deciding whether to correct", insight: "You hope it goes unnoticed", scores: { technical: 3, pressure: 4, collaboration: 4, creativity: 3, independence: 4, workLifeBalance: 7 } },
        { text: "Discuss with editor whether a correction is necessary since core story is accurate", insight: "You evaluate significance", scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 6, independence: 6, workLifeBalance: 7 } }
      ],
      explanation: "Credibility is a journalist's only real asset. Transparent correction of errors builds more trust than hiding them.",
      realityNote: "Every journalist makes errors. How you handle them determines whether audiences trust you long-term."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 60, weight: 0.25 },
    pressure: { min: -10, max: 60, weight: 0.25 },
    collaboration: { min: -5, max: 60, weight: 0.15 },
    creativity: { min: -5, max: 60, weight: 0.20 },
    independence: { min: -5, max: 60, weight: 0.10 },
    workLifeBalance: { min: -15, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Journalist Potential", message: "You demonstrate excellent journalism instincts: commitment to truth, source protection, deadline performance, and ethical reasoning. You understand that journalism is a public service profession that requires both courage and compassion." },
    medium: { min: 50, title: "Journalism Possible With Development", message: "You have some aptitudes but may find the deadline pressure or ethical complexities challenging. Consider starting in communications, content writing, or editorial assistance to build journalism skills." },
    low: { min: 0, title: "Consider Different Writing Roles", message: "Your responses suggest journalism may not suit you. The role requires comfort with conflict, pressure to meet breaking news deadlines, and ethical gray areas. Consider public relations, content marketing, or creative writing." }
  }
};

const careerQuizData = [
  { 
    title: "Product Manager", 
    quiz: productManagerQuiz,
    category: "Business & Technology",
    shortDescription: "Define product vision and drive cross-functional execution to deliver user value.",
    fullDescription: "Product Managers are the CEOs of their product. They define strategy, prioritize features, and coordinate engineering, design, marketing, and sales to deliver products users love. PMs must balance user needs with business goals and technical constraints, making data-driven decisions under uncertainty.",
    salaryMin: 5000000,
    salaryMax: 20000000
  },
  { 
    title: "HR Manager", 
    quiz: hrManagerQuiz,
    category: "Business & Management",
    shortDescription: "Build organizational culture, manage employee relations, and ensure compliance.",
    fullDescription: "HR Managers are responsible for all people-related functions: recruitment, onboarding, performance management, employee relations, compensation, and compliance. They balance employee advocacy with business needs, handle sensitive situations, and shape organizational culture. Modern HR requires both strategic thinking and operational excellence.",
    salaryMin: 4000000,
    salaryMax: 15000000
  },
  { 
    title: "Pharmacist", 
    quiz: pharmacistQuiz,
    category: "Healthcare",
    shortDescription: "Dispense medications, counsel patients, and ensure safe drug therapy.",
    fullDescription: "Pharmacists are medication experts who dispense prescriptions, counsel patients on proper drug use, monitor for interactions, and serve as accessible healthcare professionals. They work in retail pharmacies, hospitals, clinics, and pharmaceutical companies. The role combines clinical knowledge with patient care and business operations.",
    salaryMin: 6000000,
    salaryMax: 18000000
  },
  { 
    title: "Journalist", 
    quiz: journalistQuiz,
    category: "Media & Communications",
    shortDescription: "Investigate stories, interview sources, and report news to inform the public.",
    fullDescription: "Journalists research, investigate, and report on news and issues of public interest. They interview sources, verify facts, write stories, and increasingly produce multimedia content. Modern journalism spans traditional newspapers, digital publications, broadcast media, and independent platforms. The profession requires curiosity, integrity, and resilience.",
    salaryMin: 2500000,
    salaryMax: 10000000
  }
];

export const seedRemainingQuizzes = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const item of careerQuizData) {
      // Try exact match first
      let career = await ctx.db
        .query("careers")
        .filter((q) => q.eq(q.field("title"), item.title))
        .first();

      // Try partial match if exact doesn't work
      if (!career) {
        const allCareers = await ctx.db.query("careers").collect();
        career = allCareers.find((c) =>
          c.title.toLowerCase().includes(item.title.toLowerCase()) ||
          item.title.toLowerCase().includes(c.title.toLowerCase())
        );
      }

      if (career) {
        await ctx.db.patch(career._id, {
          realityQuiz: item.quiz,
        });
        results.push({
          title: item.title,
          status: "quiz_added",
          careerId: career._id,
          matchedTitle: career.title
        });
      } else {
        // Create the career with quiz
        const careerId = await ctx.db.insert("careers", {
          title: item.title,
          category: item.category,
          shortDescription: item.shortDescription,
          fullDescription: item.fullDescription,
          videoUrl: "https://www.youtube.com/watch?v=example",
          videoThumbnail: `https://images.unsplash.com/photo-${Date.now()}?w=800`,
          salaryMin: item.salaryMin,
          salaryMax: item.salaryMax,
          currency: "RWF",
          requiredEducation: "See career details",
          requiredSkills: ["See career details"],
          careerPath: [],
          relatedCareerIds: [],
          views: 0,
          saves: 0,
          interestProfile: { realistic: 50, investigative: 50, artistic: 50, social: 50, enterprising: 50, conventional: 50 },
          valueProfile: { impact: 50, income: 50, autonomy: 50, balance: 50, growth: 50, stability: 50 },
          personalityProfile: { openness: 50, conscientiousness: 50, extraversion: 50 },
          workEnvironment: { teamSize: "medium", pace: "moderate", structure: "balanced" },
          realityQuiz: item.quiz
        });
        results.push({
          title: item.title,
          status: "created_with_quiz",
          careerId,
          matchedTitle: item.title
        });
      }
    }

    return {
      message: "Final quiz seeding complete",
      results,
      summary: {
        total: results.length,
        added: results.filter((r) => r.status === "quiz_added").length,
        created: results.filter((r) => r.status === "created_with_quiz").length,
        notFound: results.filter((r) => r.status === "career_not_found").length,
      },
    };
  },
});

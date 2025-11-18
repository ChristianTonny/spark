/**
 * Seed script to add all Reality Quizzes to careers
 * Run with: npx convex run seedQuizzes:seedAllQuizzes
 *
 * Note: Quiz data is embedded here since Convex can't import from lib folder
 */

import { mutation, query } from "./_generated/server";

// Software Developer Quiz
const softwareDeveloperQuiz = {
  title: "A Day as a Software Developer",
  description: "Experience real scenarios developers face daily. See if this career matches your style.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "It's 6 PM on Friday. Your code broke production and 1,000 users can't access the app. Your team is waiting for you at dinner. What do you do?",
      options: [
        { text: "Drop everything, cancel dinner, debug immediately until it's fixed", insight: "You show strong pressure tolerance and responsibility, but may risk burnout", scores: { pressure: 10, technical: 8, workLifeBalance: -5, independence: 5, collaboration: 0, creativity: 0 } },
        { text: "Document the issue, create a rollback plan, set up monitoring, fix it Monday", insight: "You balance urgency with sustainability - key for long-term success", scores: { pressure: 7, technical: 9, workLifeBalance: 8, collaboration: 5, independence: 0, creativity: 0 } },
        { text: "Call senior developers immediately for help and guidance", insight: "You value collaboration and know when to ask for help", scores: { collaboration: 10, pressure: 5, independence: -3, technical: 4, workLifeBalance: 0, creativity: 0 } },
        { text: "Feel overwhelmed and panic about the situation", insight: "High-pressure situations may be challenging - consider if this is right for you", scores: { pressure: -8, technical: 2, workLifeBalance: 0, independence: 0, collaboration: 0, creativity: 0 } }
      ],
      explanation: "Most experienced developers choose option 2 - balancing urgency with smart recovery processes. Production issues happen to everyone.",
      realityNote: "78% of developers face production issues monthly. The best handle it systematically, not heroically."
    },
    {
      id: "q2",
      scenario: "You've been debugging the same issue for 3 hours with no progress. What's your next move?",
      options: [
        { text: "Keep pushing - I'll figure it out eventually", insight: "Persistence is valuable but can become inefficient without fresh perspectives", scores: { independence: 8, pressure: 6, collaboration: -5, technical: 5, workLifeBalance: 0, creativity: 0 } },
        { text: "Take a break, clear your head, come back fresh", insight: "You understand the value of mental space in problem-solving", scores: { pressure: 8, workLifeBalance: 7, technical: 7, independence: 6, collaboration: 0, creativity: 0 } },
        { text: "Ask a colleague to pair program and get a second perspective", insight: "You leverage collaboration effectively - a key developer skill", scores: { collaboration: 10, technical: 8, independence: 3, pressure: 7, workLifeBalance: 0, creativity: 0 } },
        { text: "Search Stack Overflow and developer forums for similar issues", insight: "You know how to use available resources efficiently", scores: { technical: 9, independence: 7, collaboration: 4, creativity: 6, pressure: 0, workLifeBalance: 0 } }
      ],
      explanation: "Options 2, 3, and 4 are all valid strategies. The key is knowing when to use each one.",
      realityNote: "Developers spend 30-40% of their time debugging. Learning to debug efficiently is crucial."
    },
    {
      id: "q3",
      scenario: "Your manager assigns you a project using a technology you've never used. Deadline is 2 weeks. How do you react?",
      options: [
        { text: "Excited! Love learning new tech", insight: "You thrive on continuous learning - perfect for software development", scores: { creativity: 10, technical: 8, pressure: 6, independence: 7, collaboration: 0, workLifeBalance: 0 } },
        { text: "Stressed. Prefer sticking to what I know", insight: "Technology changes constantly - this may cause ongoing stress", scores: { pressure: -5, technical: 3, creativity: -3, independence: 4, collaboration: 0, workLifeBalance: 0 } },
        { text: "Ask to pair with someone experienced in this tech", insight: "Smart approach - leveraging team knowledge accelerates learning", scores: { collaboration: 10, technical: 7, pressure: 7, creativity: 6, independence: 0, workLifeBalance: 0 } },
        { text: "Dive into documentation and tutorials immediately", insight: "Self-directed learning is a core developer skill", scores: { technical: 9, independence: 9, creativity: 7, collaboration: 3, pressure: 0, workLifeBalance: 0 } }
      ],
      explanation: "Software changes constantly. Developers learn new technologies multiple times per year.",
      realityNote: "Average developer learns 3-5 new frameworks/tools annually. Continuous learning is the job."
    },
    {
      id: "q4",
      scenario: "You have a brilliant idea for improving the product, but it's not in your assigned tasks. What do you do?",
      options: [
        { text: "Build a quick prototype in my free time to demonstrate the value", insight: "You show initiative and creativity - valuable traits for senior roles", scores: { creativity: 10, independence: 9, technical: 8, workLifeBalance: -3, collaboration: 0, pressure: 0 } },
        { text: "Bring it up in the next team meeting for discussion", insight: "You balance ideas with team input - collaborative innovation", scores: { collaboration: 10, creativity: 8, pressure: 5, technical: 6, independence: 0, workLifeBalance: 0 } },
        { text: "Email my manager privately with the suggestion", insight: "You respect hierarchy and proper channels", scores: { collaboration: 6, creativity: 7, independence: 5, technical: 5, pressure: 0, workLifeBalance: 0 } },
        { text: "Focus on my assigned work - don't want to overstep", insight: "While focused, you may miss opportunities to add extra value", scores: { collaboration: 4, creativity: -3, pressure: 8, independence: 3, workLifeBalance: 0, technical: 0 } }
      ],
      explanation: "Good developers balance assigned work with proactive improvement. Options 1 and 2 show initiative.",
      realityNote: "Many successful products started as developer side projects. Innovation is encouraged."
    },
    {
      id: "q5",
      scenario: "Code review feedback says your code works but could be cleaner. It's Friday afternoon. What do you do?",
      options: [
        { text: "Refactor it now - I want the code to be excellent", insight: "You value code quality highly, though this may affect work-life balance", scores: { technical: 10, pressure: 7, workLifeBalance: -4, collaboration: 6, independence: 0, creativity: 0 } },
        { text: "Schedule refactoring for Monday - it's not urgent", insight: "You balance quality with sustainable work pace", scores: { workLifeBalance: 9, technical: 8, pressure: 8, collaboration: 7, independence: 0, creativity: 0 } },
        { text: "Ask the reviewer to show me what they mean before changing anything", insight: "You value learning and clear communication", scores: { collaboration: 10, technical: 8, independence: 4, creativity: 7, pressure: 0, workLifeBalance: 0 } },
        { text: "It works, so I'll leave it - 'if it ain't broke, don't fix it'", insight: "You may struggle with code quality expectations in professional settings", scores: { technical: -5, collaboration: -3, workLifeBalance: 7, pressure: 3, independence: 0, creativity: 0 } }
      ],
      explanation: "Code reviews are learning opportunities. Options 1-3 show growth mindset.",
      realityNote: "Code review is standard practice. Expect feedback on 80%+ of your code. It's how teams improve."
    }
  ],
  scoringGuide: {
    technical: { min: -10, max: 55, weight: 0.20 },
    pressure: { min: -20, max: 50, weight: 0.20 },
    collaboration: { min: -15, max: 55, weight: 0.20 },
    creativity: { min: -10, max: 50, weight: 0.15 },
    independence: { min: -5, max: 50, weight: 0.15 },
    workLifeBalance: { min: -15, max: 45, weight: 0.10 }
  },
  results: {
    high: { min: 70, title: "Strong Developer Potential", message: "Your responses align well with successful software developers. You show good balance between technical skills and collaboration, handle pressure constructively, and understand the importance of continuous learning." },
    medium: { min: 50, title: "Development Career Possible", message: "You have some aptitudes for software development but may find certain aspects challenging. Consider which scenarios felt uncomfortable and whether you'd enjoy facing them regularly." },
    low: { min: 0, title: "Consider Other Paths", message: "Your responses suggest software development may not be the best fit. This doesn't mean you can't code - many roles use programming differently. Consider data analysis, technical writing, or IT support." }
  }
};

// Teacher Quiz
const teacherQuiz = {
  title: "A Day as a Teacher",
  description: "Experience the real challenges and rewards of teaching. See if education is your calling.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "A student is disrupting class for the third time this week, making it hard for others to learn. How do you handle it?",
      options: [
        { text: "Remove them from class immediately and send to principal", insight: "You prioritize classroom order but may miss opportunities to address root causes", scores: { pressure: 5, collaboration: -3, independence: 7, technical: 4, creativity: -2, workLifeBalance: 6 } },
        { text: "Take them aside privately, understand what's happening, offer support", insight: "You show empathy and build relationships - core to effective teaching", scores: { collaboration: 10, pressure: 7, creativity: 7, independence: 5, technical: 8, workLifeBalance: 4 } },
        { text: "Ignore it and continue teaching, hoping they'll stop", insight: "Avoiding conflict may let issues escalate and hurt learning environment", scores: { pressure: -5, collaboration: -5, independence: 3, technical: 2, creativity: -3, workLifeBalance: 5 } },
        { text: "Engage them by making lesson more interactive and relevant to their interests", insight: "You adapt teaching to student needs - excellent pedagogical thinking", scores: { creativity: 10, collaboration: 9, technical: 9, pressure: 7, independence: 6, workLifeBalance: 3 } }
      ],
      explanation: "Effective teachers balance classroom management with understanding individual student needs.",
      realityNote: "Teachers deal with behavioral issues almost daily. 73% say classroom management is their biggest ongoing challenge."
    },
    {
      id: "q2",
      scenario: "You have 40 assignments to grade before tomorrow, and you're exhausted after a full day of teaching. What do you do?",
      options: [
        { text: "Push through tonight, stay up late to finish all of them", insight: "Strong dedication but this pace leads to burnout without sustainable boundaries", scores: { pressure: 8, technical: 7, workLifeBalance: -8, independence: 8, collaboration: 4, creativity: 3 } },
        { text: "Grade a portion tonight, rest, finish tomorrow morning early", insight: "You balance responsibility with self-care - key for long-term teaching success", scores: { pressure: 8, workLifeBalance: 7, technical: 8, independence: 7, collaboration: 5, creativity: 5 } },
        { text: "Use a rubric to grade faster, prioritize detailed feedback on key assignments only", insight: "You work efficiently and strategically - teaching is marathon not sprint", scores: { creativity: 8, technical: 9, pressure: 8, workLifeBalance: 6, independence: 8, collaboration: 5 } },
        { text: "Feel overwhelmed and stressed about the workload", insight: "Teaching workload is real - need strategies to manage it sustainably", scores: { pressure: -6, workLifeBalance: -4, technical: 3, independence: 3, collaboration: 4, creativity: 2 } }
      ],
      explanation: "Grading is one of the hidden time sinks in teaching. Successful teachers develop efficient systems while maintaining quality feedback.",
      realityNote: "Average teacher works 50-60 hours weekly including grading, planning, and meetings."
    },
    {
      id: "q3",
      scenario: "A parent emails you aggressively, blaming you for their child's poor grade. How do you respond?",
      options: [
        { text: "Defend yourself and explain all the ways the student didn't do the work", insight: "While factual, defensive responses escalate conflict rather than resolve it", scores: { collaboration: -4, pressure: 4, independence: 6, technical: 5, creativity: 3, workLifeBalance: 5 } },
        { text: "Schedule a meeting to discuss student progress and create support plan together", insight: "You turn conflict into partnership - this is professional teaching excellence", scores: { collaboration: 10, pressure: 9, technical: 9, creativity: 7, independence: 6, workLifeBalance: 4 } },
        { text: "Forward email to principal and let them handle the angry parent", insight: "While sometimes necessary, over-reliance on admin can limit your growth", scores: { collaboration: 5, pressure: 3, independence: -3, technical: 4, creativity: 2, workLifeBalance: 7 } },
        { text: "Take it personally and feel anxious about confrontation", insight: "Parent conflict is emotionally challenging - resilience is teachable but necessary", scores: { pressure: -7, collaboration: 3, workLifeBalance: -5, independence: 2, technical: 3, creativity: 2 } }
      ],
      explanation: "Parent communication is crucial. The best teachers see parents as partners, even when interactions start contentiously.",
      realityNote: "85% of teachers report difficult parent interactions annually. Learning to navigate these professionally is essential."
    },
    {
      id: "q4",
      scenario: "Your carefully planned lesson is flopping - students are confused and disengaged. What do you do?",
      options: [
        { text: "Stick to the plan - they'll understand eventually", insight: "Rigidity can lose students. Teaching requires real-time adaptation", scores: { creativity: -5, collaboration: -2, independence: 7, technical: 3, pressure: 5, workLifeBalance: 6 } },
        { text: "Pause, ask students what's confusing, adjust approach on the fly", insight: "You're responsive and student-centered - hallmark of great teaching", scores: { creativity: 10, collaboration: 9, technical: 8, pressure: 8, independence: 7, workLifeBalance: 5 } },
        { text: "Use a different example or analogy to explain the concept", insight: "You think creatively to reach students - excellent pedagogical flexibility", scores: { creativity: 9, technical: 9, collaboration: 7, pressure: 7, independence: 7, workLifeBalance: 5 } },
        { text: "Feel frustrated that students aren't getting it", insight: "Teaching frustration is normal but requires reframing", scores: { pressure: -4, creativity: -3, collaboration: 2, technical: 4, independence: 4, workLifeBalance: 3 } }
      ],
      explanation: "Lessons rarely go exactly as planned. The best teachers read the room and adapt in real-time.",
      realityNote: "Experienced teachers say only 40% of lessons go exactly as planned. The skill is in the adjustment, not the plan."
    },
    {
      id: "q5",
      scenario: "A talented student is underperforming due to difficult home circumstances. What do you do?",
      options: [
        { text: "Give them extensions and lower expectations to help them cope", insight: "Compassionate but may inadvertently lower expectations that could help them", scores: { collaboration: 7, pressure: 5, creativity: 5, independence: 5, technical: 4, workLifeBalance: 6 } },
        { text: "Connect them with school counselor and social services", insight: "You recognize when to involve specialists - professional maturity", scores: { collaboration: 10, technical: 9, pressure: 7, creativity: 6, independence: 6, workLifeBalance: 6 } },
        { text: "Maintain high expectations but provide extra support and check-ins", insight: "Research shows high expectations + high support = best outcomes", scores: { collaboration: 9, technical: 9, creativity: 8, pressure: 8, independence: 7, workLifeBalance: 3 } },
        { text: "Feel sad for them but stick to standard requirements", insight: "Fair but may miss chance to make real difference in student's life", scores: { independence: 7, technical: 6, collaboration: 4, pressure: 5, creativity: 3, workLifeBalance: 7 } }
      ],
      explanation: "Teaching means meeting students where they are while helping them grow.",
      realityNote: "78% of teachers say addressing student trauma is now part of the job."
    }
  ],
  scoringGuide: {
    technical: { min: -10, max: 55, weight: 0.15 },
    pressure: { min: -25, max: 55, weight: 0.20 },
    collaboration: { min: -15, max: 60, weight: 0.25 },
    creativity: { min: -15, max: 55, weight: 0.15 },
    independence: { min: -5, max: 50, weight: 0.10 },
    workLifeBalance: { min: -25, max: 45, weight: 0.15 }
  },
  results: {
    high: { min: 70, title: "Teaching is Your Calling", message: "Your responses show strong alignment with the realities of teaching. You demonstrate empathy, adaptability, collaboration skills, and the resilience needed to thrive in education." },
    medium: { min: 50, title: "Teaching Could Work With Development", message: "You have some qualities that align with teaching but may find certain aspects challenging. Consider classroom observation or tutoring to test your fit before committing." },
    low: { min: 0, title: "Consider Alternative Education Roles", message: "Your responses suggest traditional classroom teaching may not align well with your preferences. Consider roles in curriculum design, education technology, or corporate training." }
  }
};

// Nurse Quiz
const nurseQuiz = {
  title: "A Day as a Nurse",
  description: "Experience the intensity, compassion, and challenges of nursing. See if healthcare is your path.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "You're caring for 6 patients when a 7th critical patient arrives. You're already behind on medication rounds. What do you do?",
      options: [
        { text: "Prioritize the critical patient immediately, delegate others to colleagues", insight: "You understand triage and teamwork - essential in high-pressure healthcare", scores: { pressure: 10, collaboration: 9, technical: 9, creativity: 6, independence: 5, workLifeBalance: -3 } },
        { text: "Finish current medication round first, then address new patient", insight: "Sticking to routine in emergencies can endanger patients", scores: { pressure: 3, technical: 5, collaboration: 4, independence: 6, creativity: 2, workLifeBalance: 5 } },
        { text: "Call for backup immediately while starting triage assessment", insight: "You recognize limits and ask for help - smart resource management", scores: { collaboration: 10, pressure: 9, technical: 8, creativity: 7, independence: 4, workLifeBalance: 6 } },
        { text: "Feel overwhelmed by impossible patient ratios", insight: "Valid feeling but nursing requires functioning under sustained pressure", scores: { pressure: -8, collaboration: 3, technical: 4, independence: 3, creativity: 2, workLifeBalance: -5 } }
      ],
      explanation: "Nurses constantly juggle competing priorities. The ability to triage, delegate, and ask for help saves lives.",
      realityNote: "82% of nurses report being regularly understaffed. Learning to work safely under pressure is critical."
    },
    {
      id: "q2",
      scenario: "A patient is rude and verbally abusive to you despite your best care. How do you respond?",
      options: [
        { text: "Take it personally and feel hurt by their treatment", insight: "Understandable but unsustainable - you'll face this regularly in healthcare", scores: { pressure: -6, collaboration: 3, technical: 4, creativity: 2, independence: 3, workLifeBalance: -4 } },
        { text: "Recognize they're in pain/fear, maintain professionalism and compassion", insight: "Emotional maturity and empathy - hallmark of excellent nursing", scores: { collaboration: 10, pressure: 9, technical: 8, creativity: 6, independence: 7, workLifeBalance: 5 } },
        { text: "Set firm boundaries while continuing to provide quality care", insight: "You balance compassion with self-protection - both are necessary", scores: { pressure: 8, collaboration: 8, independence: 8, technical: 8, creativity: 6, workLifeBalance: 7 } },
        { text: "Avoid the patient and minimize interactions with them", insight: "Avoidance compromises patient care and doesn't resolve the issue", scores: { collaboration: -4, pressure: 3, technical: 2, independence: 6, creativity: 2, workLifeBalance: 6 } }
      ],
      explanation: "Difficult patients are part of nursing. The best nurses separate personal feelings from professional care.",
      realityNote: "68% of nurses experience verbal abuse weekly. Developing emotional resilience is crucial."
    },
    {
      id: "q3",
      scenario: "You witness a doctor make what you believe is a medication error. What do you do?",
      options: [
        { text: "Question it respectfully and double-check the order before administering", insight: "Patient safety advocate - you understand nurses are last line of defense", scores: { collaboration: 9, pressure: 9, technical: 10, independence: 8, creativity: 6, workLifeBalance: 5 } },
        { text: "Administer it anyway - doctor knows best", insight: "Dangerous assumption - nurses prevent errors by questioning when needed", scores: { collaboration: 3, pressure: 5, technical: -5, independence: -3, creativity: 2, workLifeBalance: 6 } },
        { text: "Report to charge nurse and let them handle the confrontation", insight: "Appropriate escalation but direct communication often resolves faster", scores: { collaboration: 7, pressure: 6, technical: 7, independence: 4, creativity: 5, workLifeBalance: 7 } },
        { text: "Worry about challenging authority but ultimately stay silent", insight: "Fear of hierarchy can compromise patient safety", scores: { pressure: -5, collaboration: -3, technical: 3, independence: -4, creativity: 2, workLifeBalance: 4 } }
      ],
      explanation: "Nurses catch medication errors daily. Speaking up diplomatically when something seems wrong is both professional duty and patient protection.",
      realityNote: "Nurses prevent an estimated 86% of medication errors before they reach patients."
    },
    {
      id: "q4",
      scenario: "Your 12-hour shift ends in 10 minutes but your replacement calls in sick. What do you do?",
      options: [
        { text: "Stay until replacement arrives, even if it means missing plans", insight: "Dedication to patients but this pace without boundaries leads to burnout", scores: { collaboration: 7, pressure: 7, technical: 7, independence: 6, workLifeBalance: -7, creativity: 4 } },
        { text: "Work with charge nurse to ensure safe handoff then leave", insight: "You balance patient safety with self-care - sustainable nursing practice", scores: { collaboration: 9, pressure: 8, technical: 8, workLifeBalance: 7, independence: 7, creativity: 6 } },
        { text: "Leave exactly on time - not my problem", insight: "While technically correct, rigid boundaries can harm patients in true emergencies", scores: { independence: 8, workLifeBalance: 8, collaboration: -5, pressure: 5, technical: 5, creativity: 4 } },
        { text: "Feel guilty and resentful about impossible expectations", insight: "Understandable but nursing requires navigating this tension constantly", scores: { pressure: -5, workLifeBalance: -4, collaboration: 4, technical: 5, independence: 4, creativity: 3 } }
      ],
      explanation: "Staffing issues are chronic in nursing. The key is ensuring patient safety while maintaining boundaries that prevent burnout.",
      realityNote: "Average nurse works 2-3 hours unpaid overtime weekly."
    },
    {
      id: "q5",
      scenario: "You make a mistake that could have harmed a patient, but didn't. What do you do?",
      options: [
        { text: "Report it immediately through proper channels and learn from it", insight: "Professional integrity and growth mindset - this is how healthcare improves", scores: { collaboration: 10, technical: 10, pressure: 8, independence: 8, creativity: 6, workLifeBalance: 6 } },
        { text: "Keep quiet since no harm was done", insight: "Dangerous approach - near-misses are learning opportunities for entire team", scores: { collaboration: -7, technical: -5, pressure: 3, independence: 5, creativity: 2, workLifeBalance: 7 } },
        { text: "Tell supervisor privately but don't formally document it", insight: "Partial accountability - formal reporting helps identify systemic issues", scores: { collaboration: 5, technical: 4, pressure: 6, independence: 6, creativity: 4, workLifeBalance: 6 } },
        { text: "Feel intense guilt and anxiety about the mistake", insight: "Normal reaction but need healthy ways to process errors without paralysis", scores: { pressure: -6, collaboration: 5, technical: 5, independence: 4, creativity: 3, workLifeBalance: -4 } }
      ],
      explanation: "All nurses make mistakes. Cultures of safety depend on reporting near-misses to prevent future errors.",
      realityNote: "Studies show nurses who report near-misses make fewer serious errors."
    }
  ],
  scoringGuide: {
    technical: { min: -15, max: 55, weight: 0.20 },
    pressure: { min: -30, max: 55, weight: 0.25 },
    collaboration: { min: -20, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 45, weight: 0.10 },
    independence: { min: -10, max: 50, weight: 0.10 },
    workLifeBalance: { min: -25, max: 45, weight: 0.15 }
  },
  results: {
    high: { min: 70, title: "Nursing is Your Calling", message: "Your responses show strong alignment with nursing realities. You demonstrate emotional resilience, patient advocacy, collaboration skills, and the ability to handle pressure while maintaining compassion." },
    medium: { min: 50, title: "Nursing Possible With Preparation", message: "You have some qualities that align with nursing but may find the emotional intensity or physical demands challenging. Consider volunteering in healthcare settings to test your fit." },
    low: { min: 0, title: "Consider Other Healthcare Roles", message: "Your responses suggest bedside nursing may not align well with your preferences. Consider medical lab work, health informatics, or health administration." }
  }
};

// Business Analyst Quiz
const businessAnalystQuiz = {
  title: "A Day as a Business Analyst",
  description: "Navigate stakeholder demands, data analysis, and requirement gathering. See if you can bridge business and technology.",
  duration: 5,
  questions: [
    {
      id: "q1",
      scenario: "Stakeholders want conflicting features - Sales wants simplicity, Operations wants detailed tracking. Both say their need is urgent. What do you do?",
      options: [
        { text: "Pick the most senior stakeholder's priority", insight: "Hierarchy-based decisions miss the chance to find win-win solutions", scores: { collaboration: 3, pressure: 5, technical: 4, creativity: 2, independence: 6, workLifeBalance: 6 } },
        { text: "Facilitate meeting between both groups to find compromise solution", insight: "Classic BA skillset - you bring people together to solve problems collaboratively", scores: { collaboration: 10, creativity: 9, pressure: 8, technical: 8, independence: 6, workLifeBalance: 4 } },
        { text: "Research data to determine which feature delivers more business value", insight: "Data-driven prioritization shows analytical thinking - core BA competency", scores: { technical: 10, creativity: 7, independence: 9, collaboration: 6, pressure: 7, workLifeBalance: 5 } },
        { text: "Feel stuck between competing demands", insight: "Common BA challenge - role requires navigating politics and priorities constantly", scores: { pressure: -6, collaboration: 3, technical: 4, creativity: 2, independence: 3, workLifeBalance: 3 } }
      ],
      explanation: "BAs constantly balance competing stakeholder needs. The best use facilitation and data to find solutions everyone can support.",
      realityNote: "73% of BAs report managing conflicting stakeholder priorities as their primary challenge."
    },
    {
      id: "q2",
      scenario: "Developers say your requirements are unclear, but you spent weeks documenting them. How do you respond?",
      options: [
        { text: "Defend the documentation - they need to read it more carefully", insight: "Defensive stance misses learning opportunity and damages relationships", scores: { collaboration: -4, independence: 6, pressure: 4, technical: 3, creativity: 2, workLifeBalance: 6 } },
        { text: "Ask specific questions about what's unclear and clarify collaboratively", insight: "You take ownership of communication - hallmark of effective BAs", scores: { collaboration: 10, technical: 9, creativity: 7, pressure: 8, independence: 6, workLifeBalance: 5 } },
        { text: "Create visual diagrams and use cases to supplement documentation", insight: "Adapting communication method shows flexibility and user-centered thinking", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 7, independence: 7, workLifeBalance: 4 } },
        { text: "Realize documentation alone isn't enough - need ongoing collaboration", insight: "Important insight - BA work is ongoing dialogue, not just documents", scores: { collaboration: 9, technical: 8, creativity: 8, pressure: 7, independence: 6, workLifeBalance: 5 } }
      ],
      explanation: "Requirements documentation is starting point, not endpoint. Great BAs communicate in multiple formats and stay engaged throughout development.",
      realityNote: "Agile BAs spend 60% of time in conversations vs documentation."
    },
    {
      id: "q3",
      scenario: "You discover the project stakeholders want will cost 3x initial estimate. What do you do?",
      options: [
        { text: "Present findings immediately and let stakeholders decide", insight: "Transparency is good but presenting options not just problems is better", scores: { collaboration: 7, technical: 8, pressure: 7, independence: 7, creativity: 5, workLifeBalance: 6 } },
        { text: "Identify lower-cost alternatives that meet core business objectives", insight: "Solution-oriented thinking - you understand it's not just about documenting problems", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 8, independence: 8, workLifeBalance: 4 } },
        { text: "Worry about delivering bad news and being blamed", insight: "Understandable but BAs must deliver uncomfortable truths early to save costs later", scores: { pressure: -6, collaboration: 4, technical: 5, creativity: 3, independence: 3, workLifeBalance: 3 } },
        { text: "Work with dev team to phase features and reduce initial scope", insight: "Collaborative approach to managing scope - shows strategic thinking", scores: { collaboration: 10, creativity: 9, technical: 8, pressure: 8, independence: 7, workLifeBalance: 5 } }
      ],
      explanation: "BAs often uncover scope/cost mismatches. The best present problems alongside creative solutions that preserve business value.",
      realityNote: "65% of BA projects experience significant scope growth. Early identification prevents budget disasters."
    },
    {
      id: "q4",
      scenario: "Business wants feature delivered in 1 month. Tech says 3 months minimum. You're in the middle. What do you do?",
      options: [
        { text: "Tell business they have to wait - tech timeline is firm", insight: "Siding with one group misses BA's value as bridge-builder", scores: { collaboration: 4, technical: 6, pressure: 5, independence: 5, creativity: 3, workLifeBalance: 7 } },
        { text: "Pressure tech team to work faster to meet business deadline", insight: "Unrealistic deadlines lead to technical debt and team burnout", scores: { collaboration: -3, pressure: 6, technical: 3, creativity: 3, independence: 4, workLifeBalance: 4 } },
        { text: "Facilitate discussion to identify minimum viable feature for month 1", insight: "You understand phased delivery and facilitate win-win outcomes - excellent BA skill", scores: { collaboration: 10, creativity: 10, technical: 9, pressure: 9, independence: 7, workLifeBalance: 5 } },
        { text: "Research competitive solutions to inform feasibility discussion", insight: "Data-driven approach to timeline discussions shows analytical maturity", scores: { technical: 9, creativity: 8, independence: 9, collaboration: 7, pressure: 7, workLifeBalance: 5 } }
      ],
      explanation: "Timeline conflicts are constant. The best BAs don't take sides - they facilitate creative solutions.",
      realityNote: "BAs mediate timeline conflicts weekly. Success comes from creative scoping, not from picking sides."
    },
    {
      id: "q5",
      scenario: "After 3 months of analysis, stakeholders change their mind about core requirements. How do you react?",
      options: [
        { text: "Frustrated - this invalidates all my work", insight: "Understandable but change is inherent in business - adaptability is crucial", scores: { pressure: -5, creativity: -3, collaboration: 3, technical: 4, independence: 4, workLifeBalance: 2 } },
        { text: "Understand businesses evolve - adapt analysis to new direction", insight: "Flexibility and growth mindset - you recognize change as normal not failure", scores: { creativity: 9, collaboration: 9, pressure: 9, technical: 8, independence: 7, workLifeBalance: 5 } },
        { text: "Ask what changed in business environment to drive new requirements", insight: "Curiosity about business context - shows strategic thinking beyond task execution", scores: { technical: 9, collaboration: 10, creativity: 8, pressure: 8, independence: 8, workLifeBalance: 5 } },
        { text: "Document change formally and track scope/timeline impacts", insight: "Professional approach to change management - protects project viability", scores: { technical: 10, collaboration: 7, pressure: 7, independence: 8, creativity: 6, workLifeBalance: 6 } }
      ],
      explanation: "Requirements change is the norm, not exception. Great BAs embrace change while managing its impacts on timeline and scope.",
      realityNote: "Studies show 60% of requirements change significantly during projects."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 55, weight: 0.20 },
    pressure: { min: -20, max: 55, weight: 0.20 },
    collaboration: { min: -10, max: 60, weight: 0.25 },
    creativity: { min: -10, max: 55, weight: 0.20 },
    independence: { min: 0, max: 50, weight: 0.10 },
    workLifeBalance: { min: -5, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong BA Potential", message: "You demonstrate key BA competencies: collaboration, creative problem-solving, analytical thinking, and comfort with ambiguity. This career aligns well with your strengths." },
    medium: { min: 50, title: "BA Role Possible With Development", message: "You have some BA aptitudes but may find constant stakeholder management challenging. Consider starting as QA analyst or junior BA to develop these skills." },
    low: { min: 0, title: "Consider Different Analytical Roles", message: "Your responses suggest the BA role's heavy emphasis on facilitation may not suit you. Consider data analyst or systems analyst roles." }
  }
};

// Marketing Manager Quiz
const marketingManagerQuiz = {
  title: "A Day as a Marketing Manager",
  description: "Navigate campaigns, budgets, and stakeholder expectations. See if you can drive results under pressure.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "Your biggest campaign just launched and initial metrics show it's underperforming. The CEO wants answers in tomorrow's meeting. What do you do?",
      options: [
        { text: "Wait for more data before drawing conclusions", insight: "Patience is wise but leadership expects proactive communication", scores: { technical: 7, pressure: 5, collaboration: 4, creativity: 5, independence: 7, workLifeBalance: 6 } },
        { text: "Analyze data overnight, identify issues, and present solutions alongside problems", insight: "Solution-oriented leadership", scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 9, independence: 8, workLifeBalance: -3 } },
        { text: "Blame the underperformance on external factors beyond your control", insight: "Deflecting responsibility damages credibility", scores: { technical: 3, pressure: 4, collaboration: -4, creativity: 2, independence: 5, workLifeBalance: 6 } },
        { text: "Feel anxious about presenting bad news to leadership", insight: "Natural feeling but marketing requires confidence", scores: { pressure: -6, collaboration: 4, technical: 5, creativity: 3, independence: 3, workLifeBalance: 2 } }
      ],
      explanation: "Marketing managers face constant performance scrutiny. The best prepare solutions alongside problems.",
      realityNote: "67% of marketing campaigns underperform initial expectations. How you respond defines your trajectory."
    },
    {
      id: "q2",
      scenario: "You have budget for only one initiative: a safe campaign with predictable ROI or an innovative campaign that could be huge or flop. What do you choose?",
      options: [
        { text: "Take the safe option - predictable results protect your job", insight: "Risk-averse approach may limit career growth but provides stability", scores: { creativity: 3, pressure: 6, technical: 7, collaboration: 5, independence: 6, workLifeBalance: 7 } },
        { text: "Go innovative - breakthrough results require bold moves", insight: "High risk tolerance can lead to big wins or career setbacks", scores: { creativity: 10, pressure: 7, independence: 9, technical: 6, collaboration: 5, workLifeBalance: 4 } },
        { text: "Split budget to test innovation while maintaining baseline results", insight: "Balanced approach shows strategic thinking and risk management", scores: { creativity: 8, technical: 9, collaboration: 7, pressure: 8, independence: 7, workLifeBalance: 6 } },
        { text: "Research competitor strategies before deciding", insight: "Data-informed decisions are smart but sometimes you must lead not follow", scores: { technical: 8, creativity: 6, collaboration: 6, independence: 6, pressure: 6, workLifeBalance: 6 } }
      ],
      explanation: "Marketing requires balancing creativity with accountability. The best marketers find ways to innovate while managing risk.",
      realityNote: "CMOs who take calculated creative risks are 3x more likely to be promoted."
    },
    {
      id: "q3",
      scenario: "Your data shows the CEO's favorite marketing channel is actually your worst performer. How do you handle this?",
      options: [
        { text: "Present the data objectively and recommend reallocation", insight: "Courage to speak truth to power with data - essential for senior marketing roles", scores: { technical: 10, collaboration: 8, pressure: 9, independence: 9, creativity: 6, workLifeBalance: 5 } },
        { text: "Keep funding the channel to avoid conflict", insight: "Avoiding difficult conversations wastes resources and undermines your expertise", scores: { collaboration: 3, pressure: 4, technical: 3, independence: -3, creativity: 2, workLifeBalance: 7 } },
        { text: "Slowly reduce budget over time without direct confrontation", insight: "Avoids conflict but lacks transparency that builds trust", scores: { collaboration: 4, technical: 6, pressure: 5, independence: 6, creativity: 4, workLifeBalance: 6 } },
        { text: "Find ways to make the CEO's preferred channel work better first", insight: "Diplomatic approach that explores all options before recommending changes", scores: { collaboration: 9, creativity: 8, technical: 8, pressure: 7, independence: 6, workLifeBalance: 4 } }
      ],
      explanation: "Marketing managers must navigate politics while staying data-driven.",
      realityNote: "73% of marketing decisions are influenced by executive preferences."
    },
    {
      id: "q4",
      scenario: "A social media crisis erupts Saturday morning - a customer complaint goes viral. What do you do?",
      options: [
        { text: "Wait until Monday to craft a proper response with legal review", insight: "Too slow - social media crises escalate hourly, not daily", scores: { pressure: 3, collaboration: 4, technical: 5, creativity: 3, independence: 5, workLifeBalance: 8 } },
        { text: "Respond immediately with empathy, take conversation offline, and mobilize team", insight: "Crisis management instincts - speed and empathy are critical", scores: { pressure: 10, collaboration: 9, creativity: 8, technical: 9, independence: 7, workLifeBalance: -5 } },
        { text: "Delete negative comments to contain the spread", insight: "Dangerous approach that typically amplifies backlash", scores: { technical: -5, collaboration: -6, pressure: 4, creativity: 2, independence: 6, workLifeBalance: 5 } },
        { text: "Feel stressed about ruined weekend but recognize it comes with the job", insight: "Realistic understanding but crisis response is time-sensitive", scores: { pressure: 5, workLifeBalance: 3, collaboration: 5, technical: 5, creativity: 4, independence: 5 } }
      ],
      explanation: "Social media crises don't respect business hours. Marketing managers must be ready to respond quickly anytime.",
      realityNote: "Brands that respond to social media crises within 1 hour see 25% less reputation damage."
    },
    {
      id: "q5",
      scenario: "Sales team blames your marketing for poor lead quality. You believe the leads are fine but sales isn't following up properly. How do you respond?",
      options: [
        { text: "Defend your team and show data proving lead quality", insight: "Defensive stance may be accurate but doesn't solve the business problem", scores: { technical: 7, independence: 7, collaboration: 3, pressure: 6, creativity: 4, workLifeBalance: 6 } },
        { text: "Propose joint analysis of the lead-to-close funnel to find real issues", insight: "Collaborative problem-solving that addresses root cause not blame", scores: { collaboration: 10, technical: 9, creativity: 8, pressure: 8, independence: 6, workLifeBalance: 5 } },
        { text: "Accept blame to maintain relationship with sales", insight: "Avoids conflict but sets precedent for marketing being scapegoat", scores: { collaboration: 4, pressure: 3, independence: -4, technical: 3, creativity: 2, workLifeBalance: 5 } },
        { text: "Escalate to leadership to resolve the dispute", insight: "Sometimes necessary but try peer resolution first", scores: { pressure: 6, collaboration: 4, independence: 5, technical: 6, creativity: 4, workLifeBalance: 6 } }
      ],
      explanation: "Marketing-Sales alignment is critical and often contentious.",
      realityNote: "Companies with strong marketing-sales alignment see 38% higher win rates."
    }
  ],
  scoringGuide: {
    technical: { min: -10, max: 55, weight: 0.20 },
    pressure: { min: -15, max: 55, weight: 0.20 },
    collaboration: { min: -15, max: 55, weight: 0.20 },
    creativity: { min: -10, max: 55, weight: 0.25 },
    independence: { min: -10, max: 50, weight: 0.10 },
    workLifeBalance: { min: -10, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Marketing Manager Potential", message: "Your responses show strong alignment with marketing management realities. You demonstrate data-driven thinking, creative problem-solving, and stakeholder management skills." },
    medium: { min: 50, title: "Marketing Role Possible With Development", message: "You have some marketing aptitudes but may find the constant pressure or political navigation challenging. Consider starting in a specialist role first." },
    low: { min: 0, title: "Consider Different Creative or Analytical Roles", message: "Your responses suggest marketing management may not suit you. Consider roles in design, research, or project management." }
  }
};

// Data Scientist Quiz
const dataScientistQuiz = {
  title: "A Day as a Data Scientist",
  description: "Navigate complex analyses, stakeholder expectations, and ethical dilemmas. See if you can turn data into decisions.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "Stakeholders want you to prove their hypothesis is correct, but your analysis shows it's wrong. What do you do?",
      options: [
        { text: "Present findings honestly and recommend alternative approaches", insight: "Scientific integrity combined with solution-oriented thinking", scores: { technical: 10, collaboration: 9, pressure: 8, creativity: 8, independence: 9, workLifeBalance: 5 } },
        { text: "Find a way to present data that supports their view", insight: "Compromising scientific integrity destroys long-term credibility", scores: { technical: -7, collaboration: 4, pressure: 5, independence: -5, creativity: 3, workLifeBalance: 6 } },
        { text: "Ask for more time to find data that might support their hypothesis", insight: "Reasonable if genuinely uncertain but can become avoidance", scores: { technical: 6, collaboration: 6, pressure: 5, independence: 5, creativity: 5, workLifeBalance: 6 } },
        { text: "Feel uncomfortable delivering findings that disappoint stakeholders", insight: "Common feeling but data scientists must be truth-tellers", scores: { pressure: -5, collaboration: 5, technical: 6, independence: 3, creativity: 4, workLifeBalance: 4 } }
      ],
      explanation: "Data scientists are trusted to provide unbiased analysis. Maintaining integrity while being diplomatically honest is essential.",
      realityNote: "68% of data scientists report pressure to present findings favorably."
    },
    {
      id: "q2",
      scenario: "Your model shows significant bias against a demographic group. Fixing it will delay launch by 2 months. What do you do?",
      options: [
        { text: "Flag the issue immediately and advocate for delay to fix it", insight: "Ethical leadership - you understand the real-world impact of biased models", scores: { technical: 10, collaboration: 9, independence: 9, creativity: 7, pressure: 8, workLifeBalance: 4 } },
        { text: "Launch anyway - business timelines are critical", insight: "Dangerous prioritization that can lead to serious harm and liability", scores: { technical: -6, collaboration: -4, pressure: 5, independence: 4, creativity: 2, workLifeBalance: 6 } },
        { text: "Document the bias and let leadership decide", insight: "Transfers responsibility but you remain accountable as the technical expert", scores: { technical: 6, collaboration: 6, independence: 5, pressure: 6, creativity: 4, workLifeBalance: 7 } },
        { text: "Find a faster partial fix that reduces bias without full delay", insight: "Pragmatic problem-solving that balances ethics with business reality", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 8, independence: 7, workLifeBalance: 5 } }
      ],
      explanation: "ML ethics is a critical and growing concern. Data scientists must advocate for fairness while understanding business constraints.",
      realityNote: "62% of companies have deployed models with known bias issues."
    },
    {
      id: "q3",
      scenario: "Your carefully crafted insights are being ignored because non-technical stakeholders don't understand them. What do you do?",
      options: [
        { text: "Present findings more simply with visuals and stories", insight: "Communication is as important as technical skills - you adapt to your audience", scores: { collaboration: 10, creativity: 9, technical: 8, pressure: 7, independence: 6, workLifeBalance: 5 } },
        { text: "Provide more technical detail so they understand the rigor", insight: "More detail often makes comprehension worse, not better", scores: { technical: 7, independence: 7, collaboration: 3, creativity: 4, pressure: 5, workLifeBalance: 6 } },
        { text: "Feel frustrated that people don't value your analysis", insight: "Understandable but communication is your responsibility, not theirs", scores: { pressure: -4, collaboration: 3, technical: 5, creativity: 3, independence: 5, workLifeBalance: 4 } },
        { text: "Find a business champion who can translate for you", insight: "Smart strategy that leverages others' strengths", scores: { collaboration: 9, creativity: 8, technical: 7, pressure: 7, independence: 5, workLifeBalance: 7 } }
      ],
      explanation: "The best insights are worthless if not communicated effectively.",
      realityNote: "Data scientists with strong communication skills earn 30% more."
    },
    {
      id: "q4",
      scenario: "A quick heuristic would solve the problem well enough, but you want to build an elegant ML model. What do you choose?",
      options: [
        { text: "Build the elegant ML model - this is what data science is about", insight: "Overengineering is a common trap that wastes resources", scores: { technical: 6, creativity: 6, independence: 7, collaboration: 3, pressure: 4, workLifeBalance: 4 } },
        { text: "Start with heuristic, add ML only if it meaningfully improves results", insight: "Pragmatic approach that prioritizes business value over technical elegance", scores: { technical: 9, collaboration: 9, creativity: 8, pressure: 8, independence: 8, workLifeBalance: 7 } },
        { text: "Build both and compare performance", insight: "Thorough but may not be worth the time investment", scores: { technical: 8, creativity: 7, independence: 7, collaboration: 6, pressure: 5, workLifeBalance: 4 } },
        { text: "Ask stakeholders which approach they prefer", insight: "Good for buy-in but they may not have technical context to decide", scores: { collaboration: 7, technical: 6, independence: 4, creativity: 5, pressure: 6, workLifeBalance: 7 } }
      ],
      explanation: "Mature data scientists know that simple solutions often outperform complex ones.",
      realityNote: "Research shows 87% of data science projects never reach production. Starting simple dramatically increases success."
    },
    {
      id: "q5",
      scenario: "You've spent 3 months on a project and realize your approach won't work. What do you do?",
      options: [
        { text: "Pivot immediately and communicate learnings to stakeholders", insight: "Scientific mindset - failure is information, not defeat", scores: { technical: 10, collaboration: 10, creativity: 9, pressure: 8, independence: 8, workLifeBalance: 5 } },
        { text: "Keep trying - maybe with more data or tuning it will work", insight: "Persistence can become sunk cost fallacy", scores: { technical: 5, independence: 6, creativity: 4, collaboration: 3, pressure: 4, workLifeBalance: 3 } },
        { text: "Feel like a failure for wasting 3 months", insight: "Natural feeling but research involves dead ends - this is normal", scores: { pressure: -6, collaboration: 4, technical: 5, creativity: 3, independence: 4, workLifeBalance: 2 } },
        { text: "Document why it didn't work for future reference", insight: "Valuable but should be combined with pivot and communication", scores: { technical: 7, independence: 7, collaboration: 5, creativity: 5, pressure: 5, workLifeBalance: 6 } }
      ],
      explanation: "Data science involves experimentation and failure. The best scientists fail fast, learn quickly, and communicate openly.",
      realityNote: "60% of data science experiments don't produce actionable results."
    }
  ],
  scoringGuide: {
    technical: { min: -20, max: 55, weight: 0.25 },
    pressure: { min: -20, max: 50, weight: 0.15 },
    collaboration: { min: -10, max: 55, weight: 0.20 },
    creativity: { min: -5, max: 55, weight: 0.20 },
    independence: { min: -10, max: 50, weight: 0.15 },
    workLifeBalance: { min: -10, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Data Scientist Potential", message: "Your responses show strong alignment with data science realities. You demonstrate scientific integrity, pragmatic problem-solving, and communication skills." },
    medium: { min: 50, title: "Data Science Possible With Development", message: "You have some aptitudes but may find stakeholder management or communication challenging. Consider starting as a data analyst." },
    low: { min: 0, title: "Consider Different Technical Roles", message: "Your responses suggest data science may not suit you. Consider software engineering, data engineering, or research roles." }
  }
};

// Graphic Designer Quiz
const graphicDesignerQuiz = {
  title: "A Day as a Graphic Designer",
  description: "Navigate client feedback, creative constraints, and tight deadlines. See if you can balance artistry with business needs.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "A client hates the design you're proud of and wants major changes. Their suggestions would make it worse in your professional opinion. What do you do?",
      options: [
        { text: "Push back firmly - you're the expert, they hired you for your vision", insight: "Standing ground can work but risks damaging client relationship", scores: { creativity: 8, independence: 9, collaboration: 3, pressure: 6, technical: 7, workLifeBalance: 6 } },
        { text: "Ask questions to understand their concerns, then propose compromise solutions", insight: "Collaborative problem-solving that respects both expertise and client needs", scores: { collaboration: 10, creativity: 9, technical: 9, pressure: 8, independence: 7, workLifeBalance: 5 } },
        { text: "Make all their changes - client is always right", insight: "Avoids conflict but may result in poor portfolio work and burnout", scores: { collaboration: 5, independence: -4, creativity: -3, pressure: 5, technical: 5, workLifeBalance: 6 } },
        { text: "Feel hurt that they don't appreciate your work", insight: "Natural reaction but design is service work - feedback isn't personal rejection", scores: { pressure: -5, creativity: 4, collaboration: 3, independence: 4, technical: 4, workLifeBalance: 3 } }
      ],
      explanation: "Designers must separate ego from work while still advocating for good design.",
      realityNote: "Designers report client feedback as their #1 challenge."
    },
    {
      id: "q2",
      scenario: "You're asked to design for a brand with strict guidelines that severely limit creativity. How do you approach it?",
      options: [
        { text: "Find creative solutions within the constraints", insight: "Professional mindset - constraints can spark innovation", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 8, independence: 7, workLifeBalance: 6 } },
        { text: "Feel frustrated by the limitations", insight: "Understandable but most design work involves significant constraints", scores: { creativity: 3, pressure: -4, independence: 5, collaboration: 4, technical: 5, workLifeBalance: 4 } },
        { text: "Ignore some guidelines to make better design", insight: "Breaking brand guidelines damages client trust and your reputation", scores: { creativity: 5, independence: 7, collaboration: -5, technical: 3, pressure: 5, workLifeBalance: 6 } },
        { text: "Suggest guideline updates that would improve design flexibility", insight: "Strategic approach that adds value beyond immediate project", scores: { collaboration: 9, creativity: 8, technical: 8, independence: 8, pressure: 7, workLifeBalance: 5 } }
      ],
      explanation: "Most design work happens within brand constraints. Great designers find creative solutions without breaking systems.",
      realityNote: "90% of professional design work involves existing brand guidelines."
    },
    {
      id: "q3",
      scenario: "Client asks for 'one more round of revisions' for the 5th time, well beyond scope. What do you do?",
      options: [
        { text: "Do the revisions to keep client happy", insight: "Accommodating but sets precedent for scope creep that hurts your business", scores: { collaboration: 5, independence: -4, pressure: 4, technical: 5, creativity: 4, workLifeBalance: -5 } },
        { text: "Explain scope limits and offer revisions for additional fee", insight: "Professional boundary-setting that respects both parties", scores: { independence: 10, collaboration: 8, pressure: 8, technical: 8, creativity: 6, workLifeBalance: 8 } },
        { text: "Get frustrated and rush through revisions", insight: "Damages relationship and quality - lose-lose outcome", scores: { pressure: -5, collaboration: -3, creativity: 2, independence: 5, technical: 3, workLifeBalance: 3 } },
        { text: "Try to understand why they're not satisfied to prevent future rounds", insight: "Root cause analysis can prevent endless revisions", scores: { collaboration: 9, technical: 8, creativity: 7, pressure: 7, independence: 7, workLifeBalance: 5 } }
      ],
      explanation: "Scope management is critical for sustainable design careers.",
      realityNote: "Freelance designers lose average 20% of income to unbilled revisions."
    },
    {
      id: "q4",
      scenario: "Your computer crashes and you lose a day's work on a project due tomorrow. What do you do?",
      options: [
        { text: "Panic and feel overwhelmed by the situation", insight: "Natural reaction but design deadlines require quick recovery", scores: { pressure: -7, creativity: 3, collaboration: 4, independence: 3, technical: 4, workLifeBalance: 2 } },
        { text: "Pull an all-nighter to redo everything", insight: "Dedication but unsustainable and may not be necessary", scores: { pressure: 7, independence: 8, technical: 7, creativity: 5, collaboration: 4, workLifeBalance: -8 } },
        { text: "Contact client immediately to negotiate extension", insight: "Transparent communication often earns goodwill and flexibility", scores: { collaboration: 10, pressure: 8, independence: 7, technical: 7, creativity: 6, workLifeBalance: 7 } },
        { text: "Recreate work efficiently using shortcuts since you've already solved the problem", insight: "Practical approach - second version is often faster and better", scores: { creativity: 9, pressure: 9, technical: 9, independence: 8, collaboration: 6, workLifeBalance: 5 } }
      ],
      explanation: "Technical failures happen. Designers need backup systems and the ability to recover quickly under pressure.",
      realityNote: "72% of designers have lost significant work to technical failures."
    },
    {
      id: "q5",
      scenario: "You've been doing the same type of work for 2 years and feel creatively stagnant. What do you do?",
      options: [
        { text: "Keep doing what pays while pursuing personal projects on the side", insight: "Balanced approach that maintains income while feeding creativity", scores: { creativity: 8, workLifeBalance: 6, independence: 8, technical: 7, collaboration: 5, pressure: 6 } },
        { text: "Actively pursue different types of clients and projects", insight: "Proactive career management that drives growth", scores: { creativity: 10, independence: 9, collaboration: 8, technical: 8, pressure: 7, workLifeBalance: 5 } },
        { text: "Accept that professional design isn't always exciting", insight: "Realistic but may lead to burnout if creative needs aren't met", scores: { pressure: 5, workLifeBalance: 7, creativity: 2, independence: 5, technical: 6, collaboration: 5 } },
        { text: "Consider leaving design for something more fulfilling", insight: "May be valid but explore options within design first", scores: { creativity: 4, independence: 6, pressure: 3, technical: 4, collaboration: 4, workLifeBalance: 5 } }
      ],
      explanation: "Creative burnout is real. Successful designers actively manage their career to maintain both income and creative fulfillment.",
      realityNote: "Design career satisfaction drops significantly after year 3 without variety."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 55, weight: 0.15 },
    pressure: { min: -20, max: 50, weight: 0.20 },
    collaboration: { min: -10, max: 55, weight: 0.15 },
    creativity: { min: -10, max: 55, weight: 0.30 },
    independence: { min: -10, max: 55, weight: 0.15 },
    workLifeBalance: { min: -15, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Graphic Designer Potential", message: "Your responses show strong alignment with graphic design realities. You demonstrate creative problem-solving, client management skills, and professional boundary-setting." },
    medium: { min: 50, title: "Design Career Possible With Development", message: "You have creative aptitude but may find client feedback or scope management challenging. Consider starting in-house where you'll have more stability." },
    low: { min: 0, title: "Consider Different Creative Paths", message: "Your responses suggest professional design's client service requirements may not suit you. Consider fine art, art direction, or UX research." }
  }
};

// Civil Engineer Quiz
const civilEngineerQuiz = {
  title: "A Day as a Civil Engineer",
  description: "Navigate safety concerns, budget pressures, and construction challenges. See if you can build infrastructure that lasts.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "During construction, you discover soil conditions are worse than surveys indicated. Proper foundation will cost 30% more and delay by 2 months. What do you do?",
      options: [
        { text: "Report immediately and recommend proper foundation despite cost", insight: "Safety-first engineering - you understand consequences of cutting corners", scores: { technical: 10, collaboration: 9, pressure: 9, independence: 8, creativity: 6, workLifeBalance: 5 } },
        { text: "Look for alternative designs that meet safety standards at lower cost", insight: "Creative problem-solving that addresses both safety and budget", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 8, independence: 8, workLifeBalance: 5 } },
        { text: "Proceed with original design - surveys are probably close enough", insight: "Dangerous assumption that can lead to structural failure and liability", scores: { technical: -8, collaboration: -5, pressure: 4, independence: 5, creativity: 2, workLifeBalance: 6 } },
        { text: "Feel stressed about delivering bad news to the client", insight: "Natural feeling but engineers must communicate problems clearly", scores: { pressure: -5, collaboration: 4, technical: 5, independence: 4, creativity: 3, workLifeBalance: 3 } }
      ],
      explanation: "Civil engineers face constant tension between safety and cost. The best never compromise structural integrity but find creative solutions where possible.",
      realityNote: "Engineering failures cost billions annually and can cost lives."
    },
    {
      id: "q2",
      scenario: "A contractor is not following your specifications on reinforcement spacing. They say their method is 'close enough' and faster. What do you do?",
      options: [
        { text: "Stop work immediately until they comply with specifications", insight: "Proper quality control - specifications exist for structural reasons", scores: { technical: 10, independence: 9, pressure: 8, collaboration: 6, creativity: 5, workLifeBalance: 6 } },
        { text: "Document the deviation and let them continue", insight: "Abdication of engineering responsibility - you're liable for what gets built", scores: { technical: -5, collaboration: -3, pressure: 4, independence: -4, creativity: 2, workLifeBalance: 7 } },
        { text: "Explain why the specification matters and offer to discuss alternatives", insight: "Educational approach that can improve contractor relationship and compliance", scores: { collaboration: 10, technical: 9, creativity: 8, pressure: 8, independence: 7, workLifeBalance: 5 } },
        { text: "Report to site supervisor and let them handle enforcement", insight: "Appropriate escalation but direct communication often resolves faster", scores: { collaboration: 6, pressure: 6, technical: 7, independence: 5, creativity: 4, workLifeBalance: 7 } }
      ],
      explanation: "Engineers must ensure contractors follow specifications. This requires both technical authority and communication skills.",
      realityNote: "60% of construction defects stem from not following specifications."
    },
    {
      id: "q3",
      scenario: "Weather delays have put your project 3 weeks behind schedule. Client is threatening penalties. What do you do?",
      options: [
        { text: "Propose accelerated schedule with additional crews", insight: "Problem-solving approach that offers solutions alongside problems", scores: { creativity: 9, collaboration: 9, technical: 8, pressure: 8, independence: 7, workLifeBalance: 4 } },
        { text: "Point out that weather delays are not your fault per contract", insight: "Legally correct but doesn't help the relationship or solve the problem", scores: { technical: 6, independence: 7, collaboration: 3, pressure: 5, creativity: 3, workLifeBalance: 7 } },
        { text: "Rush work to make up time", insight: "Rushing increases errors, accidents, and quality issues", scores: { technical: -4, collaboration: 4, pressure: 5, independence: 5, creativity: 3, workLifeBalance: 3 } },
        { text: "Resequence work activities to recover time without adding cost", insight: "Creative scheduling that demonstrates project management expertise", scores: { creativity: 10, technical: 9, collaboration: 8, pressure: 9, independence: 8, workLifeBalance: 6 } }
      ],
      explanation: "Schedule pressure is constant in construction. Engineers must find ways to recover time without compromising safety or quality.",
      realityNote: "70% of construction projects experience significant delays."
    },
    {
      id: "q4",
      scenario: "Your design would work better with premium materials, but client only approved budget materials. What do you do?",
      options: [
        { text: "Design with budget materials that meet code requirements", insight: "Professional approach - you work within constraints while meeting standards", scores: { technical: 9, collaboration: 8, creativity: 7, pressure: 7, independence: 7, workLifeBalance: 7 } },
        { text: "Insist on premium materials - it's the right engineering choice", insight: "May be technically better but overrides client decision-making", scores: { technical: 7, independence: 8, collaboration: 3, creativity: 4, pressure: 5, workLifeBalance: 6 } },
        { text: "Present lifecycle cost analysis showing premium materials save money long-term", insight: "Consultative approach that helps client make informed decision", scores: { collaboration: 10, technical: 9, creativity: 9, pressure: 7, independence: 7, workLifeBalance: 5 } },
        { text: "Use premium materials and bill as budget materials", insight: "Fraud that can end your career and result in legal action", scores: { technical: -8, collaboration: -8, independence: -5, pressure: 3, creativity: 2, workLifeBalance: 4 } }
      ],
      explanation: "Engineers often recommend solutions clients don't want to pay for. The best present value clearly and respect final client decisions.",
      realityNote: "Engineering is advisory - clients make final decisions within code requirements."
    },
    {
      id: "q5",
      scenario: "After project completion, you discover a minor design flaw that's not dangerous but will reduce structure lifespan by 10%. What do you do?",
      options: [
        { text: "Disclose to client and offer remediation options", insight: "Professional integrity - disclosure protects everyone long-term", scores: { technical: 10, collaboration: 10, independence: 9, creativity: 7, pressure: 8, workLifeBalance: 5 } },
        { text: "Keep quiet - it's not a safety issue and no one will know", insight: "Ethical violation that undermines professional responsibility", scores: { technical: -6, collaboration: -7, independence: -5, pressure: 4, creativity: 2, workLifeBalance: 7 } },
        { text: "Monitor the structure and address if issues develop", insight: "Passive approach that may not catch problems before they worsen", scores: { technical: 5, collaboration: 4, independence: 5, pressure: 5, creativity: 4, workLifeBalance: 7 } },
        { text: "Document for your records but don't inform client", insight: "Protects you but not the client - incomplete ethical response", scores: { technical: 4, collaboration: -3, independence: 5, pressure: 5, creativity: 3, workLifeBalance: 6 } }
      ],
      explanation: "Engineers have ongoing responsibility for their designs. Disclosure of issues, even minor ones, is part of professional integrity.",
      realityNote: "Engineering professional codes require disclosure of issues that affect public welfare."
    }
  ],
  scoringGuide: {
    technical: { min: -20, max: 55, weight: 0.25 },
    pressure: { min: -15, max: 50, weight: 0.20 },
    collaboration: { min: -20, max: 55, weight: 0.15 },
    creativity: { min: -5, max: 55, weight: 0.20 },
    independence: { min: -15, max: 50, weight: 0.15 },
    workLifeBalance: { min: -5, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Civil Engineer Potential", message: "Your responses show strong alignment with civil engineering realities. You demonstrate technical integrity, creative problem-solving under constraints, and professional communication." },
    medium: { min: 50, title: "Engineering Possible With Development", message: "You have some aptitudes but may find the safety responsibility or budget pressure challenging. Consider starting in a design firm with more mentorship." },
    low: { min: 0, title: "Consider Different Technical Roles", message: "Your responses suggest civil engineering may not suit you. Consider roles in technical consulting, construction management, or urban planning." }
  }
};

// Accountant Quiz
const accountantQuiz = {
  title: "A Day as an Accountant",
  description: "Navigate financial analysis, ethical dilemmas, and deadline pressure. See if you can manage numbers and trust.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "During an audit, you discover a significant financial discrepancy that could indicate fraud. What do you do?",
      options: [
        { text: "Document thoroughly and report through proper channels immediately", insight: "Professional integrity and legal compliance - essential for accounting", scores: { technical: 10, collaboration: 9, pressure: 9, independence: 9, creativity: 5, workLifeBalance: 5 } },
        { text: "Investigate further yourself before reporting", insight: "Some investigation is reasonable but delays in reporting can be problematic", scores: { technical: 8, independence: 8, pressure: 7, collaboration: 5, creativity: 6, workLifeBalance: 4 } },
        { text: "Mention it to the client first to give them chance to explain", insight: "Compromises independence - auditors report to stakeholders, not clients", scores: { collaboration: 4, technical: 3, independence: -5, pressure: 4, creativity: 3, workLifeBalance: 6 } },
        { text: "Feel conflicted about the consequences of reporting", insight: "Natural feeling but accountants must prioritize professional duty", scores: { pressure: -4, collaboration: 5, technical: 5, independence: 3, creativity: 3, workLifeBalance: 3 } }
      ],
      explanation: "Accountants are trusted gatekeepers of financial integrity. Ethical obligations require reporting irregularities through proper channels.",
      realityNote: "Accountants face ethical dilemmas regularly. Those who maintain integrity build careers; those who don't face legal consequences."
    },
    {
      id: "q2",
      scenario: "It's April - tax season crunch. You're working 70-hour weeks for the 4th consecutive week. How do you handle it?",
      options: [
        { text: "Push through - it's temporary and part of the profession", insight: "Realistic acceptance of seasonal demands but monitor for burnout", scores: { pressure: 9, technical: 8, independence: 8, collaboration: 6, creativity: 4, workLifeBalance: -3 } },
        { text: "Maintain quality while protecting some personal time", insight: "Sustainable approach that prevents burnout while meeting deadlines", scores: { pressure: 8, workLifeBalance: 7, technical: 8, collaboration: 7, independence: 7, creativity: 6 } },
        { text: "Struggle with the pace and consider if this career is right for you", insight: "Honest self-reflection - seasonal crunch isn't for everyone", scores: { pressure: 3, workLifeBalance: 3, technical: 5, collaboration: 5, independence: 5, creativity: 4 } },
        { text: "Work efficiently to minimize overtime while still delivering quality", insight: "Process optimization focus that serves you well long-term", scores: { technical: 9, creativity: 8, pressure: 8, workLifeBalance: 7, independence: 8, collaboration: 6 } }
      ],
      explanation: "Public accounting has intense seasonal demands. Sustainable careers require efficient work habits and acceptance of cyclical intensity.",
      realityNote: "Tax season accountants average 55-70 hours/week for 3 months."
    },
    {
      id: "q3",
      scenario: "A client asks you to use an aggressive tax strategy that's technically legal but ethically questionable. What do you do?",
      options: [
        { text: "Decline and explain your professional boundaries", insight: "Clear ethical stance that protects your reputation and license", scores: { independence: 10, technical: 9, collaboration: 6, pressure: 8, creativity: 5, workLifeBalance: 7 } },
        { text: "Implement it - if it's legal, it's their right", insight: "Technically correct but reputation risk and potential future liability", scores: { technical: 6, independence: 5, collaboration: 5, pressure: 6, creativity: 4, workLifeBalance: 6 } },
        { text: "Explain risks clearly and let client make informed decision", insight: "Consultative approach that respects client autonomy while protecting yourself", scores: { collaboration: 9, technical: 9, independence: 8, pressure: 8, creativity: 7, workLifeBalance: 6 } },
        { text: "Research alternative strategies that achieve similar results ethically", insight: "Creative problem-solving that serves client needs within your comfort zone", scores: { creativity: 10, technical: 9, collaboration: 9, independence: 8, pressure: 7, workLifeBalance: 5 } }
      ],
      explanation: "Accountants constantly navigate the line between legal and ethical. Building a reputation for integrity matters more than any single client.",
      realityNote: "Aggressive tax strategies are scrutinized increasingly."
    },
    {
      id: "q4",
      scenario: "You find repetitive financial analysis work boring, but it needs to be done accurately. How do you approach it?",
      options: [
        { text: "Create systems and templates to make routine work more efficient", insight: "Process improvement mindset that reduces tedium while maintaining quality", scores: { creativity: 10, technical: 9, independence: 8, pressure: 7, collaboration: 6, workLifeBalance: 7 } },
        { text: "Push through it - not every task will be exciting", insight: "Professional acceptance but may lead to burnout without process improvement", scores: { pressure: 7, technical: 7, independence: 7, collaboration: 5, creativity: 3, workLifeBalance: 5 } },
        { text: "Rush through to get to more interesting work", insight: "Dangerous in accounting - errors in routine work have serious consequences", scores: { technical: -6, pressure: 4, independence: 5, creativity: 3, collaboration: 3, workLifeBalance: 5 } },
        { text: "Question whether accounting is the right fit", insight: "Honest reflection - accounting involves significant repetitive detail work", scores: { pressure: 4, creativity: 5, independence: 6, technical: 5, collaboration: 4, workLifeBalance: 5 } }
      ],
      explanation: "Accounting requires precision in routine tasks. Successful accountants find ways to maintain accuracy while improving efficiency.",
      realityNote: "65% of accounting work is routine analysis. Those who automate advance faster."
    },
    {
      id: "q5",
      scenario: "You discover an error in a tax return you filed last month. The error is in the client's favor. What do you do?",
      options: [
        { text: "Inform client and file amended return promptly", insight: "Professional integrity that protects both client and your license", scores: { technical: 10, collaboration: 10, independence: 9, pressure: 8, creativity: 5, workLifeBalance: 5 } },
        { text: "Keep quiet - client benefited and no one will notice", insight: "Professional misconduct that risks license and legal consequences", scores: { technical: -8, collaboration: -6, independence: -5, pressure: 4, creativity: 2, workLifeBalance: 7 } },
        { text: "Correct it in next year's return without mentioning the error", insight: "Still not proper disclosure - errors should be addressed directly", scores: { technical: 3, collaboration: 2, independence: 3, pressure: 5, creativity: 4, workLifeBalance: 6 } },
        { text: "Review your processes to prevent similar errors", insight: "Good but incomplete - must also correct the current error", scores: { technical: 7, creativity: 7, independence: 7, collaboration: 5, pressure: 6, workLifeBalance: 6 } }
      ],
      explanation: "Errors happen. How you handle them defines your professionalism. Prompt disclosure and correction protect everyone.",
      realityNote: "Tax preparers have legal obligation to correct known errors."
    }
  ],
  scoringGuide: {
    technical: { min: -20, max: 55, weight: 0.25 },
    pressure: { min: -10, max: 50, weight: 0.20 },
    collaboration: { min: -15, max: 55, weight: 0.15 },
    creativity: { min: -5, max: 55, weight: 0.15 },
    independence: { min: -15, max: 55, weight: 0.20 },
    workLifeBalance: { min: -10, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Accountant Potential", message: "Your responses show strong alignment with accounting realities. You demonstrate ethical integrity, attention to detail, and ability to handle deadline pressure." },
    medium: { min: 50, title: "Accounting Possible With Development", message: "You have some aptitudes but may find seasonal intensity or routine detail work challenging. Consider industry accounting for more predictable hours." },
    low: { min: 0, title: "Consider Different Financial Roles", message: "Your responses suggest accounting may not suit you. Consider financial analysis, business consulting, or operations roles." }
  }
};

// Lawyer Quiz
const lawyerQuiz = {
  title: "A Day as a Lawyer",
  description: "Navigate ethical boundaries, client demands, and courtroom pressure. See if you can advocate effectively while upholding justice.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "Your client tells you they're guilty but wants to plead not guilty. What do you do?",
      options: [
        { text: "Defend them vigorously - everyone deserves representation", insight: "Understanding of constitutional duty - defense lawyers protect process not guilt", scores: { technical: 10, pressure: 9, independence: 9, collaboration: 7, creativity: 7, workLifeBalance: 5 } },
        { text: "Refuse to take the case", insight: "May feel right but undermines principle that everyone deserves defense", scores: { independence: 7, technical: 5, collaboration: 3, pressure: 5, creativity: 3, workLifeBalance: 7 } },
        { text: "Encourage them to plead guilty", insight: "May be good advice but must respect client's ultimate decision", scores: { collaboration: 6, technical: 7, independence: 6, pressure: 6, creativity: 5, workLifeBalance: 6 } },
        { text: "Feel conflicted about defending someone you know is guilty", insight: "Normal feeling but defense lawyers must separate personal morality from professional duty", scores: { pressure: -5, independence: 4, technical: 5, collaboration: 5, creativity: 4, workLifeBalance: 3 } }
      ],
      explanation: "Criminal defense is about protecting constitutional rights, not personal morality. Lawyers must separate their role from personal judgment.",
      realityNote: "Every defendant deserves vigorous representation - it's how the adversarial system protects everyone's rights."
    },
    {
      id: "q2",
      scenario: "Opposing counsel is using aggressive, borderline unethical tactics in court. What do you do?",
      options: [
        { text: "Match their aggression - fight fire with fire", insight: "Risks your reputation and may violate professional conduct rules", scores: { pressure: 6, independence: 6, technical: 4, collaboration: -4, creativity: 4, workLifeBalance: 5 } },
        { text: "Stay professional and object when appropriate", insight: "Maintains integrity while protecting client - sustainable approach", scores: { technical: 10, collaboration: 8, pressure: 9, independence: 9, creativity: 6, workLifeBalance: 6 } },
        { text: "Report them to the bar association", insight: "Appropriate for serious violations but may be premature", scores: { technical: 7, independence: 8, collaboration: 4, pressure: 6, creativity: 4, workLifeBalance: 6 } },
        { text: "Feel intimidated by their aggressive approach", insight: "Natural feeling but courtroom advocacy requires composure under pressure", scores: { pressure: -6, collaboration: 4, technical: 4, independence: 3, creativity: 3, workLifeBalance: 3 } }
      ],
      explanation: "Legal practice involves adversarial situations. The best lawyers maintain professionalism while effectively advocating for clients.",
      realityNote: "Judges and juries notice unprofessional behavior. Long-term reputation is built on integrity."
    },
    {
      id: "q3",
      scenario: "You're in the middle of a major case when your child has a school emergency. What do you do?",
      options: [
        { text: "Handle the work emergency first - the case is critical", insight: "May be necessary sometimes but patterns like this lead to family problems", scores: { pressure: 7, technical: 7, independence: 7, collaboration: 4, creativity: 4, workLifeBalance: -7 } },
        { text: "Ask colleague to cover while you handle family emergency", insight: "Professional approach that uses team resources appropriately", scores: { collaboration: 10, workLifeBalance: 9, pressure: 8, technical: 7, independence: 5, creativity: 6 } },
        { text: "Try to handle both simultaneously", insight: "Neither gets full attention - risky for both priorities", scores: { pressure: 5, technical: 4, collaboration: 5, independence: 6, creativity: 5, workLifeBalance: 3 } },
        { text: "Feel guilty no matter which choice you make", insight: "Common lawyer experience - work-life conflict is a major career challenge", scores: { pressure: -4, workLifeBalance: -3, collaboration: 5, technical: 5, independence: 4, creativity: 4 } }
      ],
      explanation: "Law is demanding and often conflicts with personal life. Successful lawyers build support systems and set boundaries.",
      realityNote: "Lawyers report highest work-family conflict of any profession."
    },
    {
      id: "q4",
      scenario: "A client asks you to pursue a legal strategy you believe is technically valid but morally wrong. What do you do?",
      options: [
        { text: "Pursue it - your job is to represent their interests within the law", insight: "Technically correct but may conflict with your values over time", scores: { technical: 7, independence: 5, collaboration: 6, pressure: 6, creativity: 4, workLifeBalance: 5 } },
        { text: "Explain your concerns and suggest alternative approaches", insight: "Counselor role that serves client while maintaining your integrity", scores: { collaboration: 10, technical: 9, independence: 9, creativity: 9, pressure: 8, workLifeBalance: 6 } },
        { text: "Refuse and let them find another lawyer", insight: "Protects your values but may abandon client inappropriately", scores: { independence: 8, workLifeBalance: 7, technical: 5, collaboration: 3, pressure: 5, creativity: 3 } },
        { text: "Feel torn between duty to client and personal ethics", insight: "Common dilemma - lawyers must develop framework for these decisions", scores: { pressure: -3, independence: 5, technical: 5, collaboration: 5, creativity: 4, workLifeBalance: 4 } }
      ],
      explanation: "Lawyers are counselors, not just technicians. The best advise clients on broader implications while respecting their autonomy.",
      realityNote: "Lawyers who maintain clear ethical boundaries report higher career satisfaction."
    },
    {
      id: "q5",
      scenario: "You lose a case you were confident about winning. Your client is devastated. How do you respond?",
      options: [
        { text: "Explain options for appeal and next steps professionally", insight: "Professional response that maintains client relationship and explores remedies", scores: { technical: 9, collaboration: 9, pressure: 8, independence: 8, creativity: 7, workLifeBalance: 6 } },
        { text: "Take it personally and question your abilities", insight: "Understandable but lawyers lose cases - resilience is essential", scores: { pressure: -6, workLifeBalance: -4, collaboration: 5, technical: 5, independence: 4, creativity: 3 } },
        { text: "Blame external factors - judge was biased, jury was wrong", insight: "Deflecting responsibility damages credibility and misses learning", scores: { collaboration: -3, technical: 3, independence: 5, pressure: 4, creativity: 2, workLifeBalance: 6 } },
        { text: "Analyze what went wrong to improve for future cases", insight: "Growth mindset that turns losses into learning opportunities", scores: { technical: 10, creativity: 8, independence: 9, collaboration: 7, pressure: 8, workLifeBalance: 5 } }
      ],
      explanation: "Even excellent lawyers lose cases. How you handle losses - professionally and with learning orientation - defines career longevity.",
      realityNote: "Trial lawyers lose 30-50% of cases on average. Resilience and continuous improvement are more important than winning streaks."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 55, weight: 0.20 },
    pressure: { min: -20, max: 50, weight: 0.25 },
    collaboration: { min: -10, max: 55, weight: 0.15 },
    creativity: { min: -5, max: 50, weight: 0.15 },
    independence: { min: -5, max: 55, weight: 0.20 },
    workLifeBalance: { min: -15, max: 45, weight: 0.05 }
  },
  results: {
    high: { min: 70, title: "Strong Lawyer Potential", message: "Your responses show strong alignment with legal practice realities. You demonstrate ethical judgment, advocacy skills, and resilience under pressure." },
    medium: { min: 50, title: "Legal Career Possible With Development", message: "You have some aptitudes for law but may find the ethical dilemmas or adversarial nature challenging. Consider law school clinics and internships to test fit." },
    low: { min: 0, title: "Consider Different Advocacy Roles", message: "Your responses suggest legal practice may not suit you. Consider mediation, compliance, policy research, or paralegal work." }
  }
};

// Map of career titles to their quizzes
const quizMappings = [
  { title: "Software Developer", quiz: softwareDeveloperQuiz },
  { title: "Teacher", quiz: teacherQuiz },
  { title: "Nurse", quiz: nurseQuiz },
  { title: "Business Analyst", quiz: businessAnalystQuiz },
  { title: "Marketing Manager", quiz: marketingManagerQuiz },
  { title: "Data Scientist", quiz: dataScientistQuiz },
  { title: "Graphic Designer", quiz: graphicDesignerQuiz },
  { title: "Civil Engineer", quiz: civilEngineerQuiz },
  { title: "Accountant", quiz: accountantQuiz },
  { title: "Lawyer", quiz: lawyerQuiz },
];

export const seedAllQuizzes = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const mapping of quizMappings) {
      let career = await ctx.db
        .query("careers")
        .filter((q) => q.eq(q.field("title"), mapping.title))
        .first();

      if (!career) {
        const allCareers = await ctx.db.query("careers").collect();
        const found = allCareers.find(
          (c) => c.title.toLowerCase().includes(mapping.title.toLowerCase())
        );
        career = found ?? null;
      }

      if (career) {
        await ctx.db.patch(career._id, {
          realityQuiz: mapping.quiz,
        });
        results.push({ title: mapping.title, status: "success", matchedCareer: career.title });
      } else {
        results.push({ title: mapping.title, status: "not_found", matchedCareer: null });
      }
    }

    return {
      message: "Quiz seeding complete",
      results,
      summary: {
        total: results.length,
        success: results.filter((r) => r.status === "success").length,
        notFound: results.filter((r) => r.status === "not_found").length,
      },
    };
  },
});

// List careers to find exact titles for mapping
export const listCareerTitles = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers.map(c => ({ id: c._id, title: c.title }));
  },
});

// Create missing careers for quizzes
export const createMissingCareers = mutation({
  args: {},
  handler: async (ctx) => {
    const missingCareers = [
      {
        title: "Business Analyst",
        category: "Business & Finance",
        shortDescription: "Bridge business needs and technology solutions through requirements analysis and stakeholder collaboration.",
        fullDescription: "Business Analysts serve as the crucial link between business stakeholders and technical teams. They analyze business processes, gather requirements, document specifications, and ensure solutions meet organizational needs. BAs work across industries helping companies improve efficiency, implement new systems, and drive digital transformation.",
        videoUrl: "https://www.youtube.com/watch?v=example",
        videoThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        salaryMin: 4000000,
        salaryMax: 12000000,
        currency: "RWF",
        requiredEducation: "Bachelor's degree in Business, IT, or related field",
        requiredSkills: ["Requirements Analysis", "Stakeholder Management", "Process Modeling", "Data Analysis", "Communication", "Problem Solving"],
        careerPath: [
          { stage: "Junior Business Analyst", duration: "1-2 years", description: "Learn requirements gathering and documentation basics" },
          { stage: "Business Analyst", duration: "2-4 years", description: "Lead requirement sessions and create specifications" },
          { stage: "Senior Business Analyst", duration: "3-5 years", description: "Manage complex projects and mentor juniors" },
          { stage: "Lead BA / Product Owner", duration: "5+ years", description: "Strategic planning and team leadership" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: { realistic: 30, investigative: 70, artistic: 40, social: 65, enterprising: 60, conventional: 75 },
        valueProfile: { impact: 70, income: 65, autonomy: 55, balance: 60, growth: 75, stability: 70 },
        personalityProfile: { openness: 65, conscientiousness: 80, extraversion: 60 },
        workEnvironment: { teamSize: "small", pace: "moderate", structure: "balanced" }
      },
      {
        title: "Accountant",
        category: "Business & Finance",
        shortDescription: "Manage financial records, ensure compliance, and provide insights for business decision-making.",
        fullDescription: "Accountants are essential to every organization, managing financial records, preparing tax returns, ensuring regulatory compliance, and providing financial insights. They work in public accounting firms, corporations, government agencies, and as independent consultants. The profession offers stability and clear career progression.",
        videoUrl: "https://www.youtube.com/watch?v=example",
        videoThumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
        salaryMin: 3500000,
        salaryMax: 15000000,
        currency: "RWF",
        requiredEducation: "Bachelor's degree in Accounting or Finance, CPA certification preferred",
        requiredSkills: ["Financial Reporting", "Tax Preparation", "Auditing", "Excel", "Attention to Detail", "Analytical Skills"],
        careerPath: [
          { stage: "Junior Accountant", duration: "1-2 years", description: "Bookkeeping and basic financial tasks" },
          { stage: "Staff Accountant", duration: "2-3 years", description: "Prepare financial statements and tax returns" },
          { stage: "Senior Accountant", duration: "3-5 years", description: "Complex accounting and team supervision" },
          { stage: "Accounting Manager / Controller", duration: "5+ years", description: "Oversee accounting department and strategy" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: { realistic: 40, investigative: 65, artistic: 20, social: 45, enterprising: 55, conventional: 90 },
        valueProfile: { impact: 50, income: 70, autonomy: 45, balance: 55, growth: 60, stability: 85 },
        personalityProfile: { openness: 45, conscientiousness: 90, extraversion: 40 },
        workEnvironment: { teamSize: "small", pace: "deadline-driven", structure: "structured" }
      },
      {
        title: "Lawyer",
        category: "Legal & Government",
        shortDescription: "Advocate for clients, interpret laws, and provide legal counsel across various practice areas.",
        fullDescription: "Lawyers advise and represent individuals, businesses, and government agencies on legal matters. They research legal issues, draft documents, negotiate settlements, and argue cases in court. Lawyers can specialize in areas like corporate law, criminal defense, family law, intellectual property, or human rights.",
        videoUrl: "https://www.youtube.com/watch?v=example",
        videoThumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        salaryMin: 5000000,
        salaryMax: 25000000,
        currency: "RWF",
        requiredEducation: "Law degree (LLB) and Bar admission",
        requiredSkills: ["Legal Research", "Writing", "Negotiation", "Critical Thinking", "Public Speaking", "Client Management"],
        careerPath: [
          { stage: "Pupil / Intern", duration: "1-2 years", description: "Legal training under supervision" },
          { stage: "Associate Lawyer", duration: "2-5 years", description: "Handle cases under partner guidance" },
          { stage: "Senior Associate", duration: "5-8 years", description: "Lead cases and supervise juniors" },
          { stage: "Partner / Solo Practitioner", duration: "8+ years", description: "Own practice or firm partnership" }
        ],
        relatedCareerIds: [],
        views: 0,
        saves: 0,
        interestProfile: { realistic: 25, investigative: 75, artistic: 50, social: 70, enterprising: 80, conventional: 65 },
        valueProfile: { impact: 80, income: 85, autonomy: 70, balance: 35, growth: 75, stability: 65 },
        personalityProfile: { openness: 60, conscientiousness: 85, extraversion: 65 },
        workEnvironment: { teamSize: "small", pace: "intense", structure: "flexible" }
      }
    ];

    const results = [];

    for (const career of missingCareers) {
      // Check if career already exists
      const existing = await ctx.db
        .query("careers")
        .filter((q) => q.eq(q.field("title"), career.title))
        .first();

      if (existing) {
        results.push({ title: career.title, status: "already_exists", id: existing._id });
      } else {
        const id = await ctx.db.insert("careers", career);
        results.push({ title: career.title, status: "created", id });
      }
    }

    return { message: "Missing careers creation complete", results };
  },
});

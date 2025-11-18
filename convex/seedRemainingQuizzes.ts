/**
 * Seed Reality Quizzes for remaining 11 careers (Batch 1: First 3 careers)
 * Run with: npx convex run seedRemainingQuizzes:addQuizzesBatch1
 */

import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Medical Doctor Quiz
const medicalDoctorQuiz = {
  title: "A Day as a Medical Doctor",
  description: "Navigate life-or-death decisions, diagnostic challenges, and patient care under pressure. See if you have what it takes for medicine.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "It's 2 AM. You're 18 hours into your shift. A patient comes in with chest pain that could be a heart attack or anxiety. Test results will take 30 minutes. What do you do?",
      options: [
        {
          text: "Treat as potential heart attack immediately - start protocols, order tests, monitor closely, explain to patient what's happening",
          insight: "You err on the side of caution with critical conditions",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 9, workLifeBalance: -5 }
        },
        {
          text: "Take a detailed history, do a thorough physical exam, then decide on urgency level based on clinical judgment",
          insight: "You balance thoroughness with efficiency",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 5 }
        },
        {
          text: "Order tests but wait for results before starting aggressive treatment - could be anxiety and we don't want to over-treat",
          insight: "You want data before acting",
          scores: { technical: 6, pressure: 5, collaboration: 6, creativity: 5, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "After 18 hours, I shouldn't be making critical decisions. Call for backup or hand off to a fresher doctor",
          insight: "You recognize your limitations when exhausted",
          scores: { technical: 8, pressure: 7, collaboration: 10, creativity: 6, independence: 5, workLifeBalance: 8 }
        }
      ],
      explanation: "Chest pain requires immediate assessment and treatment as if cardiac until proven otherwise. Fatigue is real, but you must maintain clinical judgment.",
      realityNote: "Doctors work 24+ hour shifts regularly in training. 60% of medical errors happen in the last 6 hours of long shifts."
    },
    {
      id: "q2",
      scenario: "A patient is dying. The family wants everything done. You know more intervention will only cause suffering without changing the outcome. How do you handle this?",
      options: [
        {
          text: "Have a compassionate conversation explaining medical reality, what 'everything' actually means, help them understand that comfort care honors their loved one",
          insight: "You guide families through difficult decisions with empathy",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Follow the family's wishes - it's their decision and they need time to accept reality",
          insight: "You defer to family preferences",
          scores: { technical: 5, pressure: 7, collaboration: 8, creativity: 5, independence: 4, workLifeBalance: 7 }
        },
        {
          text: "Provide aggressive treatment but explain you're doing it because they requested it, not because you recommend it",
          insight: "You comply but distance yourself from the decision",
          scores: { technical: 6, pressure: 6, collaboration: 6, creativity: 5, independence: 5, workLifeBalance: 7 }
        },
        {
          text: "Refuse to provide futile treatment - explain your medical obligation is to the patient, not the family's emotions",
          insight: "You enforce medical ethics firmly",
          scores: { technical: 8, pressure: 8, collaboration: 3, creativity: 5, independence: 10, workLifeBalance: 7 }
        }
      ],
      explanation: "End-of-life care requires balancing medical reality with family emotions. Great doctors guide without forcing.",
      realityNote: "These conversations happen weekly in most specialties. How you handle them determines whether families trust you or sue you."
    },
    {
      id: "q3",
      scenario: "You misdiagnosed a patient yesterday. They came back worse. The correct diagnosis is now clear. What do you do?",
      options: [
        {
          text: "Acknowledge the missed diagnosis openly, apologize, explain what you'll do now, document everything, inform your supervising physician",
          insight: "You own mistakes transparently",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 5 }
        },
        {
          text: "Treat correctly now but don't draw attention to the previous error - focus on moving forward",
          insight: "You prioritize current treatment over past mistakes",
          scores: { technical: 7, pressure: 6, collaboration: 5, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Explain that diagnoses evolve as conditions develop - present it as disease progression rather than missed diagnosis",
          insight: "You reframe mistakes as evolution",
          scores: { technical: 5, pressure: 7, collaboration: 5, creativity: 7, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Review with colleagues what you missed and why, learn from it, then treat the patient correctly going forward",
          insight: "You learn systematically from errors",
          scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: 6 }
        }
      ],
      explanation: "Every doctor misses diagnoses. Transparency and learning prevent future mistakes and build patient trust.",
      realityNote: "You will make diagnostic errors. Studies show average doctors miss 10-15% of diagnoses. How you handle mistakes matters more than perfection."
    },
    {
      id: "q4",
      scenario: "A patient refuses life-saving treatment because of religious beliefs. They're competent and understand the consequences. What's your response?",
      options: [
        {
          text: "Respect their autonomy, ensure they truly understand consequences and alternatives, document thoroughly, provide the best care possible within their constraints",
          insight: "You honor patient autonomy",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Try every persuasive approach to change their mind - it's your job to save lives",
          insight: "You prioritize medical outcomes over autonomy",
          scores: { technical: 7, pressure: 8, collaboration: 5, creativity: 6, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Consult ethics committee and legal team before proceeding - this is too risky to handle alone",
          insight: "You seek institutional support",
          scores: { technical: 8, pressure: 7, collaboration: 9, creativity: 6, independence: 4, workLifeBalance: 7 }
        },
        {
          text: "This is emotionally difficult - I'd request another doctor take over who can respect their decision better",
          insight: "You recognize when values conflict",
          scores: { technical: 7, pressure: 6, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 8 }
        }
      ],
      explanation: "Patient autonomy is fundamental. Doctors must provide care that respects patient values, even when they disagree.",
      realityNote: "You'll care for patients whose choices you disagree with. Respecting autonomy while providing excellent care is the ethical foundation of medicine."
    },
    {
      id: "q5",
      scenario: "You're in a rural clinic. A child needs emergency surgery you can perform, but you're not a surgeon. The nearest hospital is 3 hours away. What do you do?",
      options: [
        {
          text: "Stabilize as much as possible, call the receiving hospital, arrange fastest transport, prepare family for what's ahead",
          insight: "You work within your scope",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 8, independence: 7, workLifeBalance: 6 }
        },
        {
          text: "Attempt the surgery - I have basic surgical training and waiting 3 hours could be fatal",
          insight: "You exceed scope in emergencies",
          scores: { technical: 7, pressure: 10, collaboration: 6, creativity: 8, independence: 10, workLifeBalance: 5 }
        },
        {
          text: "Video call a surgeon to guide me through the procedure while I operate",
          insight: "You seek creative solutions",
          scores: { technical: 9, pressure: 10, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 5 }
        },
        {
          text: "This is beyond my capability - send them immediately and hope they make it",
          insight: "You acknowledge limitations strictly",
          scores: { technical: 6, pressure: 6, collaboration: 7, creativity: 5, independence: 5, workLifeBalance: 7 }
        }
      ],
      explanation: "Rural medicine requires balancing scope of practice with emergency needs. The best answer depends on specific clinical circumstances.",
      realityNote: "Rural doctors regularly face situations beyond their specialty training. Creative problem-solving and knowing your limits both matter."
    },
    {
      id: "q6",
      scenario: "You haven't seen your family in 3 days due to hospital shifts. Your daughter's birthday is today. You're supposed to be off, but the hospital is understaffed and calling you in. What do you do?",
      options: [
        {
          text: "Go to the birthday. I've sacrificed enough. The hospital will figure it out.",
          insight: "You maintain firm boundaries",
          scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 6, independence: 8, workLifeBalance: 10 }
        },
        {
          text: "Go in for a few hours, explain to my daughter, make it up to her later - patients need me",
          insight: "You prioritize patients over family",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 5, independence: 7, workLifeBalance: -5 }
        },
        {
          text: "Tell the hospital I'll come in after the birthday celebration - compromise between both responsibilities",
          insight: "You negotiate boundaries",
          scores: { technical: 8, pressure: 9, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Go in to work. Medicine requires sacrifice. My daughter will understand someday.",
          insight: "You accept medicine's demands fully",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 4, independence: 6, workLifeBalance: -8 }
        }
      ],
      explanation: "Medicine is notorious for work-life conflict. How you handle boundaries affects your career sustainability and family relationships.",
      realityNote: "Doctor divorce rates are 10-20% higher than average. Burnout affects 50% of physicians. Boundaries aren't selfish - they're survival."
    },
    {
      id: "q7",
      scenario: "A pharmaceutical rep offers to sponsor your attendance at a conference in Hawaii, including 5-star hotel. They want 15 minutes to present their new drug. How do you respond?",
      options: [
        {
          text: "Decline. Even if legal, it creates bias. I'll pay my own way or attend local conferences.",
          insight: "You avoid conflicts of interest strictly",
          scores: { technical: 10, pressure: 7, collaboration: 7, creativity: 6, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Accept if the conference content is valuable and the drug is relevant to my practice - I can evaluate evidence objectively",
          insight: "You trust your objectivity",
          scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 7, independence: 7, workLifeBalance: 8 }
        },
        {
          text: "Check hospital policy and ethics guidelines before deciding",
          insight: "You follow institutional rules",
          scores: { technical: 8, pressure: 6, collaboration: 8, creativity: 6, independence: 5, workLifeBalance: 7 }
        },
        {
          text: "Accept but disclose the sponsorship to patients when prescribing that drug",
          insight: "You accept with transparency",
          scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 8, independence: 7, workLifeBalance: 8 }
        }
      ],
      explanation: "Pharmaceutical industry relationships are heavily scrutinized. Even legal arrangements can bias prescribing and erode patient trust.",
      realityNote: "Studies show even small gifts from pharma reps influence prescribing. The best doctors minimize these relationships entirely."
    }
  ],
  scoringGuide: {
    technical: { min: -10, max: 70, weight: 0.25 },
    pressure: { min: -15, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.15 },
    creativity: { min: -5, max: 60, weight: 0.10 },
    independence: { min: -5, max: 70, weight: 0.15 },
    workLifeBalance: { min: -25, max: 60, weight: 0.10 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Medical Doctor Potential",
      message: "You demonstrate excellent clinical judgment, ethical reasoning, and resilience under pressure. You understand that medicine requires both technical excellence and human compassion, plus the ability to make difficult decisions with incomplete information. The work-life challenges are real - make sure you're ready for them."
    },
    medium: {
      min: 50,
      title: "Medicine Possible But Consider Carefully",
      message: "You have some medical aptitudes but may find the pressure, hours, or ethical dilemmas challenging. Consider whether you're drawn to the prestige or the actual daily realities. Shadowing doctors for extended periods before committing is essential. Alternative paths: nursing, physician assistant, medical research, or public health."
    },
    low: {
      min: 0,
      title: "Medicine May Not Be Right For You",
      message: "Your responses suggest you'd struggle with core medical realities: life-or-death pressure, extreme hours, difficult patient conversations, and constant uncertainty. This doesn't mean you can't help people - consider healthcare administration, medical technology, pharmacy, therapy, or public health where you can make an impact without clinical pressure."
    }
  }
};

// Agricultural Officer Quiz
const agriculturalOfficerQuiz = {
  title: "A Day as an Agricultural Officer",
  description: "Navigate crop failures, farmer education, and rural development challenges. See if you can balance science with community needs.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "A cooperative of 50 farmers planted the maize variety you recommended. Unexpected weather caused 40% crop failure. They're angry and blaming you. What do you do?",
      options: [
        {
          text: "Meet with them immediately, acknowledge their loss, explain the weather factors, help them access emergency relief, adjust recommendations for next season",
          insight: "You take responsibility and provide solutions",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 5 }
        },
        {
          text: "Explain that agriculture has inherent risks - the recommendation was sound based on typical weather patterns",
          insight: "You defend your technical judgment",
          scores: { technical: 8, pressure: 6, collaboration: 4, creativity: 5, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Help them document losses for insurance claims and government relief programs",
          insight: "You focus on practical recovery",
          scores: { technical: 7, pressure: 8, collaboration: 9, creativity: 8, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Analyze what went wrong technically, share findings with all farmers in the region to prevent similar losses",
          insight: "You turn failure into learning",
          scores: { technical: 10, pressure: 8, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 6 }
        }
      ],
      explanation: "Agricultural extension requires building trust through both successes and failures. Farmers risk their livelihoods on your advice.",
      realityNote: "Climate change makes agricultural recommendations increasingly uncertain. Your credibility depends on how you handle failures, not just successes."
    },
    {
      id: "q2",
      scenario: "You're promoting modern farming techniques, but elders in the community resist, saying traditional methods work fine. Young farmers are caught between. What's your approach?",
      options: [
        {
          text: "Organize demonstration plots showing both methods side-by-side, let results speak, respect traditional knowledge while showing new possibilities",
          insight: "You bridge tradition and innovation",
          scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Work with young farmers privately - they're more open to change and will eventually convince elders through success",
          insight: "You focus on early adopters",
          scores: { technical: 8, pressure: 7, collaboration: 6, creativity: 8, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Study traditional methods first - they might contain valuable wisdom modern agriculture overlooks",
          insight: "You respect indigenous knowledge",
          scores: { technical: 9, pressure: 7, collaboration: 9, creativity: 9, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Present data on yield improvements - numbers and economics should convince them",
          insight: "You rely on data persuasion",
          scores: { technical: 9, pressure: 7, collaboration: 5, creativity: 6, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Agricultural extension is about cultural change, not just technical transfer. Respecting existing knowledge while introducing improvements is key.",
      realityNote: "Traditional farming practices often contain generations of adaptation. The best officers blend indigenous wisdom with modern science."
    },
    {
      id: "q3",
      scenario: "A pesticide company offers you a 'consultancy fee' to recommend their product to farmers. It's effective but more expensive than alternatives. What do you do?",
      options: [
        {
          text: "Decline immediately - taking money from companies whose products I recommend is unethical",
          insight: "You maintain strict ethics",
          scores: { technical: 10, pressure: 8, collaboration: 8, creativity: 6, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Accept if the product is genuinely best, but disclose the relationship to farmers when recommending it",
          insight: "You accept with transparency",
          scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 8 }
        },
        {
          text: "Report the offer to my supervisor - this creates conflict of interest",
          insight: "You escalate ethical concerns",
          scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 6, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Decline but ask them to sponsor farmer training instead - that benefits everyone",
          insight: "You redirect to ethical alternatives",
          scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Agricultural officers wield significant influence over farmer purchasing decisions. Maintaining independence is crucial for trust.",
      realityNote: "Corruption in agricultural extension is common globally. Officers who resist it become trusted advisors; those who don't become salespeople."
    },
    {
      id: "q4",
      scenario: "You discover farmers are using a banned pesticide because it's cheaper and more effective. Reporting them means fines they can't afford. What do you do?",
      options: [
        {
          text: "Educate them on health and environmental risks, help them find legal alternatives or subsidies, give them time to transition before reporting",
          insight: "You balance enforcement with support",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Report immediately - banned pesticides are banned for good reason and I have legal obligations",
          insight: "You enforce rules strictly",
          scores: { technical: 8, pressure: 8, collaboration: 4, creativity: 5, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Ignore it - they're struggling economically and I'm here to help them, not punish them",
          insight: "You prioritize relationships over rules",
          scores: { technical: 5, pressure: 5, collaboration: 8, creativity: 5, independence: 5, workLifeBalance: 8 }
        },
        {
          text: "Work with government programs to subsidize legal alternatives so compliance becomes affordable",
          insight: "You address root causes",
          scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Enforcement without support creates antagonism. Great officers help farmers comply rather than just punishing non-compliance.",
      realityNote: "Farmers often use banned substances out of economic desperation. Creating affordable legal alternatives is more effective than fines."
    },
    {
      id: "q5",
      scenario: "Your district has funding for either irrigation infrastructure OR a storage facility. Both are needed but budget allows only one. How do you decide?",
      options: [
        {
          text: "Analyze which investment has higher economic impact, survey farmers on priorities, present data-driven recommendation to district leadership",
          insight: "You use systematic analysis",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Choose irrigation - increasing production is more important than storage",
          insight: "You prioritize production",
          scores: { technical: 7, pressure: 7, collaboration: 6, creativity: 6, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Choose storage - farmers already produce enough, but post-harvest losses are the real problem",
          insight: "You prioritize loss prevention",
          scores: { technical: 8, pressure: 7, collaboration: 6, creativity: 7, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Seek additional funding sources or phased implementation so both can be done over time",
          insight: "You find creative alternatives",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        }
      ],
      explanation: "Development projects require prioritizing limited resources. The best decisions combine data, community input, and long-term thinking.",
      realityNote: "Rural development is constant triage. Officers who involve communities in priority-setting get better outcomes and buy-in."
    },
    {
      id: "q6",
      scenario: "It's planting season - your busiest time. You're in the field 6 days a week, visiting farms, training sessions, and meetings. Your family barely sees you. How do you handle this?",
      options: [
        {
          text: "Accept that agricultural work is seasonal - push hard during planting and harvest, compensate with more family time during slow seasons",
          insight: "You embrace seasonal rhythms",
          scores: { technical: 8, pressure: 9, collaboration: 8, creativity: 7, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Set firm boundaries - work 5 days per week maximum regardless of season",
          insight: "You maintain consistent boundaries",
          scores: { technical: 6, pressure: 6, collaboration: 6, creativity: 6, independence: 8, workLifeBalance: 10 }
        },
        {
          text: "Train farmer leaders to help with extension work, delegate more so the system doesn't depend entirely on me",
          insight: "You build sustainable systems",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 8 }
        },
        {
          text: "This is too much - I need to reconsider if agricultural extension is sustainable long-term",
          insight: "You question career fit",
          scores: { technical: 5, pressure: 4, collaboration: 6, creativity: 5, independence: 5, workLifeBalance: 8 }
        }
      ],
      explanation: "Agricultural work follows nature's calendar, not office hours. The intensity varies seasonally.",
      realityNote: "Peak agricultural seasons demand intense work. Officers who build farmer networks can share the load; those who don't burn out."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 65, weight: 0.20 },
    pressure: { min: -5, max: 60, weight: 0.15 },
    collaboration: { min: -5, max: 70, weight: 0.25 },
    creativity: { min: -5, max: 65, weight: 0.20 },
    independence: { min: -5, max: 65, weight: 0.15 },
    workLifeBalance: { min: -5, max: 60, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Agricultural Officer Potential",
      message: "You show excellent aptitude for agricultural extension: technical knowledge, cultural sensitivity, ethical judgment, and practical problem-solving. You understand this work is about empowering communities, not just transferring technology. The field work and seasonal intensity are real - but so is the impact on food security and rural livelihoods."
    },
    medium: {
      min: 50,
      title: "Agricultural Work Possible With Right Role",
      message: "You have some strengths but may find the community engagement or field intensity challenging. Consider agricultural research, policy, agribusiness management, or specialized technical roles where you can contribute without constant field presence."
    },
    low: {
      min: 0,
      title: "Consider Different Agricultural Roles",
      message: "Your responses suggest field-based extension may not suit you. The work requires comfort with rural communities, seasonal intensity, ethical complexity, and seeing slow change over years. Consider agricultural research, food science, supply chain management, or agricultural technology development."
    }
  }
};

// Tourism & Hospitality Manager Quiz
const tourismHospitalityManagerQuiz = {
  title: "A Day as a Tourism & Hospitality Manager",
  description: "Navigate demanding guests, staff challenges, and crisis management. See if you can deliver exceptional experiences under pressure.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "An important guest is furious because their room wasn't ready at check-in despite a guaranteed early arrival. They're threatening a terrible review. You're fully booked with no upgrade options. What do you do?",
      options: [
        {
          text: "Apologize sincerely, offer immediate compensation (meal voucher, spa service), personally ensure their room is ready ASAP with welcome amenity, follow up later to ensure satisfaction",
          insight: "You turn problems into opportunities",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Explain that check-in is at 3 PM per policy, but offer to store luggage and provide lounge access until room is ready",
          insight: "You stick to policies with minor flexibility",
          scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Apologize and offer a discount on their current stay plus future visit incentive",
          insight: "You use financial compensation",
          scores: { technical: 7, pressure: 8, collaboration: 7, creativity: 6, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Find a nearby partner hotel of equal quality, arrange their immediate check-in there at our expense, plus dinner on us",
          insight: "You solve problems creatively",
          scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 6 }
        }
      ],
      explanation: "Hospitality is about recovery as much as prevention. How you handle problems determines whether guests forgive or destroy your reputation.",
      realityNote: "Online reviews can make or break businesses. Managers who turn angry guests into advocates are worth their weight in gold."
    },
    {
      id: "q2",
      scenario: "During peak tourist season, two of your best servers quit suddenly after a conflict with the head chef. You're understaffed and quality is suffering. What's your approach?",
      options: [
        {
          text: "Immediately address the chef's behavior, hire temporary staff, personally work the floor during peak times, implement conflict resolution process",
          insight: "You tackle root causes while managing crisis",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: -5 }
        },
        {
          text: "Focus on hiring replacements quickly - staff turnover is normal in hospitality",
          insight: "You accept high turnover",
          scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Investigate what happened with the chef and take corrective action if needed - can't afford to lose more staff",
          insight: "You prioritize staff retention",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Reduce seating capacity temporarily rather than deliver poor service - protect reputation over revenue",
          insight: "You protect quality standards",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Staff conflicts destroy service quality and create turnover spirals. Great managers address culture problems, not just hiring needs.",
      realityNote: "Kitchen-floor conflicts are legendary in hospitality. Managers who let toxic staff stay lose entire teams."
    },
    {
      id: "q3",
      scenario: "A tour group is unhappy because weather ruined the outdoor activities they specifically booked for. They want refunds. This is beyond your control. How do you handle it?",
      options: [
        {
          text: "Empathize genuinely, organize alternative indoor experiences, offer partial credit toward future visit, go above and beyond to create new memorable moments",
          insight: "You create value despite circumstances",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Explain that weather is beyond control per terms & conditions, offer to reschedule outdoor activities if they extend their stay",
          insight: "You cite policies",
          scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Provide full refund for the affected activities - keeping them happy is worth more than fighting over money",
          insight: "You prioritize satisfaction over policy",
          scores: { technical: 7, pressure: 7, collaboration: 9, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Survey what they're most interested in and create a customized 'Plan B' experience that might be even better",
          insight: "You turn disappointment into opportunity",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        }
      ],
      explanation: "Tourism involves uncontrollable factors. The best managers create memorable experiences regardless of circumstances.",
      realityNote: "Guests remember how you responded to problems more than the problems themselves. Service recovery is a core hospitality skill."
    },
    {
      id: "q4",
      scenario: "You discover your front desk staff has been accepting cash 'tips' to give certain guests priority upgrades. This violates policy and fairness. What do you do?",
      options: [
        {
          text: "Investigate thoroughly, terminate those involved, implement checks and balances to prevent future corruption, address team about ethics",
          insight: "You enforce integrity firmly",
          scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Institute clear formal upgrade policies and communicate them to staff - prevent future issues without punishing past behavior",
          insight: "You fix systems going forward",
          scores: { technical: 8, pressure: 7, collaboration: 7, creativity: 8, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Create an official upgrade fee system so the revenue comes to the business, not individual pockets",
          insight: "You institutionalize the practice",
          scores: { technical: 7, pressure: 6, collaboration: 6, creativity: 8, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Have private conversations with those involved, warn them, give one chance to stop",
          insight: "You handle it quietly",
          scores: { technical: 6, pressure: 7, collaboration: 8, creativity: 6, independence: 7, workLifeBalance: 7 }
        }
      ],
      explanation: "Small corruptions destroy team culture and guest trust. How you handle them sets the ethical tone for your entire operation.",
      realityNote: "Cash businesses create temptation. Managers who tolerate small theft eventually face large theft. Zero tolerance works."
    },
    {
      id: "q5",
      scenario: "A major holiday weekend is approaching. You're projected to be over capacity with bookings. The owner is pressuring you to accept more reservations for revenue. What do you do?",
      options: [
        {
          text: "Hold firm on capacity limits - overcommitting destroys service quality and creates nightmare scenarios. Show owner the math on reputation risk.",
          insight: "You protect long-term reputation",
          scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Accept overbookings with calculated risk - most hotels do this, some cancellations are expected",
          insight: "You follow industry practice",
          scores: { technical: 7, pressure: 8, collaboration: 7, creativity: 7, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Propose premium pricing for remaining spots rather than quantity - increase revenue through value not volume",
          insight: "You find creative alternatives",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Accept the additional bookings - owner's decision overrides my concerns",
          insight: "You defer to authority",
          scores: { technical: 5, pressure: 6, collaboration: 6, creativity: 4, independence: 3, workLifeBalance: 7 }
        }
      ],
      explanation: "Capacity management balances revenue pressure with service sustainability. Overcommitting creates crises that damage long-term success.",
      realityNote: "Short-term revenue pressure is constant in hospitality. Managers who sacrifice quality for occupancy eventually lose both."
    },
    {
      id: "q6",
      scenario: "It's Christmas Day. Your family is waiting for you. The hotel is full and a major plumbing issue just flooded three guest rooms. What do you do?",
      options: [
        {
          text: "Stay and manage the crisis - relocate affected guests, coordinate repairs, ensure everyone's taken care of. Family will understand.",
          insight: "You prioritize work emergencies",
          scores: { technical: 9, pressure: 10, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: -8 }
        },
        {
          text: "Get the situation stabilized, delegate to assistant manager with clear instructions, check in remotely - trust your team",
          insight: "You balance delegation and responsibility",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Let my on-duty manager handle it - I've trained them for this and I deserve personal time",
          insight: "You maintain firm boundaries",
          scores: { technical: 7, pressure: 6, collaboration: 7, creativity: 7, independence: 7, workLifeBalance: 10 }
        },
        {
          text: "Handle the immediate guest relocations remotely while staff manages repairs, stay available but don't come in",
          insight: "You stay connected remotely",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 8, independence: 7, workLifeBalance: 7 }
        }
      ],
      explanation: "Hospitality operates 24/7/365. How you handle work-life integration during crises affects career sustainability and family relationships.",
      realityNote: "Emergencies don't respect holidays. Managers with strong teams can delegate; those without become on-call forever. Build your bench."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 65, weight: 0.15 },
    pressure: { min: -10, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.20 },
    independence: { min: -5, max: 65, weight: 0.15 },
    workLifeBalance: { min: -20, max: 50, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Tourism & Hospitality Manager Potential",
      message: "You demonstrate excellent hospitality instincts: service recovery, crisis management, team leadership, and creative problem-solving. You understand that this industry is about creating exceptional experiences despite constant challenges. The hours are demanding and the pressure is real - but if you love creating joy for others, this can be incredibly rewarding."
    },
    medium: {
      min: 50,
      title: "Hospitality Possible in Right Setting",
      message: "You have some hospitality aptitudes but may find the 24/7 nature or demanding guests challenging. Consider specialized roles like event planning, travel consulting, hotel sales, or tourism marketing where you can contribute without frontline operational pressure."
    },
    low: {
      min: 0,
      title: "Consider Different Service Roles",
      message: "Your responses suggest hospitality management may not suit you. The work requires thriving under constant pressure, dealing with difficult people gracefully, and sacrificing personal time during peak seasons. Consider corporate roles, B2B services, or industries with more predictable hours where you can excel without hospitality's unique demands."
    }
  }
};

// Export mutation to add these quizzes
export const addQuizzesBatch1 = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    // Career ID mapping
    const careerUpdates = [
      {
        id: "jd765ntwnyycnpw5mtvepehd5h7txrhk" as any,
        title: "Medical Doctor",
        quiz: medicalDoctorQuiz
      },
      {
        id: "jd7dprhv0jhwftc9vvhsyty3fh7twg1y" as any,
        title: "Agricultural Officer",
        quiz: agriculturalOfficerQuiz
      },
      {
        id: "jd73188khnnq4p3vz2r3aad8417txkdt" as any,
        title: "Tourism & Hospitality Manager",
        quiz: tourismHospitalityManagerQuiz
      }
    ];

    for (const update of careerUpdates) {
      try {
        await ctx.db.patch(update.id, {
          realityQuiz: update.quiz
        });
        results.push({
          title: update.title,
          careerId: update.id,
          status: "success"
        });
      } catch (error) {
        results.push({
          title: update.title,
          careerId: update.id,
          status: "error",
          error: String(error)
        });
      }
    }

    return {
      message: "Batch 1 quizzes added (3 careers)",
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.status === "success").length,
        failed: results.filter(r => r.status === "error").length
      }
    };
  }
});

// Renewable Energy Technician Quiz
const renewableEnergyTechnicianQuiz = {
  title: "A Day as a Renewable Energy Technician",
  description: "Navigate technical installations, safety challenges, and emerging technology. See if you can handle hands-on work with cutting-edge systems.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You're installing solar panels on a roof when you notice the electrical wiring in the building is outdated and potentially dangerous. Upgrading it will delay the project by 2 weeks and cost extra. What do you do?",
      options: [
        {
          text: "Stop work immediately, document the hazard, explain to client why the wiring must be upgraded before solar installation for safety and code compliance",
          insight: "You prioritize safety over schedule",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Complete the solar installation but document the wiring issue and strongly recommend they hire an electrician",
          insight: "You separate responsibilities",
          scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 6, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Offer to do basic wiring upgrades as part of the project to keep things moving",
          insight: "You expand scope to solve problems",
          scores: { technical: 7, pressure: 8, collaboration: 8, creativity: 8, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Consult with a licensed electrician, get their assessment, present options to client with cost and safety implications",
          insight: "You bring in expertise and facilitate decisions",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Renewable energy systems integrate with existing infrastructure. Identifying safety issues protects clients and your professional liability.",
      realityNote: "40% of residential solar installations uncover electrical code violations. Technicians who address these properly build trust and avoid liability."
    },
    {
      id: "q2",
      scenario: "A client is upset because their solar system isn't producing as much energy as they expected. They're blaming you, but you explained realistic expectations during installation. What's your approach?",
      options: [
        {
          text: "Review the system performance data together, check for any technical issues, re-explain how seasonal variation works, show them the production matches specifications",
          insight: "You educate with data and patience",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Remind them of the production estimates you provided in writing - the system is performing as promised",
          insight: "You refer to documentation",
          scores: { technical: 7, pressure: 6, collaboration: 5, creativity: 5, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Inspect the system thoroughly for any optimization opportunities - maybe adjust angles or clean panels more frequently",
          insight: "You look for improvements",
          scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Set up monitoring alerts so they can track production in real-time and understand patterns over time",
          insight: "You provide tools for understanding",
          scores: { technical: 10, pressure: 8, collaboration: 9, creativity: 10, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Customer education is ongoing in renewable energy. Unrealistic expectations are common and require patient, data-driven communication.",
      realityNote: "Most customer complaints about solar performance stem from misunderstanding variables like weather, seasons, and shading. Good technicians are educators."
    },
    {
      id: "q3",
      scenario: "You're on a wind turbine tower 80 meters up when weather suddenly deteriorates. Safety protocol says descend immediately, but you're 30 minutes from completing a critical repair that's already caused 2 days of downtime. What do you do?",
      options: [
        {
          text: "Descend immediately per safety protocol - no repair is worth risking life. Schedule return when conditions improve.",
          insight: "You follow safety rules strictly",
          scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 6, independence: 10, workLifeBalance: 8 }
        },
        {
          text: "Assess wind speed and conditions objectively - if I can safely work for 30 more minutes, complete the repair efficiently",
          insight: "You make calculated risk assessments",
          scores: { technical: 8, pressure: 9, collaboration: 7, creativity: 8, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Radio ground crew for their assessment of conditions and follow their guidance",
          insight: "You defer to team judgment",
          scores: { technical: 8, pressure: 8, collaboration: 10, creativity: 7, independence: 5, workLifeBalance: 7 }
        },
        {
          text: "Complete the repair quickly - I've worked in worse conditions and this turbine needs to be operational",
          insight: "You prioritize production over protocol",
          scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 6, independence: 9, workLifeBalance: 5 }
        }
      ],
      explanation: "Renewable energy work involves significant height and electrical hazards. Safety protocols exist because technicians have died violating them.",
      realityNote: "Wind turbine technician is one of the fastest-growing but also most dangerous green jobs. Companies with strong safety cultures have better retention and outcomes."
    },
    {
      id: "q4",
      scenario: "A rural community wants to install a micro-grid system, but the cheapest option uses components from a supplier with questionable environmental and labor practices. The ethical alternative costs 40% more. What do you recommend?",
      options: [
        {
          text: "Recommend the ethical supplier - renewable energy should reflect sustainability values throughout the supply chain, help them find grants or financing",
          insight: "You prioritize ethical consistency",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Present both options transparently with pros/cons and let the community decide based on their values and budget",
          insight: "You facilitate informed decisions",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 8, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Recommend the cheaper option - getting renewable energy installed in underserved areas is more important than perfect supply chain ethics",
          insight: "You prioritize access over purity",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 7, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Research hybrid approaches - maybe use ethical suppliers for key components and budget options for less critical parts",
          insight: "You find creative compromises",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Renewable energy exists in a global supply chain with complex ethics. Technicians increasingly face these trade-offs.",
      realityNote: "Solar panel supply chains involve environmental and human rights concerns. Professionals who help clients navigate these build deeper trust."
    },
    {
      id: "q5",
      scenario: "You've diagnosed that a client's failing solar system needs a $3,000 inverter replacement. You could install a cheaper workaround for $800 that might last 2-3 years. They're on a tight budget. What do you do?",
      options: [
        {
          text: "Explain both options clearly with longevity and warranty implications, let them make an informed choice based on their situation",
          insight: "You educate and empower decisions",
          scores: { technical: 10, pressure: 8, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Recommend the proper repair - workarounds create more problems down the line and damage your reputation",
          insight: "You maintain professional standards",
          scores: { technical: 9, pressure: 8, collaboration: 7, creativity: 6, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Install the workaround if they choose it but make them sign documentation acknowledging it's temporary and not warrantied",
          insight: "You protect yourself legally",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 7, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Help them explore financing options, grants, or payment plans so they can afford the proper repair",
          insight: "You help solve the financial barrier",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Balancing technical standards with client financial realities is common in renewable energy work. How you handle it affects long-term relationships.",
      realityNote: "Many renewable energy customers are early adopters with limited budgets. Technicians who help them make good trade-offs build loyal client bases."
    },
    {
      id: "q6",
      scenario: "It's Friday evening. You just finished a full week of installations and are exhausted. An existing client calls with an urgent system failure - their backup batteries for medical equipment aren't charging. What do you do?",
      options: [
        {
          text: "Go immediately - medical equipment dependency makes this a genuine emergency regardless of my fatigue",
          insight: "You respond to true emergencies",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 9, workLifeBalance: -5 }
        },
        {
          text: "Walk them through basic troubleshooting over the phone first - might be a simple fix, if not I'll come out",
          insight: "You triage efficiently",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Explain I'm off-duty but will prioritize them first thing tomorrow morning, help them arrange backup power for tonight",
          insight: "You maintain boundaries while helping",
          scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 8, independence: 8, workLifeBalance: 8 }
        },
        {
          text: "This is why I need to establish better emergency coverage - refer them to my emergency partner service for after-hours calls",
          insight: "You recognize system needs",
          scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 8, independence: 7, workLifeBalance: 9 }
        }
      ],
      explanation: "Renewable energy systems can be life-critical. Balancing emergency response with sustainable work practices is essential for long-term success.",
      realityNote: "Technicians who don't establish boundaries burn out within 3 years. Those who build emergency networks or protocols sustain 20-year careers."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 65, weight: 0.30 },
    pressure: { min: -5, max: 65, weight: 0.20 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 65, weight: 0.15 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -10, max: 60, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Renewable Energy Technician Potential",
      message: "You demonstrate excellent technical judgment, safety consciousness, and problem-solving skills. You understand this field combines hands-on technical work with customer education and ethical decision-making. The work can be physically demanding and involves real safety risks - but you're helping build the energy future."
    },
    medium: {
      min: 50,
      title: "Renewable Energy Work Possible",
      message: "You have technical aptitude but may find the physical demands, safety risks, or customer-facing aspects challenging. Consider roles in renewable energy system design, project management, or sales engineering where you can contribute without daily field work."
    },
    low: {
      min: 0,
      title: "Consider Different Green Energy Roles",
      message: "Your responses suggest field technician work may not suit you. The role requires comfort with heights, electrical systems, physical labor, and unpredictable schedules. Consider renewable energy policy, research, finance, or advocacy where you can support the transition without technical field work."
    }
  }
};

// Mining Engineer Quiz
const miningEngineerQuiz = {
  title: "A Day as a Mining Engineer",
  description: "Navigate safety protocols, environmental concerns, and production pressure. See if you can balance extraction efficiency with responsibility.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You notice a section of the mine showing subtle signs of potential instability. Production targets are tight and shutting down for inspection will cost $200K in lost output. What do you do?",
      options: [
        {
          text: "Shut down immediately, conduct thorough geotechnical assessment, present findings to management - worker safety is non-negotiable",
          insight: "You prioritize safety absolutely",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Increase monitoring of the area while maintaining production, prepare to shut down if indicators worsen",
          insight: "You balance risk and production",
          scores: { technical: 8, pressure: 8, collaboration: 7, creativity: 8, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Document the concerns and present them to senior engineers and management for decision",
          insight: "You escalate technical decisions",
          scores: { technical: 8, pressure: 7, collaboration: 9, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Conduct rapid assessment during shift change to minimize production impact, then decide",
          insight: "You seek efficient verification",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 9, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Mining safety requires erring on the side of caution. Collapsed mines have killed hundreds when early warning signs were ignored for production.",
      realityNote: "Mining remains one of the world's most dangerous professions. Engineers who prioritize safety over production save lives and avoid catastrophic liability."
    },
    {
      id: "q2",
      scenario: "Environmental monitors show your tailings pond is approaching regulatory limits for water contamination. Upgrading the system will take 3 months and halt operations. What's your recommendation?",
      options: [
        {
          text: "Begin immediate upgrade planning, notify regulators proactively, explore temporary processing alternatives to minimize shutdown duration",
          insight: "You address environmental compliance seriously",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Implement temporary measures to extend the current system's viability while designing permanent solution",
          insight: "You buy time for proper fixes",
          scores: { technical: 8, pressure: 9, collaboration: 8, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "The limits are regulatory, not physical - continue operating while working on upgrades unless violations occur",
          insight: "You interpret compliance minimally",
          scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 6, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Consult with environmental engineers and regulatory experts to understand all options and implications",
          insight: "You seek expert guidance",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 8, independence: 7, workLifeBalance: 7 }
        }
      ],
      explanation: "Mining's environmental impact is heavily scrutinized. Proactive compliance prevents catastrophic spills, regulatory sanctions, and reputational damage.",
      realityNote: "Tailings dam failures have caused environmental disasters worldwide. Engineers who treat environmental systems as seriously as production systems prevent tragedies."
    },
    {
      id: "q3",
      scenario: "You've designed an extraction plan that maximizes mineral recovery but requires workers to spend more time in potentially hazardous areas. An alternative plan is safer but recovers 15% less mineral. What do you recommend?",
      options: [
        {
          text: "Recommend the safer plan - 15% less recovery is acceptable when worker safety is at stake",
          insight: "You value safety over efficiency",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Design enhanced safety measures for the high-recovery plan - automation, monitoring, PPE improvements",
          insight: "You engineer solutions to reconcile both",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Present both options to management with risk and reward analysis, let them make the final call",
          insight: "You provide analysis not decisions",
          scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Calculate if the 15% additional recovery justifies investing in advanced safety technology and automation",
          insight: "You do economic-safety trade-off analysis",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Mining engineering constantly balances extraction efficiency with worker safety. The best engineers find ways to optimize both, not trade one for the other.",
      realityNote: "Mining fatality rates dropped 90% when companies stopped treating safety as a cost and started treating it as an engineering challenge."
    },
    {
      id: "q4",
      scenario: "Local communities are protesting the mine's expansion, citing water usage and dust pollution. Production targets depend on the expansion. How do you approach this?",
      options: [
        {
          text: "Engage with community to understand specific concerns, conduct independent environmental assessment, design expansion that addresses their issues even if it costs more",
          insight: "You prioritize community relations",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "This is a management and PR issue, not an engineering one - focus on technical work and let others handle community relations",
          insight: "You separate technical from social",
          scores: { technical: 6, pressure: 6, collaboration: 4, creativity: 4, independence: 7, workLifeBalance: 8 }
        },
        {
          text: "Recommend environmental impact assessment and mitigation measures that address legitimate concerns while proceeding with expansion",
          insight: "You seek middle ground",
          scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Design monitoring systems that provide transparent real-time data to community about water and air quality",
          insight: "You use transparency to build trust",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Modern mining requires social license to operate. Engineers who ignore community concerns create unsustainable operations.",
      realityNote: "Mines with good community relationships operate for decades. Those with conflicts face protests, delays, and premature closure. Social engineering matters."
    },
    {
      id: "q5",
      scenario: "You discover that the geological survey data you've been using for planning has significant errors. Correcting the mine plan will delay production by 2 months. What do you do?",
      options: [
        {
          text: "Immediately inform management, present corrected data, revise the mine plan - operating on false data creates massive risk",
          insight: "You prioritize accuracy over schedules",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Verify the errors thoroughly before raising alarms - survey data has uncertainties and this might not require plan changes",
          insight: "You validate before escalating",
          scores: { technical: 9, pressure: 8, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Work overtime to fast-track the corrected plan and minimize delays",
          insight: "You sacrifice to solve problems",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: -3 }
        },
        {
          text: "Assess which parts of the plan are affected by errors and prioritize revising critical sections first",
          insight: "You triage the correction process",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 6 }
        }
      ],
      explanation: "Mining plans based on incorrect geological data lead to equipment damage, worker danger, and economic losses. Accuracy is non-negotiable.",
      realityNote: "Some of mining's biggest disasters resulted from proceeding despite questionable data. Engineers who demand accuracy prevent catastrophes."
    },
    {
      id: "q6",
      scenario: "You're on-site at a remote mine, 3 hours from the nearest city. It's been 6 weeks since you've been home. Your rotation should end in 2 weeks, but a critical project needs your expertise. How do you respond?",
      options: [
        {
          text: "Stay for the project - this is part of remote mining work and the project genuinely needs me",
          insight: "You accept mining's demands",
          scores: { technical: 8, pressure: 8, collaboration: 9, creativity: 6, independence: 8, workLifeBalance: -5 }
        },
        {
          text: "Train another engineer to take over while I complete my rotation - sustainability requires building team capacity",
          insight: "You build team independence",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 8 }
        },
        {
          text: "Negotiate - I'll stay 1 extra week but then need guaranteed extended time off to compensate",
          insight: "You negotiate boundaries",
          scores: { technical: 8, pressure: 8, collaboration: 9, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Hold firm on rotation schedule - if the company can't plan for predictable rotations, that's a management problem",
          insight: "You maintain strict boundaries",
          scores: { technical: 7, pressure: 7, collaboration: 6, creativity: 6, independence: 10, workLifeBalance: 10 }
        }
      ],
      explanation: "Remote mining rotations test work-life boundaries. How engineers handle schedule pressure affects career sustainability and family relationships.",
      realityNote: "Mining engineer divorce and burnout rates are high. Those who establish sustainable rotation practices and team redundancy have longer, healthier careers."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 70, weight: 0.30 },
    pressure: { min: -5, max: 70, weight: 0.20 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.15 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -10, max: 65, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Mining Engineer Potential",
      message: "You demonstrate excellent engineering judgment, safety consciousness, and ethical reasoning. You understand that mining engineering requires balancing extraction efficiency with worker safety, environmental responsibility, and community relations. Remote work and pressure are real - but so is the critical role in global resource supply."
    },
    medium: {
      min: 50,
      title: "Mining Engineering Possible in Right Setting",
      message: "You have technical aptitude but may find the safety pressure, remote rotations, or ethical complexity challenging. Consider roles in mining consulting, resource estimation, mine planning, or equipment manufacturing where you can contribute without remote site-based work."
    },
    low: {
      min: 0,
      title: "Consider Different Engineering Roles",
      message: "Your responses suggest mining engineering may not suit you. The work requires comfort with high-stakes safety decisions, environmental and community complexity, and extended remote rotations. Consider civil engineering, materials science, geology, or environmental engineering where you can work with resources differently."
    }
  }
};

// Mobile Money Agent / Fintech Specialist Quiz
const mobileMoneyFintechQuiz = {
  title: "A Day as a Mobile Money Agent / Fintech Specialist",
  description: "Navigate fraud prevention, customer trust, and technical issues. See if you can handle digital finance at the grassroots level.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "A customer wants to send 500,000 RWF to a number they just met online who promised them a job opportunity. This has all the signs of a scam. What do you do?",
      options: [
        {
          text: "Refuse the transaction, explain the red flags of employment scams, educate them about verification before sending money to strangers",
          insight: "You protect customers from themselves",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Warn them strongly about scam risks but process the transaction if they insist - it's their money",
          insight: "You warn but don't block",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 6, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Ask them to verify the recipient's identity first - call the number, confirm details, do basic due diligence",
          insight: "You facilitate verification",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Process the transaction - I'm not here to judge customer decisions, just provide the service",
          insight: "You avoid intervention",
          scores: { technical: 5, pressure: 6, collaboration: 5, creativity: 4, independence: 6, workLifeBalance: 8 }
        }
      ],
      explanation: "Mobile money agents are frontline fraud prevention. Customers who lose money to scams often blame agents, even when they were warned.",
      realityNote: "Employment and romance scams steal millions via mobile money annually. Agents who educate customers become trusted advisors; those who don't process fraud."
    },
    {
      id: "q2",
      scenario: "Your mobile money float is running low during peak hours. You need to restock, but leaving means losing customers to competitors down the street. What's your strategy?",
      options: [
        {
          text: "Call my supplier for emergency delivery while managing the remaining float carefully, explain to customers there might be brief delays",
          insight: "You manage crisis proactively",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Close temporarily to restock - better to be unavailable for 30 minutes than unable to serve anyone",
          insight: "You prioritize service capacity",
          scores: { technical: 8, pressure: 7, collaboration: 7, creativity: 7, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Build relationships with nearby agents to share float in emergencies - cooperative not competitive approach",
          insight: "You build community networks",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 8 }
        },
        {
          text: "Learn to predict peak times better and ensure I'm always stocked before busy periods",
          insight: "You focus on prevention",
          scores: { technical: 9, pressure: 8, collaboration: 7, creativity: 8, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Float management is the core operational challenge in mobile money. Running out means lost revenue and customer trust.",
      realityNote: "Successful agents track patterns religiously and build supplier relationships. Amateur agents constantly run out of float during peak times."
    },
    {
      id: "q3",
      scenario: "A regular customer received 2,000,000 RWF and wants to withdraw it all immediately. Your float can handle it, but you suspect money laundering. What do you do?",
      options: [
        {
          text: "Process the legitimate transaction but file a suspicious activity report with authorities as required by regulation",
          insight: "You balance service with compliance",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Ask about the source of funds casually - if explanation is legitimate, process it",
          insight: "You do informal due diligence",
          scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 7, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Refuse and explain that large unusual transactions require verification - better safe than complicit",
          insight: "You enforce strict controls",
          scores: { technical: 8, pressure: 8, collaboration: 6, creativity: 6, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Process it - monitoring transactions is the company's job, not mine",
          insight: "You avoid responsibility",
          scores: { technical: 5, pressure: 6, collaboration: 5, creativity: 4, independence: 5, workLifeBalance: 8 }
        }
      ],
      explanation: "Mobile money agents are required by law to monitor for money laundering. Compliance protects you from criminal liability.",
      realityNote: "Agents have been prosecuted for processing transactions they should have reported. Know your legal obligations and document everything."
    },
    {
      id: "q4",
      scenario: "The mobile money system is down. You have a line of 15 people who need urgent transactions - pay school fees, buy medicine, send money home. What do you do?",
      options: [
        {
          text: "Explain the situation transparently, stay open to help when system returns, offer to record details to process immediately when back up",
          insight: "You maintain presence and communication",
          scores: { technical: 9, pressure: 10, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Close and put up a sign - nothing I can do until system is fixed, no point having frustrated customers waiting",
          insight: "You avoid the frustration",
          scores: { technical: 6, pressure: 5, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 8 }
        },
        {
          text: "Help customers explore alternatives - nearby banks, ATMs, other agents, or see if their transactions can wait",
          insight: "You facilitate solutions",
          scores: { technical: 8, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Process urgent transactions manually with paper records to reconcile when system returns - risky but serves customers",
          insight: "You take calculated risks for service",
          scores: { technical: 8, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 6 }
        }
      ],
      explanation: "System downtime is common in digital financial services. How you handle it determines whether customers trust you or abandon you.",
      realityNote: "Mobile money networks fail regularly. Agents who build relationships during downtime retain customers; those who just close lose them to competitors."
    },
    {
      id: "q5",
      scenario: "A customer made an error and sent money to the wrong number. They're desperate - it was rent money. The recipient isn't answering. What do you do?",
      options: [
        {
          text: "Explain the reversal process, help them contact the mobile money company support, guide them through reporting it, follow up to ensure resolution",
          insight: "You guide through proper channels",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Try to contact the recipient myself - often they're willing to return money if approached properly",
          insight: "You personally mediate",
          scores: { technical: 8, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Explain there's nothing I can do - they need to contact the mobile money company directly",
          insight: "You set boundaries",
          scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 8 }
        },
        {
          text: "Help them file a police report if recipient won't return money - this is theft",
          insight: "You escalate to authorities",
          scores: { technical: 8, pressure: 8, collaboration: 9, creativity: 8, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Wrong number transfers are common and devastating. Agents who help customers recover money earn fierce loyalty.",
      realityNote: "Most wrong-number recipients return money if contacted properly. Agents who help navigate this process become indispensable community resources."
    },
    {
      id: "q6",
      scenario: "You're working 7 days a week because customers need service on weekends and you can't afford to close. You're exhausted and missing family time. What's your strategy?",
      options: [
        {
          text: "Hire and train a trusted assistant to cover some hours - invest in growth rather than burning out",
          insight: "You build sustainable systems",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 9 }
        },
        {
          text: "Set specific hours and stick to them - customers will adapt and I need boundaries for sustainability",
          insight: "You establish firm boundaries",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 7, independence: 9, workLifeBalance: 10 }
        },
        {
          text: "Accept that mobile money requires availability - work hard for a few years to establish the business, then scale back",
          insight: "You embrace short-term sacrifice",
          scores: { technical: 7, pressure: 8, collaboration: 7, creativity: 6, independence: 8, workLifeBalance: -3 }
        },
        {
          text: "Partner with another agent to share weekend coverage - we each get every other weekend off",
          insight: "You create cooperative solutions",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 10, independence: 7, workLifeBalance: 8 }
        }
      ],
      explanation: "Mobile money is a 24/7 need but agents are human. Sustainable models require systems, not superhuman endurance.",
      realityNote: "Agent burnout is high. Those who build teams, partnerships, or strict boundaries last. Those who try to do everything alone quit within 2 years."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 65, weight: 0.20 },
    pressure: { min: -5, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.20 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -10, max: 65, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Mobile Money / Fintech Potential",
      message: "You demonstrate excellent judgment for digital financial services: fraud awareness, customer education, problem-solving, and ethical reasoning. You understand that mobile money agents are financial educators and community pillars, not just transaction processors. The hours are demanding - but so is the impact on financial inclusion."
    },
    medium: {
      min: 50,
      title: "Fintech Work Possible in Right Role",
      message: "You have some aptitudes but may find the hours, fraud risks, or customer-facing pressure challenging. Consider fintech roles in customer support, compliance, analytics, or business development where you can contribute without frontline agent responsibilities."
    },
    low: {
      min: 0,
      title: "Consider Different Financial Services Roles",
      message: "Your responses suggest mobile money agent work may not suit you. The role requires constant availability, fraud vigilance, customer education, and dealing with desperate situations. Consider banking, accounting, financial advising, or fintech product development with more structure and boundaries."
    }
  }
};

// Export mutation for batch 2
export const addQuizzesBatch2 = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    const careerUpdates = [
      {
        id: "jd7eqnjws25b03cztt9cy5pjn57twwcm" as any,
        title: "Renewable Energy Technician",
        quiz: renewableEnergyTechnicianQuiz
      },
      {
        id: "jd753mjj8p9ef68xp1qs8ahyhh7twvjy" as any,
        title: "Mining Engineer",
        quiz: miningEngineerQuiz
      },
      {
        id: "jd7cxxrs2w7fsjakbwjvgjrbm97twbe7" as any,
        title: "Mobile Money Agent / Fintech Specialist",
        quiz: mobileMoneyFintechQuiz
      }
    ];

    for (const update of careerUpdates) {
      try {
        await ctx.db.patch(update.id, {
          realityQuiz: update.quiz
        });
        results.push({
          title: update.title,
          careerId: update.id,
          status: "success"
        });
      } catch (error) {
        results.push({
          title: update.title,
          careerId: update.id,
          status: "error",
          error: String(error)
        });
      }
    }

    return {
      message: "Batch 2 quizzes added (3 careers)",
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.status === "success").length,
        failed: results.filter(r => r.status === "error").length
      }
    };
  }
});

// Construction Manager Quiz
const constructionManagerQuiz = {
  title: "A Day as a Construction Manager",
  description: "Navigate safety protocols, budget constraints, and coordination chaos. See if you can deliver projects on time without compromising quality.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You arrive on site to find workers not wearing safety harnesses while working at height. The subcontractor says harnesses slow them down and they've 'never had problems before.' What do you do?",
      options: [
        {
          text: "Stop work immediately, don't allow anyone at height without proper PPE, replace the subcontractor if they won't comply - safety is non-negotiable",
          insight: "You enforce safety absolutely",
          scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Give them one warning and document it, explain the legal and liability consequences, shut down if violations continue",
          insight: "You educate before enforcing",
          scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Work with the subcontractor to find faster harness systems that address their speed concerns while maintaining safety",
          insight: "You solve the underlying objection",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Document the violation and report to the client and regulatory authorities",
          insight: "You escalate to authorities",
          scores: { technical: 8, pressure: 7, collaboration: 5, creativity: 6, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Falls are the leading cause of construction deaths. Managers who tolerate safety violations create liability and tragedy.",
      realityNote: "Construction managers can face criminal charges when workers die due to safety violations they allowed. Zero tolerance protects everyone."
    },
    {
      id: "q2",
      scenario: "Heavy rains have delayed foundation work by 2 weeks. The client is furious and threatening penalties. You can catch up by working weekends and double shifts, but quality might suffer. What's your approach?",
      options: [
        {
          text: "Explain that weather delays are in the contract terms, present realistic revised schedule, maintain quality standards rather than rushing",
          insight: "You protect quality and contracts",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Accelerate where possible without compromising critical quality - prioritize path optimization over just adding hours",
          insight: "You find smart acceleration",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Work the extra hours to meet original timeline - client satisfaction and reputation matter more than temporary hardship",
          insight: "You prioritize client over schedule",
          scores: { technical: 7, pressure: 9, collaboration: 8, creativity: 6, independence: 7, workLifeBalance: -5 }
        },
        {
          text: "Negotiate a middle ground - partial schedule extension with some acceleration, share the delay impact fairly",
          insight: "You broker compromise",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 6 }
        }
      ],
      explanation: "Weather delays are inevitable in construction. How you respond determines whether you maintain quality and team morale or create disasters.",
      realityNote: "Rushed construction causes structural failures. Managers who maintain standards during delays build better reputations than those who rush and compromise."
    },
    {
      id: "q3",
      scenario: "You discover the concrete supplier delivered substandard material that's already been poured into a structural foundation. Fixing it requires demolition and restart - 3 weeks and $100K. What do you do?",
      options: [
        {
          text: "Stop all related work immediately, document everything with photos and tests, inform client and architect, demolish and redo - structural integrity is non-negotiable",
          insight: "You prioritize structural integrity",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 7, independence: 10, workLifeBalance: 5 }
        },
        {
          text: "Get independent structural engineer assessment before making expensive decisions - maybe it can be remediated",
          insight: "You seek expert verification",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Hold the supplier legally and financially responsible while managing the fix",
          insight: "You focus on accountability",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Evaluate if the substandard material still meets minimum code requirements - might be fine even if not ideal",
          insight: "You consider minimum compliance",
          scores: { technical: 6, pressure: 7, collaboration: 7, creativity: 7, independence: 7, workLifeBalance: 7 }
        }
      ],
      explanation: "Material defects in structural elements create long-term liability and safety risks. Great managers fix problems even when expensive.",
      realityNote: "Buildings have collapsed years later due to substandard materials managers chose not to address. The lawsuits are far more expensive than the fixes."
    },
    {
      id: "q4",
      scenario: "Three trades need to work in the same space today - electrical, plumbing, and HVAC. They're all behind schedule and arguing about priority. What do you do?",
      options: [
        {
          text: "Review the critical path, establish clear sequencing based on technical dependencies, communicate the plan firmly, monitor execution",
          insight: "You impose technical logic",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 8, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Facilitate a meeting where they work out the sequencing together - they know their work best",
          insight: "You facilitate collaboration",
          scores: { technical: 8, pressure: 8, collaboration: 10, creativity: 9, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Find alternative work areas or tasks so multiple trades can progress simultaneously without conflict",
          insight: "You redesign workflow creatively",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Prioritize whoever is most behind schedule to help them catch up",
          insight: "You focus on schedule recovery",
          scores: { technical: 7, pressure: 8, collaboration: 7, creativity: 7, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Trade coordination is daily construction reality. Managers who can sequence work efficiently keep projects flowing.",
      realityNote: "Poor trade coordination causes 30% of construction delays. Managers who master this skill deliver on time; others constantly firefight."
    },
    {
      id: "q5",
      scenario: "A cost-saving suggestion from the architect would reduce quality in a way clients won't notice for years. It saves $50K now but creates maintenance issues later. What's your recommendation?",
      options: [
        {
          text: "Reject it - my professional responsibility is to the building's long-term performance, not short-term budget",
          insight: "You protect long-term quality",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Present both options to the client transparently with long-term cost implications - let them make an informed decision",
          insight: "You facilitate informed choices",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Implement the cost savings if the architect recommends it - they're the designer, I'm the builder",
          insight: "You defer to design authority",
          scores: { technical: 6, pressure: 6, collaboration: 7, creativity: 5, independence: 4, workLifeBalance: 7 }
        },
        {
          text: "Look for alternative cost savings that don't compromise longevity",
          insight: "You find better alternatives",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Construction managers are stewards of building quality. Short-term savings that create long-term problems reflect poorly on everyone.",
      realityNote: "Buildings last 50+ years. Managers who protect quality become sought-after. Those who cut corners get blamed when problems emerge."
    },
    {
      id: "q6",
      scenario: "It's your kid's birthday party. You're supposed to leave at 3 PM. At 2 PM, a critical delivery is delayed and the crane rental window closes at 6 PM - if you miss it, the project delays by a week. What do you do?",
      options: [
        {
          text: "Stay and manage it - construction has unpredictable demands and this genuinely needs me",
          insight: "You accept construction's demands",
          scores: { technical: 9, pressure: 10, collaboration: 9, creativity: 6, independence: 8, workLifeBalance: -8 }
        },
        {
          text: "Call the supplier, crane company, and site super - coordinate the solution remotely while attending the party, stay available by phone",
          insight: "You delegate with oversight",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Hand off to assistant manager with clear instructions - this is why you build a team",
          insight: "You trust your team",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 9, independence: 7, workLifeBalance: 8 }
        },
        {
          text: "Attend the party - if one person leaving breaks the project, the system is broken",
          insight: "You maintain firm boundaries",
          scores: { technical: 7, pressure: 6, collaboration: 7, creativity: 7, independence: 9, workLifeBalance: 10 }
        }
      ],
      explanation: "Construction emergencies test work-life boundaries constantly. How you handle them affects career sustainability and family relationships.",
      realityNote: "Construction manager divorce rates are high. Those who build strong site teams can occasionally step away; those who can't become indispensable and burned out."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 70, weight: 0.25 },
    pressure: { min: -10, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.15 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -20, max: 60, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Construction Manager Potential",
      message: "You demonstrate excellent construction management instincts: safety consciousness, quality standards, coordination skills, and pressure management. You understand this work means constant problem-solving under time and budget constraints. The hours are demanding and stakes are high - but you're building the physical infrastructure of society."
    },
    medium: {
      min: 50,
      title: "Construction Work Possible in Right Role",
      message: "You have some aptitudes but may find the safety responsibility, schedule pressure, or coordination complexity challenging. Consider roles like construction estimating, project engineering, safety coordination, or specialty trade work where you can contribute without full project management responsibility."
    },
    low: {
      min: 0,
      title: "Consider Different Project Management",
      message: "Your responses suggest construction management may not suit you. The work requires comfort with high safety stakes, weather and supplier unpredictability, constant firefighting, and physical site presence. Consider project management in software, events, or corporate settings with more control and predictability."
    }
  }
};

// Environmental Scientist Quiz
const environmentalScientistQuiz = {
  title: "A Day as an Environmental Scientist",
  description: "Navigate data collection, policy advocacy, and corporate pressure. See if you can balance science with real-world constraints.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You're conducting an environmental impact assessment for a development project. Your data shows significant negative impacts, but the developer (who hired you) is pressuring you to soften your conclusions. What do you do?",
      options: [
        {
          text: "Report findings accurately and completely - scientific integrity is non-negotiable regardless of who's paying",
          insight: "You prioritize scientific integrity",
          scores: { technical: 10, pressure: 10, collaboration: 7, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Present findings objectively but also show mitigation measures that could reduce impacts - give them options",
          insight: "You combine honesty with solutions",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Recheck data thoroughly to ensure conclusions are bulletproof before presenting",
          insight: "You verify before confronting",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Find ways to frame the findings in less alarming language while remaining technically accurate",
          insight: "You soften presentation",
          scores: { technical: 7, pressure: 7, collaboration: 7, creativity: 7, independence: 5, workLifeBalance: 7 }
        }
      ],
      explanation: "Environmental scientists face constant pressure to downplay negative findings. Those who maintain integrity protect ecosystems and their professional credibility.",
      realityNote: "Scientists who compromise findings for clients eventually get caught and lose their careers. Those who stand firm become trusted experts."
    },
    {
      id: "q2",
      scenario: "You're monitoring water quality downstream from a factory. Results suggest potential violations, but they're close to detection limits and could be measurement error. What's your approach?",
      options: [
        {
          text: "Collect additional samples to confirm before reporting, use multiple testing methods to verify results, document everything thoroughly",
          insight: "You verify before acting",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Report the potential violation immediately - better to be cautious with public health",
          insight: "You err on side of caution",
          scores: { technical: 8, pressure: 8, collaboration: 7, creativity: 6, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Inform the factory privately first, give them opportunity to investigate and respond before official reporting",
          insight: "You use informal approach",
          scores: { technical: 7, pressure: 7, collaboration: 9, creativity: 8, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Consult with other environmental scientists about the data interpretation before deciding",
          insight: "You seek peer review",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 8, independence: 6, workLifeBalance: 7 }
        }
      ],
      explanation: "Environmental monitoring requires balancing thoroughness with timeliness. False alarms damage credibility, but delays can harm public health.",
      realityNote: "Data near detection limits is common. Scientists who develop robust verification protocols build credibility with regulators and industry."
    },
    {
      id: "q3",
      scenario: "A community is convinced their health problems are caused by nearby industrial pollution. Your data doesn't support this connection. They're calling you a corporate shill. How do you respond?",
      options: [
        {
          text: "Present findings transparently, explain methodology and limitations, offer to investigate alternative hypotheses, take their concerns seriously even when data doesn't support them",
          insight: "You engage with empathy and science",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Stand by the data - emotions don't change science, even when people are suffering",
          insight: "You defend scientific findings",
          scores: { technical: 8, pressure: 7, collaboration: 4, creativity: 5, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Expand the study to look for other potential causes they might be concerned about",
          insight: "You respond to community concerns",
          scores: { technical: 9, pressure: 8, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 6 }
        },
        {
          text: "Help them understand that lack of evidence isn't proof of absence - absence of detectable pollution doesn't mean they're wrong about their health",
          insight: "You acknowledge uncertainty",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Environmental science often means delivering unwelcome findings to emotionally invested communities. Communication skills matter as much as technical skills.",
      realityNote: "Communities facing health issues are desperate for answers. Scientists who combine technical rigor with genuine empathy build trust even with negative findings."
    },
    {
      id: "q4",
      scenario: "Your research shows a protected species is about to lose critical habitat to development. Publicizing it could stop the project and save jobs for your team, but might cost 500 construction jobs. What do you do?",
      options: [
        {
          text: "Report findings to appropriate authorities as required by law - species protection exists for a reason",
          insight: "You follow environmental law",
          scores: { technical: 10, pressure: 9, collaboration: 7, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Work with developers and environmental agencies to find alternative designs that preserve habitat while allowing modified development",
          insight: "You broker win-win solutions",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "This is above my pay grade - present findings to my supervisor and let leadership decide",
          insight: "You escalate the decision",
          scores: { technical: 8, pressure: 7, collaboration: 7, creativity: 6, independence: 4, workLifeBalance: 8 }
        },
        {
          text: "Verify the data exhaustively before reporting - such consequential findings require absolute certainty",
          insight: "You verify thoroughly first",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Environmental scientists regularly face conflicts between conservation and economic development. How you navigate these defines your professional identity.",
      realityNote: "Species extinction is permanent. Jobs can be created elsewhere. Scientists who help broker compromises protect both nature and communities."
    },
    {
      id: "q5",
      scenario: "You're in the field collecting soil samples in remote terrain. Weather is deteriorating and you have 3 more sites to sample today. Skipping them means returning next week at high cost. What do you do?",
      options: [
        {
          text: "Prioritize safety - weather can kill. Come back next week or find alternative sampling dates",
          insight: "You prioritize safety absolutely",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 8 }
        },
        {
          text: "Assess conditions objectively - if I can safely complete sampling, do it efficiently",
          insight: "You make calculated risk decisions",
          scores: { technical: 9, pressure: 9, collaboration: 7, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Sample the most critical sites and skip less important ones - partial data is better than no data",
          insight: "You prioritize strategically",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Push through - field scientists work in challenging conditions and I've been in worse weather",
          insight: "You prioritize completion",
          scores: { technical: 7, pressure: 8, collaboration: 6, creativity: 6, independence: 9, workLifeBalance: 5 }
        }
      ],
      explanation: "Field science involves real physical risks. Scientists who make good risk decisions complete careers; those who don't sometimes don't survive them.",
      realityNote: "Environmental scientists die in field accidents every year. The data isn't worth your life. Always have protocols for weather, wildlife, and terrain risks."
    },
    {
      id: "q6",
      scenario: "You've spent 18 months researching ecosystem restoration methods. Results show your preferred approach doesn't work as hoped. Publishing this ends your research funding. What do you do?",
      options: [
        {
          text: "Publish the negative results - science advances through knowing what doesn't work. Negative results prevent others from wasting resources.",
          insight: "You prioritize scientific progress",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 8, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Look for aspects that did work and frame the research around those findings while acknowledging limitations",
          insight: "You find partial successes",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 9, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Analyze why it failed to design better approaches - turn negative results into positive research direction",
          insight: "You pivot strategically",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "This is devastating - I need to reconsider whether research career is viable if funding depends on positive results",
          insight: "You question research career fit",
          scores: { technical: 6, pressure: 5, collaboration: 6, creativity: 5, independence: 6, workLifeBalance: 7 }
        }
      ],
      explanation: "Science has a publication bias toward positive results, but negative findings are equally valuable. Scientific integrity requires publishing what you find, not what you hoped.",
      realityNote: "Most environmental interventions fail or have minimal impact. Scientists who honestly report this help the field improve. Those who hide failures waste everyone's resources."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 70, weight: 0.30 },
    pressure: { min: -5, max: 70, weight: 0.20 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.15 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -5, max: 60, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Environmental Scientist Potential",
      message: "You demonstrate excellent scientific judgment, ethical reasoning, and problem-solving skills. You understand that environmental science requires balancing technical rigor with stakeholder communication, field risks with research needs, and scientific integrity with political realities. The field work can be demanding - but you're protecting the planet's future."
    },
    medium: {
      min: 50,
      title: "Environmental Science Possible in Right Role",
      message: "You have scientific aptitude but may find the political pressure, field demands, or funding uncertainties challenging. Consider environmental consulting, compliance, laboratory analysis, or environmental education where you can contribute without extensive field work or political navigation."
    },
    low: {
      min: 0,
      title: "Consider Different Environmental Roles",
      message: "Your responses suggest research-focused environmental science may not suit you. The work requires comfort with uncertainty, publishing negative results, corporate pressure, and field risks. Consider environmental policy, advocacy, communications, or sustainability management where you can support environmental goals differently."
    }
  }
};

// Logistics Coordinator Quiz
const logisticsCoordinatorQuiz = {
  title: "A Day as a Logistics Coordinator",
  description: "Navigate shipment delays, vendor issues, and tight deadlines. See if you can keep supply chains flowing under pressure.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "A critical shipment is stuck at customs. Your production line stops in 4 hours without those parts. Expediting through unofficial channels would cost extra and involves ethical gray areas. What do you do?",
      options: [
        {
          text: "Work official channels intensely - call customs broker, escalate through proper procedures, explore air freight for partial shipment, keep everyone informed of status",
          insight: "You work within systems under pressure",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Use whatever means necessary to get parts moving - production stoppage costs far more than expediting fees",
          insight: "You prioritize outcomes over process",
          scores: { technical: 7, pressure: 9, collaboration: 6, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Activate backup supplier for emergency partial delivery while resolving customs issue",
          insight: "You use contingency plans",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 10, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Inform production manager immediately about potential stoppage so they can prepare contingencies on their end",
          insight: "You communicate early and widely",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 8, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Logistics emergencies test both problem-solving and ethics. Great coordinators find solutions within legal and ethical boundaries.",
      realityNote: "Customs delays happen constantly. Coordinators with good broker relationships and contingency plans avoid production stoppages without ethical compromises."
    },
    {
      id: "q2",
      scenario: "Your reliable carrier just increased rates 30% with 48 hours notice. Switching carriers risks service disruption. Accepting the increase blows your budget. What's your strategy?",
      options: [
        {
          text: "Negotiate hard - explain the relationship history, ask for gradual increase, threaten to switch if they won't be reasonable, actually be prepared to switch",
          insight: "You negotiate from strength",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Immediately start qualifying alternative carriers while negotiating - need leverage and backup options",
          insight: "You create options rapidly",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 10, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Accept the increase short-term while developing multi-carrier strategy to prevent future leverage situations",
          insight: "You prevent future problems",
          scores: { technical: 9, pressure: 8, collaboration: 8, creativity: 9, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Escalate to management - pricing decisions above my authority level",
          insight: "You defer financial decisions",
          scores: { technical: 7, pressure: 6, collaboration: 7, creativity: 6, independence: 4, workLifeBalance: 8 }
        }
      ],
      explanation: "Carrier relationships involve power dynamics and negotiation. Coordinators who maintain multiple options avoid being held hostage.",
      realityNote: "Single-carrier dependency is dangerous. Smart coordinators always have qualified backup carriers and actual alternatives during negotiations."
    },
    {
      id: "q3",
      scenario: "You discover a vendor has been short-shipping orders by 2-3% for months. They've been charging for full amounts. Total overcharge is about $50K. What do you do?",
      options: [
        {
          text: "Document everything systematically, quantify total overcharge, present evidence to vendor professionally, demand refund and improved controls, escalate if they refuse",
          insight: "You address fraud professionally",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Report to management and let them handle the vendor relationship - this is a legal/financial matter",
          insight: "You escalate major issues",
          scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Implement receiving verification procedures going forward, negotiate credit for overcharges, keep the vendor if they make it right",
          insight: "You fix systems and relationships",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Terminate the vendor immediately and find replacement - trust is gone",
          insight: "You enforce zero tolerance",
          scores: { technical: 8, pressure: 8, collaboration: 5, creativity: 6, independence: 10, workLifeBalance: 7 }
        }
      ],
      explanation: "Vendor integrity issues require firm handling. How you address them protects company finances and sets standards.",
      realityNote: "Short-shipping and overbilling are common. Coordinators who implement verification catch these; those who trust blindly lose millions."
    },
    {
      id: "q4",
      scenario: "A shipment of perishable goods is delayed. It will arrive 24 hours late. It might still be usable, but you can't be certain. Accepting it risks customer health. Rejecting it costs $30K. What do you do?",
      options: [
        {
          text: "Reject it - customer safety and brand reputation are worth far more than $30K, hold carrier responsible for temperature-controlled shipment failure",
          insight: "You prioritize safety over cost",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Have quality team inspect and test the goods before deciding - don't assume the worst without verification",
          insight: "You verify before deciding",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Check temperature logs from the shipment - if cold chain was maintained, goods might be fine",
          insight: "You use data for decisions",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Accept it but downgrade to non-consumer use if applicable, or negotiate partial credit from supplier",
          insight: "You find alternative uses",
          scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Perishable goods logistics involves real health risks. Coordinators who prioritize safety over short-term costs protect brands and consumers.",
      realityNote: "Food safety recalls cost millions and destroy brands. The $30K loss is cheap compared to making customers sick."
    },
    {
      id: "q5",
      scenario: "You're coordinating international shipments across 8 time zones. Urgent issues regularly happen outside your work hours. How do you manage this?",
      options: [
        {
          text: "Build systems: empower regional teams, create escalation protocols, document decision frameworks so others can handle issues without me",
          insight: "You build sustainable systems",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 9 }
        },
        {
          text: "Stay available 24/7 - global logistics is inherently 24/7 and I'm responsible",
          insight: "You accept constant availability",
          scores: { technical: 8, pressure: 9, collaboration: 8, creativity: 6, independence: 9, workLifeBalance: -8 }
        },
        {
          text: "Hire or train backup coordinators to cover different time zones in rotation",
          insight: "You build team capacity",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 7, workLifeBalance: 9 }
        },
        {
          text: "Set boundaries - respond to true emergencies only, train vendors and carriers to handle routine issues independently",
          insight: "You establish clear boundaries",
          scores: { technical: 9, pressure: 8, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 10 }
        }
      ],
      explanation: "Global logistics creates pressure for 24/7 availability. Sustainable careers require systems, not superhuman endurance.",
      realityNote: "Coordinators who try to be available 24/7 burn out within 3 years. Those who build systems and teams sustain 20-year careers."
    },
    {
      id: "q6",
      scenario: "You've optimized routing to save $200K annually. The new routes take 1 day longer. Sales is furious about delivery time impacts. What's your approach?",
      options: [
        {
          text: "Analyze customer impact data - if 1 day doesn't actually hurt sales or satisfaction, defend the optimization with data",
          insight: "You use data to resolve conflicts",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Work with sales to identify which customers truly need faster delivery, create tiered service levels that optimize cost while meeting critical needs",
          insight: "You design segmented solutions",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Revert to faster routes - customer satisfaction trumps cost savings",
          insight: "You prioritize customer experience",
          scores: { technical: 6, pressure: 7, collaboration: 9, creativity: 6, independence: 5, workLifeBalance: 7 }
        },
        {
          text: "Present the trade-off to executive leadership and let them decide between cost savings and delivery speed",
          insight: "You escalate strategic decisions",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 7, independence: 6, workLifeBalance: 7 }
        }
      ],
      explanation: "Logistics optimization involves trade-offs between cost, speed, and service. Great coordinators use data to find the right balance.",
      realityNote: "Sales always wants faster. Finance always wants cheaper. Logistics coordinators who use customer data to guide decisions win both."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 70, weight: 0.25 },
    pressure: { min: -10, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.20 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -20, max: 65, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Logistics Coordinator Potential",
      message: "You demonstrate excellent logistics judgment: crisis management, vendor negotiation, ethical reasoning, and systems thinking. You understand that logistics is about keeping things flowing despite constant disruptions. Global supply chains create real 24/7 pressure - but also critical impact on business success."
    },
    medium: {
      min: 50,
      title: "Logistics Work Possible in Right Setting",
      message: "You have organizational aptitude but may find the constant firefighting, vendor conflicts, or time zone pressure challenging. Consider roles in warehouse management, transportation planning, procurement, or supply chain analytics where you can contribute without 24/7 coordination responsibilities."
    },
    low: {
      min: 0,
      title: "Consider Different Operations Roles",
      message: "Your responses suggest logistics coordination may not suit you. The work requires comfort with constant disruptions, quick decisions with incomplete information, and pressure from multiple stakeholders simultaneously. Consider operations planning, business analysis, or project management with more structure and predictability."
    }
  }
};

// Export mutation for batch 3
export const addQuizzesBatch3 = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    const careerUpdates = [
      {
        id: "jd70fh2447cqa0mzjd87q4fxp57tx6m5" as any,
        title: "Construction Manager",
        quiz: constructionManagerQuiz
      },
      {
        id: "jd7d8gd4qhwq0612qh12fk1z9h7txwkn" as any,
        title: "Environmental Scientist",
        quiz: environmentalScientistQuiz
      },
      {
        id: "jd74e5096a1py3sw56ycekv48d7twmr9" as any,
        title: "Logistics Coordinator",
        quiz: logisticsCoordinatorQuiz
      }
    ];

    for (const update of careerUpdates) {
      try {
        await ctx.db.patch(update.id, {
          realityQuiz: update.quiz
        });
        results.push({
          title: update.title,
          careerId: update.id,
          status: "success"
        });
      } catch (error) {
        results.push({
          title: update.title,
          careerId: update.id,
          status: "error",
          error: String(error)
        });
      }
    }

    return {
      message: "Batch 3 quizzes added (3 careers)",
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.status === "success").length,
        failed: results.filter(r => r.status === "error").length
      }
    };
  }
});

// Digital Marketer Quiz
const digitalMarketerQuiz = {
  title: "A Day as a Digital Marketer",
  description: "Navigate algorithm changes, campaign pressure, and ROI demands. See if you can deliver results in the fast-paced digital world.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "You've spent $20K on a social media campaign. Results are underwhelming - engagement is low and conversions are below target. Your boss wants to know why. What do you do?",
      options: [
        {
          text: "Analyze data thoroughly - audience targeting, creative performance, timing, platform algorithms - present findings with specific optimization recommendations",
          insight: "You diagnose and pivot with data",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Blame algorithm changes or market conditions - sometimes campaigns just don't work despite best efforts",
          insight: "You deflect responsibility",
          scores: { technical: 5, pressure: 6, collaboration: 4, creativity: 4, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Immediately pause and reallocate budget to better-performing channels before spending more",
          insight: "You cut losses quickly",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "A/B test new creative and messaging approaches - maybe the targeting was right but execution was off",
          insight: "You iterate creatively",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Failed campaigns are learning opportunities. Marketers who analyze failures systematically improve; those who make excuses don't.",
      realityNote: "Most digital campaigns underperform initial projections. Your ability to diagnose why and adjust determines your career trajectory."
    },
    {
      id: "q2",
      scenario: "A competitor is using borderline unethical tactics - fake reviews, misleading ads, black-hat SEO. They're gaining market share. Your boss suggests 'fighting fire with fire.' What's your response?",
      options: [
        {
          text: "Refuse - short-term gains from unethical tactics create long-term brand damage and legal risk. Compete on legitimate value and better marketing.",
          insight: "You maintain ethical standards",
          scores: { technical: 10, pressure: 10, collaboration: 8, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Report competitors to platform authorities and regulatory bodies - level the playing field legally",
          insight: "You enforce rules",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Focus on authentic customer testimonials and transparent marketing that contrasts with their shadiness",
          insight: "You compete on authenticity",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Use aggressive but ethical tactics - push boundaries within rules rather than breaking them",
          insight: "You maximize within ethics",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 9, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Digital marketing has gray areas, but unethical tactics eventually backfire through platform penalties or customer backlash.",
      realityNote: "Platforms increasingly crack down on manipulation. Marketers with clean records build sustainable careers; others face bans and burnt reputations."
    },
    {
      id: "q3",
      scenario: "You have $10K monthly budget. Should you spread it across 5 channels (diversified but thin) or concentrate on 2 channels where you see the best results?",
      options: [
        {
          text: "Concentrate on proven channels - better to dominate 2 channels than be mediocre in 5. Scale what works.",
          insight: "You focus resources for impact",
          scores: { technical: 10, pressure: 9, collaboration: 8, creativity: 8, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Allocate 70% to proven channels, 30% to testing new opportunities - balance optimization with discovery",
          insight: "You balance scale and experimentation",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        },
        {
          text: "Diversify to reduce risk - algorithm changes on one platform won't kill your entire program",
          insight: "You prioritize risk management",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 7, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Test everything for 2 months with data tracking, then allocate based on actual ROI performance",
          insight: "You let data drive allocation",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Budget allocation strategy reveals marketing maturity. Data-driven concentration usually beats unfocused diversification.",
      realityNote: "Most successful marketers concentrate resources on 1-3 channels rather than spreading thin. Find what works, then scale it aggressively."
    },
    {
      id: "q4",
      scenario: "Your carefully planned campaign was scheduled for Monday. A major news event breaks over the weekend making your messaging tone-deaf. Campaign assets are approved and scheduled. What do you do?",
      options: [
        {
          text: "Pause everything immediately, assess whether messaging conflicts with news event, adapt or postpone campaign as needed",
          insight: "You prioritize brand sensitivity",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Launch as planned - my campaign has nothing to do with the news event and people need distraction",
          insight: "You proceed regardless",
          scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 5, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Delay by a week to let the news cycle pass, then launch with original messaging",
          insight: "You wait out the storm",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 7, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Adapt messaging to acknowledge the event appropriately while still achieving campaign goals",
          insight: "You pivot creatively",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 10, independence: 10, workLifeBalance: 6 }
        }
      ],
      explanation: "Cultural sensitivity and timing determine whether campaigns build or damage brands. Great marketers read the room.",
      realityNote: "Tone-deaf marketing during crises destroys brands instantly on social media. Marketers who monitor context save companies from viral disasters."
    },
    {
      id: "q5",
      scenario: "A campaign is performing incredibly well - 5X ROI. Your boss wants to 10X the budget immediately to scale results. What's your recommendation?",
      options: [
        {
          text: "Scale gradually - test 2X budget first to see if performance holds, then increase incrementally. Sudden scaling often reduces efficiency.",
          insight: "You scale methodically",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Scale aggressively - when something works this well, maximize it before market conditions change",
          insight: "You seize opportunities",
          scores: { technical: 8, pressure: 10, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "Analyze whether there's enough audience and inventory to support 10X spend without diluting performance",
          insight: "You assess capacity constraints",
          scores: { technical: 10, pressure: 9, collaboration: 9, creativity: 9, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Replicate the success factors to other channels before scaling this one - de-risk and diversify",
          insight: "You spread proven strategies",
          scores: { technical: 9, pressure: 9, collaboration: 9, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Campaign scaling requires understanding diminishing returns. ROI usually drops as you exhaust best audiences and placements.",
      realityNote: "Most campaigns that perform at 5X ROI drop to 2-3X when scaled aggressively. Smart marketers scale methodically to maintain efficiency."
    },
    {
      id: "q6",
      scenario: "You're tracking campaigns across 5 platforms, managing 3 agencies, and reporting to 4 stakeholders. It's 8 PM and you're still responding to Slack messages about campaign performance. What needs to change?",
      options: [
        {
          text: "Build automated dashboards, establish clear reporting schedules, set communication boundaries - create systems to replace constant reactive work",
          insight: "You systematize for sustainability",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 9 }
        },
        {
          text: "This is just digital marketing - fast-paced and always-on. Accept it or choose a different field.",
          insight: "You accept constant availability",
          scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 5, independence: 7, workLifeBalance: -8 }
        },
        {
          text: "Hire or train team members to share the load - one person can't effectively manage this much",
          insight: "You build team capacity",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 9, independence: 7, workLifeBalance: 9 }
        },
        {
          text: "Set specific office hours for non-emergency communications, train stakeholders to respect boundaries",
          insight: "You establish clear boundaries",
          scores: { technical: 8, pressure: 8, collaboration: 9, creativity: 8, independence: 9, workLifeBalance: 10 }
        }
      ],
      explanation: "Digital marketing can be all-consuming without systems and boundaries. Sustainable careers require both strategic automation and personal limits.",
      realityNote: "Marketer burnout is epidemic. Those who build dashboards and boundaries sustain 10+ year careers. Those who stay reactive burn out in 3 years."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 65, weight: 0.25 },
    pressure: { min: -10, max: 70, weight: 0.20 },
    collaboration: { min: -5, max: 70, weight: 0.15 },
    creativity: { min: -5, max: 70, weight: 0.25 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -20, max: 65, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Digital Marketer Potential",
      message: "You demonstrate excellent marketing judgment: data-driven optimization, ethical reasoning, strategic allocation, and cultural awareness. You understand that digital marketing requires both analytical rigor and creative adaptation. The pace is relentless - but you're driving business growth in measurable ways."
    },
    medium: {
      min: 50,
      title: "Digital Marketing Possible in Right Role",
      message: "You have creative or analytical aptitude but may find the constant pressure, platform changes, or always-on culture challenging. Consider roles in content marketing, marketing analytics, brand management, or marketing operations where you can contribute without campaign management pressure."
    },
    low: {
      min: 0,
      title: "Consider Different Marketing Paths",
      message: "Your responses suggest performance digital marketing may not suit you. The work requires comfort with public failure, rapid pivoting, constant algorithm changes, and proving ROI continuously. Consider traditional marketing, public relations, corporate communications, or creative fields with more stability."
    }
  }
};

// Healthcare Administrator Quiz
const healthcareAdministratorQuiz = {
  title: "A Day as a Healthcare Administrator",
  description: "Navigate budget constraints, regulatory compliance, and staff conflicts. See if you can manage healthcare operations under pressure.",
  duration: 6,
  questions: [
    {
      id: "q1",
      scenario: "The hospital is over capacity. The ER has 12-hour wait times. Staff are exhausted and threatening to quit. Budget doesn't allow hiring more nurses immediately. What do you do?",
      options: [
        {
          text: "Implement immediate triage improvements, offer overtime incentives, explore agency staff as bridge solution, present urgent case to board for emergency hiring budget",
          insight: "You address crisis from multiple angles",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 5 }
        },
        {
          text: "This is a systemic healthcare problem - do my best with existing resources and document the capacity crisis for leadership",
          insight: "You accept constraints",
          scores: { technical: 7, pressure: 6, collaboration: 7, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Divert non-emergency cases to clinics, optimize patient flow processes, reduce administrative burden on clinical staff",
          insight: "You optimize operations creatively",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Meet with staff to understand breaking points, advocate fiercely for them with leadership, refuse to perpetuate unsustainable conditions",
          insight: "You prioritize staff wellbeing",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 8, independence: 10, workLifeBalance: 7 }
        }
      ],
      explanation: "Healthcare capacity crises are common. Administrators who find creative solutions while protecting staff prevent complete system collapse.",
      realityNote: "Nurse burnout is driving healthcare staffing crises globally. Administrators who can't solve this lose their entire teams and deliver worse patient outcomes."
    },
    {
      id: "q2",
      scenario: "You discover a physician has been ordering unnecessary expensive tests to increase revenue. The hospital is financially stressed and this revenue has helped. What's your response?",
      options: [
        {
          text: "Investigate thoroughly, document evidence, report to medical board and leadership, terminate if confirmed - patient welfare and ethics are non-negotiable",
          insight: "You enforce medical ethics strictly",
          scores: { technical: 10, pressure: 10, collaboration: 9, creativity: 7, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Have a private conversation with the physician about medical necessity standards and documentation requirements",
          insight: "You address it informally first",
          scores: { technical: 7, pressure: 7, collaboration: 8, creativity: 7, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "This is a medical practice issue - refer to chief medical officer to handle within clinical governance",
          insight: "You defer to clinical authority",
          scores: { technical: 8, pressure: 7, collaboration: 8, creativity: 6, independence: 5, workLifeBalance: 7 }
        },
        {
          text: "Implement utilization review protocols hospital-wide to catch this systematically, not just target one physician",
          insight: "You create systemic solutions",
          scores: { technical: 10, pressure: 9, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 7 }
        }
      ],
      explanation: "Healthcare fraud and abuse harm patients and violate law. Administrators who look the other way become complicit and liable.",
      realityNote: "Unnecessary medical procedures cause harm and waste billions. Administrators who enforce evidence-based care protect patients and institutional integrity."
    },
    {
      id: "q3",
      scenario: "A nurse made a medication error that harmed a patient. The error resulted from short-staffing and exhaustion you were aware of. How do you handle this?",
      options: [
        {
          text: "Support the nurse while investigating root causes, acknowledge system failures that contributed, implement changes to prevent recurrence, ensure patient care and family communication",
          insight: "You address systems not just individuals",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 9, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "The nurse made the error and must face consequences - individual accountability is essential for patient safety",
          insight: "You enforce individual responsibility",
          scores: { technical: 7, pressure: 7, collaboration: 5, creativity: 5, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Consult legal and risk management immediately - this is potential malpractice liability",
          insight: "You prioritize legal protection",
          scores: { technical: 8, pressure: 8, collaboration: 6, creativity: 6, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Implement just culture framework - distinguish between human error, at-risk behavior, and reckless behavior to determine appropriate response",
          insight: "You use evidence-based safety culture",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 10, workLifeBalance: 7 }
        }
      ],
      explanation: "Medical errors are often system failures. Administrators who blame individuals rather than fixing systems create cultures of fear where errors are hidden.",
      realityNote: "Just culture approaches reduce medical errors by 40-60%. Punitive cultures increase errors because staff hide mistakes rather than reporting them for system improvement."
    },
    {
      id: "q4",
      scenario: "Insurance reimbursements are declining but costs keep rising. The board wants you to cut 15% from the budget. Patient care quality cannot decrease. What's your strategy?",
      options: [
        {
          text: "Analyze spending systematically - reduce administrative overhead, optimize supply chain, eliminate waste, automate processes before touching clinical staff",
          insight: "You protect clinical capacity",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 10, workLifeBalance: 6 }
        },
        {
          text: "Healthcare costs are mostly labor - across-the-board hiring freeze and salary reductions are unavoidable",
          insight: "You accept staff cuts",
          scores: { technical: 6, pressure: 7, collaboration: 5, creativity: 5, independence: 7, workLifeBalance: 7 }
        },
        {
          text: "Push back on the board - 15% cuts while maintaining quality is impossible. Present data showing the trade-offs honestly.",
          insight: "You challenge unrealistic demands",
          scores: { technical: 9, pressure: 9, collaboration: 8, creativity: 7, independence: 10, workLifeBalance: 7 }
        },
        {
          text: "Find revenue opportunities - improve coding accuracy, reduce denials, add profitable service lines, increase patient volume efficiency",
          insight: "You solve through revenue not just cuts",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 10, workLifeBalance: 6 }
        }
      ],
      explanation: "Healthcare financial pressures are relentless. Administrators who find efficiency without compromising care sustain operations; others create disasters.",
      realityNote: "Most healthcare spending is labor, supplies, and overhead - in that order. Smart administrators attack overhead and waste aggressively before touching clinical capacity."
    },
    {
      id: "q5",
      scenario: "You're implementing a new electronic health records system. Physicians hate it and are threatening mass resignation. The system cost $10M and can't be undone. What do you do?",
      options: [
        {
          text: "Listen to specific complaints, form physician advisory group, customize workflows to address concerns, provide extensive training and support, phase implementation to reduce disruption",
          insight: "You respond to user needs",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 9, workLifeBalance: 6 }
        },
        {
          text: "EHR transitions are always hard - give them time to adjust and they'll eventually accept it",
          insight: "You wait it out",
          scores: { technical: 6, pressure: 6, collaboration: 5, creativity: 5, independence: 6, workLifeBalance: 7 }
        },
        {
          text: "Remind them they don't control technology decisions - implementation continues regardless of complaints",
          insight: "You assert authority",
          scores: { technical: 5, pressure: 7, collaboration: 3, creativity: 4, independence: 8, workLifeBalance: 7 }
        },
        {
          text: "Hire scribes or provide administrative support to reduce physicians' documentation burden during transition",
          insight: "You provide transition support",
          scores: { technical: 9, pressure: 9, collaboration: 10, creativity: 9, independence: 8, workLifeBalance: 7 }
        }
      ],
      explanation: "Healthcare technology implementations fail more often from change management than technical issues. Physician buy-in is essential.",
      realityNote: "EHR implementations have destroyed physician satisfaction and patient care at many hospitals. Success requires involving clinicians early and responding to workflow concerns seriously."
    },
    {
      id: "q6",
      scenario: "You're on call 24/7 for facility emergencies. Your family barely sees you. Your health is suffering. The job seems to require constant availability. What's your approach?",
      options: [
        {
          text: "Build administrative team depth, establish clear escalation protocols, rotate on-call duties, create systems that don't depend on one person",
          insight: "You build sustainable systems",
          scores: { technical: 10, pressure: 10, collaboration: 10, creativity: 10, independence: 8, workLifeBalance: 10 }
        },
        {
          text: "Healthcare administration requires sacrifice - accept this or find a different career",
          insight: "You accept the demands",
          scores: { technical: 6, pressure: 7, collaboration: 6, creativity: 5, independence: 7, workLifeBalance: -8 }
        },
        {
          text: "Set boundaries - respond to true emergencies only, train others to handle routine issues independently",
          insight: "You establish clear boundaries",
          scores: { technical: 8, pressure: 8, collaboration: 8, creativity: 8, independence: 9, workLifeBalance: 10 }
        },
        {
          text: "This job isn't sustainable - look for administrative roles in less acute-care settings with better work-life balance",
          insight: "You seek different setting",
          scores: { technical: 7, pressure: 6, collaboration: 7, creativity: 7, independence: 8, workLifeBalance: 10 }
        }
      ],
      explanation: "Healthcare administration can consume your life without boundaries. Sustainable careers require building teams and systems that don't depend on one person.",
      realityNote: "Healthcare administrator burnout mirrors clinician burnout. Those who build strong teams and clear protocols sustain long careers. Single points of failure burn out."
    }
  ],
  scoringGuide: {
    technical: { min: -5, max: 70, weight: 0.25 },
    pressure: { min: -10, max: 70, weight: 0.25 },
    collaboration: { min: -5, max: 70, weight: 0.20 },
    creativity: { min: -5, max: 70, weight: 0.15 },
    independence: { min: -5, max: 70, weight: 0.10 },
    workLifeBalance: { min: -20, max: 70, weight: 0.05 }
  },
  results: {
    high: {
      min: 70,
      title: "Strong Healthcare Administrator Potential",
      message: "You demonstrate excellent healthcare management judgment: systems thinking, ethical reasoning, financial creativity, and staff advocacy. You understand that healthcare administration means balancing impossible constraints - budget, quality, compliance, and staff wellbeing - with life-or-death stakes. The pressure is immense but the impact is profound."
    },
    medium: {
      min: 50,
      title: "Healthcare Administration Possible in Right Setting",
      message: "You have organizational aptitude but may find the complexity, pressure, or ethical dilemmas challenging. Consider roles in healthcare consulting, health IT, practice management, or public health administration where you can contribute without acute-care hospital pressure."
    },
    low: {
      min: 0,
      title: "Consider Different Healthcare Roles",
      message: "Your responses suggest healthcare administration may not suit you. The work requires comfort with impossible trade-offs, constant crises, regulatory complexity, and being accountable for outcomes you don't fully control. Consider clinical roles, healthcare policy, medical research, or health education where you can help people differently."
    }
  }
};

// Export mutation for final batch
export const addQuizzesBatch4 = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    const careerUpdates = [
      {
        id: "jd75gtwma2ndt5gq9e2cysp4917twjck" as any,
        title: "Digital Marketer",
        quiz: digitalMarketerQuiz
      },
      {
        id: "jd7d4bab2vvv4cynj62hbyvyw97twxde" as any,
        title: "Healthcare Administrator",
        quiz: healthcareAdministratorQuiz
      }
    ];

    for (const update of careerUpdates) {
      try {
        await ctx.db.patch(update.id, {
          realityQuiz: update.quiz
        });
        results.push({
          title: update.title,
          careerId: update.id,
          status: "success"
        });
      } catch (error) {
        results.push({
          title: update.title,
          careerId: update.id,
          status: "error",
          error: String(error)
        });
      }
    }

    return {
      message: "🎉 FINAL BATCH! All 11 reality quizzes completed!",
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.status === "success").length,
        failed: results.filter(r => r.status === "error").length
      }
    };
  }
});

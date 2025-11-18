/**
 * Pharmacist Reality Quiz
 * 
 * Tests skills in:
 * - Technical understanding (very high)
 * - Pressure handling (high)
 * - Collaboration (medium-high)
 * - Creativity (low-medium)
 * - Independence (medium)
 * - Work-life balance (medium)
 */

export const pharmacistQuiz = {
  careerTitle: "Pharmacist",
  questions: [
    {
      id: 1,
      question: "A patient presents a prescription for a medication that could interact dangerously with another medication on their profile. The prescribing doctor is known to be defensive. What do you do?",
      options: [
        {
          text: "Refuse to dispense, call the doctor to discuss the interaction with specific clinical reasoning, document everything, explain the situation professionally to the patient",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 3,
            creativity: 2,
            independence: 4,
            workLifeBalance: 2
          }
        },
        {
          text: "Dispense the medication but counsel the patient extensively about warning signs and tell them to call their doctor if issues arise",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Ask another pharmacist for their opinion before making a decision",
          scores: {
            technical: 3,
            pressure: 2,
            collaboration: 3,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Dispense as written - the doctor knows the patient's full medical history better than you do",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 0,
            independence: 1,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 2,
      question: "You're 30 minutes from closing, there's a line of 8 people, and a patient arrives with a complex insurance issue that will take 20 minutes to resolve. How do you handle it?",
      options: [
        {
          text: "Apologize to those waiting, efficiently help the complex case, keep everyone updated on wait times, stay late if needed to help everyone",
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
          text: "Ask the complex case to come back tomorrow when you have more time to help them properly",
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
          text: "Have a technician help the simpler cases while you work on the complex one in parallel",
          scores: {
            technical: 3,
            pressure: 3,
            collaboration: 3,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Spend 5 minutes on their case, then tell them to call their insurance company to sort it out",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 3,
      question: "A regular patient asks for your recommendation on an over-the-counter supplement they saw advertised online. You know it's not evidence-based and potentially unsafe. How do you respond?",
      options: [
        {
          text: "Explain why it's not recommended citing specific evidence, offer proven alternatives, educate about evaluating health claims, maintain respectful tone",
          scores: {
            technical: 4,
            pressure: 3,
            collaboration: 4,
            creativity: 2,
            independence: 3,
            workLifeBalance: 3
          }
        },
        {
          text: "Tell them it's their choice but you wouldn't recommend it without going into details",
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
          text: "Sell them the product if they insist - they're adults and it's not prescription",
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
          text: "Give them printed resources to read at home so you can help the next customer",
          scores: {
            technical: 2,
            pressure: 1,
            collaboration: 1,
            creativity: 2,
            independence: 2,
            workLifeBalance: 3
          }
        }
      ]
    },
    {
      id: 4,
      question: "Your pharmacy is consistently short-staffed, leading to long wait times and stressed employees. Corporate keeps promising to hire but hasn't. What do you do?",
      options: [
        {
          text: "Document impact on patient safety and employee wellbeing, present data to corporate with specific staffing needs, explore temporary solutions like adjusted hours or workflow changes",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Work extra hours yourself to cover gaps and keep patients happy",
          scores: {
            technical: 2,
            pressure: 3,
            collaboration: 3,
            creativity: 1,
            independence: 2,
            workLifeBalance: 0
          }
        },
        {
          text: "Reduce services offered to match available staffing levels",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 2,
            creativity: 2,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Accept that this is just how retail pharmacy works and do your best",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 1,
            creativity: 0,
            independence: 1,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 5,
      question: "A patient becomes verbally aggressive when told their insurance won't cover their medication and the cash price is $400. What's your approach?",
      options: [
        {
          text: "Stay calm and professional, explain the situation, offer alternatives like generic versions, manufacturer coupons, or patient assistance programs, involve manager if needed for safety",
          scores: {
            technical: 3,
            pressure: 4,
            collaboration: 4,
            creativity: 3,
            independence: 3,
            workLifeBalance: 2
          }
        },
        {
          text: "Firmly explain that you don't control insurance or prices and they need to speak to their insurance company",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 1,
            creativity: 1,
            independence: 2,
            workLifeBalance: 3
          }
        },
        {
          text: "Immediately call security or the manager to deal with the aggressive patient",
          scores: {
            technical: 1,
            pressure: 2,
            collaboration: 2,
            creativity: 1,
            independence: 1,
            workLifeBalance: 3
          }
        },
        {
          text: "Give them a discount or free samples to de-escalate the situation quickly",
          scores: {
            technical: 1,
            pressure: 1,
            collaboration: 2,
            creativity: 2,
            independence: 2,
            workLifeBalance: 2
          }
        }
      ]
    },
    {
      id: 6,
      question: "You notice a pattern of a specific prescriber writing unusual opioid prescriptions. This could be legitimate pain management or potential abuse/diversion. What do you do?",
      options: [
        {
          text: "Review prescriptions against clinical guidelines, check prescription monitoring program, consult with prescriber professionally, report to regulatory authorities if concerns persist, document everything",
          scores: {
            technical: 4,
            pressure: 4,
            collaboration: 3,
            creativity: 2,
            independence: 4,
            workLifeBalance: 2
          }
        },
        {
          text: "Discuss concerns with colleagues first to see if they've noticed the same patterns",
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
          text: "Continue filling valid prescriptions - it's not your place to question licensed prescribers",
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
          text: "Refuse to fill any more prescriptions from that prescriber to protect your license",
          scores: {
            technical: 2,
            pressure: 2,
            collaboration: 0,
            creativity: 1,
            independence: 3,
            workLifeBalance: 3
          }
        }
      ]
    }
  ],
  
  scoringGuide: {
    technical: {
      weight: 3.5,
      description: "Clinical knowledge, drug interactions, and evidence-based practice"
    },
    pressure: {
      weight: 2.5,
      description: "Handling high-volume workflow and difficult situations"
    },
    collaboration: {
      weight: 2.0,
      description: "Working with patients, doctors, insurance companies, and staff"
    },
    creativity: {
      weight: 1.0,
      description: "Problem-solving within regulatory constraints"
    },
    independence: {
      weight: 2.5,
      description: "Making clinical decisions and standing up to prescribers when needed"
    },
    workLifeBalance: {
      weight: 1.5,
      description: "Managing retail hours and workload"
    }
  },
  
  resultInterpretation: {
    high: {
      threshold: 70,
      title: "Strong Pharmacy Potential",
      message: "You show excellent pharmacy instincts! Your responses indicate strong clinical judgment, patient advocacy, and the ability to handle pressure while maintaining safety standards. Pharmacists are the last line of defense against medication errors - you seem ready for that responsibility."
    },
    medium: {
      threshold: 45,
      title: "Consider Your Comfort with Confrontation",
      message: "You have some pharmacy skills, but may struggle with the need to challenge prescribers or handle difficult patient interactions. Pharmacists must be willing to say 'no' when patient safety is at risk, even when it's uncomfortable. The job also requires standing for long hours in high-volume environments."
    },
    low: {
      threshold: 0,
      title: "Pharmacy May Not Be The Right Fit",
      message: "Based on your responses, you might find pharmacy practice stressful or ethically conflicting. The role requires constant vigilance, willingness to have difficult conversations, and ability to maintain accuracy under pressure in retail environments. Consider roles in pharmaceutical research, medical writing, or healthcare IT where the clinical knowledge is valuable but the patient-facing pressure is different."
    }
  }
};

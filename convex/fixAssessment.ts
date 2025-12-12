import { internalMutation } from "./_generated/server";

/**
 * Quick fix: Clear old assessments and create the new 25-question one
 * 
 * Run this from terminal: npx convex run fixAssessment:fix
 */
export const fix = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear ALL existing assessments
    const assessments = await ctx.db.query("assessments").collect();
    for (const assessment of assessments) {
      await ctx.db.delete(assessment._id);
    }

    // Create NEW 25-question assessment
    const assessmentId = await ctx.db.insert("assessments", {
      type: "interests",
      title: "Career Discovery Assessment",
      description: "25 quick questions to find careers that match your interests, values, and work style",
      icon: "🎯",
      duration: 15,
      questionCount: 25,
      questions: [
        // Q1-2: Realistic
        { id: "q1", text: "I enjoy hands-on work like fixing things (electronics, machines, motorbikes, tools)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q2", text: "I prefer practical work (field/site/workshop) over sitting at a desk all day", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q3-4: Investigative
        { id: "q3", text: "I enjoy investigating a problem until I understand what’s really going on", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q4", text: "I like learning from data, experiments, or evidence (not just opinions)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q5-6: Artistic
        { id: "q5", text: "I enjoy creating or improving things like designs, videos, photos, music, or writing", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q6", text: "I like work where I can express ideas and do things in my own style", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q7-8: Social
        { id: "q7", text: "I enjoy helping people learn (teaching, explaining, coaching, mentoring)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q8", text: "I’m interested in work that supports people directly (health, community work, counseling)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q9-10: Enterprising
        { id: "q9", text: "I enjoy leading projects and making decisions that affect outcomes", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q10", text: "I like persuading people (sales, pitching ideas, negotiating, entrepreneurship)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q11-12: Conventional
        { id: "q11", text: "I like organizing information (files, records, numbers, schedules) to keep things running", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q12", text: "I prefer clear instructions and processes (standards, checklists, rules)", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q13-18: Work Values
        { id: "q13", text: "Which matters more right now?", type: "multiple_choice", options: ["Higher income even if the work is repetitive", "Meaningful work even if income is lower"] },
        { id: "q14", text: "Choose one:", type: "multiple_choice", options: ["Stable routine + predictable hours", "Fast growth even with longer hours"] },
        { id: "q15", text: "What matters more?", type: "multiple_choice", options: ["Freedom to choose how you work", "Security and predictability"] },
        { id: "q16", text: "Which direction feels closer to you?", type: "multiple_choice", options: ["Helping people directly", "Building/leading a business"] },
        { id: "q17", text: "Would you rather:", type: "multiple_choice", options: ["Control your schedule and work independently", "Have a structured job with benefits"] },
        { id: "q18", text: "Choose what matters most:", type: "multiple_choice", options: ["Learning fast and advancing", "Work-life balance and stability"] },
        // Q19-22: Big Five Personality
        { id: "q19", text: "I like trying new ideas and new ways of doing things", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q20", text: "I plan ahead and follow through on my plans", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q21", text: "I often do important work at the last minute", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        { id: "q22", text: "I gain energy from being around many people", type: "scale", scaleMin: 0, scaleMax: 4, scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" } },
        // Q23-25: Work Style Scenarios
        { id: "q23", text: "Your team is behind schedule. You usually:", type: "multiple_choice", options: ["Take charge and assign tasks to catch up", "Bring the team together and agree on a plan", "Focus on finishing your part extremely well", "Keep people calm and motivated so the team works better"] },
        { id: "q24", text: "When you face a hard problem, you prefer to:", type: "multiple_choice", options: ["Research deeply before choosing a solution", "Try different options fast and learn by doing", "Talk with others to hear different perspectives", "Break it into steps and solve systematically"] },
        { id: "q25", text: "Which environment fits you best?", type: "multiple_choice", options: ["Quiet place, clear tasks, minimal interruptions", "Fast-changing place with lots of teamwork", "A mix of solo work and teamwork", "Flexible/remote work with occasional meetings"] },
      ],
    });

    return {
      success: true,
      message: "✅ Successfully created 25-question assessment!",
      assessmentId,
    };
  },
});


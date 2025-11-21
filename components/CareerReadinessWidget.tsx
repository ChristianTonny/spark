"use client";

import { Trophy, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CareerReadinessWidgetProps {
  profile: any;
}

export function CareerReadinessWidget({ profile }: CareerReadinessWidgetProps) {
  // Score calculation based on profile data
  const calculateScore = () => {
    let score = 0;
    if (profile?.gradeLevel && profile?.school) score += 15;
    if (profile?.assessmentsTaken > 0) score += 35;
    if ((profile?.careersExplored || 0) >= 3) score += 20;
    if (profile?.chatsCompleted > 0 || profile?.chatsUpcoming > 0) score += 30;
    return Math.min(score, 100);
  };

  const score = calculateScore();
  
  // Determine level and color
  let level = "Explorer";
  let color = "bg-brutal-yellow";
  let message = "Start your journey by taking an assessment.";
  
  if (score >= 75) {
    level = "Career Ready";
    color = "bg-brutal-green";
    message = "You're well prepared! Keep refining your skills.";
  } else if (score >= 50) {
    level = "Rising Star";
    color = "bg-brutal-orange";
    message = "Great progress! Connect with mentors to level up.";
  } else if (score >= 25) {
    level = "Active Learner";
    color = "bg-brutal-blue";
    message = "You're learning fast. Try a reality quiz next.";
  }

  // Checklist items based on scoring logic
  const checklist = [
    { label: "Complete Profile", done: (profile?.gradeLevel && profile?.school) },
    { label: "Take Assessment", done: profile?.assessmentsTaken > 0 },
    { label: "Save 3 Careers", done: (profile?.careersExplored || 0) >= 3 }, // Approximation based on available data
    { label: "Take Reality Quiz", done: score >= 40 && profile?.assessmentsTaken > 0 }, // Heuristic as we don't have quiz count directly in profile for display easily without extra query, relying on score correlation
    { label: "Book Mentor", done: profile?.chatsCompleted > 0 || profile?.chatsUpcoming > 0 },
  ];

  // Find next actionable step
  const nextStep = checklist.find(item => !item.done);

  return (
    <div className="bg-white border-3 border-black shadow-brutal-lg p-4 sm:p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        
        {/* Score Circle */}
        <div className="flex-shrink-0 relative">
          <div className={`w-32 h-32 rounded-full border-4 border-black flex items-center justify-center ${color} relative z-10`}>
            <div className="text-center text-white">
              <span className="block text-4xl font-black leading-none">{score}</span>
              <span className="block text-xs font-bold uppercase mt-1">Score</span>
            </div>
          </div>
          <div className="absolute top-2 left-2 w-32 h-32 rounded-full bg-black -z-0"></div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                Career Readiness
              </h2>
              <p className="font-bold text-gray-700">{level}: {message}</p>
            </div>
            <Trophy className="w-8 h-8 hidden sm:block" />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-100 border-2 border-black mb-4 rounded-full overflow-hidden">
            <div 
              className={`h-full ${color} transition-all duration-1000 ease-out`}
              style={{ width: `${score}%` }}
            ></div>
          </div>

          {/* Next Step / Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-gray-50 border-2 border-black">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <div>
                <span className="block text-xs font-bold uppercase text-gray-500">Next Step</span>
                <span className="font-bold">{nextStep ? nextStep.label : "Maintain your streak!"}</span>
              </div>
            </div>
            
            {nextStep && (
              <Link href={
                nextStep.label === "Complete Profile" ? "/dashboard/student/profile" :
                nextStep.label === "Take Assessment" ? "/assessments" :
                nextStep.label === "Save 3 Careers" ? "/careers" :
                nextStep.label === "Book Mentor" ? "/mentors" :
                "/careers" // Default for Reality Quiz (found on career pages)
              }>
                <button className="w-full sm:w-auto px-4 py-2 bg-black text-white font-bold uppercase text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                  Go <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


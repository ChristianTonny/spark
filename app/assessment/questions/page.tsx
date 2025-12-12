'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Spinner } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

export default function AssessmentQuestionsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useConvexAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch assessments and careers from Convex
  const assessments = useQuery(api.assessments.list);
  const allCareers = useQuery(api.careers.list);
  const saveResult = useMutation(api.assessments.saveResult);

  // Resume a pending assessment save after sign-in
  useEffect(() => {
    if (authLoading || !user) return;
    if (typeof window === "undefined") return;
    if (isSaving) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("resume") !== "1") return;

    const pendingRaw = window.localStorage.getItem("pending_assessment_result");
    if (!pendingRaw) return;

    try {
      const pending = JSON.parse(pendingRaw) as {
        assessmentId: string;
        answers: Record<string, number>;
        careerMatches: any[];
        scores?: any;
      };

      // Clear before attempting save (avoid loops)
      window.localStorage.removeItem("pending_assessment_result");
      setIsSaving(true);

      saveResult({
        assessmentId: pending.assessmentId as any,
        answers: pending.answers,
        careerMatches: pending.careerMatches as any,
        scores: pending.scores,
      })
        .then((result) => {
          router.replace(`/assessment/results?id=${result.resultId}`);
        })
        .catch((error) => {
          console.error("Failed to save pending assessment result:", error);
          setIsSaving(false);
        });
    } catch {
      window.localStorage.removeItem("pending_assessment_result");
    }
  }, [authLoading, user, isSaving, router, saveResult]);

  if (assessments === undefined || allCareers === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessments || assessments.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">No assessments available</p>
        </div>
      </div>
    );
  }

  if (!allCareers || allCareers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">No careers available</p>
        </div>
      </div>
    );
  }

  // Use the assessment with the most questions (should be the 12-question RIASEC one)
  const assessment = assessments.reduce((latest, current) =>
    current.questionCount > latest.questionCount ? current : latest
  );
  const questions = assessment.questions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = async () => {
    if (selectedOption !== null) {
      // Save answer
      const updatedAnswers = {
        ...answers,
        [questions[currentQuestion].id]: selectedOption,
      };
      setAnswers(updatedAnswers);

      // Move to next question or finish
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Assessment complete - save to Convex and redirect
        setIsSaving(true);

        try {
          // Calculate student profile from answers using RIASEC algorithm
          const {
            calculateProfileFromAnswers,
            matchStudentToCareers,
            getTop3RIASEC,
          } = await import('@/lib/assessment-algorithm');

          const studentProfile = calculateProfileFromAnswers(updatedAnswers);

          // Match student to all careers (get top 25 instead of 10)
          const matches = matchStudentToCareers(studentProfile, allCareers, 25);

          // Format matches for Convex
          const careerMatches = matches.map(match => ({
            careerId: match.careerId,
            matchPercentage: match.matchPercentage,
            matchReasons: match.matchReasons,
            interestScore: match.interestScore,
            valueScore: match.valueScore,
            personalityScore: match.personalityScore, // NEW
            environmentScore: match.environmentScore,
          }));

          // Format scores for storage and display
          const scores = {
            riasec: studentProfile.riasec,
            values: studentProfile.values,
            bigFive: studentProfile.bigFive,
            workStyle: studentProfile.workStyle,
            environment: studentProfile.environment,
            topRIASEC: getTop3RIASEC(studentProfile.riasec),
          };

          // If not signed in, ask user to sign in to save results
          if (!user) {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "pending_assessment_result",
                JSON.stringify({
                  assessmentId: assessment._id,
                  answers: updatedAnswers,
                  careerMatches,
                  scores,
                })
              );
            }
            router.push(
              `/sign-in?returnTo=${encodeURIComponent("/assessment/questions?resume=1")}`
            );
            return;
          }

          const result = await saveResult({
            assessmentId: assessment._id,
            answers: updatedAnswers,
            careerMatches,
            scores, // NEW: Pass scores for display
          });

          // Redirect to results page with the result ID
          router.push(`/assessment/results?id=${result.resultId}`);
        } catch (error) {
          console.error('Failed to save assessment result:', error);
          setIsSaving(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Restore previous answer if exists
      const previousAnswer = answers[questions[currentQuestion - 1].id];
      setSelectedOption(previousAnswer !== undefined ? previousAnswer : null);
    } else {
      router.push('/assessment');
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-black uppercase text-gray-600">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-black uppercase text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full h-4 bg-white border-3 border-black overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out border-r-3 border-black"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border-3 border-black shadow-brutal-lg p-8 md:p-12 mb-6">
          <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
            {question.text}
          </h2>

          {/* Options - Multiple Choice */}
          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-6 text-left font-bold text-lg border-3 border-black transition-all ${
                    selectedOption === index
                      ? 'bg-primary text-white shadow-brutal-lg translate-x-[-4px] translate-y-[-4px]'
                      : 'bg-white hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption === index && (
                      <Check className="w-6 h-6 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Options - Likert Scale */}
          {question.type === 'scale' && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                <span>{question.scaleLabels?.min}</span>
                <span>{question.scaleLabels?.max}</span>
              </div>
              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleOptionSelect(value)}
                    className={`w-16 h-16 md:w-20 md:h-20 font-black text-2xl border-3 border-black transition-all ${
                      selectedOption === value
                        ? 'bg-primary text-white shadow-brutal-lg translate-x-[-4px] translate-y-[-4px]'
                        : 'bg-white hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]'
                    }`}
                  >
                    {value + 1}
                  </button>
                ))}
              </div>
              <div className="text-center text-sm font-bold text-gray-600 mt-4">
                1 = Strongly Disagree &nbsp;•&nbsp; 5 = Strongly Agree
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex-1 px-6 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            {currentQuestion < totalQuestions - 1 ? (
              <ArrowRight className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-sm font-bold text-gray-600 mt-6">
          💡 Tip: Choose the answer that best describes you - there are no wrong answers!
        </p>
      </div>

      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-3 border-black shadow-brutal-lg p-8 text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-xl font-bold">Analyzing your responses...</p>
            <p className="text-gray-600 font-medium">Finding your perfect career matches</p>
          </div>
        </div>
      )}
    </div>
  );
}

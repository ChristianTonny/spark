'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessments || assessments.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">No assessments available</p>
        </div>
      </div>
    );
  }

  if (!allCareers || allCareers.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">No careers available</p>
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
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* Header with progress */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Question */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
              {question.text}
            </h2>
          </div>

          {/* Options - Multiple Choice */}
          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-5 text-left font-medium text-base rounded-lg border-2 transition-all ${
                    selectedOption === index
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption === index && (
                      <Check className="w-5 h-5 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Options - Likert Scale */}
          {question.type === 'scale' && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>{question.scaleLabels?.min || 'Strongly Disagree'}</span>
                <span>{question.scaleLabels?.max || 'Strongly Agree'}</span>
              </div>
              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleOptionSelect(value)}
                    className={`w-14 h-14 md:w-16 md:h-16 font-semibold text-xl rounded-lg border-2 transition-all ${
                      selectedOption === value
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {value + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-10">
            <button
              onClick={handleBack}
              className="px-5 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? 'Continue' : 'See Results'}
              {currentQuestion < totalQuestions - 1 ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Tip */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Choose the answer that feels most like you
          </p>
        </div>
      </div>

      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center p-8">
            <Spinner size="lg" />
            <p className="mt-4 text-xl font-semibold text-gray-900">Analyzing your responses...</p>
            <p className="text-gray-600 mt-1">Finding your career matches</p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { assessments } from '@/lib/data';

export default function AssessmentQuestionsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const assessment = assessments[0]; // Career Discovery Assessment
  const questions = assessment.questions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      // Save answer
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: selectedOption,
      });

      // Move to next question or finish
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Assessment complete - redirect to results
        router.push('/assessment/results');
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

          {/* Options */}
          <div className="space-y-4">
            {question.options?.map((option, index) => (
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
    </div>
  );
}

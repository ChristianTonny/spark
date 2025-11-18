import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, AlertCircle, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/hooks/use-toast';

interface QuizOption {
  text: string;
  insight: string;
  scores: {
    technical?: number;
    pressure?: number;
    collaboration?: number;
    creativity?: number;
    independence?: number;
    workLifeBalance?: number;
  };
}

interface QuizQuestion {
  id: string;
  scenario: string;
  options: QuizOption[];
  correctAnswer?: number;
  explanation: string;
  realityNote: string;
}

interface ScoringGuide {
  technical: { min: number; max: number; weight: number };
  pressure: { min: number; max: number; weight: number };
  collaboration: { min: number; max: number; weight: number };
  creativity: { min: number; max: number; weight: number };
  independence: { min: number; max: number; weight: number };
  workLifeBalance: { min: number; max: number; weight: number };
}

interface ResultTier {
  min: number;
  title: string;
  message: string;
}

interface QuizData {
  title: string;
  description: string;
  duration: number;
  questions: QuizQuestion[];
  scoringGuide: ScoringGuide;
  results: {
    high: ResultTier;
    medium: ResultTier;
    low: ResultTier;
  };
}

interface RealityQuizProps {
  quiz: QuizData;
  careerId: string;
  careerTitle: string;
}

export function RealityQuiz({ quiz, careerId, careerTitle }: RealityQuizProps) {
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const saveResult = useMutation(api.quizResults.saveResult);

  const handleStart = () => {
    setStarted(true);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    if (!showExplanation) {
      // Show explanation first
      setShowExplanation(true);
    } else {
      // Save answer and move to next
      const updatedAnswers = {
        ...answers,
        [quiz.questions[currentQuestion].id]: selectedOption,
      };
      setAnswers(updatedAnswers);

      if (currentQuestion < quiz.questions.length - 1) {
        // Next question
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowExplanation(false);
      } else {
        // Quiz complete - calculate results
        calculateResults(updatedAnswers);
      }
    }
  };

  const handleBack = () => {
    if (showExplanation) {
      setShowExplanation(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[quiz.questions[currentQuestion - 1].id];
      setSelectedOption(previousAnswer ?? null);
      setShowExplanation(false);
    }
  };

  const calculateResults = async (finalAnswers: Record<string, number>) => {
    // Calculate scores for each dimension
    const scores = {
      technical: 0,
      pressure: 0,
      collaboration: 0,
      creativity: 0,
      independence: 0,
      workLifeBalance: 0,
    };

    // Sum up scores from all answers
    quiz.questions.forEach((question, index) => {
      const answerIndex = finalAnswers[question.id];
      if (answerIndex !== undefined) {
        const option = question.options[answerIndex];
        Object.keys(option.scores).forEach((key) => {
          const scoreKey = key as keyof typeof scores;
          scores[scoreKey] += option.scores[scoreKey] || 0;
        });
      }
    });

    // Normalize scores to 0-100 scale and apply weights
    let weightedTotal = 0;
    let totalWeight = 0;

    Object.keys(scores).forEach((key) => {
      const scoreKey = key as keyof typeof scores;
      const guide = quiz.scoringGuide[scoreKey];

      // Normalize to 0-100
      const range = guide.max - guide.min;
      const normalized = range > 0
        ? Math.max(0, Math.min(100, ((scores[scoreKey] - guide.min) / range) * 100))
        : 50; // Default to middle if no range

      scores[scoreKey] = normalized;

      // Apply weight
      weightedTotal += normalized * guide.weight;
      totalWeight += guide.weight;
    });

    // Calculate overall readiness percentage
    const readinessPercentage = Math.round(weightedTotal / totalWeight);

    // Determine result tier
    let resultTier: 'high' | 'medium' | 'low';
    if (readinessPercentage >= quiz.results.high.min) {
      resultTier = 'high';
    } else if (readinessPercentage >= quiz.results.medium.min) {
      resultTier = 'medium';
    } else {
      resultTier = 'low';
    }

    const finalResults = {
      scores,
      readinessPercentage,
      resultTier,
      message: quiz.results[resultTier],
    };

    setResults(finalResults);
    setCompleted(true);

    // Save to database
    try {
      await saveResult({
        careerId: careerId as any,
        answers: finalAnswers,
        scores,
        readinessPercentage,
        resultTier,
      });
    } catch (error) {
      toast({
        title: "Failed to Save Results",
        description: error instanceof Error ? error.message : "Your results couldn't be saved. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (score >= 40) return <Minus className="w-4 h-4 text-yellow-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!started) {
    return (
      <div className="bg-white border-3 border-black shadow-brutal-lg p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-brutal-yellow border-3 border-black flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">
              {quiz.title}
            </h3>
            <p className="text-gray-700 font-medium mb-4">
              {quiz.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-600">
              <span>⏱️ {quiz.duration} minutes</span>
              <span>❓ {quiz.questions.length} scenarios</span>
              <span>📊 Career readiness score</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full px-6 py-4 bg-brutal-orange text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
        >
          Try This Career
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (completed && results) {
    const readinessColor =
      results.readinessPercentage >= 70 ? 'bg-brutal-green' :
      results.readinessPercentage >= 50 ? 'bg-brutal-yellow' :
      'bg-brutal-pink';

    return (
      <div className="bg-white border-3 border-black shadow-brutal-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black uppercase mb-4">Quiz Complete!</h3>

          <div className={`inline-block ${readinessColor} border-3 border-black px-8 py-6 mb-6`}>
            <div className="text-6xl font-black mb-2">{results.readinessPercentage}%</div>
            <div className="text-xl font-bold uppercase">{results.message.title}</div>
          </div>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {results.message.message}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(results.scores).map(([key, value]) => (
            <div key={key} className="border-2 border-black p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {getScoreIcon(value as number)}
              </div>
              <div className={`text-2xl font-black ${getScoreColor(value as number)}`}>
                {Math.round(value as number)}%
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brutal-yellow border-3 border-black p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-black uppercase mb-2">What This Means</h4>
              <p className="text-sm font-medium">
                This quiz shows how your responses align with the day-to-day realities of being a {careerTitle}.
                {results.readinessPercentage >= 70 && ' Your answers suggest strong alignment with this career path.'}
                {results.readinessPercentage >= 50 && results.readinessPercentage < 70 && ' You have some alignment, but consider exploring more before committing.'}
                {results.readinessPercentage < 50 && ' Your responses suggest this career might not align with your preferences. Explore other options.'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setStarted(false);
            setCurrentQuestion(0);
            setAnswers({});
            setSelectedOption(null);
            setShowExplanation(false);
            setCompleted(false);
            setResults(null);
          }}
          className="w-full px-6 py-3 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="bg-white border-3 border-black shadow-brutal-lg p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-black uppercase text-gray-600">
            Scenario {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm font-black uppercase text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 border-2 border-black">
          <div
            className="h-full bg-brutal-orange border-r-2 border-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-xl md:text-2xl font-black mb-4 leading-tight">
          {question.scenario}
        </h4>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleOptionSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left font-bold border-3 border-black transition-all ${
                selectedOption === index
                  ? 'bg-brutal-orange text-white shadow-brutal-lg translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-white hover:shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px]'
              } ${showExplanation ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {selectedOption === index && !showExplanation && (
                  <Check className="w-5 h-5 flex-shrink-0 ml-2" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && selectedOption !== null && (
        <div className="bg-brutal-blue text-white border-3 border-black p-6 mb-6">
          <h5 className="font-black uppercase mb-3 text-lg">Your Choice Reveals:</h5>
          <p className="mb-4 font-medium">
            {question.options[selectedOption].insight}
          </p>
          <p className="mb-3 font-bold">{question.explanation}</p>
          <p className="text-sm opacity-90">
            💡 {question.realityNote}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        {currentQuestion > 0 || showExplanation ? (
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : null}

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="flex-1 px-6 py-3 bg-brutal-orange text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {showExplanation
            ? (currentQuestion < quiz.questions.length - 1 ? 'Next Scenario' : 'See Results')
            : 'Continue'
          }
          {showExplanation && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

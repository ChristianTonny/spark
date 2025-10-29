"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  CheckCircle,
  X,
  Trophy,
  BarChart3,
  PlayCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

// Mock test data
const mockTests = [
  {
    id: 1,
    title: "Mathematics - Algebra Basics",
    subject: "Mathematics",
    questions: 15,
    duration: 20,
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Chemistry - Chemical Reactions",
    subject: "Chemistry",
    questions: 20,
    duration: 30,
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Physics - Mechanics",
    subject: "Physics",
    questions: 25,
    duration: 40,
    difficulty: "Hard",
  },
];

const mockQuestions = [
  {
    id: 1,
    question: "What is 2x + 3 = 11? Solve for x.",
    options: ["x = 2", "x = 4", "x = 5", "x = 7"],
    correct: 1,
  },
  {
    id: 2,
    question: "Which of the following is a prime number?",
    options: ["15", "17", "18", "20"],
    correct: 1,
  },
  {
    id: 3,
    question: "What is the value of π (pi) approximately?",
    options: ["2.14", "3.14", "4.14", "5.14"],
    correct: 1,
  },
  {
    id: 4,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correct: 2,
  },
  {
    id: 5,
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correct: 1,
  },
];

export default function PracticePage() {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(mockQuestions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Timer
  useEffect(() => {
    if (isTestStarted && !isTestComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [isTestStarted, isTestComplete, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTest = (testId: number) => {
    setSelectedTest(testId);
    setIsTestStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(mockQuestions.length).fill(null));
    setTimeLeft(1200);
    setIsTestComplete(false);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsTestComplete(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correct) {
        correct++;
      }
    });
    return {
      correct,
      total: mockQuestions.length,
      percentage: Math.round((correct / mockQuestions.length) * 100),
    };
  };

  const handleRetakeTest = () => {
    setIsTestStarted(false);
    setIsTestComplete(false);
    setSelectedTest(null);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(mockQuestions.length).fill(null));
    setTimeLeft(1200);
  };

  // Results Screen
  if (isTestComplete) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                score.percentage >= 70 ? "bg-spark-green" : score.percentage >= 50 ? "bg-spark-orange" : "bg-red-500"
              }`}>
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Test Complete!
              </h2>
              <p className="text-gray-600 mb-8">
                {score.percentage >= 70
                  ? "Great job! You did excellent!"
                  : score.percentage >= 50
                  ? "Good effort! Keep practicing."
                  : "Keep studying and try again!"}
              </p>

              {/* Score Display */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-spark-blue">
                    {score.correct}
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-500">
                    {score.total - score.correct}
                  </div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-spark-green">
                    {score.percentage}%
                  </div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Question Review</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {mockQuestions.map((q, index) => {
                    const userAnswer = selectedAnswers[index];
                    const isCorrect = userAnswer === q.correct;
                    return (
                      <div
                        key={q.id}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrect ? "border-spark-green bg-green-50" : "border-red-500 bg-red-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Q{index + 1}: {q.question}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Your answer: {userAnswer !== null ? q.options[userAnswer] : "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="text-xs text-spark-green mt-1">
                                Correct: {q.options[q.correct]}
                              </p>
                            )}
                          </div>
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-spark-green flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button onClick={handleRetakeTest} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Test
                </Button>
                <Link href="/dashboard/student" className="flex-1">
                  <Button className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Test Taking Screen
  if (isTestStarted && selectedTest) {
    const currentQ = mockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;
    const answeredCount = selectedAnswers.filter((a) => a !== null).length;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-gray-900">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={timeLeft < 300 ? "destructive" : "secondary"} className="text-base px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatTime(timeLeft)}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleSubmitTest}>
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    {answeredCount}/{mockQuestions.length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-spark-blue rounded-full h-2 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">Question {currentQuestion + 1}</Badge>
                {selectedAnswers[currentQuestion] !== null && (
                  <Badge variant="success">Answered</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedAnswers[currentQuestion] === index}
                      onChange={() => handleSelectAnswer(index)}
                      className="peer sr-only"
                    />
                    <div className="p-4 rounded-lg border-2 border-gray-300 hover:border-spark-blue peer-checked:border-spark-blue peer-checked:bg-blue-50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-spark-blue bg-spark-blue"
                            : "border-gray-300"
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{option}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-gray-600">
              {currentQuestion + 1} / {mockQuestions.length}
            </div>
            {currentQuestion < mockQuestions.length - 1 ? (
              <Button onClick={handleNextQuestion}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmitTest} variant="default">
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Test
              </Button>
            )}
          </div>

          {/* Question Navigator */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {mockQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                      currentQuestion === index
                        ? "border-spark-blue bg-spark-blue text-white"
                        : selectedAnswers[index] !== null
                        ? "border-spark-green bg-green-50 text-spark-green"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test Selection Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/student">
                <div className="w-10 h-10 bg-spark-blue rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Practice Tests</h1>
            </div>
            <Link href="/dashboard/student">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-spark-orange flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Practice Makes Perfect</h3>
                <p className="text-sm text-gray-600">
                  Take practice tests to prepare for exams. Track your progress and identify areas for improvement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{test.subject}</Badge>
                  <Badge
                    variant={
                      test.difficulty === "Easy"
                        ? "success"
                        : test.difficulty === "Medium"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {test.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {test.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {test.duration} mins
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleStartTest(test.id)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

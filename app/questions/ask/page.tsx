"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Send,
  AlertCircle,
  CheckCircle,
  Paperclip,
  X,
} from "lucide-react";
import Link from "next/link";

const questionSchema = z.object({
  subject: z.string().min(1, "Please select a subject"),
  title: z.string().min(10, "Title must be at least 10 characters"),
  question: z.string().min(20, "Question must be at least 20 characters"),
  urgency: z.enum(["low", "medium", "high"]),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function AskQuestionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      urgency: "medium",
    },
  });

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Question submitted:", { ...data, files: attachedFiles });
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      reset();
      setAttachedFiles([]);
    }, 3000);
  };

  const handleFileAttach = () => {
    // Simulate file attachment (in real app, use file input)
    const fileName = `attachment_${attachedFiles.length + 1}.pdf`;
    setAttachedFiles([...attachedFiles, fileName]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-16 h-16 bg-spark-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Question Submitted! 🎉
            </h2>
            <p className="text-gray-600 mb-8">
              A mentor will review and answer your question soon.
            </p>
            <Link href="/dashboard/student">
              <Button size="lg">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Info Card */}
        <Card className="mb-8 border-spark-blue bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-spark-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tips for Getting Great Answers</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Be specific about what you're struggling with</li>
                  <li>• Include relevant context (textbook page, class notes, etc.)</li>
                  <li>• Show what you've tried so far</li>
                  <li>• One question per submission works best</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Question</CardTitle>
            <CardDescription>
              Our mentors are here to help you learn and understand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Subject Selection */}
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <select
                  id="subject"
                  {...register("subject")}
                  className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                >
                  <option value="">Select a subject...</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                  <option value="kinyarwanda">Kinyarwanda</option>
                  <option value="history">History</option>
                  <option value="geography">Geography</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Question Title */}
              <div>
                <Label htmlFor="title">Question Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., How do I solve quadratic equations?"
                  error={errors.title?.message}
                  {...register("title")}
                />
                <p className="text-xs text-gray-500 mt-1">
                  A clear, specific title helps mentors understand your question quickly
                </p>
              </div>

              {/* Question Details */}
              <div>
                <Label htmlFor="question">Detailed Question *</Label>
                <textarea
                  id="question"
                  rows={8}
                  placeholder="Explain your question in detail. Include what you've tried, what's confusing you, and any relevant information..."
                  className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue resize-none"
                  {...register("question")}
                />
                {errors.question && (
                  <p className="text-sm text-red-600 mt-1">{errors.question.message}</p>
                )}
              </div>

              {/* Urgency Level */}
              <div>
                <Label>Urgency Level *</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <label className="relative">
                    <input
                      type="radio"
                      value="low"
                      {...register("urgency")}
                      className="peer sr-only"
                    />
                    <div className="cursor-pointer rounded-lg border-2 border-gray-300 p-4 text-center hover:border-spark-blue peer-checked:border-spark-blue peer-checked:bg-blue-50 transition-all">
                      <div className="font-semibold text-gray-900">Low</div>
                      <div className="text-xs text-gray-600 mt-1">Not urgent</div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      value="medium"
                      {...register("urgency")}
                      className="peer sr-only"
                    />
                    <div className="cursor-pointer rounded-lg border-2 border-gray-300 p-4 text-center hover:border-spark-orange peer-checked:border-spark-orange peer-checked:bg-orange-50 transition-all">
                      <div className="font-semibold text-gray-900">Medium</div>
                      <div className="text-xs text-gray-600 mt-1">Need soon</div>
                    </div>
                  </label>

                  <label className="relative">
                    <input
                      type="radio"
                      value="high"
                      {...register("urgency")}
                      className="peer sr-only"
                    />
                    <div className="cursor-pointer rounded-lg border-2 border-gray-300 p-4 text-center hover:border-red-500 peer-checked:border-red-500 peer-checked:bg-red-50 transition-all">
                      <div className="font-semibold text-gray-900">High</div>
                      <div className="text-xs text-gray-600 mt-1">Urgent help</div>
                    </div>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  High urgency gets faster responses but use it only when really needed
                </p>
              </div>

              {/* File Attachments */}
              <div>
                <Label>Attachments (Optional)</Label>
                <div className="mt-2 space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{file}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFileAttach}
                    className="w-full"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File (Images, PDFs, Documents)
                  </Button>
                  <p className="text-xs text-gray-500">
                    Screenshots, diagrams, or documents that help explain your question
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Link href="/dashboard/student" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Question
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-spark-green flex-shrink-0 mt-0.5" />
                <span>Be respectful to mentors who volunteer their time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-spark-green flex-shrink-0 mt-0.5" />
                <span>Don't ask for direct answers to homework - ask for help understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-spark-green flex-shrink-0 mt-0.5" />
                <span>Search existing questions first - your question might be answered already</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-spark-green flex-shrink-0 mt-0.5" />
                <span>Mark answers as helpful when they solve your problem</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

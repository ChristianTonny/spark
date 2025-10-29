"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { BookOpen, Presentation, Users, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserRole = "student" | "educator" | "mentor" | null;

const studentSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  gradeLevel: z.string().min(1, "Grade level is required"),
  district: z.string().min(1, "District is required"),
  language: z.string().min(1, "Preferred language is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const educatorSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  qualification: z.string().min(1, "Qualification is required"),
  subjectExpertise: z.string().min(1, "Subject expertise is required"),
  teachingExperience: z.string().min(1, "Teaching experience is required"),
  institution: z.string().min(1, "Institution is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const mentorSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  expertiseArea: z.string().min(1, "Expertise area is required"),
  availability: z.string().min(1, "Availability is required"),
  motivation: z.string().min(10, "Please tell us why you want to be a mentor"),
  background: z.string().min(1, "Background is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type StudentFormData = z.infer<typeof studentSchema>;
type EducatorFormData = z.infer<typeof educatorSchema>;
type MentorFormData = z.infer<typeof mentorSchema>;
type AllFormData = StudentFormData | EducatorFormData | MentorFormData;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Determine schema based on role
  const getSchema = () => {
    if (selectedRole === "educator") return educatorSchema;
    if (selectedRole === "mentor") return mentorSchema;
    return studentSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AllFormData>({
    resolver: zodResolver(getSchema()),
  });

  const password = watch("password");

  const onSubmit = async (data: AllFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup data:", { ...data, role: selectedRole });
    setIsLoading(false);
    setStep(4); // Show success
  };

  const roles = [
    {
      id: "student" as const,
      icon: BookOpen,
      title: "Student",
      description: "I want to learn and prepare for exams",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "educator" as const,
      icon: Presentation,
      title: "Educator",
      description: "I want to upload and verify content",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      id: "mentor" as const,
      icon: Users,
      title: "Mentor",
      description: "I want to help students with questions",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/login">
            <button className="inline-flex items-center text-spark-blue hover:text-spark-blue-dark mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Join Spark Learning</h1>
          <p className="text-gray-600 mt-2">Create your free account</p>
        </div>

        {/* Progress Indicator */}
        {selectedRole && step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      s < step
                        ? "bg-spark-green text-white"
                        : s === step
                        ? "bg-spark-blue text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s < step ? <Check className="h-4 w-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 ${
                        s < step ? "bg-spark-green" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-2 space-x-12">
              <span className="text-xs text-gray-600">Role</span>
              <span className="text-xs text-gray-600">Details</span>
              <span className="text-xs text-gray-600">Confirm</span>
            </div>
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Role</CardTitle>
              <CardDescription>Select how you want to use Spark</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setStep(2);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${role.color} ${
                        selectedRole === role.id ? "ring-2 ring-spark-blue" : ""
                      }`}
                    >
                      <Icon className="h-12 w-12 mb-4 mx-auto text-gray-700" />
                      <h3 className="font-semibold text-gray-900 mb-2">{role.title}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Basic Information (Student) */}
        {step === 2 && selectedRole === "student" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </div>
                <Badge>{selectedRole}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(() => setStep(3))} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      error={errors.fullName?.message}
                      {...register("fullName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailOrPhone">Email or Phone *</Label>
                    <Input
                      id="emailOrPhone"
                      placeholder="student@example.com"
                      error={errors.emailOrPhone?.message}
                      {...register("emailOrPhone")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      error={errors.password?.message}
                      {...register("password")}
                    />
                    {password && password.length >= 6 && (
                      <p className="text-xs text-spark-green flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Strong password
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradeLevel">Grade Level *</Label>
                    <select
                      id="gradeLevel"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("gradeLevel")}
                    >
                      <option value="">Select</option>
                      <option value="o-level-1">O-Level Year 1</option>
                      <option value="o-level-2">O-Level Year 2</option>
                      <option value="o-level-3">O-Level Year 3</option>
                      <option value="a-level-1">A-Level Year 1</option>
                      <option value="a-level-2">A-Level Year 2</option>
                      <option value="a-level-3">A-Level Year 3</option>
                    </select>
                    {errors.gradeLevel && (
                      <p className="text-sm text-red-600">{errors.gradeLevel.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">School District *</Label>
                    <select
                      id="district"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("district")}
                    >
                      <option value="">Select</option>
                      <option value="kigali">Kigali</option>
                      <option value="northern">Northern Province</option>
                      <option value="southern">Southern Province</option>
                      <option value="eastern">Eastern Province</option>
                      <option value="western">Western Province</option>
                    </select>
                    {errors.district && (
                      <p className="text-sm text-red-600">{errors.district.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language *</Label>
                    <select
                      id="language"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("language")}
                    >
                      <option value="">Select</option>
                      <option value="kinyarwanda">Kinyarwanda</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                    </select>
                    {errors.language && (
                      <p className="text-sm text-red-600">{errors.language.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Basic Information (Educator) */}
        {step === 2 && selectedRole === "educator" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Educator Information</CardTitle>
                  <CardDescription>Tell us about your teaching background</CardDescription>
                </div>
                <Badge>{selectedRole}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(() => setStep(3))} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Dr. Jane Smith"
                      error={errors.fullName?.message}
                      {...register("fullName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailOrPhone">Email or Phone *</Label>
                    <Input
                      id="emailOrPhone"
                      placeholder="educator@example.com"
                      error={errors.emailOrPhone?.message}
                      {...register("emailOrPhone")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      error={errors.password?.message}
                      {...register("password")}
                    />
                    {password && password.length >= 6 && (
                      <p className="text-xs text-spark-green flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Strong password
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Highest Qualification *</Label>
                    <select
                      id="qualification"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("qualification")}
                    >
                      <option value="">Select</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="diploma">Teaching Diploma</option>
                      <option value="certificate">Teaching Certificate</option>
                    </select>
                    {errors.qualification && (
                      <p className="text-sm text-red-600">{errors.qualification.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subjectExpertise">Subject Expertise *</Label>
                    <select
                      id="subjectExpertise"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("subjectExpertise")}
                    >
                      <option value="">Select</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                      <option value="english">English</option>
                      <option value="kinyarwanda">Kinyarwanda</option>
                      <option value="history">History</option>
                      <option value="geography">Geography</option>
                      <option value="multiple">Multiple Subjects</option>
                    </select>
                    {errors.subjectExpertise && (
                      <p className="text-sm text-red-600">{errors.subjectExpertise.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teachingExperience">Years of Experience *</Label>
                    <select
                      id="teachingExperience"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("teachingExperience")}
                    >
                      <option value="">Select</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.teachingExperience && (
                      <p className="text-sm text-red-600">{errors.teachingExperience.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Current/Last Institution *</Label>
                    <Input
                      id="institution"
                      placeholder="School or university name"
                      error={errors.institution?.message}
                      {...register("institution")}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Basic Information (Mentor) */}
        {step === 2 && selectedRole === "mentor" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mentor Information</CardTitle>
                  <CardDescription>Tell us about your volunteer interest</CardDescription>
                </div>
                <Badge>{selectedRole}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(() => setStep(3))} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Volunteer"
                      error={errors.fullName?.message}
                      {...register("fullName")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailOrPhone">Email or Phone *</Label>
                    <Input
                      id="emailOrPhone"
                      placeholder="mentor@example.com"
                      error={errors.emailOrPhone?.message}
                      {...register("emailOrPhone")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      error={errors.password?.message}
                      {...register("password")}
                    />
                    {password && password.length >= 6 && (
                      <p className="text-xs text-spark-green flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Strong password
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expertiseArea">Area of Expertise *</Label>
                    <select
                      id="expertiseArea"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("expertiseArea")}
                    >
                      <option value="">Select</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="sciences">Sciences</option>
                      <option value="languages">Languages</option>
                      <option value="social-studies">Social Studies</option>
                      <option value="general">General Studies</option>
                    </select>
                    {errors.expertiseArea && (
                      <p className="text-sm text-red-600">{errors.expertiseArea.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Weekly Availability *</Label>
                    <select
                      id="availability"
                      className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                      {...register("availability")}
                    >
                      <option value="">Select</option>
                      <option value="1-3">1-3 hours/week</option>
                      <option value="4-6">4-6 hours/week</option>
                      <option value="7-10">7-10 hours/week</option>
                      <option value="10+">10+ hours/week</option>
                    </select>
                    {errors.availability && (
                      <p className="text-sm text-red-600">{errors.availability.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Professional Background *</Label>
                  <select
                    id="background"
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                    {...register("background")}
                  >
                    <option value="">Select</option>
                    <option value="student">University Student</option>
                    <option value="graduate">Recent Graduate</option>
                    <option value="professional">Working Professional</option>
                    <option value="retired-educator">Retired Educator</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.background && (
                    <p className="text-sm text-red-600">{errors.background.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to be a mentor? *</Label>
                  <textarea
                    id="motivation"
                    rows={4}
                    placeholder="Share your motivation for volunteering..."
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue resize-none"
                    {...register("motivation")}
                  />
                  {errors.motivation && (
                    <p className="text-sm text-red-600">{errors.motivation.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Terms & Setup */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Terms & Preferences</CardTitle>
              <CardDescription>Almost done! Review and accept</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox id="dataConsent" required />
                    <label htmlFor="dataConsent" className="text-sm text-gray-700 cursor-pointer">
                      <span className="font-medium">Data Usage Consent</span>
                      <p className="text-gray-600 mt-1">
                        I agree to Spark storing my learning data locally on my device and syncing
                        when online to improve my learning experience.
                      </p>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                      I accept the{" "}
                      <Link href="/terms" className="text-spark-blue hover:underline">
                        Terms of Service
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox id="privacy" required />
                    <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                      I acknowledge the{" "}
                      <Link href="/privacy" className="text-spark-blue hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox id="offline" defaultChecked />
                    <label htmlFor="offline" className="text-sm text-gray-700 cursor-pointer">
                      <span className="font-medium">Enable Offline Mode</span>
                      <p className="text-gray-600 mt-1">
                        Download content for offline access (recommended for areas with limited
                        connectivity)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" loading={isLoading}>
                    Create Account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 bg-spark-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Spark! 🎉
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your account has been created successfully. Let&apos;s start your {selectedRole === "student" ? "learning" : selectedRole === "educator" ? "teaching" : "mentoring"} journey!
              </p>
              <Link href={`/dashboard/${selectedRole}`}>
                <Button size="lg">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

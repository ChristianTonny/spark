"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  district: z.string().min(1, "District is required"),
  language: z.string().min(1, "Preferred language is required"),
  school: z.string().optional(),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function StudentProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Jane Mukarwego",
      email: "jane.m@example.com",
      phone: "+250788123456",
      gradeLevel: "o-level-2",
      district: "kigali",
      language: "english",
      school: "Kigali Secondary School",
      bio: "Passionate about mathematics and science. Preparing for national exams.",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile updated:", data);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-10 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/student">
                <div className="w-10 h-10 bg-spark-blue rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
            </div>
            <Link href="/dashboard/student">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>
                <div>
                  <Label htmlFor="gradeLevel">Grade Level *</Label>
                  <select
                    id="gradeLevel"
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                    {...register("gradeLevel")}
                  >
                    <option value="o-level-1">O-Level Year 1</option>
                    <option value="o-level-2">O-Level Year 2</option>
                    <option value="o-level-3">O-Level Year 3</option>
                    <option value="a-level-1">A-Level Year 1</option>
                    <option value="a-level-2">A-Level Year 2</option>
                    <option value="a-level-3">A-Level Year 3</option>
                  </select>
                  {errors.gradeLevel && (
                    <p className="text-sm text-red-600 mt-1">{errors.gradeLevel.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="district">District *</Label>
                  <select
                    id="district"
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                    {...register("district")}
                  >
                    <option value="kigali">Kigali</option>
                    <option value="northern">Northern Province</option>
                    <option value="southern">Southern Province</option>
                    <option value="eastern">Eastern Province</option>
                    <option value="western">Western Province</option>
                  </select>
                  {errors.district && (
                    <p className="text-sm text-red-600 mt-1">{errors.district.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="language">Preferred Language *</Label>
                  <select
                    id="language"
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                    {...register("language")}
                  >
                    <option value="kinyarwanda">Kinyarwanda</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                  </select>
                  {errors.language && (
                    <p className="text-sm text-red-600 mt-1">{errors.language.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="school">School Name (Optional)</Label>
                <Input
                  id="school"
                  placeholder="Your school name"
                  {...register("school")}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio (Optional)</Label>
                <textarea
                  id="bio"
                  rows={4}
                  maxLength={200}
                  placeholder="Tell us a bit about yourself..."
                  className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue resize-none"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-red-600 mt-1">{errors.bio.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Link href="/dashboard/student" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" loading={isSaving} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

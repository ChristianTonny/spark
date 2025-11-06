"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowRight, Briefcase, Building2, Star, Award } from "lucide-react";

export default function MentorOnboardingPage() {
  const router = useRouter();
  const { user, clerkUser, isLoading: authLoading } = useConvexAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    bio: "",
    whyIMentor: "",
    yearsExperience: "",
    location: "",
    languages: [] as string[],
    careerInterests: [] as string[],
  });

  const createProfessionalProfile = useMutation(api.professionals.create);

  const careerCategories = [
    "Technology",
    "Healthcare",
    "Business",
    "Engineering",
    "Education",
    "Arts & Design",
    "Science",
    "Law",
    "Finance",
    "Marketing",
  ];

  const availableLanguages = ["English", "Kinyarwanda", "French", "Swahili"];

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCareerInterest = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(category)
        ? prev.careerInterests.filter((c) => c !== category)
        : [...prev.careerInterests, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    // Validation
    if (!formData.jobTitle || !formData.company || !formData.bio || !formData.whyIMentor || !formData.yearsExperience) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.careerInterests.length === 0) {
      alert("Please select at least one career area you can mentor in");
      return;
    }

    if (formData.languages.length === 0) {
      alert("Please select at least one language");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProfessionalProfile({
        jobTitle: formData.jobTitle,
        company: formData.company,
        bio: formData.bio,
        whyIMentor: formData.whyIMentor,
        yearsExperience: parseInt(formData.yearsExperience),
        location: formData.location || "Not specified",
        languages: formData.languages,
        careerCategories: formData.careerInterests,
      });

      router.push("/dashboard/mentor");
    } catch (error) {
      console.error("Error creating mentor profile:", error);
      alert("Failed to create mentor profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-brutal-orange border-3 border-black shadow-brutal flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3 uppercase">
            Become a Mentor
          </h1>
          <p className="text-lg font-bold text-gray-700">
            Help students discover their career paths by sharing your experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border-3 border-black shadow-brutal-lg p-6 sm:p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label className="flex items-center gap-2 text-lg font-black uppercase mb-3">
              <Briefcase className="w-5 h-5" />
              Job Title *
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="flex items-center gap-2 text-lg font-black uppercase mb-3">
              <Building2 className="w-5 h-5" />
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="e.g., Andela, MTN Rwanda"
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold"
              required
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label className="flex items-center gap-2 text-lg font-black uppercase mb-3">
              <Award className="w-5 h-5" />
              Years of Experience *
            </label>
            <input
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
              placeholder="e.g., 5"
              min="0"
              max="50"
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-lg font-black uppercase mb-3 block">
              About You *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell students about your career journey, what you're passionate about, and how you can help them..."
              rows={4}
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold resize-none"
              required
            />
            <p className="text-sm font-bold text-gray-600 mt-2">
              {formData.bio.length} / 500 characters
            </p>
          </div>

          {/* Why I Mentor */}
          <div>
            <label className="text-lg font-black uppercase mb-3 block">
              Why I Mentor *
            </label>
            <textarea
              value={formData.whyIMentor}
              onChange={(e) => handleInputChange("whyIMentor", e.target.value)}
              placeholder="What motivates you to mentor students? Share your story..."
              rows={3}
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold resize-none"
              required
            />
            <p className="text-sm font-bold text-gray-600 mt-2">
              This helps students connect with your passion for mentoring
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="text-lg font-black uppercase mb-3 block">
              Location (Optional)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Kigali, Rwanda or Remote"
              className="w-full px-4 py-3 border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none font-bold"
            />
          </div>

          {/* Languages */}
          <div>
            <label className="text-lg font-black uppercase mb-3 block">
              Languages You Speak *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableLanguages.map((lang) => {
                const isSelected = formData.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`
                      px-4 py-3 border-3 border-black font-bold text-sm
                      transition-all
                      ${isSelected
                        ? 'bg-brutal-orange text-white shadow-brutal'
                        : 'bg-white hover:shadow-brutal-sm'
                      }
                    `}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Career Areas */}
          <div>
            <label className="text-lg font-black uppercase mb-3 block">
              Career Areas You Can Mentor In *
            </label>
            <p className="text-sm font-bold text-gray-600 mb-3">
              Select all areas where you can provide guidance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {careerCategories.map((category) => {
                const isSelected = formData.careerInterests.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCareerInterest(category)}
                    className={`
                      px-4 py-3 border-3 border-black font-bold text-sm
                      transition-all
                      ${isSelected
                        ? 'bg-brutal-orange text-white shadow-brutal'
                        : 'bg-white hover:shadow-brutal-sm'
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-4">
            <h3 className="font-black text-sm uppercase mb-2">What happens next?</h3>
            <ul className="space-y-1 text-sm font-bold text-gray-700">
              <li>• You'll be listed on the mentors page</li>
              <li>• Students can book 15-minute sessions with you</li>
              <li>• You'll set your own availability</li>
              <li>• You can track your sessions and earnings</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full px-6 py-4 text-lg font-black uppercase
              border-3 border-black shadow-brutal
              transition-all inline-flex items-center justify-center gap-3
              ${!isSubmitting
                ? 'bg-primary text-white hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Setup</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

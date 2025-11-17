"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Engineering",
  "Business & Finance",
  "Education",
  "Arts & Design",
  "Law",
  "Science & Research",
  "Marketing & Communications",
  "Other",
];

const CAREER_FIELDS = [
  "Software Development",
  "Data Science & AI",
  "Medicine & Nursing",
  "Engineering",
  "Business Administration",
  "Finance & Accounting",
  "Teaching & Education",
  "Design & Creative",
  "Law & Legal Services",
  "Marketing & Sales",
  "Other",
];

const FOCUS_AREAS = [
  "Career Planning",
  "Interview Preparation",
  "Resume Review",
  "Skill Development",
  "Industry Insights",
  "Networking Tips",
  "Job Search Strategies",
  "Professional Growth",
];

export default function ApplyAsMentorPage() {
  const router = useRouter();
  const submitApplication = useMutation(api.mentorApplications.submit);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    currentRole: "",
    company: "",
    yearsExperience: "",
    industry: "",
    careerField: "",
    availability: "",
    motivation: "",
    sessionsPerMonth: "",
    focusAreas: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocusAreaToggle = (area: string) => {
    if (formData.focusAreas.includes(area)) {
      setFormData({
        ...formData,
        focusAreas: formData.focusAreas.filter((a) => a !== area),
      });
    } else {
      setFormData({
        ...formData,
        focusAreas: [...formData.focusAreas, area],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.currentRole || !formData.company || !formData.yearsExperience) {
      setError("Please fill in all professional information");
      return;
    }

    if (!formData.industry || !formData.careerField) {
      setError("Please select your industry and career field");
      return;
    }

    if (!formData.motivation || !formData.sessionsPerMonth || !formData.availability) {
      setError("Please complete all required sections");
      return;
    }

    if (formData.focusAreas.length === 0) {
      setError("Please select at least one focus area");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitApplication({
        ...formData,
        linkedin: formData.linkedin || undefined,
      });

      // Redirect to confirmation page
      router.push("/apply-as-mentor/confirmation");
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4 font-bold uppercase text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Become a Mentor
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Share your professional experience and help Rwandan students discover their career paths.
          </p>
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-6">
            <h2 className="text-xl font-black uppercase mb-2">What We&apos;re Looking For:</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Professionals with 3+ years of experience</li>
              <li>Passion for mentoring and career guidance</li>
              <li>Commitment to 1-2 hours per month</li>
              <li>Strong communication skills</li>
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="border-3 border-black shadow-brutal p-6 bg-white">
            <h2 className="text-2xl font-black uppercase mb-6">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="border-3 border-black shadow-brutal p-6 bg-white">
            <h2 className="text-2xl font-black uppercase mb-6">Professional Background</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Current Role *
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
                  placeholder="Google, Andela, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Years of Experience *
                </label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
                >
                  <option value="">Select...</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
                >
                  <option value="">Select...</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Career Field *
                </label>
                <select
                  name="careerField"
                  value={formData.careerField}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
                >
                  <option value="">Select...</option>
                  {CAREER_FIELDS.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mentorship Details */}
          <div className="border-3 border-black shadow-brutal p-6 bg-white">
            <h2 className="text-2xl font-black uppercase mb-6">Mentorship Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Why do you want to become a mentor? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all resize-none"
                  placeholder="Share your motivation for mentoring students..."
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.motivation.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Your Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
                >
                  <option value="">Select...</option>
                  <option value="Weekdays (Morning)">Weekdays (Morning)</option>
                  <option value="Weekdays (Afternoon)">Weekdays (Afternoon)</option>
                  <option value="Weekdays (Evening)">Weekdays (Evening)</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  Expected Sessions Per Month *
                </label>
                <select
                  name="sessionsPerMonth"
                  value={formData.sessionsPerMonth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
                >
                  <option value="">Select...</option>
                  <option value="1-2">1-2 sessions</option>
                  <option value="3-5">3-5 sessions</option>
                  <option value="6-10">6-10 sessions</option>
                  <option value="10+">10+ sessions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-4">
                  Focus Areas (Select all that apply) *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {FOCUS_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-3 p-3 border-2 border-black cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.focusAreas.includes(area)}
                        onChange={() => handleFocusAreaToggle(area)}
                        className="w-5 h-5 border-2 border-black"
                      />
                      <span className="font-medium">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="border-3 border-black shadow-brutal p-4 bg-red-100">
              <p className="text-red-800 font-bold">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

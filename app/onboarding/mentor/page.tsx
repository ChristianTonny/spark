'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Briefcase, User, Award, Link as LinkIcon } from 'lucide-react';

/**
 * Mentor onboarding form
 * Collects professional information before allowing access to mentor dashboard
 */
export default function MentorOnboardingPage() {
  const router = useRouter();
  const createProfessional = useMutation(api.professionals.create);
  const updateUserRole = useMutation(api.users.updateRole);

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    bio: '',
    yearsExperience: '',
    calendlyUrl: '',
    ratePerChat: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields
    if (!formData.bio.trim()) {
      setError('Please tell us about yourself in the bio section');
      setIsSubmitting(false);
      return;
    }

    if (!formData.yearsExperience || parseInt(formData.yearsExperience) < 0) {
      setError('Please enter your years of experience');
      setIsSubmitting(false);
      return;
    }

    try {
      await createProfessional({
        company: formData.company,
        jobTitle: formData.jobTitle,
        bio: formData.bio,
        yearsExperience: parseInt(formData.yearsExperience),
        calendlyUrl: formData.calendlyUrl || undefined,
        ratePerChat: formData.ratePerChat ? parseFloat(formData.ratePerChat) : undefined,
      });

      // Now that the professional profile exists, assign mentor role (server-side guardrails apply)
      await updateUserRole({ role: "mentor" });

      // Redirect to mentor dashboard
      router.push('/dashboard/mentor');
    } catch (err) {
      console.error('Failed to create professional profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to create profile. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-brutal-bg py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Welcome, <span className="text-brutal-orange">Mentor</span>!
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            Let&apos;s set up your profile to help Rwandan students
          </p>
        </div>

        {/* Onboarding Form */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company */}
            <div>
              <label htmlFor="company" className="flex items-center gap-2 font-black text-lg mb-2 uppercase">
                <Briefcase className="w-5 h-5" />
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="e.g., Andela, Zipline, Carnegie Mellon University"
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
              />
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="flex items-center gap-2 font-black text-lg mb-2 uppercase">
                <User className="w-5 h-5" />
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="e.g., Senior Software Engineer, Product Manager"
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label htmlFor="yearsExperience" className="flex items-center gap-2 font-black text-lg mb-2 uppercase">
                <Award className="w-5 h-5" />
                Years of Experience *
              </label>
              <input
                type="number"
                id="yearsExperience"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                required
                min="0"
                max="50"
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="font-black text-lg mb-2 uppercase block">
                About You *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell students about your career journey, expertise, and what you can help them with..."
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold resize-none"
              />
              <p className="text-sm text-gray-600 mt-1">This will be shown to students browsing mentors</p>
            </div>

            {/* Calendly URL (Optional) */}
            <div>
              <label htmlFor="calendlyUrl" className="flex items-center gap-2 font-black text-lg mb-2 uppercase">
                <LinkIcon className="w-5 h-5" />
                Calendly URL (Optional)
              </label>
              <input
                type="url"
                id="calendlyUrl"
                name="calendlyUrl"
                value={formData.calendlyUrl}
                onChange={handleChange}
                placeholder="https://calendly.com/your-link"
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
              />
              <p className="text-sm text-gray-600 mt-1">If you have a Calendly link, students can book sessions directly</p>
            </div>

            {/* Rate per Chat (Optional) */}
            <div>
              <label htmlFor="ratePerChat" className="font-black text-lg mb-2 uppercase block">
                Rate per Chat (RWF) - Optional
              </label>
              <input
                type="number"
                id="ratePerChat"
                name="ratePerChat"
                value={formData.ratePerChat}
                onChange={handleChange}
                min="0"
                step="100"
                placeholder="e.g., 5000"
                className="w-full px-4 py-3 border-3 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none font-bold"
              />
              <p className="text-sm text-gray-600 mt-1">Leave blank if you want to mentor for free</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-3 border-red-500 p-4">
                <p className="text-red-800 font-bold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Creating Profile...' : 'Complete Setup & Go to Dashboard'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-brutal-yellow border-3 border-brutal-border shadow-brutal p-6">
          <h3 className="font-black text-lg mb-3 uppercase">What&apos;s Next?</h3>
          <ul className="space-y-2 text-sm font-bold">
            <li className="flex items-start gap-2">
              <span className="text-brutal-text">✓</span>
              <span>Set your availability in the dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brutal-text">✓</span>
              <span>Browse career paths you can mentor for</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brutal-text">✓</span>
              <span>Start receiving booking requests from students</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brutal-text">✓</span>
              <span>Make a difference in Rwandan students&apos; lives!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

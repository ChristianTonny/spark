'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';

export default function MentorProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const { user, isLoading: authLoading } = useConvexAuth();
  const professional = useQuery(api.professionals.getCurrentProfessional);

  useRoleGuard(['mentor']);

  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    bio: '',
    yearsExperience: 0,
    ratePerChat: 0,
  });

  // Update form when professional data loads
  React.useEffect(() => {
    if (professional) {
      setFormData({
        jobTitle: professional.jobTitle || '',
        company: professional.company || '',
        bio: professional.bio || '',
        yearsExperience: professional.yearsExperience || 0,
        ratePerChat: professional.ratePerChat || 0,
      });
    }
  }, [professional]);

  const updateProfile = useMutation(api.professionals.updateProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        jobTitle: formData.jobTitle,
        company: formData.company,
        bio: formData.bio,
        yearsExperience: formData.yearsExperience,
        ratePerChat: formData.ratePerChat,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  if (authLoading || professional === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <h1 className="text-4xl font-black mb-4">Loading profile...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Profile not found</h1>
          <Button onClick={() => router.push('/dashboard/mentor')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const fullName = `${professional.firstName} ${professional.lastName}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard/mentor')}
            className="flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-black mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase">Edit Profile</h1>
          <p className="text-lg font-bold text-gray-700">
            Manage your professional information
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white border-3 border-black shadow-brutal flex-shrink-0 overflow-hidden">
                {professional.avatar ? (
                  <img
                    src={professional.avatar}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brutal-blue text-white text-3xl font-black">
                    {professional.firstName?.[0]}{professional.lastName?.[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black mb-2">{fullName}</h3>
                <p className="text-gray-600 font-bold mb-3">{professional.email}</p>
                <Button type="button" variant="outline" size="sm" disabled>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo (Coming Soon)
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black uppercase mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg"
                  placeholder="e.g., Google"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg"
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">About Me</h2>
            <div>
              <label className="block text-sm font-black uppercase mb-2">
                Professional Bio *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg resize-none"
                rows={6}
                placeholder="Share your professional journey, expertise, and what you're passionate about mentoring..."
                required
              />
              <p className="text-sm text-gray-600 font-bold mt-2">
                {formData.bio.length} characters
              </p>
            </div>
          </div>

          {/* Rate Section */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">Session Rate</h2>
            <div>
              <label className="block text-sm font-black uppercase mb-2">
                Rate per Session (RWF)
              </label>
              <input
                type="number"
                value={formData.ratePerChat}
                onChange={(e) => setFormData({ ...formData, ratePerChat: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg"
                placeholder="e.g., 50000"
                min="0"
              />
              <p className="text-sm text-gray-600 font-bold mt-2">
                Leave as 0 for free mentoring sessions
              </p>
            </div>
          </div>

          {/* Statistics (Read-only) */}
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">Your Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border-2 border-black p-4 text-center">
                <div className="text-3xl font-black mb-1">{professional.chatsCompleted}</div>
                <div className="text-xs font-bold uppercase">Sessions</div>
              </div>
              <div className="bg-white border-2 border-black p-4 text-center">
                <div className="text-3xl font-black mb-1">{professional.rating.toFixed(1)}</div>
                <div className="text-xs font-bold uppercase">Rating</div>
              </div>
              <div className="bg-white border-2 border-black p-4 text-center">
                <div className="text-3xl font-black mb-1">{(professional.totalEarnings / 1000).toFixed(0)}K</div>
                <div className="text-xs font-bold uppercase">Total Earned</div>
              </div>
              <div className="bg-white border-2 border-black p-4 text-center">
                <div className="text-3xl font-black mb-1">{professional.yearsExperience}</div>
                <div className="text-xs font-bold uppercase">Years Exp</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="flex-1">
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/dashboard/mentor')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}

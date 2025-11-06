'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, School, GraduationCap, MapPin, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

export default function StudentProfilePage() {
  const router = useRouter();
  const { user, clerkUser, isLoading } = useConvexAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current profile from Convex
  const studentProfile = useQuery(api.studentProfiles.getCurrent, user ? {} : "skip");
  const updateProfile = useMutation(api.studentProfiles.update);

  // Profile state
  const [profile, setProfile] = useState({
    gradeLevel: '',
    school: '',
    district: '',
    interests: [] as string[],
  });

  // Load profile from Convex when available
  useEffect(() => {
    if (studentProfile) {
      setProfile({
        gradeLevel: studentProfile.gradeLevel || '',
        school: studentProfile.school || '',
        district: studentProfile.district || '',
        interests: studentProfile.interests || [],
      });
    }
  }, [studentProfile]);

  // Show loading state while user is being synced
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      await updateProfile({
        gradeLevel: profile.gradeLevel || undefined,
        school: profile.school || undefined,
        district: profile.district || undefined,
        interests: profile.interests.length > 0 ? profile.interests : undefined,
      });

      // Show success and redirect back to dashboard
      alert('Profile saved successfully!');
      router.push('/dashboard/student');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Rwandan grade levels
  const gradeLevels = [
    'S4', 'S5', 'S6', 'A-Level Graduate', 'University Student'
  ];

  // Rwandan districts (major ones)
  const districts = [
    'Gasabo', 'Kicukiro', 'Nyarugenge', // Kigali City
    'Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana', // Eastern Province
    'Gicumbi', 'Burera', 'Gakenke', 'Musanze', 'Rulindo', // Northern Province
    'Kamonyi', 'Muhanga', 'Nyanza', 'Ruhango', 'Gisagara', 'Huye', 'Karongi', 'Nyamagabe', 'Nyaruguru', 'Rusizi', 'Rutsiro', // Southern & Western Provinces
  ].sort();

  // Career-related interests matching our career categories
  const availableInterests = [
    'Technology', 'Healthcare', 'Engineering', 'Business',
    'Education', 'Creative', 'Science', 'Mathematics',
    'Communication', 'Leadership', 'Problem Solving', 'Design',
    'Working with People', 'Working with Data', 'Working with Hands'
  ];

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 text-brutal-text hover:underline font-bold mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">Edit Profile</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700">Update your academic information and interests</p>
        </div>

        {/* User Information (Read-only) */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            Your Account
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brutal-blue border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {clerkUser?.imageUrl ? (
                <img src={clerkUser.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 sm:w-10 sm:h-10" />
              )}
            </div>
            <div>
              <p className="font-black text-lg sm:text-xl">{clerkUser?.firstName} {clerkUser?.lastName}</p>
              <p className="text-sm sm:text-base text-gray-600 font-bold">{clerkUser?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-xs text-gray-500 mt-1">Managed by Clerk Auth</p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            Academic Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Grade Level */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                Grade Level / Education Status *
              </label>
              <select
                value={profile.gradeLevel}
                onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all font-bold text-sm sm:text-base"
              >
                <option value="">Select your grade level</option>
                {gradeLevels.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* School */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <School className="w-4 h-4" />
                School / Institution *
              </label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="e.g., Lycée de Kigali"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* District */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                District
              </label>
              <select
                value={profile.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all font-bold text-sm sm:text-base"
              >
                <option value="">Select your district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Interests & Skills
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-bold mb-4">
            Select areas you&apos;re interested in. This helps us provide better career recommendations.
          </p>

          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 sm:px-4 py-2 min-h-[44px] font-bold text-xs sm:text-sm border-2 border-black transition-all ${
                  profile.interests.includes(interest)
                    ? 'bg-brutal-green text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          {profile.interests.length > 0 && (
            <p className="text-xs text-gray-600 font-bold mt-4">
              {profile.interests.length} interest{profile.interests.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href="/dashboard/student"
            className="px-6 py-3 min-h-[44px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold uppercase text-center text-sm sm:text-base"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving || !user}
            className="px-6 sm:px-8 py-3 min-h-[44px] bg-brutal-orange text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

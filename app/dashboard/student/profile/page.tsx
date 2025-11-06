'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, School, GraduationCap, MapPin, Save, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

const GRADE_LEVELS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'Post-Secondary'];

const DISTRICTS = [
  'Bugesera', 'Burera', 'Gakenke', 'Gasabo', 'Gatsibo', 'Gicumbi', 'Gisagara',
  'Huye', 'Kamonyi', 'Karongi', 'Kayonza', 'Kicukiro', 'Kirehe', 'Muhanga',
  'Musanze', 'Ngoma', 'Ngororero', 'Nyabihu', 'Nyagatare', 'Nyamasheke',
  'Nyanza', 'Nyarugenge', 'Nyaruguru', 'Rubavu', 'Ruhango', 'Rulindo',
  'Rusizi', 'Rutsiro', 'Rwamagana', 'Nyamagabe'
];

const INTEREST_AREAS = [
  'Technology', 'Healthcare', 'Business', 'Engineering', 'Education',
  'Creative Arts', 'Science', 'Law', 'Agriculture', 'Sports'
];

export default function StudentProfilePage() {
  const router = useRouter();
  const { user, clerkUser, isLoading: authLoading } = useConvexAuth();

  const studentProfile = useQuery(api.studentProfiles.getCurrent, user ? {} : 'skip');
  const upsertProfile = useMutation(api.studentProfiles.upsert);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    gradeLevel: '',
    school: '',
    district: '',
    interests: [] as string[],
  });

  // Load profile from Convex when it loads
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
    if (!profile.gradeLevel) {
      alert('Please select your grade level');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await upsertProfile({
        gradeLevel: profile.gradeLevel,
        school: profile.school || undefined,
        district: profile.district || undefined,
        interests: profile.interests.length > 0 ? profile.interests : undefined,
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        router.push('/dashboard/student');
      }, 2000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || (user && studentProfile === undefined)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const fullName = clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}` : 'Student';
  const avatarUrl = clerkUser?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
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
          <p className="text-base sm:text-lg md:text-xl text-gray-700">Update your personal information and preferences</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-brutal-green border-3 border-brutal-border shadow-brutal-lg p-4 mb-6 text-center">
            <p className="font-black text-lg">✓ Profile saved successfully! Redirecting...</p>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            Profile Picture
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-brutal-blue border-3 border-brutal-border shadow-brutal flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold mb-1">{fullName}</p>
              <p className="text-xs sm:text-sm text-gray-600 font-bold mb-3">
                {clerkUser?.primaryEmailAddress?.emailAddress || 'No email'}
              </p>
              <p className="text-xs text-gray-500">
                Update your photo in account settings
              </p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            Academic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Grade Level */}
            <div className="sm:col-span-2">
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                Grade Level *
              </label>
              <select
                value={profile.gradeLevel}
                onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
                required
              >
                <option value="">Select your grade level</option>
                {GRADE_LEVELS.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* School */}
            <div className="sm:col-span-2">
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <School className="w-4 h-4" />
                School Name
              </label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="e.g., Lycée de Kigali"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* District */}
            <div className="sm:col-span-2">
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                District
              </label>
              <select
                value={profile.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              >
                <option value="">Select your district</option>
                {DISTRICTS.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Your Interests
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-bold mb-4">
            Select areas you&apos;re interested in (helps with career recommendations)
          </p>

          <div className="flex flex-wrap gap-2">
            {INTEREST_AREAS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 sm:px-4 py-2 min-h-[44px] font-bold text-xs sm:text-sm border-2 border-brutal-border transition-all ${
                  profile.interests.includes(interest)
                    ? 'bg-brutal-green text-black shadow-brutal'
                    : 'bg-white hover:shadow-brutal-sm'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href="/dashboard/student"
            className="px-6 py-3 min-h-[44px] bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold uppercase text-center text-sm sm:text-base"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 sm:px-8 py-3 min-h-[44px] bg-brutal-orange text-white font-bold uppercase border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

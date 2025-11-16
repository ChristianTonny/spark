'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, School, GraduationCap, MapPin, Calendar, Save, Camera } from 'lucide-react';
import Link from 'next/link';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { Spinner } from '@/components/loading-skeleton';

export default function StudentProfilePage() {
  const router = useRouter();
  const { user: currentUser, isLoading: authLoading } = useConvexAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch current user data and student profile
  const studentProfile = useQuery(api.studentProfiles.getCurrent);
  const updateUserProfile = useMutation(api.users.updateProfile);
  const upsertStudentProfile = useMutation(api.studentProfiles.upsert);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    grade: '9th Grade',
    location: '',
    dateOfBirth: '',
    bio: '',
    interests: [] as string[],
    careerGoals: '',
  });

  // Load user and profile data into form state
  useEffect(() => {
    if (currentUser && studentProfile !== undefined) {
      setProfile({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        school: studentProfile?.school || '',
        grade: studentProfile?.gradeLevel || '9th Grade',
        location: studentProfile?.location || '',
        dateOfBirth: studentProfile?.dateOfBirth || '',
        bio: studentProfile?.bio || '',
        interests: studentProfile?.interests || [],
        careerGoals: studentProfile?.careerGoals || '',
      });
    }
  }, [currentUser, studentProfile]);

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
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Update user profile (firstName, lastName, phone)
      await updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || undefined,
      });

      // Update student profile (school, grade, bio, interests, etc.)
      await upsertStudentProfile({
        gradeLevel: profile.grade,
        school: profile.school || undefined,
        interests: profile.interests.length > 0 ? profile.interests : undefined,
        bio: profile.bio || undefined,
        location: profile.location || undefined,
        dateOfBirth: profile.dateOfBirth || undefined,
        careerGoals: profile.careerGoals || undefined,
      });

      setSuccess(true);

      // Show success for 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const availableInterests = [
    'Technology', 'Design', 'Science', 'Art', 'Music', 'Sports',
    'Writing', 'Mathematics', 'Business', 'Healthcare', 'Engineering',
    'Education', 'Environment', 'Social Work', 'Law', 'Finance'
  ];

  if (authLoading || (currentUser && studentProfile === undefined)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold">Please sign in to edit your profile</p>
        </div>
      </div>
    );
  }

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
        {success && (
          <div className="bg-green-100 border-3 border-green-500 p-4 mb-6">
            <p className="font-bold text-green-900">✓ Profile saved successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-3 border-red-500 p-4 mb-6">
            <p className="font-bold text-red-900">✗ {error}</p>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            Profile Picture
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-brutal-blue border-3 border-brutal-border shadow-brutal flex items-center justify-center flex-shrink-0">
              <img
                src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.firstName}${profile.lastName}`}
                alt="Profile"
                className="w-full h-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-600 font-bold mb-3">
                Your avatar is automatically generated from your Clerk account
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* First Name */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm bg-gray-100 font-bold text-sm sm:text-base cursor-not-allowed"
                title="Email cannot be changed here. Update in Clerk account settings."
              />
              <p className="text-xs text-gray-500 mt-1 font-bold">Email managed by your account</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(250) 123-4567"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Province"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
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
            {/* School */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2 flex items-center gap-2">
                <School className="w-4 h-4" />
                School *
              </label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="Enter your school name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">
                Grade Level *
              </label>
              <select
                value={profile.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold text-sm sm:text-base"
              >
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
                <option value="Senior 4">Senior 4</option>
                <option value="Senior 5">Senior 5</option>
                <option value="Senior 6">Senior 6</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6">About Me</h2>
          <div className="mb-6">
            <label className="block font-black text-xs sm:text-sm uppercase mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
              maxLength={500}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold resize-none text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-2 font-bold">
              {profile.bio.length} / 500 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-black text-xs sm:text-sm uppercase mb-2">
              Career Goals
            </label>
            <textarea
              value={profile.careerGoals}
              onChange={(e) => handleInputChange('careerGoals', e.target.value)}
              rows={3}
              placeholder="What are your career aspirations?"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6">Interests</h2>
          <p className="text-xs sm:text-sm text-gray-600 font-bold mb-4">
            Select areas you&apos;re interested in (helps with career recommendations)
          </p>

          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => (
              <button
                key={interest}
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

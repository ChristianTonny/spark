'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, School, GraduationCap, MapPin, Calendar, Save, Camera } from 'lucide-react';
import Link from 'next/link';

export default function StudentProfilePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    school: 'Lincoln High School',
    grade: '11th Grade',
    location: 'Seattle, WA',
    dateOfBirth: '2007-03-15',
    bio: 'Passionate about technology and design. Interested in careers that combine creativity with problem-solving.',
    interests: ['Technology', 'Design', 'Science', 'Art'],
    careerGoals: 'I want to become a UX Designer and create products that help people.',
    phone: '(555) 123-4567',
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

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

  const handleSave = () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem('studentProfile', JSON.stringify(profile));
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile saved successfully!');
    }, 1000);
  };

  const availableInterests = [
    'Technology', 'Design', 'Science', 'Art', 'Music', 'Sports',
    'Writing', 'Mathematics', 'Business', 'Healthcare', 'Engineering',
    'Education', 'Environment', 'Social Work', 'Law', 'Finance'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 text-brutal-text hover:underline font-bold mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-5xl font-black mb-2">Edit Profile</h1>
          <p className="text-xl text-gray-700">Update your personal information and preferences</p>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8 mb-6">
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Profile Picture
          </h2>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-brutal-blue border-3 border-brutal-border shadow-brutal flex items-center justify-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.firstName}${profile.lastName}`}
                alt="Profile"
                className="w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-bold mb-3">
                Your avatar is automatically generated from your name
              </p>
              <button
                className="px-4 py-2 bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm uppercase"
                onClick={() => alert('Avatar customization coming soon!')}
              >
                Change Avatar Style
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8 mb-6">
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Personal Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block font-black text-sm uppercase mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-black text-sm uppercase mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-black text-sm uppercase mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-black text-sm uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block font-black text-sm uppercase mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-black text-sm uppercase mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8 mb-6">
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Academic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* School */}
            <div>
              <label className="block font-black text-sm uppercase mb-2 flex items-center gap-2">
                <School className="w-4 h-4" />
                School *
              </label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block font-black text-sm uppercase mb-2">
                Grade Level *
              </label>
              <select
                value={profile.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold"
              >
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8 mb-6">
          <h2 className="text-2xl font-black uppercase mb-6">About Me</h2>
          
          <div className="mb-6">
            <label className="block font-black text-sm uppercase mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold resize-none"
            />
            <p className="text-xs text-gray-500 mt-2 font-bold">
              {profile.bio.length} / 500 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-black text-sm uppercase mb-2">
              Career Goals
            </label>
            <textarea
              value={profile.careerGoals}
              onChange={(e) => handleInputChange('careerGoals', e.target.value)}
              rows={3}
              placeholder="What are your career aspirations?"
              className="w-full px-4 py-3 border-2 border-brutal-border shadow-brutal-sm focus:shadow-brutal focus:outline-none transition-all font-bold resize-none"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8 mb-6">
          <h2 className="text-2xl font-black uppercase mb-6">Interests</h2>
          <p className="text-sm text-gray-600 font-bold mb-4">
            Select areas you&apos;re interested in (helps with career recommendations)
          </p>
          
          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 font-bold text-sm border-2 border-brutal-border transition-all ${
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
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/student"
            className="px-6 py-3 bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold uppercase"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-brutal-orange text-white font-bold uppercase border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

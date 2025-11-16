'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { GraduationCap, Users, BookOpen, Building, Briefcase } from 'lucide-react';

type Role = 'student' | 'educator' | 'mentor';

interface RoleOption {
  value: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * Role Selection Page
 *
 * SECURITY: This page captures the user's role selection during onboarding
 * and stores it in both Clerk publicMetadata (source of truth) and Convex (for backend queries).
 *
 * Clerk publicMetadata is updated first to ensure consistent auth state,
 * then synced to Convex for efficient database queries.
 *
 * Once set, roles cannot be changed by users to prevent privilege escalation.
 */
export default function RoleSelectionPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const updateUserRole = useMutation(api.users.updateRole);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions: RoleOption[] = [
    {
      value: 'student',
      title: 'Student',
      description: 'Explore careers, take assessments, and connect with mentors to plan your future',
      icon: <GraduationCap className="w-12 h-12" />,
      color: 'bg-brutal-blue',
    },
    {
      value: 'educator',
      title: 'Educator / Teacher',
      description: 'Guide students through career exploration and monitor their progress',
      icon: <BookOpen className="w-12 h-12" />,
      color: 'bg-brutal-green',
    },
    {
      value: 'mentor',
      title: 'Professional / Mentor',
      description: 'Share your career experience and mentor students through 1-on-1 sessions',
      icon: <Briefcase className="w-12 h-12" />,
      color: 'bg-brutal-orange',
    },
  ];

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    if (!isLoaded || !user) {
      setError('Please wait while we load your account');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Update role in Clerk publicMetadata first (source of truth for auth)
      await user.update({
        publicMetadata: {
          role: selectedRole,
        },
      });

      // Update role in Convex (synced for backend queries)
      await updateUserRole({ role: selectedRole });

      // Redirect based on role
      switch (selectedRole) {
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'educator':
          router.push('/dashboard/educator');
          break;
        case 'mentor':
          router.push('/onboarding/mentor'); // Additional mentor setup needed
          break;
        default:
          router.push('/');
      }
    } catch (err) {
      console.error('Failed to set role:', err);
      setError(err instanceof Error ? err.message : 'Failed to set role. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Check if user already has a role set
  if (isLoaded && user?.publicMetadata?.role) {
    const role = user.publicMetadata.role as Role;
    router.push(role === 'student' ? '/dashboard/student' : role === 'educator' ? '/dashboard/educator' : '/dashboard/mentor');
    return null;
  }

  if (!isLoaded) {
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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase">
            Welcome to <span className="text-brutal-orange">OpportunityMap</span>!
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-700">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedRole(option.value)}
              className={`p-8 bg-white border-4 transition-all ${
                selectedRole === option.value
                  ? 'border-black shadow-brutal-lg translate-x-[-4px] translate-y-[-4px]'
                  : 'border-gray-300 shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              <div className={`${option.color} w-20 h-20 border-3 border-black shadow-brutal flex items-center justify-center text-white mb-6 mx-auto`}>
                {option.icon}
              </div>
              <h3 className="text-2xl font-black mb-3 uppercase">{option.title}</h3>
              <p className="text-sm font-bold text-gray-700 leading-relaxed">
                {option.description}
              </p>

              {selectedRole === option.value && (
                <div className="mt-6 p-3 bg-brutal-yellow border-2 border-black">
                  <p className="text-xs font-black uppercase">✓ Selected</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border-3 border-red-500 p-4">
            <p className="text-red-800 font-bold">{error}</p>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedRole || isSubmitting}
            className="px-12 py-6 bg-brutal-orange text-white font-black text-2xl uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Setting up your account...' : 'Continue'}
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-12 bg-brutal-yellow border-3 border-black shadow-brutal p-6">
          <h3 className="font-black text-lg mb-3 uppercase flex items-center gap-2">
            🔒 Security Notice
          </h3>
          <p className="text-sm font-bold text-gray-800">
            Your role selection is permanent and cannot be changed after setup. This ensures the security
            and integrity of the platform. If you need to change your role in the future, please contact
            support.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  GraduationCap,
  Users,
  Building2,
  Handshake,
  ArrowRight,
  CheckCircle
} from "lucide-react";

type UserRole = 'student' | 'mentor' | 'company' | 'partner';

interface RoleOption {
  value: UserRole;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    value: 'student',
    icon: GraduationCap,
    title: 'Student',
    description: 'Explore careers, take assessments, and connect with mentors',
    color: 'bg-brutal-blue',
  },
  {
    value: 'mentor',
    icon: Users,
    title: 'Mentor',
    description: 'Share your experience and guide students in their career journey',
    color: 'bg-brutal-orange',
  },
  {
    value: 'company',
    icon: Building2,
    title: 'Company',
    description: 'Sponsor career content and connect with potential talent',
    color: 'bg-green-500',
  },
  {
    value: 'partner',
    icon: Handshake,
    title: 'Partner',
    description: 'Contribute content and help build the platform',
    color: 'bg-purple-500',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, clerkUser, isLoading: authLoading } = useConvexAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUserRole = useMutation(api.users.updateRole);

  // If already has a role, redirect to appropriate dashboard
  if (user && user.role && user.role !== 'student') {
    if (user.role === 'mentor') {
      router.push('/dashboard/mentor');
      return null;
    }
    // Add redirects for other roles when those dashboards are ready
    router.push('/dashboard/student');
    return null;
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole || !user) return;

    setIsSubmitting(true);
    try {
      await updateUserRole({ role: selectedRole });

      // Redirect based on role
      switch (selectedRole) {
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'mentor':
          router.push('/onboarding/mentor');
          break;
        case 'company':
          router.push('/dashboard/student'); // Placeholder for now
          break;
        case 'partner':
          router.push('/dashboard/student'); // Placeholder for now
          break;
        default:
          router.push('/dashboard/student');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role. Please try again.');
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
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 uppercase">
            Welcome to Opportunity<span className="text-primary">Map</span>!
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
            Hi {clerkUser?.firstName}! 👋
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-600">
            Let's get started by choosing your role
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedRole === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleRoleSelect(option.value)}
                className={`
                  relative bg-white border-3 border-black p-6 sm:p-8
                  transition-all text-left
                  ${isSelected
                    ? 'shadow-brutal-lg translate-x-[-4px] translate-y-[-4px]'
                    : 'shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-8 h-8 text-green-600 fill-green-100" />
                  </div>
                )}

                <div className={`
                  w-16 h-16 sm:w-20 sm:h-20 ${option.color}
                  border-3 border-black shadow-brutal
                  flex items-center justify-center mb-4
                `}>
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-2 uppercase">
                  {option.title}
                </h3>
                <p className="text-sm sm:text-base font-bold text-gray-700">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || isSubmitting}
            className={`
              px-8 py-4 text-lg font-black uppercase
              border-3 border-black shadow-brutal
              transition-all inline-flex items-center gap-3
              ${selectedRole && !isSubmitting
                ? 'bg-primary text-white hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Setting up...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-brutal-yellow border-3 border-black shadow-brutal p-6">
          <h3 className="text-xl font-black uppercase mb-3">Don't worry!</h3>
          <p className="font-bold text-gray-700">
            You can always change your role later in your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}

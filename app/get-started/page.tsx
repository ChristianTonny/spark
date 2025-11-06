"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  Building2,
  Handshake,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

type UserRole = 'student' | 'mentor' | 'company' | 'partner';

interface RoleOption {
  value: UserRole;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  signupUrl: string;
}

const roleOptions: RoleOption[] = [
  {
    value: 'student',
    icon: GraduationCap,
    title: 'Student',
    description: 'Explore careers, take assessments, and connect with mentors',
    color: 'bg-brutal-blue',
    signupUrl: '/sign-up?role=student',
  },
  {
    value: 'mentor',
    icon: Users,
    title: 'Mentor',
    description: 'Share your experience and guide students in their career journey',
    color: 'bg-brutal-orange',
    signupUrl: '/sign-up?role=mentor',
  },
  {
    value: 'company',
    icon: Building2,
    title: 'Company',
    description: 'Sponsor career content and connect with potential talent',
    color: 'bg-green-500',
    signupUrl: '/sign-up?role=company',
  },
  {
    value: 'partner',
    icon: Handshake,
    title: 'Partner',
    description: 'Contribute content and help build the platform',
    color: 'bg-purple-500',
    signupUrl: '/sign-up?role=partner',
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }

    const roleOption = roleOptions.find(opt => opt.value === selectedRole);
    if (roleOption) {
      // Store role in sessionStorage so we can use it after signup
      sessionStorage.setItem('selectedRole', selectedRole);
      // Redirect to signup with role parameter
      router.push(roleOption.signupUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 uppercase">
            Welcome to Opportunity<span className="text-primary">Map</span>!
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
            Let's get started! 🚀
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-600">
            First, tell us who you are
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
            disabled={!selectedRole}
            className={`
              px-8 py-4 text-lg font-black uppercase
              border-3 border-black shadow-brutal
              transition-all inline-flex items-center gap-3
              ${selectedRole
                ? 'bg-primary text-white hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span>Continue to Sign Up</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Already have account */}
        <div className="text-center mt-8">
          <p className="text-gray-600 font-bold">
            Already have an account?{' '}
            <a href="/sign-in" className="text-primary hover:underline font-black">
              Sign In
            </a>
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-brutal-yellow border-3 border-black shadow-brutal p-6">
          <h3 className="text-xl font-black uppercase mb-3">Why choose your role?</h3>
          <p className="font-bold text-gray-700">
            Your role helps us personalize your experience. Don't worry - you can always change it later in your account settings!
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { GraduationCap, BookOpen, Briefcase } from 'lucide-react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AssessmentLoader } from '@/components/assessment-loader';

type Role = 'student' | 'educator' | 'mentor';

interface RoleOption {
  value: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  href: string;
}

/**
 * Role selection page - users choose their role before Clerk signup
 * This is the first step in the signup flow
 */
function SignUpRoleSelectionInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "";
  const safeReturnTo =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "";

  const roleOptions: RoleOption[] = [
    {
      value: 'student',
      title: "I'm a Student",
      description: 'Explore careers, take assessments, and connect with mentors to plan your future',
      icon: <GraduationCap className="w-12 h-12" />,
      color: 'bg-brutal-blue',
      features: [
        'Browse 20+ Rwanda-specific careers',
        'Take RIASEC career assessments',
        'Connect with mentors',
        'Track your progress',
      ],
      href: safeReturnTo ? `/sign-up/student?returnTo=${encodeURIComponent(safeReturnTo)}` : '/sign-up/student',
    },
    {
      value: 'educator',
      title: "I'm an Educator",
      description: 'Guide students through career exploration and monitor their progress',
      icon: <BookOpen className="w-12 h-12" />,
      color: 'bg-brutal-purple',
      features: [
        'Monitor student progress',
        'View assessment results',
        'Track career interests',
        'Generate reports',
      ],
      href: safeReturnTo ? `/sign-up/educator?returnTo=${encodeURIComponent(safeReturnTo)}` : '/sign-up/educator',
    },
    {
      value: 'mentor',
      title: "I'm a Professional",
      description: 'Share your career experience and mentor students through 1-on-1 sessions',
      icon: <Briefcase className="w-12 h-12" />,
      color: 'bg-brutal-orange',
      features: [
        'Share your career journey',
        'Guide Rwandan students',
        'Set your availability',
        'Earn as you mentor',
      ],
      href: safeReturnTo ? `/sign-up/mentor?returnTo=${encodeURIComponent(safeReturnTo)}` : '/sign-up/mentor',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join <span className="text-orange-600">OpportunityMap</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roleOptions.map((option) => (
            <Link
              key={option.value}
              href={option.href}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all p-8 h-full flex flex-col border-4 border-brutal-border">
                <div className={`${option.color} w-20 h-20 rounded-lg flex items-center justify-center text-white mb-6 mx-auto border-3 border-brutal-border`}>
                  {option.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-center">{option.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 text-center flex-1">
                  {option.description}
                </p>

                <div className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t-3 border-brutal-border">
                  <span className={`block text-center px-6 py-3 ${option.color} text-white font-bold rounded-md border-3 border-brutal-border transition-all`}>
                    Sign Up
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Already have account */}
        <div className="text-center">
          <p className="text-lg text-gray-600">
            Already have an account?{' '}
            <Link
              href={safeReturnTo ? `/sign-in?returnTo=${encodeURIComponent(safeReturnTo)}` : "/sign-in"}
              className="font-semibold text-orange-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpRoleSelection() {
  return (
    <Suspense fallback={<AssessmentLoader fullscreen message="Loading..." />}>
      <SignUpRoleSelectionInner />
    </Suspense>
  );
}

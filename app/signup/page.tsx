'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Briefcase, Building2, Eye, EyeOff, ArrowRight } from 'lucide-react';

type UserRole = 'student' | 'mentor' | 'company' | null;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const roles = [
    {
      id: 'student' as const,
      icon: User,
      title: 'Student',
      description: 'Discover careers and connect with mentors',
      color: 'bg-primary',
    },
    {
      id: 'mentor' as const,
      icon: Briefcase,
      title: 'Mentor',
      description: 'Share your career experience with students',
      color: 'bg-secondary',
    },
    {
      id: 'company' as const,
      icon: Building2,
      title: 'Company',
      description: 'Sponsor careers and attract talent',
      color: 'bg-accent',
    },
  ];

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (selectedRole === 'student') {
      router.push('/dashboard/student');
    } else if (selectedRole === 'mentor') {
      router.push('/dashboard/mentor');
    } else if (selectedRole === 'company') {
      router.push('/dashboard/company');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-2">
            Opportunity<span className="text-primary">Map</span>
          </h1>
          <p className="text-xl font-bold text-gray-700">
            Join Rwanda&apos;s Career Discovery Platform
          </p>
        </div>

        {step === 1 && (
          <div>
            <div className="bg-white border-3 border-black shadow-brutal p-8 mb-6">
              <h2 className="text-3xl font-black mb-6 uppercase text-center">Choose Your Role</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setStep(2);
                      }}
                      className={`p-6 border-3 border-black ${
                        selectedRole === role.id ? role.color : 'bg-white'
                      } shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-left group`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-4 ${role.color} border-3 border-black mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase">{role.title}</h3>
                        <p className="text-sm font-bold text-gray-700">{role.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-gray-700">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === 2 && selectedRole && (
          <div>
            <div className="bg-white border-3 border-black shadow-brutal p-8">
              <button
                onClick={() => setStep(1)}
                className="mb-6 font-bold text-sm uppercase text-gray-600 hover:text-black flex items-center gap-2"
              >
                 Back
              </button>

              <h2 className="text-3xl font-black mb-2 uppercase">
                Sign Up as {selectedRole}
              </h2>
              <p className="text-lg font-bold text-gray-700 mb-8">
                Create your account in seconds
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-black text-sm uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 text-lg border-3 ${
                      errors.name ? 'border-red-500' : 'border-black'
                    } focus:outline-none focus:border-primary transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm font-bold text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-black text-sm uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 text-lg border-3 ${
                      errors.email ? 'border-red-500' : 'border-black'
                    } focus:outline-none focus:border-primary transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm font-bold text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block font-black text-sm uppercase mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 text-lg border-3 ${
                        errors.password ? 'border-red-500' : 'border-black'
                      } focus:outline-none focus:border-primary transition-colors`}
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm font-bold text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 border-2 border-black">
                  <p className="text-sm font-bold text-gray-700">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-primary text-white font-bold uppercase text-lg border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="text-lg font-bold text-gray-700">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="text-sm font-bold text-gray-600 hover:text-black">
             Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

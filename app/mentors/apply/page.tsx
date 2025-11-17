'use client';

import { useState } from 'react';
import { ArrowRight, Heart, Clock, Users, Award, MessageSquare, CheckCircle } from 'lucide-react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function MentorApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    
    // Step 2: Professional Background
    currentRole: '',
    company: '',
    yearsExperience: '',
    industry: '',
    careerField: '',
    
    // Step 3: Mentorship
    availability: '',
    motivation: '',
    sessionsPerMonth: '',
    focusAreas: [] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const submitApplication = useMutation(api.mentorApplications.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setStatus('submitting');
    
    try {
      await submitApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin || undefined,
        currentRole: formData.currentRole,
        company: formData.company,
        yearsExperience: formData.yearsExperience,
        industry: formData.industry,
        careerField: formData.careerField,
        availability: formData.availability,
        motivation: formData.motivation,
        sessionsPerMonth: formData.sessionsPerMonth,
        focusAreas: formData.focusAreas,
      });
      
      setStatus('submitted');
    } catch (error) {
      console.error('Failed to submit application:', error);
      setStatus('error');
    }
  };

  const handleFocusAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  if (status === 'submitted') {
    return (
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white p-8 md:p-12 border-3 border-brutal-border shadow-brutal-xl text-center">
          <div className="w-20 h-20 bg-brutal-green border-3 border-brutal-border rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-4 text-gray-900">Application Submitted!</h1>
          <p className="text-xl text-gray-700 mb-8">
            Thank you for applying to become a mentor. I&apos;ll review your application and get back to you within 3-5 business days.
          </p>
          <p className="text-gray-700 mb-8">
            I sent a confirmation email to <span className="font-bold">{formData.email}</span>
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-brutal-blue text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 bg-brutal-blue border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Become a Mentor
          </h1>
          <p className="text-xl text-white/90">
            Share your experience. Shape a student&apos;s future. 15 minutes at a time.
          </p>
        </div>
      </section>

      {/* Why Mentor */}
      <section className="px-4 py-12 bg-white border-b-3 border-brutal-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="w-12 h-12 text-brutal-orange mx-auto mb-3" />
              <h3 className="font-black mb-2 text-gray-900">15-30 Minutes</h3>
              <p className="text-gray-600 text-sm">Per mentorship session</p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-brutal-blue mx-auto mb-3" />
              <h3 className="font-black mb-2 text-gray-900">High School Students</h3>
              <p className="text-gray-600 text-sm">Exploring career options</p>
            </div>

            <div className="text-center">
              <Heart className="w-12 h-12 text-brutal-pink mx-auto mb-3" />
              <h3 className="font-black mb-2 text-gray-900">Make Impact</h3>
              <p className="text-gray-600 text-sm">Help students make informed decisions</p>
            </div>

            <div className="text-center">
              <Award className="w-12 h-12 text-brutal-green mx-auto mb-3" />
              <h3 className="font-black mb-2 text-gray-900">Give Back</h3>
              <p className="text-gray-600 text-sm">Volunteer your expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-12 h-12 border-3 border-brutal-border flex items-center justify-center font-black text-xl ${
                    s <= step ? 'bg-brutal-blue text-white' : 'bg-white text-gray-400'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-24 h-1 ${s < step ? 'bg-brutal-blue' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-700">
              <span>Basic Info</span>
              <span>Background</span>
              <span>Mentorship</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 border-3 border-brutal-border shadow-brutal-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <>
                  <h2 className="text-3xl font-black mb-6 text-gray-900">Let&apos;s Start With the Basics</h2>
                  
                  <div>
                    <label htmlFor="fullName" className="block font-bold mb-2 text-gray-900">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="Christian Tonny"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-bold mb-2 text-gray-900">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-bold mb-2 text-gray-900">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block font-bold mb-2 text-gray-900">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </>
              )}

              {/* Step 2: Professional Background */}
              {step === 2 && (
                <>
                  <h2 className="text-3xl font-black mb-6 text-gray-900">Your Professional Background</h2>
                  
                  <div>
                    <label htmlFor="currentRole" className="block font-bold mb-2 text-gray-900">
                      Current Role/Title *
                    </label>
                    <input
                      type="text"
                      id="currentRole"
                      required
                      value={formData.currentRole}
                      onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block font-bold mb-2 text-gray-900">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="e.g., Google, Andela, Ministry of ICT"
                    />
                  </div>

                  <div>
                    <label htmlFor="yearsExperience" className="block font-bold mb-2 text-gray-900">
                      Years of Experience *
                    </label>
                    <select
                      id="yearsExperience"
                      required
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                    >
                      <option value="">Select...</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="industry" className="block font-bold mb-2 text-gray-900">
                      Industry *
                    </label>
                    <input
                      type="text"
                      id="industry"
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="e.g., Technology, Healthcare, Finance"
                    />
                  </div>

                  <div>
                    <label htmlFor="careerField" className="block font-bold mb-2 text-gray-900">
                      Specific Career Field *
                    </label>
                    <input
                      type="text"
                      id="careerField"
                      required
                      value={formData.careerField}
                      onChange={(e) => setFormData({ ...formData, careerField: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                      placeholder="e.g., Software Development, Nursing, Marketing"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      This will be matched to careers students are exploring
                    </p>
                  </div>
                </>
              )}

              {/* Step 3: Mentorship Details */}
              {step === 3 && (
                <>
                  <h2 className="text-3xl font-black mb-6 text-gray-900">Your Mentorship Commitment</h2>
                  
                  <div>
                    <label htmlFor="availability" className="block font-bold mb-2 text-gray-900">
                      Typical Availability *
                    </label>
                    <select
                      id="availability"
                      required
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                    >
                      <option value="">Select...</option>
                      <option value="weekday-mornings">Weekday Mornings</option>
                      <option value="weekday-afternoons">Weekday Afternoons</option>
                      <option value="weekday-evenings">Weekday Evenings</option>
                      <option value="weekends">Weekends</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sessionsPerMonth" className="block font-bold mb-2 text-gray-900">
                      How many sessions can you commit to per month? *
                    </label>
                    <select
                      id="sessionsPerMonth"
                      required
                      value={formData.sessionsPerMonth}
                      onChange={(e) => setFormData({ ...formData, sessionsPerMonth: e.target.value })}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue text-gray-900"
                    >
                      <option value="">Select...</option>
                      <option value="1-2">1-2 sessions (30-60 min/month)</option>
                      <option value="3-5">3-5 sessions (1-2 hours/month)</option>
                      <option value="5+">5+ sessions (2+ hours/month)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-3 text-gray-900">
                      What can you help students with? (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Career path guidance',
                        'Educational requirements',
                        'Day-to-day job reality',
                        'Industry trends',
                        'Skill development tips',
                        'University/program selection',
                        'Work-life balance',
                        'Interview preparation',
                      ].map((area) => (
                        <label
                          key={area}
                          className={`flex items-center gap-3 p-3 border-3 border-brutal-border cursor-pointer ${
                            formData.focusAreas.includes(area)
                              ? 'bg-brutal-blue/10'
                              : 'bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.focusAreas.includes(area)}
                            onChange={() => handleFocusAreaToggle(area)}
                            className="w-5 h-5"
                          />
                          <span className="text-gray-900 font-semibold">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block font-bold mb-2 text-gray-900">
                      Why do you want to mentor students? *
                    </label>
                    <textarea
                      id="motivation"
                      required
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-blue resize-none text-gray-900"
                      placeholder="Share your motivation for helping high school students explore careers..."
                    />
                  </div>

                  <div className="bg-brutal-yellow/20 p-6 border-3 border-brutal-border">
                    <p className="text-gray-900 font-semibold text-sm">
                      By submitting this application, you agree to undergo a background verification and commit to maintaining professional conduct in all interactions with students.
                    </p>
                  </div>
                </>
              )}

              {/* Form Navigation */}
              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-4 bg-white text-gray-700 font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 px-8 py-4 bg-brutal-blue text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
                >
                  {step === 3 
                    ? status === 'submitting' ? 'Submitting...' : 'Submit Application'
                    : 'Next Step'}
                  <ArrowRight className="inline-block ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-black mb-8 text-center text-gray-900">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brutal-orange border-3 border-brutal-border flex items-center justify-center font-black text-white">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2 text-gray-900">Application Review (3-5 days)</h3>
                <p className="text-gray-700">
                  I&apos;ll review your application and verify your professional background via LinkedIn/references.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brutal-blue border-3 border-brutal-border flex items-center justify-center font-black text-white">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2 text-gray-900">Onboarding Call (30 min)</h3>
                <p className="text-gray-700">
                  If approved, we&apos;ll have a quick call to explain how the platform works and answer your questions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brutal-green border-3 border-brutal-border flex items-center justify-center font-black text-black">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2 text-gray-900">Start Mentoring!</h3>
                <p className="text-gray-700">
                  Your profile goes live. Students can book sessions based on your availability. You control your schedule completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="px-4 py-12 bg-brutal-bg border-t-3 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center">
          <MessageSquare className="w-12 h-12 text-brutal-blue mx-auto mb-4" />
          <h3 className="text-2xl font-black mb-4 text-gray-900">Have Questions?</h3>
          <p className="text-gray-700 mb-6">
            Reach out before applying. I&apos;m happy to explain the program in detail.
          </p>
          <a
            href="mailto:mentors@opportunitymap.rw"
            className="inline-block px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Email Me
          </a>
        </div>
      </section>
    </div>
  );
}

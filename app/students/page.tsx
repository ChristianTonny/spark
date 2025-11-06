'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Users, TrendingUp, Target, CheckCircle, Sparkles } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-orange border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="px-4 py-2 bg-white text-brutal-orange border-3 border-brutal-border font-bold uppercase text-sm shadow-brutal-sm inline-block mb-6">
                For Students
              </span>
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Discover Careers You Never Knew Existed
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Explore 100+ career paths, talk to real professionals, and make informed decisions about your future&mdash;before choosing your A-Level combination.
              </p>
              <Link
                href="/sign-up/student"
                className="inline-block px-8 py-4 bg-white text-brutal-orange font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Start Exploring
                <ArrowRight className="inline-block ml-2" />
              </Link>
              <p className="text-white/80 mt-4 text-sm">
                100% free for all Rwandan students
              </p>
            </div>
            
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal-xl">
              <h3 className="text-2xl font-black mb-6 text-gray-900">What You&apos;ll Get</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brutal-orange flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">100+ detailed career profiles with salaries, skills, and paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brutal-blue flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">15-minute sessions with professionals in your dream careers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brutal-green flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Career assessments to match your interests and strengths</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brutal-pink flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Clear roadmaps: which A-Level subjects, which universities, which skills</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              The Problem We&apos;re Solving
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Most Rwandan students choose careers without knowing what&apos;s actually out there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-red-600 mb-2">70%</div>
              <p className="text-gray-700 font-semibold">
                Of students never explore careers before choosing A-Level combinations
              </p>
            </div>

            <div className="bg-red-50 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-red-600 mb-2">5-10</div>
              <p className="text-gray-700 font-semibold">
                Typical number of careers students know about (there are 1000+)
              </p>
            </div>

            <div className="bg-red-50 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-red-600 mb-2">Too Late</div>
              <p className="text-gray-700 font-semibold">
                Most discover their dream career after already choosing the wrong path
              </p>
            </div>
          </div>

          <div className="mt-12 bg-brutal-yellow/30 p-8 border-3 border-brutal-border text-center">
            <p className="text-xl font-semibold text-gray-900">
              &quot;I wish I knew data science existed before I chose my A-Level combination. Now I&apos;m stuck.&quot; &mdash; Former O-Level student
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-gray-900">
            How OpportunityMap Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <div className="w-12 h-12 bg-brutal-orange border-3 border-brutal-border flex items-center justify-center text-white font-black text-2xl mb-4">
                1
              </div>
              <Compass className="w-12 h-12 text-brutal-orange mb-4" />
              <h3 className="text-2xl font-black mb-3 text-gray-900">Explore Careers</h3>
              <p className="text-gray-700">
                Browse 100+ careers across tech, business, healthcare, creative arts, and more. See realistic salaries, required skills, and day-to-day activities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <div className="w-12 h-12 bg-brutal-blue border-3 border-brutal-border flex items-center justify-center text-white font-black text-2xl mb-4">
                2
              </div>
              <Target className="w-12 h-12 text-brutal-blue mb-4" />
              <h3 className="text-2xl font-black mb-3 text-gray-900">Take Assessments</h3>
              <p className="text-gray-700">
                Answer questions about your interests, strengths, and goals. Get personalized career recommendations that match who you are.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <div className="w-12 h-12 bg-brutal-green border-3 border-brutal-border flex items-center justify-center text-white font-black text-2xl mb-4">
                3
              </div>
              <Users className="w-12 h-12 text-brutal-green mb-4" />
              <h3 className="text-2xl font-black mb-3 text-gray-900">Talk to Mentors</h3>
              <p className="text-gray-700">
                Book 15-minute sessions with professionals working in your dream careers. Ask real questions, get honest answers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              All of this is 100% free. No credit card required.
            </p>
            <Link
              href="/sign-up/student"
              className="inline-block px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Create Your Free Account
              <ArrowRight className="inline-block ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900">
            Everything You Need to Make Informed Decisions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-orange border-3 border-brutal-border flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">Realistic Career Info</h3>
                <p className="text-gray-700">
                  No BS. See what people actually earn, what skills you really need, and what the job is like day-to-day. Researched from Rwanda&apos;s job market.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-blue border-3 border-brutal-border flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">Connect With Professionals</h3>
                <p className="text-gray-700">
                  Stop guessing. Talk to software engineers, doctors, architects, marketers&mdash;people doing the job you&apos;re curious about.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-green border-3 border-brutal-border flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">Clear Pathways</h3>
                <p className="text-gray-700">
                  See exactly which A-Level subjects, which universities, and which skills you need for each career. No confusion.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-pink border-3 border-brutal-border flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">Track Your Progress</h3>
                <p className="text-gray-700">
                  Save careers you&apos;re interested in, track mentor sessions, retake assessments as you grow. Your career exploration journey in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900">
            What Students Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 border-3 border-brutal-border shadow-brutal">
                <div className="flex gap-2 mb-4">
                  <span className="text-brutal-yellow text-2xl">★★★★★</span>
                </div>
                <p className="text-gray-700 mb-4">
                  &quot;OpportunityMap showed me careers I never knew existed. Now I know exactly what A-Level subjects to choose!&quot;
                </p>
                <p className="font-bold text-gray-900">&mdash; S3 Student, Kigali</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            (Platform launching soon&mdash;these will be real testimonials!)
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-black mb-8 text-center text-gray-900">
            Common Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-brutal-bg p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                Is OpportunityMap really free?
              </summary>
              <p className="mt-3 text-gray-700">
                Yes! 100% free for all students. No hidden costs, no premium tiers. We&apos;re funded by partnerships with companies and schools.
              </p>
            </details>

            <details className="bg-brutal-bg p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                What if I don&apos;t know what I&apos;m interested in yet?
              </summary>
              <p className="mt-3 text-gray-700">
                Perfect! That&apos;s exactly who this is for. Take our assessments, explore random careers, talk to mentors. Discovery is the point.
              </p>
            </details>

            <details className="bg-brutal-bg p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                Are the mentors real professionals?
              </summary>
              <p className="mt-3 text-gray-700">
                Yes. All mentors are verified professionals working in Rwanda or regionally. They volunteer their time to help students.
              </p>
            </details>

            <details className="bg-brutal-bg p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                What grade should I start using this?
              </summary>
              <p className="mt-3 text-gray-700">
                The earlier the better! Ideally S1-S3, before you choose your A-Level combination. But it&apos;s never too late&mdash;even S4-S6 students benefit.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 md:py-24 bg-brutal-blue border-t-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Your Future Starts With Better Information
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Join hundreds of Rwandan students exploring careers on OpportunityMap.
          </p>
          
          <Link
            href="/sign-up/student"
            className="inline-block px-8 py-4 bg-white text-brutal-blue font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Get Started for Free
            <ArrowRight className="inline-block ml-2" />
          </Link>

          <p className="text-white/80 mt-6">
            No credit card &bull; Set up in 2 minutes &bull; 100% free forever
          </p>
        </div>
      </section>
    </div>
  );
}

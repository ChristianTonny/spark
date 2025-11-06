'use client';

import Link from 'next/link';
import { ArrowRight, Building2, Users, Target, TrendingUp, Award, UserCheck } from 'lucide-react';

export default function CompaniesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-blue border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="px-4 py-2 bg-white text-brutal-blue border-3 border-brutal-border font-bold uppercase text-sm shadow-brutal-sm inline-block mb-6">
                For Companies
              </span>
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Build Your Talent Pipeline Early
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Connect with Rwanda's next generation of talent while they're still in high school.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-brutal-blue font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Partner With Us
                <ArrowRight className="inline-block ml-2" />
              </Link>
            </div>
            
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal-xl">
              <h3 className="text-2xl font-black mb-6">Partnership Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brutal-orange border-2 border-brutal-border flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Access to motivated high school students</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brutal-blue border-2 border-brutal-border flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Build brand awareness among future talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brutal-green border-2 border-brutal-border flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Sponsor careers and showcase your industry</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brutal-pink border-2 border-brutal-border flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-semibold">Track engagement and pipeline metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              The Talent Gap Problem
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Rwandan companies struggle to find qualified talent. Students don't know your industry exists. OpportunityMap bridges this gap.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-brutal-orange/10 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-brutal-orange mb-2">70%</div>
              <p className="text-gray-700 font-semibold">
                Of students never consider tech careers due to lack of awareness
              </p>
            </div>

            <div className="bg-brutal-blue/10 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-brutal-blue mb-2">5+</div>
              <p className="text-gray-700 font-semibold">
                Years it takes to build talent from high school to industry-ready
              </p>
            </div>

            <div className="bg-brutal-green/10 p-8 border-3 border-brutal-border text-center">
              <div className="text-5xl font-black text-brutal-green mb-2">$50K+</div>
              <p className="text-gray-700 font-semibold">
                Average cost per hire for technical roles in Rwanda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Partnership Opportunities
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Career Sponsorship */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Building2 className="w-12 h-12 text-brutal-orange mb-4" />
              <h3 className="text-2xl font-black mb-3">Career Sponsorship</h3>
              <p className="text-gray-700 mb-6">
                Sponsor a career profile on OpportunityMap and showcase your industry to thousands of students.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brutal-orange mt-1">✓</span>
                  <span className="text-gray-700">Company logo on career page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-orange mt-1">✓</span>
                  <span className="text-gray-700">Featured in search results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-orange mt-1">✓</span>
                  <span className="text-gray-700">Video content featuring your team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-orange mt-1">✓</span>
                  <span className="text-gray-700">Student engagement analytics</span>
                </li>
              </ul>
              <p className="text-xl font-black text-brutal-orange">
                Starting at $2,000/year per career
              </p>
            </div>

            {/* Employee Mentor Program */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Users className="w-12 h-12 text-brutal-blue mb-4" />
              <h3 className="text-2xl font-black mb-3">Employee Mentor Program</h3>
              <p className="text-gray-700 mb-6">
                Connect your employees with students as mentors. Build your employer brand and give back to the community.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brutal-blue mt-1">✓</span>
                  <span className="text-gray-700">Dedicated company mentor page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-blue mt-1">✓</span>
                  <span className="text-gray-700">15-minute sessions (easy commitment)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-blue mt-1">✓</span>
                  <span className="text-gray-700">Employer branding content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-blue mt-1">✓</span>
                  <span className="text-gray-700">CSR & impact reporting</span>
                </li>
              </ul>
              <p className="text-xl font-black text-brutal-blue">
                Starting at $5,000/year
              </p>
            </div>

            {/* School Partnerships */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Target className="w-12 h-12 text-brutal-green mb-4" />
              <h3 className="text-2xl font-black mb-3">School Partnership</h3>
              <p className="text-gray-700 mb-6">
                Sponsor access for entire schools and build relationships with future talent early.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span className="text-gray-700">Provide free access to 500+ students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span className="text-gray-700">Company presentations at schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span className="text-gray-700">Internship & scholarship opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span className="text-gray-700">Priority access to top talent</span>
                </li>
              </ul>
              <p className="text-xl font-black text-brutal-green">
                Starting at $10,000/year per school
              </p>
            </div>

            {/* Custom Solutions */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <UserCheck className="w-12 h-12 text-brutal-pink mb-4" />
              <h3 className="text-2xl font-black mb-3">Custom Partnership</h3>
              <p className="text-gray-700 mb-6">
                Have a unique idea? Let's build a custom partnership that meets your talent development goals.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink mt-1">✓</span>
                  <span className="text-gray-700">Industry-specific career pathways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink mt-1">✓</span>
                  <span className="text-gray-700">Branded assessments & content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink mt-1">✓</span>
                  <span className="text-gray-700">Virtual career fairs & events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink mt-1">✓</span>
                  <span className="text-gray-700">Dedicated talent pipeline dashboard</span>
                </li>
              </ul>
              <p className="text-xl font-black text-brutal-pink">
                Custom pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center">
            Why Partner With OpportunityMap?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-orange border-3 border-brutal-border flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Early Access to Talent</h3>
                <p className="text-gray-700">
                  Build relationships with students before they choose their A-Level combination or university. Shape their career decisions early.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-blue border-3 border-brutal-border flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Targeted Reach</h3>
                <p className="text-gray-700">
                  Connect with students interested specifically in your industry. No wasted marketing spend on uninterested audiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-green border-3 border-brutal-border flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Employer Branding</h3>
                <p className="text-gray-700">
                  Position your company as a leader in talent development. Stand out to future employees and current clients.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brutal-pink border-3 border-brutal-border flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Measurable Impact</h3>
                <p className="text-gray-700">
                  Track student engagement, mentor sessions completed, and talent pipeline growth with detailed analytics.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brutal-blue/10 p-8 border-3 border-brutal-border text-center">
            <p className="text-xl font-semibold text-gray-900">
              "Investing in career awareness today solves your hiring problems tomorrow."
            </p>
          </div>
        </div>
      </section>

      {/* Current Partners (placeholder) */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-black mb-8 text-center">
            Trusted by Rwanda's Leading Companies
          </h2>
          <p className="text-center text-gray-600 mb-12">
            (Partner logos will appear here)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-8 border-3 border-brutal-border shadow-brutal flex items-center justify-center h-32"
              >
                <Building2 className="w-12 h-12 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-black mb-12 text-center">
            What You'll Track
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-brutal-orange mb-2">Students Reached</div>
              <p className="text-gray-700">Number of students who viewed your careers</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-brutal-blue mb-2">Engagement Rate</div>
              <p className="text-gray-700">Time spent on your content & interactions</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-brutal-green mb-2">Mentor Sessions</div>
              <p className="text-gray-700">Number of conversations with students</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-brutal-pink mb-2">Pipeline Growth</div>
              <p className="text-gray-700">Students interested in your company</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-24 bg-brutal-orange border-t-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Build Your Talent Pipeline?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Let's discuss how OpportunityMap can help you connect with Rwanda's next generation of talent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-brutal-orange font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Schedule a Call
              <ArrowRight className="inline-block ml-2" />
            </Link>
            
            <a
              href="mailto:partnerships@opportunitymap.rw"
              className="px-8 py-4 bg-brutal-blue text-white font-bold text-lg uppercase border-3 border-white shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Email Us
            </a>
          </div>

          <p className="text-white/80 mt-6">
            partnerships@opportunitymap.rw • Response within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Video, Target } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function LandingPage() {
  const featuredCareers = useQuery(api.careers.getFeatured);
  const categories = useQuery(api.careers.getCategories);
  const careerCount = useQuery(api.careers.count);

  // Loading state
  if (featuredCareers === undefined || categories === undefined || careerCount === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <h1 className="text-4xl font-black mb-4">Loading OpportunityMap...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-3 py-2 sm:px-4 sm:py-2 bg-brutal-yellow border-3 border-brutal-border text-brutal-text font-bold uppercase text-xs sm:text-sm shadow-brutal-sm whitespace-nowrap">
                  🎯 Career Discovery for Rwandan Students
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                Find Your Future Career in Rwanda
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Explore <span className="font-bold text-brutal-orange">100+ careers</span>, take assessments, 
                and book 15-min chats with professionals. Discover what you were meant to do.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/careers"
                  className="group px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all text-center"
                >
                  Explore Careers
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/assessments"
                  className="group px-8 py-4 bg-white text-brutal-text font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all text-center"
                >
                  Take Assessment
                </Link>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="relative">
              <div className="bg-brutal-blue text-white p-8 border-3 border-brutal-border shadow-brutal-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b-3 border-white/30">
                    <Sparkles className="w-12 h-12" />
                    <div>
                      <p className="text-4xl font-black">100+</p>
                      <p className="text-lg font-bold uppercase">Career Paths</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pb-6 border-b-3 border-white/30">
                    <Users className="w-12 h-12" />
                    <div>
                      <p className="text-4xl font-black">50+</p>
                      <p className="text-lg font-bold uppercase">Mentors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Video className="w-12 h-12" />
                    <div>
                      <p className="text-4xl font-black">1,000+</p>
                      <p className="text-lg font-bold uppercase">Career Chats</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -z-10 -right-4 -bottom-4 w-full h-full bg-brutal-yellow border-3 border-brutal-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-xl text-gray-700">Three simple steps to discover your future</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group">
              <div className="bg-brutal-bg p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all">
                <div className="mb-6">
                  <span className="inline-block w-16 h-16 bg-brutal-orange text-white text-3xl font-black border-3 border-brutal-border flex items-center justify-center shadow-brutal-sm">
                    1
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-3">Explore</h3>
                <p className="text-lg text-gray-700">
                  Browse 100+ careers with videos, salary info, and education requirements
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group md:mt-8">
              <div className="bg-brutal-bg p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all">
                <div className="mb-6">
                  <span className="inline-block w-16 h-16 bg-brutal-blue text-white text-3xl font-black border-3 border-brutal-border flex items-center justify-center shadow-brutal-sm">
                    2
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-3">Assess</h3>
                <p className="text-lg text-gray-700">
                  Take assessments to discover careers matching your interests and skills
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="bg-brutal-bg p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all">
                <div className="mb-6">
                  <span className="inline-block w-16 h-16 bg-brutal-yellow text-brutal-text text-3xl font-black border-3 border-brutal-border flex items-center justify-center shadow-brutal-sm">
                    3
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-3">Connect</h3>
                <p className="text-lg text-gray-700">
                  Book 15-min video chats with professionals to learn what jobs are really like
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Careers Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">Featured Careers</h2>
              <p className="text-xl text-gray-700">Start exploring popular paths</p>
            </div>
            <Link
              href="/careers"
              className="px-6 py-3 bg-brutal-text text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              View All {careerCount}+
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareers.map((career, index) => (
              <Link
                key={career._id}
                href={`/careers/${career._id}`}
                className="group block"
              >
                <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden border-b-3 border-brutal-border">
                    <img
                      src={career.videoThumbnail}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white text-brutal-text text-sm font-bold uppercase border-2 border-brutal-border shadow-brutal-sm">
                        {career.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-black mb-2 group-hover:text-brutal-orange transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {career.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t-3 border-gray-200">
                      <span className="text-lg font-bold text-brutal-orange">
                        {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
                      </span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-700">Find careers in your area of interest</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/careers?category=${encodeURIComponent(category)}`}
                className="group p-6 bg-brutal-bg border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
              >
                <p className="font-black text-lg group-hover:text-brutal-orange transition-colors">
                  {category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-brutal-orange text-white p-12 md:p-16 border-3 border-brutal-border shadow-brutal-xl text-center">
            <Target className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Discover Your Future?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of students finding their path
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="px-8 py-4 bg-white text-brutal-orange font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/careers"
                className="px-8 py-4 bg-brutal-blue text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Browse Careers
              </Link>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -right-6 -bottom-6 w-full h-full bg-brutal-text border-3 border-brutal-border"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-brutal-border bg-white px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black mb-4">OpportunityMap</h3>
              <p className="text-gray-700">
                Discover your future career in Rwanda
              </p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-3 uppercase">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/careers" className="text-gray-700 hover:text-brutal-orange font-bold">Browse Careers</Link></li>
                <li><Link href="/assessments" className="text-gray-700 hover:text-brutal-orange font-bold">Take Assessment</Link></li>
                <li><Link href="/mentors" className="text-gray-700 hover:text-brutal-orange font-bold">Find Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-3 uppercase">For</h4>
              <ul className="space-y-2">
                <li><Link href="/students" className="text-gray-700 hover:text-brutal-orange font-bold">Students</Link></li>
                <li><Link href="/mentors/apply" className="text-gray-700 hover:text-brutal-orange font-bold">Mentors</Link></li>
                <li><Link href="/companies" className="text-gray-700 hover:text-brutal-orange font-bold">Companies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-3 uppercase">About</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-700 hover:text-brutal-orange font-bold">Our Story</Link></li>
                <li><Link href="/contact" className="text-gray-700 hover:text-brutal-orange font-bold">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-700 hover:text-brutal-orange font-bold">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t-3 border-brutal-border text-center">
            <p className="font-bold text-gray-700">
              © 2025 OpportunityMap. Built for Rwandan Students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Video, Target } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  const featuredCareers = useQuery(api.careers.getFeatured);
  const categories = useQuery(api.careers.getCategories);
  const careerCount = useQuery(api.careers.count);
  const isAdmin = useQuery(api.admin.isAdmin);

  // Redirect admins to admin dashboard
  useEffect(() => {
    if (isAdmin === true) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

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
      <section className="relative px-4 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-block">
                <span className="inline-flex px-3 py-2 sm:px-4 sm:py-2 bg-brutal-yellow border-3 border-brutal-border text-brutal-text font-bold uppercase text-xs sm:text-sm shadow-brutal-sm">
                  🎯 Career Discovery for Rwandan Students
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Find Your Future Career in Rwanda
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Explore <span className="font-bold text-brutal-orange">100+ careers</span>, take assessments,
                and book 15-min chats with professionals. Discover what you were meant to do.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/careers"
                  className="group px-6 py-4 sm:px-8 min-h-[52px] flex items-center justify-center bg-brutal-orange text-white font-bold text-base sm:text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-none transition-all text-center"
                >
                  Explore Careers
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/assessments"
                  className="group px-6 py-4 sm:px-8 min-h-[52px] flex items-center justify-center bg-white text-brutal-text font-bold text-base sm:text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-none transition-all text-center"
                >
                  Take Assessment
                </Link>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-brutal-blue text-white p-6 sm:p-8 border-3 border-brutal-border shadow-brutal-xl">
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 pb-5 sm:pb-6 border-b-3 border-white/30">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
                    <div>
                      <p className="text-2xl sm:text-3xl font-black">100+</p>
                      <p className="text-sm sm:text-base font-bold uppercase">Career Paths</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 pb-5 sm:pb-6 border-b-3 border-white/30">
                    <Users className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
                    <div>
                      <p className="text-2xl sm:text-3xl font-black">50+</p>
                      <p className="text-sm sm:text-base font-bold uppercase">Mentors</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <Video className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
                    <div>
                      <p className="text-2xl sm:text-3xl font-black">1,000+</p>
                      <p className="text-sm sm:text-base font-bold uppercase">Career Chats</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element - hidden on small screens */}
              <div className="hidden sm:block absolute -z-10 -right-4 -bottom-4 w-full h-full bg-brutal-yellow border-3 border-brutal-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-gray-700">Three simple steps to discover your future</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="group">
              <div className="bg-brutal-bg p-6 sm:p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg active:shadow-none transition-all">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-brutal-orange text-white text-2xl sm:text-3xl font-black border-3 border-brutal-border items-center justify-center shadow-brutal-sm">
                    1
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2 sm:mb-3">Explore</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Browse 100+ careers with videos, salary info, and education requirements
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group sm:mt-0 md:mt-8">
              <div className="bg-brutal-bg p-6 sm:p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg active:shadow-none transition-all">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-brutal-blue text-white text-2xl sm:text-3xl font-black border-3 border-brutal-border items-center justify-center shadow-brutal-sm">
                    2
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2 sm:mb-3">Assess</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Take assessments to discover careers matching your interests and skills
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group sm:col-span-2 md:col-span-1">
              <div className="bg-brutal-bg p-6 sm:p-8 border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg active:shadow-none transition-all">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-brutal-yellow text-brutal-text text-2xl sm:text-3xl font-black border-3 border-brutal-border items-center justify-center shadow-brutal-sm">
                    3
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2 sm:mb-3">Connect</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Book 15-min video chats with professionals to learn what jobs are really like
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Careers Section */}
      <section className="px-4 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">Featured Careers</h2>
              <p className="text-base sm:text-lg text-gray-700">Start exploring popular paths</p>
            </div>
            <Link
              href="/careers"
              className="px-5 py-3 sm:px-6 min-h-[48px] flex items-center justify-center bg-brutal-text text-white font-bold uppercase text-sm sm:text-base border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all whitespace-nowrap"
            >
              View All {careerCount}+
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCareers.map((career, index) => (
              <Link
                key={career._id}
                href={`/careers/${career._id}`}
                className="group block"
              >
                <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden border-b-3 border-brutal-border flex-shrink-0">
                    <img
                      src={career.videoThumbnail}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <span className="px-2 py-1 sm:px-3 bg-white text-brutal-text text-xs sm:text-sm font-bold uppercase border-2 border-brutal-border shadow-brutal-sm">
                        {career.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-black mb-2 group-hover:text-brutal-orange transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-grow">
                      {career.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t-3 border-gray-200">
                      <span className="text-sm sm:text-base md:text-lg font-bold text-brutal-orange">
                        {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
                      </span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">Explore by Category</h2>
            <p className="text-base sm:text-lg text-gray-700">Find careers in your area of interest</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/careers?category=${encodeURIComponent(category)}`}
                className="group p-4 sm:p-5 md:p-6 min-h-[80px] sm:min-h-[90px] bg-brutal-bg border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all flex items-center justify-center text-center"
              >
                <p className="font-black text-sm sm:text-base md:text-lg group-hover:text-brutal-orange transition-colors break-words">
                  {category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-brutal-orange text-white p-8 sm:p-10 md:p-12 lg:p-16 border-3 border-brutal-border shadow-brutal-xl text-center">
            <Target className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
              Ready to Discover Your Future?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
              Join thousands of students finding their path
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/signup"
                className="px-6 py-4 sm:px-8 min-h-[52px] flex items-center justify-center bg-white text-brutal-orange font-bold text-base sm:text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all"
              >
                Sign Up Free
              </Link>
              <Link
                href="/careers"
                className="px-6 py-4 sm:px-8 min-h-[52px] flex items-center justify-center bg-brutal-blue text-white font-bold text-base sm:text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all"
              >
                Browse Careers
              </Link>
            </div>

            {/* Decorative element - hidden on very small screens */}
            <div className="hidden sm:block absolute -z-10 -right-4 -bottom-4 sm:-right-6 sm:-bottom-6 w-full h-full bg-brutal-text border-3 border-brutal-border"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-brutal-border bg-white px-4 py-8 sm:py-10 md:py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">OpportunityMap</h3>
              <p className="text-sm text-gray-700">
                Discover your future career in Rwanda
              </p>
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base mb-3 uppercase">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/careers" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Browse Careers</Link></li>
                <li><Link href="/assessments" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Take Assessment</Link></li>
                <li><Link href="/mentors" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Find Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base mb-3 uppercase">For</h4>
              <ul className="space-y-2">
                <li><Link href="/students" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Students</Link></li>
                <li><Link href="/mentors/apply" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Mentors</Link></li>
                <li><Link href="/companies" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Companies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base mb-3 uppercase">About</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Our Story</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-700 hover:text-brutal-orange font-bold transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t-3 border-brutal-border text-center">
            <p className="text-sm sm:text-base font-bold text-gray-700">
              © 2025 OpportunityMap. Built for Rwandan Students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

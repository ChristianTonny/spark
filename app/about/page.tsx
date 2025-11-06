'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-orange border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            We're Making Career Discovery Fair for Everyone
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            OpportunityMap started because I saw my friends choosing careers without ever exploring what's actually out there.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black mb-8">The Story</h2>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="text-xl leading-relaxed">
              Hey! I'm Christian Tonny, a student at ALU Rwanda and the founder of OpportunityMap. This project came out of a simple observation: <span className="font-bold">most Rwandan high school students choose their future careers without really knowing what options exist.</span>
            </p>
            
            <p className="text-xl leading-relaxed">
              Growing up in Kigali, I watched friends pick O-Level and A-Level combinations based on what their parents did, what seemed "safe," or just what everyone else was choosing. By the time they got to university, many realized they picked the wrong path—but it was already too late.
            </p>

            <p className="text-xl leading-relaxed">
              The problem isn't that students aren't smart or ambitious. It's that <span className="font-bold">nobody told them what careers actually exist, what they pay, or how to get there.</span> If you don't know data science is a career, you'll never choose it.
            </p>

            <p className="text-xl leading-relaxed">
              So I built OpportunityMap as a solution. It's a platform where high school students can:
            </p>

            <ul className="list-none space-y-4 my-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brutal-orange border-2 border-brutal-border flex-shrink-0 mt-1" />
                <span className="text-xl">Discover 100+ careers they never knew existed</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brutal-blue border-2 border-brutal-border flex-shrink-0 mt-1" />
                <span className="text-xl">See realistic salary ranges and career paths</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brutal-green border-2 border-brutal-border flex-shrink-0 mt-1" />
                <span className="text-xl">Talk to real professionals working in those fields</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brutal-pink border-2 border-brutal-border flex-shrink-0 mt-1" />
                <span className="text-xl">Take assessments to find careers that match their interests</span>
              </li>
            </ul>

            <p className="text-xl leading-relaxed">
              This is a personal project, built by a student, for students. It's not a big corporate product—it's something I'm building because I believe every Rwandan student deserves the same access to career information that students in Nairobi, Lagos, or Silicon Valley have.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Target className="w-12 h-12 text-brutal-orange mb-4" />
              <h3 className="text-2xl font-black mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Help Rwandan high school students make informed career decisions by giving them access to comprehensive career information and connections to professionals.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Heart className="w-12 h-12 text-brutal-blue mb-4" />
              <h3 className="text-2xl font-black mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A Rwanda where every student chooses their career path based on knowledge and passion, not just what they happen to hear about.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 border-3 border-brutal-border shadow-brutal">
              <Users className="w-12 h-12 text-brutal-green mb-4" />
              <h3 className="text-2xl font-black mb-4">Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span>Access for all students</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span>Honest, realistic info</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span>Student-first design</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brutal-green mt-1">✓</span>
                  <span>Built with care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-black mb-8">Where We Are Now</h2>
          
          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              OpportunityMap is currently in <span className="font-bold">early development</span>. I'm building it as a solo project while studying at ALU Rwanda. Here's where things stand:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-brutal-green/10 p-6 border-3 border-brutal-border">
                <h4 className="font-black text-xl mb-3">✅ Done</h4>
                <ul className="space-y-2">
                  <li>• Platform architecture built</li>
                  <li>• 100+ career profiles researched</li>
                  <li>• Mentor matching system designed</li>
                  <li>• Career assessment framework</li>
                </ul>
              </div>

              <div className="bg-brutal-orange/10 p-6 border-3 border-brutal-border">
                <h4 className="font-black text-xl mb-3">🚧 In Progress</h4>
                <ul className="space-y-2">
                  <li>• Loading career data</li>
                  <li>• Testing with pilot schools</li>
                  <li>• Recruiting first mentors</li>
                  <li>• Building partnerships</li>
                </ul>
              </div>
            </div>

            <p>
              The goal is to launch a working beta by <span className="font-bold">mid-2025</span> and start getting real students using the platform. If you're a professional interested in becoming a mentor, or a school interested in partnering, reach out!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-blue border-t-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Want to Help?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            This is a community effort. Whether you're a professional who can mentor students, a company looking to sponsor careers, or just someone who believes in the mission—I'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mentors/apply"
              className="px-8 py-4 bg-white text-brutal-blue font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Become a Mentor
              <ArrowRight className="inline-block ml-2" />
            </Link>
            
            <Link
              href="/contact"
              className="px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-white shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

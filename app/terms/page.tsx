'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 bg-brutal-orange border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-white/90">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Intro */}
            <div className="bg-brutal-yellow/20 p-6 border-3 border-brutal-border mb-12">
              <p className="font-semibold text-gray-900 m-0">
                TL;DR: Be respectful. Don't abuse the platform. We're not responsible if you make career decisions based solely on OpportunityMap. This is a personal project, not a corporation—I'm doing my best to make it helpful.
              </p>
            </div>

            {/* Section 1 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using OpportunityMap, you agree to these terms. If you don't agree, please don't use the platform. Simple as that.
            </p>
            <p className="text-gray-700">
              These terms apply to all users: students, mentors, educators, and anyone else using the site.
            </p>

            {/* Section 2 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Who Can Use OpportunityMap</h2>
            
            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Students</h3>
            <ul className="text-gray-700 space-y-2">
              <li>You must be at least 13 years old</li>
              <li>If you're under 18, your parent/guardian should know you're using this</li>
              <li>You're responsible for keeping your account secure</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Mentors</h3>
            <ul className="text-gray-700 space-y-2">
              <li>You must be 18+ years old</li>
              <li>You must accurately represent your professional background</li>
              <li>You agree to treat students respectfully and professionally</li>
              <li>We reserve the right to remove mentors who violate guidelines</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">How to Use OpportunityMap</h2>
            
            <div className="bg-brutal-bg p-6 border-3 border-brutal-border my-6">
              <h4 className="font-black text-xl mb-3 text-gray-900">✅ DO:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Explore careers and learn about different fields</li>
                <li>Book mentor sessions and ask thoughtful questions</li>
                <li>Share honest feedback to help us improve</li>
                <li>Recommend OpportunityMap to friends and classmates</li>
              </ul>

              <h4 className="font-black text-xl mt-6 mb-3 text-gray-900">❌ DON'T:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Harass, bully, or disrespect mentors or other users</li>
                <li>Spam the platform with fake accounts or content</li>
                <li>Scrape or copy our career data for commercial use</li>
                <li>Impersonate someone else or provide false information</li>
                <li>Use the platform for anything illegal</li>
              </ul>
            </div>

            {/* Section 4 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Career Information Disclaimer</h2>
            <p className="text-gray-700 font-semibold">
              Important: OpportunityMap provides general career information, not personalized career advice.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>Career profiles are researched to the best of my ability but may not be 100% accurate or up-to-date</li>
              <li>Salary ranges are estimates based on Rwanda's market—actual salaries vary</li>
              <li>Career paths shown are typical but not the only way to enter a field</li>
              <li>Mentors share their personal experiences, not universal truths</li>
            </ul>
            <p className="text-gray-700 font-semibold mt-4">
              You are responsible for your own career decisions. Do your research, talk to multiple people, and make informed choices.
            </p>

            {/* Section 5 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Mentor Sessions</h2>
            <p className="text-gray-700">
              Mentor sessions are meant to be informative and supportive:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>Sessions typically last 15-30 minutes</li>
              <li>Mentors volunteer their time—be respectful of their schedule</li>
              <li>If you can't make a session, cancel at least 24 hours in advance</li>
              <li>Repeated no-shows may result in restricted access</li>
              <li>Report inappropriate mentor behavior immediately</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">For Mentors</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Keep sessions professional and appropriate</li>
              <li>Don't share personal contact information (use the platform)</li>
              <li>Don't offer employment or make promises you can't keep</li>
              <li>Report any concerning student behavior</li>
            </ul>

            {/* Section 6 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">User-Generated Content</h2>
            <p className="text-gray-700">
              If you post content (reviews, questions, feedback):
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>You retain ownership of your content</li>
              <li>You grant us permission to display it on OpportunityMap</li>
              <li>We can remove content that violates these terms</li>
              <li>Don't post spam, offensive material, or copyrighted content</li>
            </ul>

            {/* Section 7 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Intellectual Property</h2>
            <p className="text-gray-700">
              OpportunityMap's content (career profiles, design, code) is owned by me (Christian Tonny) unless otherwise noted:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>You can view and use the site for personal, non-commercial purposes</li>
              <li>You can't copy our career database or design for your own product</li>
              <li>If you're a researcher or educator and want to use our data, email me—I'm open to it!</li>
            </ul>

            {/* Section 8 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Liability & Warranties</h2>
            <p className="text-gray-700">
              Here's the legal stuff (required, but I'll keep it simple):
            </p>
            
            <div className="bg-brutal-bg p-6 border-3 border-brutal-border my-6">
              <p className="text-gray-700 m-0">
                <span className="font-bold">OpportunityMap is provided "as is."</span> I'm doing my best to make it useful and accurate, but I can't guarantee:
              </p>
              <ul className="text-gray-700 space-y-2 mt-3">
                <li>That the site will always be available (it might go down sometimes)</li>
                <li>That career information is 100% accurate or complete</li>
                <li>That you'll find the perfect career or mentor</li>
                <li>That using OpportunityMap will lead to specific outcomes</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                I'm not liable for any decisions you make based on information from OpportunityMap. Use it as one tool among many in your career exploration.
              </p>
            </div>

            {/* Section 9 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Account Termination</h2>
            <p className="text-gray-700">
              You can delete your account anytime. We can suspend or terminate accounts that:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>Violate these terms</li>
              <li>Engage in harassment or abuse</li>
              <li>Are inactive for more than 2 years (we'll warn you first)</li>
            </ul>

            {/* Section 10 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Changes to These Terms</h2>
            <p className="text-gray-700">
              I might update these terms as OpportunityMap grows. If I make significant changes:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>I'll email all users at least 30 days in advance</li>
              <li>The updated terms will be posted here with a new date</li>
              <li>Continued use means you accept the new terms</li>
            </ul>

            {/* Section 11 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of Rwanda. Any disputes will be resolved in Kigali, Rwanda.
            </p>

            {/* Section 12 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Contact</h2>
            <p className="text-gray-700">
              Questions about these terms? Reach out:
            </p>
            <div className="bg-brutal-bg p-6 border-3 border-brutal-border mt-4">
              <p className="m-0 text-gray-900">
                <span className="font-bold">Email:</span> <a href="mailto:legal@opportunitymap.rw" className="text-brutal-blue hover:underline">legal@opportunitymap.rw</a><br/>
                <span className="font-bold">General contact:</span> <a href="mailto:hello@opportunitymap.rw" className="text-brutal-blue hover:underline">hello@opportunitymap.rw</a>
              </p>
            </div>

            {/* Final Note */}
            <div className="bg-brutal-orange/10 p-6 border-3 border-brutal-border mt-12">
              <p className="font-semibold text-gray-900 m-0">
                A final note: This is a personal project built by a student to help other students. I'm not a lawyer, and these terms are written to be fair and understandable, not to trap you in legalese. If something here doesn't make sense, ask me!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 bg-brutal-blue border-t-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <p className="text-lg mb-4">
            Ready to start exploring careers?
          </p>
          <Link
            href="/careers"
            className="inline-block px-6 py-3 bg-white text-brutal-blue font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Browse Careers
          </Link>
        </div>
      </section>
    </div>
  );
}

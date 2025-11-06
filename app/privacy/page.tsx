'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 bg-brutal-blue border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Privacy Policy
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
                TL;DR: I don&apos;t sell your data. I don&apos;t spam you. I collect only what&apos;s needed to make OpportunityMap work. You can delete your account anytime.
              </p>
            </div>

            {/* Section 1 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">What Information We Collect</h2>
            
            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Account Information</h3>
            <p className="text-gray-700">When you create an account, we collect:</p>
            <ul className="text-gray-700 space-y-2">
              <li>Name and email address</li>
              <li>School name (for students)</li>
              <li>Grade level (for students)</li>
              <li>Professional information (for mentors)</li>
              <li>Profile photo (optional)</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Usage Data</h3>
            <p className="text-gray-700">We track how you use OpportunityMap to improve the experience:</p>
            <ul className="text-gray-700 space-y-2">
              <li>Careers you view and save</li>
              <li>Assessment results (stored privately)</li>
              <li>Mentor sessions you book</li>
              <li>Search queries</li>
              <li>Device type and browser information</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Communications</h3>
            <p className="text-gray-700">If you contact us or chat with mentors:</p>
            <ul className="text-gray-700 space-y-2">
              <li>Messages and conversation history</li>
              <li>Feedback and support requests</li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">How We Use Your Information</h2>
            
            <div className="bg-brutal-bg p-6 border-3 border-brutal-border my-6">
              <ul className="space-y-3 m-0 text-gray-900">
                <li className="flex gap-3">
                  <span className="text-brutal-orange font-black">1.</span>
                  <span><span className="font-bold">Provide the service:</span> Show you careers, connect you with mentors, save your preferences</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brutal-blue font-black">2.</span>
                  <span><span className="font-bold">Improve the platform:</span> Understand what careers students search for, what features work</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brutal-green font-black">3.</span>
                  <span><span className="font-bold">Send you updates:</span> Important notifications, new career additions, mentor messages</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brutal-pink font-black">4.</span>
                  <span><span className="font-bold">Safety:</span> Prevent abuse, enforce terms, keep the community safe</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 font-semibold">
              We do NOT sell your data to advertisers. We do NOT spam you with marketing emails. We do NOT share your personal information with third parties except as described below.
            </p>

            {/* Section 3 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Who We Share Data With</h2>
            
            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Service Providers</h3>
            <p className="text-gray-700">We use trusted services to run OpportunityMap:</p>
            <ul className="text-gray-700 space-y-2">
              <li><span className="font-bold">Convex:</span> Database and backend (US-based)</li>
              <li><span className="font-bold">Clerk:</span> Authentication and user management</li>
              <li><span className="font-bold">Vercel:</span> Hosting and deployment</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Mentors</h3>
            <p className="text-gray-700">
              When you book a session, your mentor can see your name, school, and the career you&apos;re interested in. They cannot see your assessment results or browsing history.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">Legal Requirements</h3>
            <p className="text-gray-700">
              We may disclose your information if required by law, court order, or to protect safety.
            </p>

            {/* Section 4 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Your Rights</h2>
            
            <div className="space-y-4 text-gray-700">
              <p><span className="font-bold">Access:</span> You can download all your data anytime from your account settings.</p>
              <p><span className="font-bold">Edit:</span> Update your profile, change your preferences, edit saved careers.</p>
              <p><span className="font-bold">Delete:</span> Delete your account and all associated data at any time. This is permanent.</p>
              <p><span className="font-bold">Opt-out:</span> Unsubscribe from email updates (you&apos;ll still get important account notifications).</p>
              <p><span className="font-bold">Questions:</span> Email me at <a href="mailto:privacy@opportunitymap.rw" className="text-brutal-blue hover:underline font-semibold">privacy@opportunitymap.rw</a> for any privacy concerns.</p>
            </div>

            {/* Section 5 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Data Security</h2>
            <p className="text-gray-700">
              We use industry-standard security measures:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>Encrypted connections (HTTPS)</li>
              <li>Secure authentication via Clerk</li>
              <li>Regular security audits</li>
              <li>Access controls on databases</li>
            </ul>
            <p className="text-gray-700">
              That said, no system is 100% secure. If we experience a data breach, we&apos;ll notify affected users within 72 hours.
            </p>

            {/* Section 6 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Students Under 18</h2>
            <p className="text-gray-700">
              Most OpportunityMap users are high school students (ages 14-18). We take extra care with student data:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>We don&apos;t require parental consent (GDPR allows this for educational services)</li>
              <li>Students can create accounts with just name + email</li>
              <li>We never share student data with advertisers</li>
              <li>Parents/guardians can request account deletion by emailing us</li>
            </ul>

            {/* Section 7 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Cookies & Tracking</h2>
            <p className="text-gray-700">
              We use minimal cookies:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li><span className="font-bold">Essential cookies:</span> Keep you logged in, remember your preferences</li>
              <li><span className="font-bold">Analytics cookies:</span> Understand how people use the site (via privacy-friendly analytics)</li>
            </ul>
            <p className="text-gray-700">
              We do NOT use advertising cookies or tracking pixels.
            </p>

            {/* Section 8 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Changes to This Policy</h2>
            <p className="text-gray-700">
              If I make major changes to this privacy policy, I&apos;ll email all users at least 30 days before the changes take effect. Continued use of OpportunityMap means you accept the new terms.
            </p>

            {/* Section 9 */}
            <h2 className="text-3xl font-black mt-12 mb-4 text-gray-900">Contact Me</h2>
            <p className="text-gray-700">
              Questions about privacy? I&apos;m happy to explain anything.
            </p>
            <div className="bg-brutal-bg p-6 border-3 border-brutal-border mt-4">
              <p className="m-0 text-gray-900">
                <span className="font-bold">Email:</span> <a href="mailto:privacy@opportunitymap.rw" className="text-brutal-blue hover:underline">privacy@opportunitymap.rw</a><br/>
                <span className="font-bold">General contact:</span> <a href="mailto:hello@opportunitymap.rw" className="text-brutal-blue hover:underline">hello@opportunitymap.rw</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 bg-brutal-blue border-t-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <p className="text-lg mb-4">
            Have questions about how we handle your data?
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-brutal-blue font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

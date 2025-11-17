"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

export default function ApplicationConfirmationPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="border-3 border-black shadow-brutal p-8 md:p-12 bg-brutal-green">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-black uppercase text-center mb-4 text-white">
            Application Submitted!
          </h1>

          <p className="text-lg text-white text-center mb-8">
            Thank you for applying to become a mentor on SPARK.
          </p>

          {/* What's Next */}
          <div className="bg-white border-3 border-black shadow-brutal p-6 mb-6">
            <h2 className="text-xl font-black uppercase mb-4">What Happens Next?</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-800">
              <li>
                <span className="font-bold">Review Process:</span> Our team will carefully review your application within 3-5 business days.
              </li>
              <li>
                <span className="font-bold">Email Notification:</span> You&apos;ll receive an email at the address you provided with our decision.
              </li>
              <li>
                <span className="font-bold">Account Setup:</span> If approved, you&apos;ll be able to log in and complete your mentor profile.
              </li>
              <li>
                <span className="font-bold">Start Mentoring:</span> Once your profile is complete, you&apos;ll appear publicly and students can book sessions with you.
              </li>
            </ol>
          </div>

          {/* Expectation Setting */}
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-6 mb-8">
            <h3 className="text-lg font-black uppercase mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>Please check your email regularly for updates</li>
              <li>Check your spam folder if you don&apos;t see our email</li>
              <li>We review applications in the order they&apos;re received</li>
              <li>We&apos;re looking for professionals committed to helping Rwandan students</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/careers"
              className="flex-1 px-6 py-4 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center flex items-center justify-center gap-2"
            >
              Explore Careers
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 text-gray-600">
          <p className="mb-2">Have questions about your application?</p>
          <p className="font-bold">Contact us at: support@spark-rw.com</p>
        </div>
      </div>
    </div>
  );
}

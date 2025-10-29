import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Wifi, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spark-blue rounded-2xl mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-spark-blue">Spark</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Offline-capable educational platform designed for rural students in Sub-Saharan Africa.
            Learn anywhere, anytime, even without internet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="text-center p-8 bg-white rounded-2xl shadow-card">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
              <Wifi className="w-8 h-8 text-spark-blue" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Offline First
            </h3>
            <p className="text-gray-600">
              Download content and learn without internet. Syncs automatically when you're back online.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-card">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
              <Users className="w-8 h-8 text-spark-green" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Community Support
            </h3>
            <p className="text-gray-600">
              Connect with educators and mentors who are ready to help you succeed in your studies.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-card">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
              <Award className="w-8 h-8 text-spark-purple" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Monitor your learning journey with achievements, streaks, and detailed progress tracking.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 p-12 bg-spark-blue rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-8">Empowering Rural Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Educators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Learning Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 Spark Learning Platform. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-600 hover:text-spark-blue text-sm">
                About
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-spark-blue text-sm">
                Help
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-spark-blue text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-spark-blue text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

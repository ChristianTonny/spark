"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, Settings } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-spark-blue rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              <span className="text-spark-blue">Spark</span> Learning
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/content" className="text-gray-600 hover:text-spark-blue font-medium">
              Browse Content
            </Link>
            <Link href="/questions/ask" className="text-gray-600 hover:text-spark-blue font-medium">
              Ask Question
            </Link>
            <Link href="/practice" className="text-gray-600 hover:text-spark-blue font-medium">
              Practice Tests
            </Link>
            <Link href="/dashboard/student/settings">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-spark-blue"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/content"
                className="text-gray-600 hover:text-spark-blue font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Content
              </Link>
              <Link
                href="/questions/ask"
                className="text-gray-600 hover:text-spark-blue font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ask Question
              </Link>
              <Link href="/practice" className="text-gray-600 hover:text-spark-blue font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Practice Tests
              </Link>
              <Link href="/dashboard/student/settings" className="text-gray-600 hover:text-spark-blue font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Settings
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, Twitter, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', category: 'general', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-orange border-b-4 border-brutal-border">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Let&apos;s Talk!
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Questions, feedback, partnership ideas? I read every message.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-black mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-bold mb-2 text-gray-900">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-orange text-gray-900"
                    placeholder="Christian Tonny"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-bold mb-2 text-gray-900">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-orange text-gray-900"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block font-bold mb-2 text-gray-900">
                    What&apos;s this about? *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-orange text-gray-900"
                  >
                    <option value="general">General Question</option>
                    <option value="mentor">Becoming a Mentor</option>
                    <option value="partnership">Partnership/Sponsorship</option>
                    <option value="school">School Partnership</option>
                    <option value="student">I&apos;m a Student</option>
                    <option value="feedback">Feedback/Suggestion</option>
                    <option value="bug">Report a Bug</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-bold mb-2 text-gray-900">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border-3 border-brutal-border focus:outline-none focus:ring-3 focus:ring-brutal-orange resize-none text-gray-900"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send className="inline-block ml-2 w-5 h-5" />
                </button>

                {status === 'sent' && (
                  <div className="p-4 bg-brutal-green/20 border-3 border-brutal-green text-gray-900 font-semibold">
                    ✓ Message sent! I&apos;ll get back to you within 24-48 hours.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-100 border-3 border-red-500 text-gray-900 font-semibold">
                    Something went wrong. Try emailing me directly: hello@opportunitymap.rw
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black mb-6">Other Ways to Reach Me</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="bg-brutal-bg p-6 border-3 border-brutal-border">
                    <Mail className="w-8 h-8 text-brutal-orange mb-3" />
                    <h3 className="font-black text-xl mb-2">Email</h3>
                    <a 
                      href="mailto:hello@opportunitymap.rw"
                      className="text-brutal-blue hover:underline font-semibold"
                    >
                      hello@opportunitymap.rw
                    </a>
                    <p className="text-gray-600 mt-2 text-sm">
                      Response time: 24-48 hours
                    </p>
                  </div>

                  {/* Social Media */}
                  <div className="bg-brutal-bg p-6 border-3 border-brutal-border">
                    <MessageSquare className="w-8 h-8 text-brutal-blue mb-3" />
                    <h3 className="font-black text-xl mb-4">Connect on Social</h3>
                    
                    <div className="space-y-3">
                      <a
                        href="https://twitter.com/opportunitymap_rw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-brutal-blue transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        <span className="font-semibold">@opportunitymap_rw</span>
                      </a>
                      
                      <a
                        href="https://linkedin.com/company/opportunitymap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-brutal-blue transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="font-semibold">OpportunityMap Rwanda</span>
                      </a>
                      
                      <a
                        href="https://github.com/christiantonny"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-brutal-blue transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span className="font-semibold">See the code</span>
                      </a>
                    </div>
                  </div>

                  {/* Quick Contacts */}
                  <div className="bg-white p-6 border-3 border-brutal-border shadow-brutal">
                    <h3 className="font-black text-xl mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-bold text-gray-900">Mentors:</span>{' '}
                        <a href="/mentors/apply" className="text-brutal-blue hover:underline">
                          Apply here
                        </a>
                      </li>
                      <li>
                        <span className="font-bold text-gray-900">Partnerships:</span>{' '}
                        <a href="mailto:partnerships@opportunitymap.rw" className="text-brutal-blue hover:underline">
                          partnerships@opportunitymap.rw
                        </a>
                      </li>
                      <li>
                        <span className="font-bold text-gray-900">Press:</span>{' '}
                        <a href="mailto:press@opportunitymap.rw" className="text-brutal-blue hover:underline">
                          press@opportunitymap.rw
                        </a>
                      </li>
                      <li>
                        <span className="font-bold text-gray-900">Support:</span>{' '}
                        <a href="mailto:support@opportunitymap.rw" className="text-brutal-blue hover:underline">
                          support@opportunitymap.rw
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Response Time Notice */}
              <div className="bg-brutal-yellow/30 p-6 border-3 border-brutal-border">
                <p className="font-semibold text-gray-900">
                  ⏱️ <span className="font-black">Response Time:</span> I&apos;m a full-time student, so responses might take 24-48 hours. I read every message though—promise!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 md:py-24 bg-brutal-bg">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-black mb-8">Before You Reach Out...</h2>
          
          <div className="space-y-4">
            <details className="bg-white p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                When will OpportunityMap be fully launched?
              </summary>
              <p className="mt-3 text-gray-700">
                We&apos;re targeting a beta launch in mid-2025. If you&apos;re a school or organization interested in early access, definitely reach out!
              </p>
            </details>

            <details className="bg-white p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                How can I become a mentor?
              </summary>
              <p className="mt-3 text-gray-700">
                Head to our <a href="/mentors/apply" className="text-brutal-blue hover:underline font-semibold">mentor application page</a>. We&apos;re looking for professionals who can spare 15-30 minutes every few weeks to talk with students.
              </p>
            </details>

            <details className="bg-white p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                Is this only for Rwandan students?
              </summary>
              <p className="mt-3 text-gray-700">
                Currently, yes—we&apos;re focused on Rwanda first to do it well. But the long-term vision is to expand across East Africa!
              </p>
            </details>

            <details className="bg-white p-6 border-3 border-brutal-border">
              <summary className="font-bold cursor-pointer text-gray-900">
                How much does it cost for students?
              </summary>
              <p className="mt-3 text-gray-700">
                OpportunityMap will be free for all students. We&apos;re exploring sponsorships and school partnerships to keep it sustainable.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}

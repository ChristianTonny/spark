'use client';

import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CheckCircle, XCircle, Clock, ExternalLink, Mail, Phone, Linkedin, Briefcase, Calendar } from 'lucide-react';
import { Spinner } from '@/components/loading-skeleton';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export default function AdminDashboardPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  // Store review notes per application ID to prevent state leak
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  // Fetch applications
  const allApplications = useQuery(api.mentorApplications.list);
  const approveApplication = useMutation(api.mentorApplications.approve);
  const rejectApplication = useMutation(api.mentorApplications.reject);

  if (!allApplications) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading applications...</p>
        </div>
      </div>
    );
  }

  // Filter applications based on selected status
  const filteredApplications = filter === 'all' 
    ? allApplications 
    : allApplications.filter(app => app.status === filter);

  // Count by status
  const counts = {
    all: allApplications.length,
    pending: allApplications.filter(app => app.status === 'pending').length,
    approved: allApplications.filter(app => app.status === 'approved').length,
    rejected: allApplications.filter(app => app.status === 'rejected').length,
  };

  const handleApprove = async (id: string) => {
    try {
      await approveApplication({
        id: id as any,
        reviewNotes: reviewNotes[id] || undefined
      });
      setSelectedApplication(null);
      // Clear notes for this application
      setReviewNotes(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error('Failed to approve:', error);
      alert('Failed to approve application');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectApplication({
        id: id as any,
        reviewNotes: reviewNotes[id] || undefined
      });
      setSelectedApplication(null);
      // Clear notes for this application
      setReviewNotes(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error('Failed to reject:', error);
      alert('Failed to reject application');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b-3 border-black px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-700 font-bold">Review and manage mentor applications</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 border-3 border-black shadow-brutal">
            <div className="text-3xl font-black text-gray-900 mb-1">{counts.all}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Total</div>
          </div>
          <div className="bg-yellow-100 p-6 border-3 border-black shadow-brutal">
            <div className="text-3xl font-black text-gray-900 mb-1">{counts.pending}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Pending</div>
          </div>
          <div className="bg-green-100 p-6 border-3 border-black shadow-brutal">
            <div className="text-3xl font-black text-gray-900 mb-1">{counts.approved}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Approved</div>
          </div>
          <div className="bg-red-100 p-6 border-3 border-black shadow-brutal">
            <div className="text-3xl font-black text-gray-900 mb-1">{counts.rejected}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Rejected</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-bold uppercase border-3 border-black shadow-brutal whitespace-nowrap ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status} ({counts[status]})
            </button>
          ))}
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-12 border-3 border-black shadow-brutal text-center">
            <p className="text-xl font-bold text-gray-600">No {filter !== 'all' && filter} applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Application Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-2 text-gray-900">{app.fullName}</h3>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-700">
                              <Mail className="w-4 h-4" />
                              {app.email}
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-700">
                              <Phone className="w-4 h-4" />
                              {app.phone}
                            </span>
                            {app.linkedin && (
                              <a 
                                href={app.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
                              >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <span className="text-xs font-black uppercase text-gray-600 block mb-1">Current Role</span>
                              <span className="text-sm font-bold text-gray-900">{app.currentRole} at {app.company}</span>
                            </div>
                            <div>
                              <span className="text-xs font-black uppercase text-gray-600 block mb-1">Experience</span>
                              <span className="text-sm font-bold text-gray-900">{app.yearsExperience}</span>
                            </div>
                            <div>
                              <span className="text-xs font-black uppercase text-gray-600 block mb-1">Industry</span>
                              <span className="text-sm font-bold text-gray-900">{app.industry}</span>
                            </div>
                            <div>
                              <span className="text-xs font-black uppercase text-gray-600 block mb-1">Career Field</span>
                              <span className="text-sm font-bold text-gray-900">{app.careerField}</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-xs font-black uppercase text-gray-600 block mb-1">Availability</span>
                            <span className="text-sm font-bold text-gray-900">{app.availability} • {app.sessionsPerMonth}</span>
                          </div>

                          {app.focusAreas.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs font-black uppercase text-gray-600 block mb-2">Can Help With</span>
                              <div className="flex flex-wrap gap-2">
                                {app.focusAreas.map((area, idx) => (
                                  <span 
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => setSelectedApplication(selectedApplication?._id === app._id ? null : app)}
                            className="text-sm font-bold text-primary hover:underline"
                          >
                            {selectedApplication?._id === app._id ? 'Hide Details' : 'View Full Application →'}
                          </button>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-4 py-2 border-3 border-black font-black uppercase text-sm whitespace-nowrap ${
                          app.status === 'pending' ? 'bg-yellow-200' :
                          app.status === 'approved' ? 'bg-green-200' :
                          'bg-red-200'
                        }`}>
                          {app.status === 'pending' && <Clock className="w-4 h-4 inline mr-1" />}
                          {app.status === 'approved' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                          {app.status === 'rejected' && <XCircle className="w-4 h-4 inline mr-1" />}
                          {app.status}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedApplication?._id === app._id && (
                        <div className="mt-6 pt-6 border-t-3 border-black">
                          <h4 className="font-black text-lg mb-3">Motivation</h4>
                          <p className="text-gray-700 font-semibold mb-6 whitespace-pre-wrap">{app.motivation}</p>

                          <div className="text-sm text-gray-600 font-semibold mb-4">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Submitted {new Date(app.submittedAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          {app.reviewNotes && (
                            <div className="bg-gray-100 p-4 border-2 border-black mb-4">
                              <span className="font-black text-sm uppercase text-gray-600 block mb-2">Review Notes</span>
                              <p className="text-gray-700 font-semibold">{app.reviewNotes}</p>
                            </div>
                          )}

                          {/* Action Buttons (only for pending) */}
                          {app.status === 'pending' && (
                            <div className="space-y-4">
                              <div>
                                <label className="block font-bold text-sm mb-2 text-gray-900">
                                  Review Notes (optional)
                                </label>
                                <textarea
                                  value={reviewNotes[app._id] || ''}
                                  onChange={(e) => setReviewNotes(prev => ({ ...prev, [app._id]: e.target.value }))}
                                  placeholder="Add notes about your decision..."
                                  rows={3}
                                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:ring-3 focus:ring-primary resize-none text-gray-900"
                                />
                              </div>

                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleApprove(app._id)}
                                  className="flex-1 px-6 py-3 bg-green-500 text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                                >
                                  <CheckCircle className="inline-block w-5 h-5 mr-2" />
                                  Approve Application
                                </button>
                                <button
                                  onClick={() => handleReject(app._id)}
                                  className="flex-1 px-6 py-3 bg-red-500 text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                                >
                                  <XCircle className="inline-block w-5 h-5 mr-2" />
                                  Reject Application
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

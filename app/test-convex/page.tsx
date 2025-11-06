'use client';

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function TestConvexPage() {
  const careers = useQuery(api.careers.list);
  const careerCount = useQuery(api.careers.count);

  if (careers === undefined || careerCount === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Loading from Convex...</h1>
          <p className="text-xl">If you see this forever, Convex isn&apos;t connected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-100 border-4 border-green-600 p-6 mb-8">
          <h1 className="text-4xl font-black mb-2">✅ Convex is Working!</h1>
          <p className="text-xl font-bold">
            Fetched {careerCount} careers from the database
          </p>
        </div>

        <h2 className="text-2xl font-black mb-4">Careers in Database:</h2>

        <div className="space-y-4">
          {careers.map((career) => (
            <div
              key={career._id}
              className="border-3 border-black p-4 bg-white shadow-brutal"
            >
              <h3 className="text-xl font-black">{career.title}</h3>
              <p className="font-bold text-gray-700">{career.category}</p>
              <p className="text-sm">{career.shortDescription}</p>
              <p className="text-sm font-bold mt-2">
                Salary: {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-yellow-100 border-4 border-yellow-600">
          <h3 className="text-xl font-black mb-2">What&apos;s Next?</h3>
          <p className="font-bold">
            This test page proves Convex works. Now I&apos;ll migrate your real pages to use the database instead of mock data.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Utility page to set up an educator user
 * This is a one-time setup page to assign the educator role to spcsgaba@gmail.com
 */
export default function SetupEducatorPage() {
  const [email, setEmail] = useState('spcsgaba@gmail.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const makeUserEducator = useMutation(api.setupEducator.makeUserEducator);

  const handleMakeEducator = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await makeUserEducator({ email });
      setResult(res);
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-3 border-black shadow-brutal p-8">
          <h1 className="text-3xl font-black uppercase mb-6">Setup Educator</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Educator Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-3 border-black font-bold"
                placeholder="educator@example.com"
              />
            </div>

            <button
              onClick={handleMakeEducator}
              disabled={loading || !email}
              className="w-full px-6 py-3 bg-brutal-purple text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Processing...' : 'Make Educator'}
            </button>

            {result && (
              <div
                className={`p-4 border-3 border-black ${
                  result.success ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold text-sm">{result.message}</p>
                    {result.success && (
                      <p className="text-xs mt-2 text-gray-700">
                        The user can now sign in and will be redirected to the educator dashboard.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t-3 border-black pt-6 mt-6">
              <h2 className="font-black uppercase text-sm mb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Enter the educator's email address</li>
                <li>Click "Make Educator"</li>
                <li>The user will be assigned the educator role</li>
                <li>They can now sign in and access the educator dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


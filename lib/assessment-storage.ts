// Helper functions for managing assessment results in localStorage

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  completedAt: string;
  answers: Record<string, string>;
  topMatches: {
    careerId: string;
    matchScore: number;
    matchReasons: string[];
  }[];
}

const STORAGE_KEY = 'assessmentResults';

// Get all assessment results
export function getAssessmentResults(): AssessmentResult[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const results = localStorage.getItem(STORAGE_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error reading assessment results:', error);
    return [];
  }
}

// Save a new assessment result
export function saveAssessmentResult(result: AssessmentResult): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingResults = getAssessmentResults();
    const newResults = [result, ...existingResults]; // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
  } catch (error) {
    console.error('Error saving assessment result:', error);
  }
}

// Get a specific assessment result by ID
export function getAssessmentResult(id: string): AssessmentResult | null {
  const results = getAssessmentResults();
  return results.find(r => r.id === id) || null;
}

// Delete an assessment result
export function deleteAssessmentResult(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const results = getAssessmentResults();
    const filtered = results.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting assessment result:', error);
  }
}

// Check if user has taken an assessment
export function hasCompletedAssessment(): boolean {
  return getAssessmentResults().length > 0;
}

// Get the most recent assessment result
export function getLatestAssessmentResult(): AssessmentResult | null {
  const results = getAssessmentResults();
  return results.length > 0 ? results[0] : null;
}

// Format date for display
export function formatAssessmentDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

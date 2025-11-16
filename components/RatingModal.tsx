'use client';

import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from './ui/button';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from './toast-container';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: Id<"careerChats">;
  mentorName: string;
  sessionDate?: number;
  onRatingSubmitted?: () => void;
  existingRating?: number;
  existingFeedback?: string;
  isEditing?: boolean;
}

export function RatingModal({
  isOpen,
  onClose,
  chatId,
  mentorName,
  sessionDate,
  onRatingSubmitted,
  existingRating,
  existingFeedback,
  isEditing = false,
}: RatingModalProps) {
  const [rating, setRating] = useState(existingRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState(existingFeedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const rateMentor = useMutation(api.careerChats.rateMentor);
  const updateRating = useMutation(api.careerChats.updateRating);

  // Update state when existing values change (for editing)
  useEffect(() => {
    if (isEditing && existingRating) {
      setRating(existingRating);
      setFeedback(existingFeedback || '');
    }
  }, [isEditing, existingRating, existingFeedback]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        // Update existing rating
        await updateRating({
          chatId,
          rating,
          feedback: feedback.trim() || undefined,
        });
        toast.success('Rating updated successfully!');
      } else {
        // Create new rating
        await rateMentor({
          chatId,
          rating,
          feedback: feedback.trim() || undefined,
        });
        toast.success('Thank you for your feedback!');
      }

      // Reset form
      setRating(0);
      setFeedback('');

      // Notify parent component
      if (onRatingSubmitted) {
        onRatingSubmitted();
      }

      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Failed to submit rating:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'submit'} rating. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setFeedback('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white border-3 border-black shadow-brutal-lg w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-3 border-black bg-brutal-yellow">
            <h2 className="text-2xl font-black uppercase">
              {isEditing ? 'Update Your Rating' : 'Rate Your Session'}
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 hover:bg-black/10 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Mentor Info */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-700 mb-1">
                How was your session with
              </p>
              <p className="text-2xl font-black">{mentorName}?</p>
              {sessionDate && (
                <p className="text-sm font-bold text-gray-500 mt-2">
                  {new Date(sessionDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <label className="block text-sm font-black uppercase text-gray-700">
                Your Rating *
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isSubmitting}
                    className="p-2 transition-transform hover:scale-110 disabled:opacity-50"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-brutal-yellow text-brutal-yellow'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center font-bold text-lg">
                  {rating === 5 && '⭐ Excellent!'}
                  {rating === 4 && '👍 Great!'}
                  {rating === 3 && '😊 Good'}
                  {rating === 2 && '😐 Fair'}
                  {rating === 1 && '😞 Needs Improvement'}
                </p>
              )}
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <label className="block text-sm font-black uppercase text-gray-700">
                Your Feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
                placeholder="Share your experience to help other students and the mentor improve..."
                className="w-full px-4 py-3 border-3 border-black shadow-brutal font-bold focus:outline-none focus:shadow-brutal-lg resize-none disabled:opacity-50 disabled:bg-gray-100"
                rows={4}
                maxLength={500}
              />
              <p className="text-sm text-gray-500 font-bold text-right">
                {feedback.length}/500 characters
              </p>
            </div>

            {/* Helper Text */}
            <div className="bg-brutal-blue/10 border-2 border-brutal-blue p-4">
              <p className="text-sm font-bold text-gray-700">
                💡 <span className="font-black">Tip:</span> Your honest feedback helps other students make informed decisions and helps mentors improve their sessions.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t-3 border-black bg-gray-50 flex gap-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="flex-1"
            >
              {isSubmitting ? (isEditing ? 'Updating...' : 'Submitting...') : (isEditing ? 'Update Rating' : 'Submit Rating')}
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { 
  sendBookingConfirmation, 
  sendBookingReminder,
  sendMentorApplicationNotification 
} from '@/lib/emails/resend';

// Verify the request is from Convex using a shared secret
function verifyConvexRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.CONVEX_WEBHOOK_SECRET;
  
  if (!expectedSecret) {
    // Allow missing secret only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      console.warn('CONVEX_WEBHOOK_SECRET not set - allowing email webhook in non-production');
      return true;
    }
    console.error('CONVEX_WEBHOOK_SECRET not set - rejecting email webhook in production');
    return false;
  }
  
  return authHeader === `Bearer ${expectedSecret}`;
}

export async function POST(request: NextRequest) {
  try {
    // Verify request is from Convex
    if (!verifyConvexRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'booking_confirmation':
        result = await sendBookingConfirmation({
          to: data.to,
          studentName: data.studentName,
          mentorName: data.mentorName,
          careerTitle: data.careerTitle,
          scheduledAt: new Date(data.scheduledAt),
          duration: data.duration,
          meetingLink: data.meetingLink,
        });
        break;

      case 'booking_reminder':
        result = await sendBookingReminder({
          to: data.to,
          userName: data.userName,
          mentorName: data.mentorName,
          studentName: data.studentName,
          careerTitle: data.careerTitle,
          scheduledAt: new Date(data.scheduledAt),
          meetingLink: data.meetingLink,
        });
        break;

      case 'mentor_application':
        result = await sendMentorApplicationNotification({
          to: data.to,
          applicantName: data.applicantName,
          applicationId: data.applicationId,
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Unknown email type' },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';

// Lazy initialization - only create Resend instance when needed
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Email sender configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Spark <notifications@spark.rw>';

export interface BookingConfirmationEmail {
  to: string;
  studentName: string;
  mentorName: string;
  careerTitle?: string;
  scheduledAt: Date;
  duration: number;
  meetingLink?: string;
}

export interface BookingReminderEmail {
  to: string;
  userName: string;
  mentorName: string;
  studentName: string;
  careerTitle?: string;
  scheduledAt: Date;
  meetingLink?: string;
}

export interface MentorApplicationEmail {
  to: string;
  applicantName: string;
  applicationId: string;
}

/**
 * Send booking confirmation email to student
 */
export async function sendBookingConfirmation(data: BookingConfirmationEmail) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Booking Confirmed with ${data.mentorName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #FFB627; color: #000; padding: 20px; text-align: center; border: 3px solid #000; }
              .content { background: #fff; padding: 30px; border: 3px solid #000; margin-top: -3px; }
              .button { display: inline-block; background: #4ECDC4; color: #fff; padding: 12px 30px; text-decoration: none; font-weight: bold; border: 3px solid #000; margin-top: 20px; }
              .details { background: #f9f9f9; padding: 15px; border: 2px solid #000; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">✨ Booking Confirmed!</h1>
              </div>
              <div class="content">
                <p>Hi ${data.studentName},</p>
                <p>Great news! Your career chat session has been confirmed.</p>
                
                <div class="details">
                  <h3 style="margin-top: 0;">Session Details</h3>
                  <p><strong>Mentor:</strong> ${data.mentorName}</p>
                  ${data.careerTitle ? `<p><strong>Topic:</strong> ${data.careerTitle}</p>` : ''}
                  <p><strong>Date & Time:</strong> ${data.scheduledAt.toLocaleDateString('en-RW', {
                    timeZone: 'Africa/Kigali',
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                  <p><strong>Duration:</strong> ${data.duration} minutes</p>
                </div>

                ${data.meetingLink ? `
                  <p>Join the session using this link:</p>
                  <a href="${data.meetingLink}" class="button">Join Meeting</a>
                ` : ''}

                <p style="margin-top: 30px;">We'll send you a reminder before the session starts.</p>
                
                <p>Best regards,<br>The Spark Team</p>
              </div>
              <div class="footer">
                <p>This email was sent from Spark Learning Platform</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send booking confirmation:', error);
      return { success: false, error };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Send booking reminder email (24 hours before)
 */
export async function sendBookingReminder(data: BookingReminderEmail) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Reminder: Career Chat Tomorrow with ${data.mentorName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #FF6B9D; color: #000; padding: 20px; text-align: center; border: 3px solid #000; }
              .content { background: #fff; padding: 30px; border: 3px solid #000; margin-top: -3px; }
              .button { display: inline-block; background: #4ECDC4; color: #fff; padding: 12px 30px; text-decoration: none; font-weight: bold; border: 3px solid #000; margin-top: 20px; }
              .details { background: #f9f9f9; padding: 15px; border: 2px solid #000; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">⏰ Reminder: Session Tomorrow!</h1>
              </div>
              <div class="content">
                <p>Hi ${data.userName},</p>
                <p>This is a friendly reminder about your upcoming career chat session.</p>
                
                <div class="details">
                  <h3 style="margin-top: 0;">Session Details</h3>
                  <p><strong>With:</strong> ${data.mentorName === data.userName ? data.studentName : data.mentorName}</p>
                  ${data.careerTitle ? `<p><strong>Topic:</strong> ${data.careerTitle}</p>` : ''}
                  <p><strong>When:</strong> ${data.scheduledAt.toLocaleDateString('en-RW', {
                    timeZone: 'Africa/Kigali',
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>

                ${data.meetingLink ? `
                  <p>Join the session using this link:</p>
                  <a href="${data.meetingLink}" class="button">Join Meeting</a>
                ` : ''}

                <p style="margin-top: 30px;">See you tomorrow!</p>
                
                <p>Best regards,<br>The Spark Team</p>
              </div>
              <div class="footer">
                <p>This email was sent from Spark Learning Platform</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send booking reminder:', error);
      return { success: false, error };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending booking reminder:', error);
    return { success: false, error };
  }
}

/**
 * Send mentor application notification to admin
 */
export async function sendMentorApplicationNotification(data: MentorApplicationEmail) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `New Mentor Application from ${data.applicantName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #95E1D3; color: #000; padding: 20px; text-align: center; border: 3px solid #000; }
              .content { background: #fff; padding: 30px; border: 3px solid #000; margin-top: -3px; }
              .button { display: inline-block; background: #FFB627; color: #000; padding: 12px 30px; text-decoration: none; font-weight: bold; border: 3px solid #000; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">📝 New Mentor Application</h1>
              </div>
              <div class="content">
                <p>Hello Admin,</p>
                <p>A new mentor application has been submitted and requires review.</p>
                
                <p><strong>Applicant:</strong> ${data.applicantName}</p>
                <p><strong>Application ID:</strong> ${data.applicationId}</p>

                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://spark.rw'}/admin/mentor-applications" class="button">Review Application</a>

                <p style="margin-top: 30px;">Please review and approve or reject the application.</p>
                
                <p>Best regards,<br>Spark System</p>
              </div>
              <div class="footer">
                <p>This is an automated notification from Spark Learning Platform</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send mentor application notification:', error);
      return { success: false, error };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending mentor application notification:', error);
    return { success: false, error };
  }
}

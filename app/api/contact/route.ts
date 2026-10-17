import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { contactSchema } from '@/lib/validators/contact';
import { sendUserThankYouEmail } from '@/lib/email/send-user-email';
import { sendAdminNotification } from '@/lib/email/send-admin-email';

/* ============================================================
   RATE LIMITER (in-memory, per IP)
   ============================================================ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}, 60 * 60 * 1000);

/* ============================================================
   POST /api/contact
   ============================================================ */
export async function POST(req: NextRequest) {
  try {
    /* ---------- 1. RATE LIMIT ---------- */
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    /* ---------- 2. PARSE BODY ---------- */
    const body = await req.json();

    /* ---------- 3. VALIDATE ---------- */
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    /* ---------- 4. HONEYPOT CHECK ---------- */
    if (data.website && data.website.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry.',
      });
    }

    /* ---------- 5. SAVE EMAIL TO SUPABASE ---------- */
    const { error: dbError } = await supabaseAdmin
      .from('inquiries')
      .insert({
        email: data.email, // Only email save ho rahi hai
      });

    if (dbError) {
      console.error('❌ Supabase insert error:', dbError);
      // Database fail ho to email still try karo, but log error
    } else {
      console.log('✅ Email saved to Supabase:', data.email);
    }

    /* ---------- 6. SEND EMAILS ---------- */
    const emailData = {
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      service: data.service,
      message: data.message,
    };

    await Promise.allSettled([
      sendUserThankYouEmail(emailData),
      sendAdminNotification(emailData),
    ]);

    /* ---------- 7. SUCCESS ---------- */
    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
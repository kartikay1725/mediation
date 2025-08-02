// src/app/api/cron/daily-reminder/route.ts
import { NextResponse } from 'next/server';
import dbconnect from '@/lib/db';
import Case from '@/models/Case';
import { sendReminderEmail } from '@/lib/sendReminderEmail';

export const dynamic = 'force-dynamic'; // for vercel cron to trigger dynamically

export async function GET() {
  try {
    await dbconnect();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const cases = await Case.find({
      status: { $in: ['pending', 'Pending'] },
      nextHearingDate: {
        $gte: tomorrow.toISOString(),
        $lt: dayAfter.toISOString(),
      },
    });

    await sendReminderEmail(cases, process.env.REMINDER_EMAIL!);

    return NextResponse.json({ success: true, count: cases.length });
  } catch (error) {
    console.error('Reminder cron error:', error);
    return NextResponse.json({ error: 'Failed to send reminders' }, { status: 500 });
  }
}

// src/lib/sendReminderEmail.ts
import nodemailer from 'nodemailer';
//eslint-disable-next-line
export async function sendReminderEmail(cases: any[], recipientEmail: string) {
  if (cases.length === 0) return;

  const htmlContent = `
    <h2>Case Reminders for Tomorrow</h2>
    <ul>
      ${cases.map((c) => `<li><strong>${c.caseNo}</strong> - ${c.partiesName} | Next Hearing: ${new Date(c.nextHearingDate).toLocaleDateString('en-IN')}</li>`).join('')}
    </ul>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Mediation System" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: 'Reminder: Cases with Hearing Tomorrow',
    html: htmlContent,
  });
}

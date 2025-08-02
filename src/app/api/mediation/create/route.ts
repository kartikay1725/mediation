import { appendCaseToExcel } from '@/lib/excel';
import { NextResponse } from 'next/server';
import dbconnect from '@/lib/db';
import  Case  from '@/models/Case';

export async function POST(req: Request) {
  await dbconnect();
  try {
    const body = await req.json();
    
    if (!body.caseNo || !body.partiesName) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    const existing = await Case.findOne({ caseNo: body.caseNo });
if (existing) {
  return NextResponse.json({ error: 'Case already exists' }, { status: 400 });
}

    const dbcase = new Case({
      caseNo: body.caseNo,
      partiesName: body.partiesName,
      mediatorName: body.mediatorName || '',
      status: body.status || '',
      nextHearingDate: body.nextHearing || ''
    });

    const newCase = {
      caseNo: body.caseNo,
      partiesName: body.partiesName,
      mediatorName: body.mediatorName || '',
      referralCourt: body.referralCourt || '',
      firstDate: body.firstDate || '',
      status: body.status || '',
      category: body.category || '',
      nextHearingDate: body.nextHearing || ''
    };

    await appendCaseToExcel(newCase);
    await dbcase.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
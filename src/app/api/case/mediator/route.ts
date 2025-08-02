import { NextRequest, NextResponse } from 'next/server';
import Case from '@/models/Case';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
  await connectDB();

  const mediatorName = req.nextUrl.searchParams.get('name');
  if (!mediatorName) {
    return NextResponse.json({ error: 'Mediator name is required' }, { status: 400 });
  }

  try {
    const cases = await Case.find({ mediatorName });
    return NextResponse.json({ success: true, cases });
  } 
  //eslint-disable-next-line
  catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

import { searchMediationCases } from '@/lib/excel';
import { NextResponse } from 'next/server';
import { MediationCase } from '@/types/mediationCase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const field = searchParams.get('field') as keyof MediationCase || 'caseNo';

 

  try {
    const results = await searchMediationCases(query, field);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search cases' },
      { status: 500 }
    );
  }
}
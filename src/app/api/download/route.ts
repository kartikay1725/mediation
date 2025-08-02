import { NextRequest, NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import path from 'path';
//eslint-disable-next-line
export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'exports', 'mediation_cases.xlsx');

  const stream = createReadStream(filePath);
    //eslint-disable-next-line
  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="mediation_cases.xlsx"',
    },
  });
}

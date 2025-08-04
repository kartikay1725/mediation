// /app/api/delete-case/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';
import dbConnect from '@/lib/db'; // your MongoDB connection util
import CaseModel from '@/models/Case';   // your Mongoose model

export async function POST(req: NextRequest) {
  const { caseNo } = await req.json();

  if (!caseNo) {
    return NextResponse.json({ error: 'caseNo is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'exports', 'mediation_cases.xlsx');

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Excel file not found' }, { status: 404 });
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0]; // Assuming first sheet

  let found = false;

  // Loop through rows to find matching caseNo and remove it
  worksheet.eachRow((row, rowNumber) => {
    const cellValue = row.getCell('A').value?.toString(); // assuming caseNo is in column A
    if (cellValue === caseNo) {
      worksheet.spliceRows(rowNumber, 1);
      found = true;
    }
  });

  if (!found) {
    return NextResponse.json({ error: 'Case not found in Excel' }, { status: 404 });
  }

  await workbook.xlsx.writeFile(filePath); // save updated Excel

  // Remove from MongoDB
  try {
    await dbConnect();
    await CaseModel.findOneAndDelete({ caseNo });
  } catch (err) {
    console.error('DB delete error:', err);
    return NextResponse.json({ error: 'Deleted from Excel but DB failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Case deleted Successfully' });
}

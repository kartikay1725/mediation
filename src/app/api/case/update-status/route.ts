import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import ExcelJS from "exceljs";
import dbconnect from "@/lib/db"; 
import Case from "@/models/Case"; 

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseNo, status, nextHearingDate } = body;

    if (!caseNo || !status || !nextHearingDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Connect to MongoDB
    await dbconnect();

    // Update MongoDB
    const updatedCase = await Case.findOneAndUpdate(
      { caseNo },
      { status, nextHearingDate },
      { new: true }
    );

    if (!updatedCase) {
      return NextResponse.json({ error: "Case not found in DB" }, { status: 404 });
    }

    // Excel file path
    const filePath = join(process.cwd(), 'exports', 'mediation_cases.xlsx');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet("Cases");
    if (!worksheet) {
      return NextResponse.json({ error: "Worksheet not found" }, { status: 500 });
    }

    let rowFound = false;

    worksheet.eachRow((row) => {
      const excelCaseNo = row.getCell(1).text?.trim(); // Case No in column 1
      if (excelCaseNo === caseNo) {
        row.getCell(7).value = status; // Status in column 3
        row.getCell(8).value = new Date(nextHearingDate).toISOString(); 
        rowFound = true;
      }
    });

    if (!rowFound) {
      return NextResponse.json({ error: "Case not found in Excel" }, { status: 404 });
    }

    await workbook.xlsx.writeFile(filePath);

    return NextResponse.json({
      message: "Case updated in DB and Excel successfully",
      updatedCase,
    });
  } 
  //eslint-disable-next-line
  catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

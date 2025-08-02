
import { updateCaseInExcel } from "@/lib/excel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.caseNo) {
      return NextResponse.json(
        { error: "Case number is required" },
        { status: 400 }
      );
    }

     

    const success = await updateCaseInExcel(body);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating case:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// src/app/api/mediators/route.ts
import dbconnect from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbconnect();

    const mediators = await User.find({ role: "mediator" }).select("name");

    return NextResponse.json({
      success: true,
      data: mediators,
    });
  } catch (error) {
    console.error("Error fetching mediators:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch mediators." },
      { status: 500 }
    );
  }
}

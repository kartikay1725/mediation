// /app/api/mediator/name/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/lib/db"; // Make sure you connect to DB
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbconnect(); // Always ensure DB is connected

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user.image)
    return NextResponse.json({ mediatorName: user.name  , mediatormail: user.email , mediatorImage: user.image });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

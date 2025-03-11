import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Report from "@/models/Report"; // Create a model for reports

export async function POST(req) {
  try {
    await connectDB();
    const { location, description } = await req.json();

    const newReport = new Report({ location, description });
    await newReport.save();

    return NextResponse.json(
      { message: "Report submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error submitting the report." },
      { status: 500 }
    );
  }
}

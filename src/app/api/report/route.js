import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Report from "@/models/Report";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { location, description } = await req.json();

    // 1. Save to MongoDB
    const newReport = new Report({ location, description });
    await newReport.save();

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "🚨 New Marine Poaching Report",
      text: `📍 Location: ${location}\n\n📝 Description:\n${description}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Report submitted and emailed successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Email or DB Error:", error);
    return NextResponse.json(
      { message: "Error submitting the report." },
      { status: 500 }
    );
  }
}

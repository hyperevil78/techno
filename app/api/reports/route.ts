import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // Corrected to match your function name
import Report from '@/models/Report';

export async function POST(req: Request) {
  try {
    // 1. Establish connection using your existing connectDB function
    await connectDB();

    // 2. Parse the request body
    const data = await req.json();

    // 3. Validation
    if (!data.userId || !data.description || !data.department) {
      return NextResponse.json(
        { error: "Missing required fields (userId, description, or department)" }, 
        { status: 400 }
      );
    }

    // 4. Create the report in MongoDB
    const newReport = await Report.create({
      userId: data.userId,
      userName: data.userName,
      department: data.department,
      description: data.description,
      image: data.image, // Base64 string from your frontend
      status: 'Pending',
      createdAt: new Date(),
    });

    // 5. Success Response
    return NextResponse.json(
      { message: "Report saved successfully", report: newReport }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("REPORT_POST_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to save report", details: error.message }, 
      { status: 500 }
    );
  }
}
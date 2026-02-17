import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Demo from "@/models/Demo";

// GET all records
export async function GET() {
  await connectDB();
  const data = await Demo.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

// POST new record
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newData = await Demo.create({
    title: body.title,
    description: body.description,
  });

  return NextResponse.json(newData);
}

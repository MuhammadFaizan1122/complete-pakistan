import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import Job from '../../../../config/models/Jobs';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // @ts-ignore
    const jobs = await Job.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ data: jobs }, { status: 200 });
  } catch (error) {
    console.error('Job Fetch Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

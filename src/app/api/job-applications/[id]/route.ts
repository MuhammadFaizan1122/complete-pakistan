// app/api/job-applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import JobApplication from '../../../../config/models/JobApplication';

export async function GET(
  req: NextRequest,
) {
  const { pathname, searchParams } = new URL(req.url);
  const id = pathname.split('/').pop();

  try {
    await connectDB();

    // @ts-ignore
    const application = await JobApplication.findById(id)
      .populate("applicant_user_id", "name email")
      .populate("job_id", "jobTitle companyName");

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ data: application }, { status: 200 });
  } catch (error) {
    console.error("Get Application Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  try {
    await connectDB();
    const data = await req.json();

    // Validate status
    if (data.status && !['pending', 'shortlisted', 'rejected'].includes(data.status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Validate interview_type
    if (data.interview_type && !['onsite', 'online'].includes(data.interview_type)) {
      return NextResponse.json({ message: 'Invalid interview type' }, { status: 400 });
    }

    // Validate license (12-16 digits if provided)
    if (data.license && !/^\d{12,16}$/.test(data.license)) {
      return NextResponse.json({ message: 'License must be 12-16 digits' }, { status: 400 });
    }

    // Ensure array fields are properly formatted
    const formattedData = {
      ...data,
      must_have: Array.isArray(data.must_have) ? data.must_have : [],
      benefits: Array.isArray(data.benefits) ? data.benefits : [],
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
    };

    // @ts-ignore
    const updated = await JobApplication.findByIdAndUpdate(
      id,
      { $set: formattedData },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application updated', data: updated }, { status: 200 });
  } catch (error) {
    console.error('Update Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  try {
    await connectDB();
    // @ts-ignore
    const deleted = await JobApplication.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
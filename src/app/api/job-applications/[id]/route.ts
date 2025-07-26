// app/api/job-applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import JobApplication from '../../../../config/models/JobApplication';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    // @ts-ignore
    const application = await JobApplication.findById(params.id)
      .populate('applicant_user_id', 'name email')
      .populate('job_id', 'jobTitle companyName');

    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ data: application }, { status: 200 });
  } catch (error) {
    console.error('Get Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { status } = await req.json();

    if (!['pending', 'shortlisted', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // @ts-ignore
    const updated = await JobApplication.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated', data: updated }, { status: 200 });
  } catch (error) {
    console.error('Update Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // @ts-ignore
    const deleted = await JobApplication.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// app/api/job-applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import JobApplication from '../../../config/models/JobApplication';
import CvProfile from '../../../config/models/CvProfile';
import mongoose from 'mongoose';


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { applicant_user_id, job_id } = body;

    if (!applicant_user_id || !job_id) {
      return NextResponse.json({ message: "Applicant user ID and job ID are required." }, { status: 400 });
    }

    // ✅ Validate ObjectId format
    const isValidUserId = mongoose.Types.ObjectId.isValid(applicant_user_id);
    const isValidJobId = mongoose.Types.ObjectId.isValid(job_id);

    if (!isValidUserId || !isValidJobId) {
      return NextResponse.json({ message: "Invalid user ID or job ID format." }, { status: 400 });
    }

    const userObjectId = new mongoose.Types.ObjectId(applicant_user_id);
    const jobObjectId = new mongoose.Types.ObjectId(job_id);

    // ✅ Check if user has a CV
    // @ts-ignore
    const existingCV = await CvProfile.findOne({ userId: userObjectId });

    if (!existingCV) {
      return NextResponse.json(
        { message: "CV not found. Please create your CV before applying." },
        { status: 400 }
      );
    }

    // ✅ Check for duplicate application
    // @ts-ignore
    const alreadyApplied = await JobApplication.findOne({
      applicant_user_id: userObjectId,
      job_id: jobObjectId,
    });

    if (alreadyApplied) {
      return NextResponse.json({ message: "You have already applied for this job." }, { status: 400 });
    }

    // ✅ Create new job application
    // @ts-ignore
    const application = await JobApplication.create({
      applicant_user_id: userObjectId,
      job_id: jobObjectId,
    });

    return NextResponse.json(application, { status: 201 });

  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     // Optionally filter by applicant or job
//     const { searchParams } = new URL(req.url);
//     const applicantId = searchParams.get('applicant_user_id');
//     const jobId = searchParams.get('job_id');

//     const query: any = {};
//     if (applicantId) query.applicant_user_id = applicantId;
//     if (jobId) query.job_id = jobId;

//     // @ts-ignore
//     const applications = await JobApplication.find(query)
//       .populate('applicant_user_id', 'name email')
//       .populate('job_id', 'jobTitle companyName');

//     return NextResponse.json({ data: applications }, { status: 200 });
//   } catch (error) {
//     console.error('Fetch Applications Error:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const applicantId = searchParams.get('applicant_user_id');
    const jobId = searchParams.get('job_id');

    const query: any = {};
    if (applicantId) query.applicant_user_id = applicantId;
    if (jobId) query.job_id = jobId;

    // @ts-ignore
    const applications = await JobApplication.find(query)
      .populate('applicant_user_id', 'name email')
      .populate('job_id', 'jobTitle companyName');
    console.log('applications==>', applications)
    const enrichedApplications = await Promise.all(
      applications.map(async (app) => {
        // @ts-ignore
        const cv = await CvProfile.findOne({ userId: app.applicant_user_id._id });

        return {
          ...app.toObject(),
          cvProfile: cv || null,
        };
      })
    );

    return NextResponse.json({ data: enrichedApplications }, { status: 200 });
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Job from '../../../config/models/Jobs';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            userId,
            jobTitle,
            companyName,
            jobType,
            country,
            state,
            salaryMin,
            salaryMax,
            industry,
            category,
            jobDescription,
            keyResponsibilities,
            selectedSkills,
            selectedTags,
            image
        } = body;

        if (!jobTitle || !companyName || !jobType) {
            return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
        }
        // @ts-ignore
        const jobData = await Job.create({
            userId,
            jobTitle,
            companyName,
            jobType,
            country,
            state,
            salaryMin,
            salaryMax,
            industry,
            category,
            jobDescription,
            keyResponsibilities,
            selectedSkills,
            selectedTags,
            image
        });

        return NextResponse.json({ message: 'Job created successfully', data: jobData }, { status: 201 });
    } catch (error) {
        console.error('Job Create Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        // @ts-ignore
        const jobs = await Job.find().sort({ createdAt: -1 });

        return NextResponse.json({ data: jobs }, { status: 200 });
    } catch (error) {
        console.error('Job Fetch Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
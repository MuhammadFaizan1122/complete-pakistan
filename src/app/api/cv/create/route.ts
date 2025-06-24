import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../config/mongoose";
import CvProfile from '../../../../config/models/CvProfile';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            userId,
            name,
            dob,
            email,
            phone,
            passport,
            madicalDate,
            country,
            city,
            state,
            address,
            job,
            industry,
            category,
            subcategory,
            jobDetail,
            portfolio,
            education,
            experience,
            skills,
            attachments,
            cv
        } = body;

        if (!userId) {
            return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
        }
        // @ts-ignore
        const newCv = await CvProfile.create({
            userId,
            name,
            dob,
            email,
            phone,
            passport,
            madicalDate,
            country,
            city,
            state,
            address,
            job,
            industry,
            category,
            subcategory,
            jobDetail,
            portfolio,
            education,
            experience,
            skills,
            attachments,
            cv
        });

        return NextResponse.json({ message: 'CV created successfully', data: newCv }, { status: 201 });
    } catch (error) {
        console.error('CV Create Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import CvProfile from '../../../../config/models/CvProfile';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        // @ts-ignore
        const cvs = await CvProfile.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: cvs }, { status: 200 });
    } catch (error) {
        console.error('Error fetching CVs:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

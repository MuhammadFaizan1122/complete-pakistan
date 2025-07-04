import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import CompanyAccount from '../../../config/models/CompanyAccount';
import Member from '../../../config/models/Members';
import Job from '../../../config/models/Jobs';
import CvProfile from '../../../config/models/CvProfile';


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const userId = req.nextUrl.searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ message: 'Missing userId in query' }, { status: 400 });
        }

        const [companyAccount, members, jobs, cvProfiles] = await Promise.all([
            // @ts-ignore
            CompanyAccount.findOne({ _id: userId }),
            // @ts-ignore
            Member.find({ userId }),
            // @ts-ignore
            Job.find({ userId }),
            // @ts-ignore
            CvProfile.find({ userId }),
        ]);
        return NextResponse.json({
            companyAccount,
            members,
            jobs,
            cvProfiles,
        }, { status: 200 });

    } catch (error) {
        console.error('Dashboard data fetch error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

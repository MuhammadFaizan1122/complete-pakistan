import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import LikeLog from '../../../config/models/LikeLog';
import CompanyAccount from '../../../config/models/CompanyAccount';
import Jobs from '../../../config/models/Jobs';


export async function GET(req) {
    try {
        await connectDB();
        const userId = req.headers.get('user-id'); // Assuming user-id is passed in headers

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        // Step 1: Fetch liked companies by this user
        const likes = await LikeLog.find({ userId, status: 'liked' }).select('companyId');
        const likedCompanyIds = likes.map(like => like.companyId);

        if (likedCompanyIds.length === 0) {
            return NextResponse.json({ data: { companies: { oep: [], ttc: [] } } }, { status: 200 });
        }

        // Step 2: Fetch companies with status 'approved' and their jobs
        // @ts-ignore
        const companies = await CompanyAccount.find({
            _id: { $in: likedCompanyIds },
            status: 'approved'
        }).lean();

        // Group companies by type and fetch jobs
        const result = { companies: { oep: [], ttc: [] } };
        for (const company of companies) {
            // @ts-ignore
            const jobs = await Jobs.find({ userId: company._id.toString() }).lean();
            const companyWithJobs = { ...company, jobs };
            if (company.type === 'OEP') result.companies.oep.push(companyWithJobs);
            else if (company.type === 'TTC') result.companies.ttc.push(companyWithJobs);
        }

        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        console.error('Error fetching liked companies with jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch liked companies with jobs' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { companyId, userId } = await req.json();

        if (!companyId || !userId) {
            return NextResponse.json({ error: 'companyId and userId are required' }, { status: 400 });
        }

        const existingLike = await LikeLog.findOne({ companyId, userId, status: 'liked' });
        if (existingLike) {
            await LikeLog.findByIdAndDelete(existingLike._id);
            return NextResponse.json({ message: 'Like removed successfully' }, { status: 200 });
        }

        const newLike = new LikeLog({
            companyId,
            userId,
            status: 'liked'
        });

        await newLike.save();
        return NextResponse.json({ message: 'Like logged successfully', data: newLike }, { status: 201 });
    } catch (error) {
        console.error('Error logging like:', error);
        return NextResponse.json({ error: 'Failed to log like' }, { status: 500 });
    }
}
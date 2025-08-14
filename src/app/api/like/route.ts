import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import LikeLog from '../../../config/models/LikeLog';
import CompanyAccount from '../../../config/models/CompanyAccount';
import Jobs from '../../../config/models/Jobs';


export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        // Get all liked companyIds for this user
        // @ts-ignore
        const likes = await LikeLog.find({ userId, status: "liked" }).select("companyId");
        const likedIds = likes.map(like => like.companyId.toString());

        // Get all agencies
        // @ts-ignore
        const agencies = await CompanyAccount.find({ status: "approved", type: { $in: ['OEP', 'TTC'] } }).lean();

        // Add "liked" flag
        const agenciesWithLikeFlag = agencies.map(agency => ({
            ...agency,
            liked: likedIds.includes(agency._id.toString())
        }));

        return NextResponse.json({ data: agenciesWithLikeFlag }, { status: 200 });
    } catch (error) {
        console.error("Error fetching agencies:", error);
        return NextResponse.json({ error: "Failed to fetch agencies" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { companyId, userId } = await req.json();

        if (!companyId || !userId) {
            return NextResponse.json({ error: 'companyId and userId are required' }, { status: 400 });
        }

        // @ts-ignore
        const existingLike = await LikeLog.findOne({ companyId, userId, status: 'liked' });
        if (existingLike) {
            // @ts-ignore
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
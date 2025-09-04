// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from "../../../../config/mongoose";
// import CompanyAccount from '../../../../config/models/CompanyAccount';

// export async function GET(req) {
//     try {
//         await connectDB();
//         // @ts-ignore
//         const companies = await CompanyAccount.find({ status: 'approved', type: { $in: ['VTP'] }, navttc: true }).sort({ createdAt: -1 });
//         return NextResponse.json({ data: companies, status: 200 });
//     } catch (error) {
//         console.error('Error fetching companies:', error);
//         return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../../config/mongoose";
import CompanyAccount from '../../../../config/models/CompanyAccount';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const companies = await CompanyAccount.aggregate([
            {
                $match: {
                    status: 'approved',
                    type: { $in: ['VTP'] },
                    navttc: true
                }
            },
            {
                $lookup: {
                    from: "vtps",
                    localField: "_id",
                    foreignField: "userId",
                    as: "vtpDetails"
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        return NextResponse.json({ data: companies, status: 200 });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
    }
}

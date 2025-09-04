import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import Company from '../../../../config/models/Company';


export async function GET(req) {
    try {
        await connectDB();
        // @ts-ignore
        const companies = await Company.find().sort({ createdAt: -1 });
        return NextResponse.json({ data: companies }, { status: 200 });
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}
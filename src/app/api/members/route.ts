import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Member from '../../../config/models/Members';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const { userId, name, fatherName, joiningDate, phoneNumber, employeeId } = body;

        if (!userId || !name || !fatherName || !joiningDate || !phoneNumber || !employeeId) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        // @ts-ignore
        const newMember = await Member.create({
            userId,
            name,
            fatherName,
            joiningDate,
            phoneNumber,
            employeeId,
        });

        return NextResponse.json({ message: 'Member added successfully', data: newMember }, { status: 201 });
    } catch (error) {
        console.error('Member creation error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'Missing userId in query' }, { status: 400 });
        }

        // @ts-ignore
        const members = await Member.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json({ data: members }, { status: 200 });
    } catch (error) {
        console.error('Fetch members error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
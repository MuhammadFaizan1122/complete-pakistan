import connectDB from '../../../config/mongoose';
import GamcaIssue from '../../../config/models/GamcaIssue';
import { NextRequest, NextResponse } from 'next/server';


// GET: all or single by ID
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');

        if (id) {
            console.log('id==>', id)
            // @ts-ignore
            const single = await GamcaIssue.findById(id);
            return NextResponse.json({ success: true, data: single });
        }

        // @ts-ignore
        const all = await GamcaIssue.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: all });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

// POST: create new issue
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        // @ts-ignore
        const created = await GamcaIssue.create(body);
        return NextResponse.json({ success: true, message: 'Issue created', data: created });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create' }, { status: 500 });
    }
}

// PATCH: update
export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const { id, ...updates } = await req.json();
        // @ts-ignore
        const updated = await GamcaIssue.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json({ success: true, message: 'Issue updated', data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
    }
}

// DELETE: remove by ID
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        // @ts-ignore
        await GamcaIssue.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}

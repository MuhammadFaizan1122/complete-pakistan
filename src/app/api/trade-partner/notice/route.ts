import connectDB from '../../../../config/mongoose';
import Notice from '../../../../config/models/Notice';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    try {
        await connectDB();
        const body = await req.json();
        if (body.images && body.images.length > 3) {
            return NextResponse.json({ success: false, message: 'Maximum 3 images allowed' }, { status: 400 });
        }
        const notice = new Notice(body);
        await notice.save();
        return NextResponse.json({ success: true, data: notice });
    } catch (error) {
        console.error('POST Notice Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function GET(req: any) {
    try {
        await connectDB();
        const userId = req.nextUrl.searchParams.get('id');
        if (userId) {
            // @ts-ignore
            const notice = await Notice.find({ userId });
            if (!notice) {
                return NextResponse.json({ success: false, message: 'Notice not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: notice });
        }
        // @ts-ignore
        const notices = await Notice.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: notices });
    } catch (error) {
        console.error('GET Notices Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: any) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        if (updateData.images && updateData.images.length > 3) {
            return NextResponse.json({ success: false, message: 'Maximum 3 images allowed' }, { status: 400 });
        }
        // @ts-ignore
        const notice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
        if (!notice) {
            return NextResponse.json({ success: false, message: 'Notice not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: notice });
    } catch (error) {
        console.error('PATCH Notice Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: any) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        // @ts-ignore
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            return NextResponse.json({ success: false, message: 'Notice not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Notice deleted successfully' });
    } catch (error) {
        console.error('DELETE Notice Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import GamcaToken from '../../../config/models/GamcaToken';

export async function GET() {
    try {
        await connectDB();
        // @ts-ignore
        const token = await GamcaToken.findOne();
        return NextResponse.json({ data: token || null }, { status: 200 });
    } catch (error) {
        console.error('Error fetching GAMCA token:', error);
        return NextResponse.json({ error: 'Failed to fetch GAMCA token' }, { status: 500 });
    }
}

export async function POST(request: any) {
    try {
        await connectDB();
        // @ts-ignore
        const existingToken = await GamcaToken.findOne();
        if (existingToken) {
            return NextResponse.json({ error: 'GAMCA token already exists. Use PUT to update.' }, { status: 400 });
        }

        const payload = await request.json();
        // @ts-ignore
        const token = await GamcaToken.create(payload);
        return NextResponse.json({ data: token }, { status: 201 });
    } catch (error) {
        console.error('Error creating GAMCA token:', error);
        return NextResponse.json({ error: 'Failed to create GAMCA token' }, { status: 500 });
    }
}

export async function PUT(request: any) {
    try {
        await connectDB();
        const payload = await request.json();
        // @ts-ignore
        const token = await GamcaToken.findOneAndUpdate({}, payload, { new: true, upsert: true });
        return NextResponse.json({ data: token }, { status: 200 });
    } catch (error) {
        console.error('Error updating GAMCA token:', error);
        return NextResponse.json({ error: 'Failed to update GAMCA token' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        await connectDB();
        await GamcaToken.deleteOne();
        return NextResponse.json({ message: 'GAMCA token deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting GAMCA token:', error);
        return NextResponse.json({ error: 'Failed to delete GAMCA token' }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Navtac from '../../../config/models/NAVTAC';

// GET: Fetch all NAVTACs or a single NAVTAC by ID
export async function GET(req: any) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            // @ts-ignore
            const navtac = await Navtac.findById(id);
            if (!navtac) {
                return NextResponse.json({ error: 'NAV TAC not found' }, { status: 404 });
            }
            return NextResponse.json({ data: navtac }, { status: 200 });
        }

        // @ts-ignore
        const navtacs = await Navtac.find();
        return NextResponse.json({ data: navtacs }, { status: 200 });
    } catch (error) {
        console.error('Error fetching NAVTACs:', error);
        return NextResponse.json({ error: 'Failed to fetch NAVTACs' }, { status: 500 });
    }
}

// POST: Create a new NAVTAC
export async function POST(req: any) {
    try {
        await connectDB();
        const { name, code } = await req.json();

        if (!name || !code) {
            return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
        }

        // @ts-ignore
        const newNavtac = await Navtac.create({ name, code });
        return NextResponse.json({ data: newNavtac }, { status: 201 });
    } catch (error) {
        console.error('Error creating NAVTAC:', error);
        // @ts-ignore
        return NextResponse.json({ error: error.message || 'Failed to create NAVTAC' }, { status: 500 });
    }
}

// PUT: Update an existing NAVTAC
export async function PUT(req: any) {
    try {
        await connectDB();
        const { id, name, code } = await req.json();

        if (!id || !name || !code) {
            return NextResponse.json({ error: 'ID, name, and code are required' }, { status: 400 });
        }

        // @ts-ignore
        const updatedNavtac = await Navtac.findByIdAndUpdate(
            id,
            { name, code, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedNavtac) {
            return NextResponse.json({ error: 'NAV TAC not found' }, { status: 404 });
        }

        return NextResponse.json({ data: updatedNavtac }, { status: 200 });
    } catch (error) {
        console.error('Error updating NAVTAC:', error);
        // @ts-ignore
        return NextResponse.json({ error: error.message || 'Failed to update NAVTAC' }, { status: 500 });
    }
}

// DELETE: Delete a NAVTAC by ID
export async function DELETE(req: any) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // @ts-ignore
        const deletedNavtac = await Navtac.findByIdAndDelete(id);
        if (!deletedNavtac) {
            return NextResponse.json({ error: 'NAV TAC not found' }, { status: 404 });
        }

        return NextResponse.json({ data: deletedNavtac }, { status: 200 });
    } catch (error) {
        console.error('Error deleting NAVTAC:', error);
        return NextResponse.json({ error: 'Failed to delete NAVTAC' }, { status: 500 });
    }
}
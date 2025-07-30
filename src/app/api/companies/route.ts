import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Company from '../../../config/models/Company';

// GET: Fetch all companies for a user
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
        // @ts-ignore
        const companies = await Company.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ data: companies }, { status: 200 });
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

// POST: Create a new company
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        // @ts-ignore
        const company = await Company.create(body);
        return NextResponse.json({ data: company }, { status: 201 });
    } catch (error) {
        console.error('Error creating company:', error);
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
    }
}

// PUT: Update an existing company
export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { _id, ...updateData } = body;
        if (!_id) {
            return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
        }
        // @ts-ignore
        const company = await Company.findByIdAndUpdate(_id, updateData, { new: true });
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json({ data: company }, { status: 200 });
    } catch (error) {
        console.error('Error updating company:', error);
        return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
    }
}

// DELETE: Delete a company
export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
        }
        // @ts-ignore
        const company = await Company.findByIdAndDelete(id);
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json({ data: 'Company deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting company:', error);
        return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
    }
}
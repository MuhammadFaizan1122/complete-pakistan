// ===== Status Update API (app/api/travel-agents/[id]/status/route.js) =====
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../config/mongoose';
import TicketingAgent from '../../../../../config/models/TicketingAgent';
import mongoose from 'mongoose';

// PUT: Update registration status
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { status } = await req.json();

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }

        // Validate status
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid status. Must be one of: pending, approved, rejected'
            }, { status: 400 });
        }

        // @ts-ignore
        const updatedAgent = await TicketingAgent.findByIdAndUpdate(
            id,
            {
                registrationStatus: status,
                isVerified: status === 'approved'
            },
            { new: true }
        );

        if (!updatedAgent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `Registration status updated to ${status}`,
            data: updatedAgent
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to update status',
            details: error.message
        }, { status: 500 });
    }
}
// ===== Individual Agent API (app/api/travel-agents/[id]/route.js) =====
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import TicketingAgent from '../../../../config/models/TicketingAgent';
import mongoose from 'mongoose';

// GET: Fetch single travel agent by ID
export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }

        // @ts-ignore
        const agent = await TicketingAgent.findById(id).select('-__v');

        if (!agent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: agent
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching travel agent:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch travel agent',
            details: error.message
        }, { status: 500 });
    }
}

// PUT: Update travel agent
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const updates = await req.json();

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }

        // Remove empty arrays
        if (updates.services) {
            updates.services = updates.services.filter(service => service.trim() !== '');
        }
        if (updates.airlines) {
            updates.airlines = updates.airlines.filter(airline => airline.trim() !== '');
        }

        // @ts-ignore
        const updatedAgent = await TicketingAgent.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedAgent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Travel agent updated successfully',
            data: updatedAgent
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating travel agent:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message
            }));

            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                validationErrors
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to update travel agent',
            details: error.message
        }, { status: 500 });
    }
}

// DELETE: Delete travel agent (soft delete by setting isActive to false)
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }
        // @ts-ignore
        const deletedAgent = await TicketingAgent.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!deletedAgent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Travel agent deactivated successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting travel agent:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete travel agent',
            details: error.message
        }, { status: 500 });
    }
}
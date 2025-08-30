import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import Consultant from '../../../../config/models/Consultant';
import mongoose from 'mongoose';

// GET: Fetch single consultant by ID
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid consultant ID',
            }, { status: 400 });
        }
        // @ts-ignore
        const consultant = await Consultant.findById(id).select('-__v');

        if (!consultant) {
            return NextResponse.json({
                success: false,
                error: 'Consultant not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: consultant,
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching consultant:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch consultant',
            details: error.message,
        }, { status: 500 });
    }
}

// PUT: Update consultant
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const updates = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid consultant ID',
            }, { status: 400 });
        }

        if (updates.specializations) {
            updates.specializations = updates.specializations.filter(spec => spec.trim() !== '');
        }
        if (updates.services) {
            updates.services = updates.services.filter(service => service.trim() !== '');
        }
        if (updates.languages) {
            updates.languages = updates.languages.filter(lang => lang.trim() !== '');
        }
        if (updates.videoLinks) {
            updates.videoLinks = updates.videoLinks.filter(link => link.trim() !== '');
        }
        if (updates.portfolioItems) {
            updates.portfolioItems = updates.portfolioItems.filter(item => item.description && item.title);
        }

        // @ts-ignore
        const updatedConsultant = await Consultant.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedConsultant) {
            return NextResponse.json({
                success: false,
                error: 'Consultant not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Consultant updated successfully',
            data: updatedConsultant,
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating consultant:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message,
            }));

            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                validationErrors,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to update consultant',
            details: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid consultant ID',
            }, { status: 400 });
        }

        // @ts-ignore
        const deletedConsultant = await Consultant.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!deletedConsultant) {
            return NextResponse.json({
                success: false,
                error: 'Consultant not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Consultant deactivated successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting consultant:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete consultant',
            details: error.message,
        }, { status: 500 });
    }
}
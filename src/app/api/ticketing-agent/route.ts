import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import TicketingAgent from '../../../config/models/TicketingAgent';

// GET: Fetch all travel agents with filtering and pagination
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const status = searchParams.get('status');
        const businessType = searchParams.get('businessType');
        const dealTypes = searchParams.get('dealTypes');
        const search = searchParams.get('search');
        // Build filter object
        const filter = {};
        // @ts-ignore
        if (status) filter.registrationStatus = status;
        // @ts-ignore
        if (businessType) filter.businessType = businessType;
        // @ts-ignore
        if (dealTypes) filter.dealTypes = dealTypes;
        if (search) {
            // @ts-ignore
            filter.$text = { $search: search };
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch agents with pagination
        // @ts-ignore
        const agents = await TicketingAgent.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        // Get total count for pagination
        const totalCount = await TicketingAgent.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            success: true,
            data: agents,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching travel agents:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch travel agents',
            details: error.message
        }, { status: 500 });
    }
}

// POST: Create new travel agent registration
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Validate required fields
        const requiredFields = [
            'businessType', 'businessName', 'proprietorName', 'businessClassification',
            'yearEstablished', 'iataAccreditation', 'serviceSpecialization', 'dealTypes',
            'primaryMobile', 'whatsappBusiness', 'officeDirectLine', 'businessEmail',
            'officeAddress', 'officeTimings', 'workingDays', 'services', 'airlines'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields',
                missingFields
            }, { status: 400 });
        }

        // Filter out empty services and airlines
        body.services = body.services.filter(service => service.trim() !== '');
        body.airlines = body.airlines.filter(airline => airline.trim() !== '');

        // Filter out empty branches and staff
        if (body.branches) {
            body.branches = body.branches.filter(branch =>
                branch.name && branch.address && branch.phone
            );
        }

        if (body.staff) {
            body.staff = body.staff.filter(member =>
                member.name && member.designation && member.contact
            );
        }

        // Create new travel agent
        const newAgent = new TicketingAgent(body);
        const savedAgent = await newAgent.save();

        return NextResponse.json({
            success: true,
            message: 'Travel agent registration submitted successfully',
            data: savedAgent
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating travel agent:', error);

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

        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                error: 'Duplicate entry found',
                details: 'A travel agent with similar details already exists'
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to create travel agent registration',
            details: error.message
        }, { status: 500 });
    }
}

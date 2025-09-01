import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import TravelAgent from '../../../config/models/HajjAndUmrah';

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const status = searchParams.get('status');
        const country = searchParams.get('country');
        const state = searchParams.get('state');
        const city = searchParams.get('city');
        const services = searchParams.get('services');
        const packageType = searchParams.get('packageType');
        const search = searchParams.get('search');

        const filter = {};
        // @ts-ignore
        if (status) filter.registrationStatus = status;
        // @ts-ignore
        if (country) filter.country = country;
        // @ts-ignore
        if (state) filter.state = state;
        // @ts-ignore
        if (city) filter.city = city;
        // @ts-ignore
        if (services) filter.services = { $in: [services] };
        // @ts-ignore
        if (packageType) filter['umrahHajjPackages.type'] = packageType;

        if (search) {
            // @ts-ignore
            filter.$text = { $search: search };
        }

        const skip = (page - 1) * limit;

        // @ts-ignore
        const agents = await TravelAgent.find({
            ...filter,
            registrationStatus: 'approved'
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        const totalCount = await TravelAgent.countDocuments(filter);
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

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const requiredFields = [
            'agencyName', 'country', 'state', 'city', 'establishmentYear',
            'phone', 'email', 'address', 'logo', 'services', 'languages'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields',
                missingFields
            }, { status: 400 });
        }

        body.services = body.services.filter(service => service.trim() !== '');
        body.languages = body.languages.filter(language => language.trim() !== '');

        if (body.services.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'At least one service is required'
            }, { status: 400 });
        }

        if (body.languages.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'At least one language is required'
            }, { status: 400 });
        }

        body.umrahHajjPackages = [];
        body.faq = [];
        body.gallery = [];

        // Create new travel agent
        const newAgent = new TravelAgent(body);
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

// PUT: Update travel agent (for adding packages, FAQ, gallery later)
export async function PUT(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const agentId = searchParams.get('id');
        const action = searchParams.get('action');

        if (!agentId) {
            return NextResponse.json({
                success: false,
                error: 'Agent ID is required'
            }, { status: 400 });
        }

        const body = await req.json();
        // @ts-ignore
        const agent = await TravelAgent.findById(agentId);

        if (!agent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        let updatedAgent;

        switch (action) {
            case 'add-package':
                updatedAgent = await agent.addPackage(body);
                break;

            case 'update-package':
                const { packageId, ...packageData } = body;
                updatedAgent = await agent.updatePackage(packageId, packageData);
                break;

            case 'remove-package':
                updatedAgent = await agent.removePackage(body.packageId);
                break;

            case 'add-faq':
                updatedAgent = await agent.addFAQ(body.question, body.answer);
                break;

            case 'add-gallery':
                updatedAgent = await agent.addGalleryImage(body.imageUrl, body.caption, body.category);
                break;

            case 'update-profile':
                Object.assign(agent, body);
                updatedAgent = await agent.save();
                break;

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Invalid action specified'
                }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: `Successfully ${action.replace('-', ' ')}`,
            data: updatedAgent
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating travel agent:', error);

        if (error.message === 'Package not found') {
            return NextResponse.json({
                success: false,
                error: 'Package not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to update travel agent',
            details: error.message
        }, { status: 500 });
    }
}

// DELETE: Delete travel agent or specific content
export async function DELETE(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const agentId = searchParams.get('id');
        const action = searchParams.get('action');

        if (!agentId) {
            return NextResponse.json({
                success: false,
                error: 'Agent ID is required'
            }, { status: 400 });
        }

        if (action === 'delete-agent') {
            // @ts-ignore
            await TravelAgent.findByIdAndDelete(agentId);
            return NextResponse.json({
                success: true,
                message: 'Travel agent deleted successfully'
            }, { status: 200 });
        }

        // @ts-ignore
        const agent = await TravelAgent.findById(agentId);
        if (!agent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        const body = await req.json();

        switch (action) {
            case 'delete-faq':
                agent.faq = agent.faq.filter(faq => faq._id.toString() !== body.faqId);
                break;

            case 'delete-gallery':
                agent.gallery = agent.gallery.filter(img => img._id.toString() !== body.galleryId);
                break;

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Invalid delete action'
                }, { status: 400 });
        }

        const updatedAgent = await agent.save();

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${action.replace('delete-', '')}`,
            data: updatedAgent
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting travel agent content:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete content',
            details: error.message
        }, { status: 500 });
    }
}
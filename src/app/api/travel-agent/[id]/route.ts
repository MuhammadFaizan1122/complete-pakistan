import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import TravelAgent from '../../../../config/models/HajjAndUmrah';
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
        const agent = await TravelAgent.findById(id).select('-__v');

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

// PUT: Update travel agent or add packages/FAQ/gallery
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }

        const body = await req.json();
        // @ts-ignore
        const agent = await TravelAgent.findById(id);

        if (!agent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        let updatedAgent;

        switch (action) {
            case 'add-package':
                // Validate package data
                const packageData = {
                    packageTitle: body.packageTitle,
                    duration: body.duration,
                    numberOfPeople: Number(body.numberOfPeople),
                    description: body.description,
                    currency: body.currency || 'PKR',
                    price: Number(body.price),
                    type: body.type, // 'umrah' or 'hajj'
                    accommodations: body.accommodations || [],
                    whatsIncluded: body.whatsIncluded || []
                };

                if (!packageData.packageTitle || !packageData.duration || !packageData.description ||
                    !packageData.numberOfPeople || !packageData.price || !packageData.type) {
                    return NextResponse.json({
                        success: false,
                        error: 'Missing required package fields'
                    }, { status: 400 });
                }

                if (packageData.accommodations.length === 0 || packageData.whatsIncluded.length === 0) {
                    return NextResponse.json({
                        success: false,
                        error: 'Accommodations and what\'s included cannot be empty'
                    }, { status: 400 });
                }

                updatedAgent = await agent.addPackage(packageData);
                break;

            case 'update-package':
                const { packageId, ...updatePackageData } = body;
                if (!packageId) {
                    return NextResponse.json({
                        success: false,
                        error: 'Package ID is required'
                    }, { status: 400 });
                }
                updatedAgent = await agent.updatePackage(packageId, updatePackageData);
                break;

            case 'remove-package':
                if (!body.packageId) {
                    return NextResponse.json({
                        success: false,
                        error: 'Package ID is required'
                    }, { status: 400 });
                }
                updatedAgent = await agent.removePackage(body.packageId);
                break;

            case 'add-faq':
                if (!body.question || !body.answer) {
                    return NextResponse.json({
                        success: false,
                        error: 'Both question and answer are required'
                    }, { status: 400 });
                }
                updatedAgent = await agent.addFAQ(body.question, body.answer);
                break;

            case 'update-faq':
                const faqIndex = agent.faq.findIndex(faq => faq._id.toString() === body.faqId);
                if (faqIndex === -1) {
                    return NextResponse.json({
                        success: false,
                        error: 'FAQ not found'
                    }, { status: 404 });
                }
                agent.faq[faqIndex].question = body.question || agent.faq[faqIndex].question;
                agent.faq[faqIndex].answer = body.answer || agent.faq[faqIndex].answer;
                updatedAgent = await agent.save();
                break;

            case 'add-gallery':
                if (!body.imageUrl) {
                    return NextResponse.json({
                        success: false,
                        error: 'Image URL is required'
                    }, { status: 400 });
                }
                updatedAgent = await agent.addGalleryImage(
                    body.imageUrl,
                    body.caption || '',
                    body.category || 'general'
                );
                break;

            case 'update-profile':
                // Filter out empty arrays
                if (body.services) {
                    body.services = body.services.filter(service => service.trim() !== '');
                }
                if (body.languages) {
                    body.languages = body.languages.filter(language => language.trim() !== '');
                }

                // Validate required fields if they're being updated
                if (body.services && body.services.length === 0) {
                    return NextResponse.json({
                        success: false,
                        error: 'At least one service is required'
                    }, { status: 400 });
                }

                if (body.languages && body.languages.length === 0) {
                    return NextResponse.json({
                        success: false,
                        error: 'At least one language is required'
                    }, { status: 400 });
                }

                Object.assign(agent, body);
                updatedAgent = await agent.save();
                break;

            case 'update-status':
                if (!['pending', 'approved', 'rejected'].includes(body.status)) {
                    return NextResponse.json({
                        success: false,
                        error: 'Invalid status. Must be pending, approved, or rejected'
                    }, { status: 400 });
                }
                agent.registrationStatus = body.status;
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

// DELETE: Delete travel agent or specific content
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid agent ID'
            }, { status: 400 });
        }

        // @ts-ignore
        const agent = await TravelAgent.findById(id);

        if (!agent) {
            return NextResponse.json({
                success: false,
                error: 'Travel agent not found'
            }, { status: 404 });
        }

        if (action === 'delete-agent') {
            // Soft delete by setting isActive to false
            agent.isActive = false;
            await agent.save();

            return NextResponse.json({
                success: true,
                message: 'Travel agent deactivated successfully'
            }, { status: 200 });
        }

        // Handle specific deletions
        const body = await req.json();

        switch (action) {
            case 'delete-package':
                if (!body.packageId) {
                    return NextResponse.json({
                        success: false,
                        error: 'Package ID is required'
                    }, { status: 400 });
                }
                await agent.removePackage(body.packageId);
                break;

            case 'delete-faq':
                if (!body.faqId) {
                    return NextResponse.json({
                        success: false,
                        error: 'FAQ ID is required'
                    }, { status: 400 });
                }
                agent.faq = agent.faq.filter(faq => faq._id.toString() !== body.faqId);
                await agent.save();
                break;

            case 'delete-gallery':
                if (!body.galleryId) {
                    return NextResponse.json({
                        success: false,
                        error: 'Gallery ID is required'
                    }, { status: 400 });
                }
                agent.gallery = agent.gallery.filter(img => img._id.toString() !== body.galleryId);
                await agent.save();
                break;

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Invalid delete action'
                }, { status: 400 });
        }

        // @ts-ignore
        const updatedAgent = await TravelAgent.findById(id).select('-__v');

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${action.replace('delete-', '')}`,
            data: updatedAgent
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting travel agent content:', error);

        if (error.message === 'Package not found') {
            return NextResponse.json({
                success: false,
                error: 'Package not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to delete content',
            details: error.message
        }, { status: 500 });
    }
}
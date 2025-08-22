import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import CompanyAccount from '../../../../config/models/CompanyAccount';
import VTP from "../../../../config/models/VTP";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// GET: Fetch all providers or a single provider by ID
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const userId = searchParams.get('userId');
        if (userId) {
            // @ts-ignore
            const providers = await VTP.find()
                .select('-cnic -password')
                .lean();

            const filteredProviders = providers.filter(p => String(p.userId) === String(userId));

            if (!filteredProviders) {
                return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
            }
            // @ts-ignore
            const companyAccount = await CompanyAccount.findOne({ agencyEmail: filteredProviders[0]?.email }).select('-password').lean();

            if (!companyAccount) {
                return NextResponse.json({ error: 'Company account not found' }, { status: 404 });
            }
            // @ts-ignore
            return NextResponse.json({ data: { ...filteredProviders[0], ...companyAccount, email: filteredProviders[0].email } }, { status: 200 });
        }

        // @ts-ignore
        const providers = await VTP.find().select('-cnic -password').lean();
        // @ts-ignore
        const companyAccounts = await CompanyAccount.find({ agencyEmail: { $in: providers.map(p => p.email) } }).select('-password').lean();
        const mergedData = providers.map(provider => {
            const companyAccount = companyAccounts.find(ca => ca.agencyEmail === provider.email) || {};
            return {
                vtpId: provider._id,
                // @ts-ignore
                companyAccountId: companyAccount._id,
                ...provider,
                ...companyAccount,
                email: provider.email
            };
        });

        return NextResponse.json({ data: mergedData }, { status: 200 });
    } catch (error) {
        console.error('Error fetching VTPs:', error);
        return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 });
    }
}
// POST: Create a new provider
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        // Mask IBAN for public display
        if (body.bankAccount?.iban) {
            body.bankAccount.maskedIban = body.bankAccount.iban.replace(/\d(?=\d{4})/g, '*');
        }
        const {
            agencyName,
            email,
            logo,
            ntn,
            supportingDocument,
            contactPersonName,
            contactPersonPhone,
            contactPersonIdFront,
            contactPersonIdBack,
            agencyCoverPhoto,
            password,
            confirmPassword,
            licenceNo,
            proprietorName,
            licenceTitle,
            licenceStatus,
            licenceExpiry,
            headOffice,
            branchOffice,
            ptcl,
            whatsappNo,
            websiteUrl,
        } = body;

        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
        }
        // @ts-ignore
        const existing = await CompanyAccount.findOne({ email });
        if (existing) {
            return NextResponse.json({ message: 'Company already exists' }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // @ts-ignore
        const account = await CompanyAccount.create({
            agencyName,
            agencyEmail: email,
            agencyLogo: logo,
            type: 'VTP',
            ntn,
            supportingDocument,
            contactPersonName,
            contactPersonPhone,
            contactPersonIdFront,
            contactPersonIdBack,
            agencyCoverPhoto,
            password: hashedPassword,
            status: 'approved',
            licenceNo,
            proprietorName,
            licenceTitle,
            licenceStatus,
            licenceExpiry,
            headOffice,
            branchOffice,
            ptcl,
            whatsappNo,
            websiteUrl,
        });
        // @ts-ignore
        const provider = await VTP.create(body);
        return NextResponse.json({ data: provider }, { status: 201 });
    } catch (error) {
        console.error('Error creating VTP:', error);
        // @ts-ignore
        if (error.name === 'ValidationError') {
            // @ts-ignore
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 });
    }
}

// PUT: Update an existing provider
export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { vtpId, companyAccountId, password, confirmPassword, ...updateData } = body;

        if (!vtpId || !companyAccountId) {
            return NextResponse.json({ error: 'Both VTP ID and CompanyAccount ID are required' }, { status: 400 });
        }

        // Mask IBAN for public display
        // if (updateData.bankAccount?.iban) {
        //     updateData.bankAccount.maskedIban = updateData.bankAccount.iban.replace(/\d(?=\d{4})/g, '*');
        // }

        // Handle password update if provided
        let hashedPassword = null;
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }
        delete updateData._id;
        // Update VTP collection
        // @ts-ignore
        const provider = await VTP.findByIdAndUpdate(vtpId, updateData, { new: true }).select('-cnic -password');
        if (!provider) {
            return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
        }

        // Update CompanyAccount collection
        const companyAccountFields = {
            agencyName: updateData.agencyName,
            agencyEmail: updateData.email,
            agencyLogo: updateData.logo,
            type: 'VTP',
            ntn: updateData.ntn,
            supportingDocument: updateData.supportingDocument,
            contactPersonName: updateData.contactPersonName,
            contactPersonPhone: updateData.contactPersonPhone,
            contactPersonIdFront: updateData.contactPersonIdFront,
            contactPersonIdBack: updateData.contactPersonIdBack,
            agencyCoverPhoto: updateData.agencyCoverPhoto,
            status: 'approved',
            licenceNo: updateData.licenceNo,
            proprietorName: updateData.proprietorName,
            licenceTitle: updateData.licenceTitle,
            licenceStatus: updateData.licenceStatus,
            licenceExpiry: updateData.licenceExpiry,
            headOffice: updateData.headOffice,
            branchOffice: updateData.branchOffice,
            ptcl: updateData.ptcl,
            whatsappNo: updateData.whatsappNo,
            websiteUrl: updateData.website
        };

        if (hashedPassword) {
            // @ts-ignore
            companyAccountFields.password = hashedPassword;
        }

        // @ts-ignore
        const companyAccount = await CompanyAccount.findOneAndUpdate(
            { agencyEmail: updateData.email },
            companyAccountFields,
            { new: true }
        );

        if (!companyAccount) {
            return NextResponse.json({ error: 'Company account not found' }, { status: 404 });
        }

        return NextResponse.json({ data: provider }, { status: 200 });
    } catch (error) {
        console.error('Error updating VTP:', error);
        // @ts-ignore
        if (error.name === 'ValidationError') {
            // @ts-ignore
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update provider' }, { status: 500 });
    }
}

// DELETE: Delete a provider
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Provider ID is required' }, { status: 400 });
        }
        // @ts-ignore
        const provider = await VTP.findByIdAndDelete(id);
        if (!provider) {
            return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
        }
        return NextResponse.json({ data: 'Provider deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting VTP:', error);
        return NextResponse.json({ error: 'Failed to delete provider' }, { status: 500 });
    }
}
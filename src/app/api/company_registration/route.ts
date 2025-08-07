import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import CompanyAccount from '../../../config/models/CompanyAccount';
import bcrypt from 'bcryptjs';


export async function GET(req) {
    try {
        await connectDB();
        // @ts-ignore
        const companies = await CompanyAccount.find({ status: 'approved', type: { $in: ['OEP', 'TTC'] } }).sort({ createdAt: -1 });
        return NextResponse.json({ data: companies, status: 200 });
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            agencyName,
            agencyEmail,
            agencyLogo,
            type,
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
        const existing = await CompanyAccount.findOne({ agencyEmail });
        if (existing) {
            return NextResponse.json({ message: 'Company already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // @ts-ignore
        const account = await CompanyAccount.create({
            agencyName,
            agencyEmail,
            agencyLogo,
            type,
            ntn,
            supportingDocument,
            contactPersonName,
            contactPersonPhone,
            contactPersonIdFront,
            contactPersonIdBack,
            agencyCoverPhoto,
            password: hashedPassword,
            status: 'pending',
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

        return NextResponse.json({
            message: 'Account submitted for review. It may take 2 to 3 working days',
            account,
        }, { status: 201 });

    } catch (error) {
        console.error("Company Registration Error:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
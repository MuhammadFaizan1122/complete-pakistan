import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import CompanyAccount from '../../../config/models/CompanyAccount';
import { companySignupSchema } from '../../../utils/validation';

import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
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
            confirmPassword
        } = body;
        // @ts-ignore
        const existing = await CompanyAccount.findOne({ agencyEmail });
        if (existing) {
            return NextResponse.json({ message: 'Company already exists' }, { status: 409 });
        }
        // await companySignupSchema.validate(body, { abortEarly: false });

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
            status: 'pending'
        });

        return NextResponse.json({
            message: 'Account submitted for review. It may take 2 to 3 working days',
            account
        }, { status: 201 });

    } catch (error) {
        console.error("Company Registration Error:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

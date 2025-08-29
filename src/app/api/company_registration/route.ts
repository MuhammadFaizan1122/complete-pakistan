import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import CompanyAccount from '../../../config/models/CompanyAccount';
import bcrypt from 'bcryptjs';
import { generateOTP } from '../../../utils/otp';
import Otp from '../../../config/models/Otp';
import nodemailer from "nodemailer";

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
            address,
            headOffice,
            branchOffice,
            ptcl,
            whatsappNo,
            websiteUrl,
            services,
            socialMedia
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

        const otp = generateOTP();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiryTime = new Date(Date.now() + 15 * 60 * 1000);

        // @ts-ignore
        await Otp.findOneAndUpdate(
            { email: agencyEmail },
            {
                otpHash,
                expiryTime,
                agencyData: {
                    ...body,
                    password: hashedPassword,
                },
            },
            { upsert: true, new: true }
        );

        // @ts-ignore
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Complete Pakistan" <${process.env.SMTP_USER}>`,
            to: agencyEmail,
            subject: "Verify Your Agency Registration - OTP Code",
            html: `
                <h2>Hello ${agencyName},</h2>
                <p>Your OTP code for agency registration is:</p>
                <h3 style="color:#4F46E5">${otp}</h3>
                <p>This code will expire in <b>5 minutes</b>.</p>
            `,
        });

        // @ts-ignore
        // const account = await CompanyAccount.create({
        //     agencyName,
        //     agencyEmail,
        //     agencyLogo,
        //     type,
        //     ntn,
        //     supportingDocument,
        //     contactPersonName,
        //     contactPersonPhone,
        //     contactPersonIdFront,
        //     contactPersonIdBack,
        //     agencyCoverPhoto,
        //     password: hashedPassword,
        //     status: 'pending',
        //     licenceNo,
        //     proprietorName,
        //     licenceTitle,
        //     licenceStatus,
        //     licenceExpiry,
        //     address: {
        //         country: address?.country,
        //         state: address?.state,
        //         city: address?.city
        //     },
        //     headOffice,
        //     branchOffice,
        //     ptcl,
        //     whatsappNo,
        //     websiteUrl,
        //     services,
        //     socialMedia: {
        //         facebook: socialMedia?.facebook,
        //         twitter: socialMedia?.twitter,
        //         linkedin: socialMedia?.linkedin,
        //         instagram: socialMedia?.instagram
        //     }
        // });

        // return NextResponse.json({
        //     message: 'Account submitted for review. It may take 2 to 3 working days',
        //     account,
        // }, { status: 201 });
        return NextResponse.json(
            { message: "OTP sent to agency email. Please verify to complete registration.", email: agencyEmail },
            { status: 200 }
        );

    } catch (error) {
        console.error("Company Registration Error:", error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
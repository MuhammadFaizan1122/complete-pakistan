import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from '../../../../utils/otp';
import { storeOTP } from '../../../../utils/otpStore';
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Otp from "../../../../config/models/Otp";

// import { sendOTPEmail } from '../../../../services/emailService';

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const otp = generateOTP();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

        // @ts-ignore
        await Otp.findOneAndUpdate(
            { email },
            { otpHash, expiryTime },
            { upsert: true, new: true }
        );

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        // Send OTP email
        await transporter.sendMail({
            from: `"Complete Pakistan" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Verify Your Email - OTP Code",
            html: `
        <h2>Hello! Here's your new OTP,</h2>
        <p>Your OTP code is:</p>
        <h3 style="color:#4F46E5">${otp}</h3>
        <p>This code will expire in <b>5 minutes</b>.</p>
      `,
        });

        return NextResponse.json(
            {
                message: 'OTP resent successfully',
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Resend OTP Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
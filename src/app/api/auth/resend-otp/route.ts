import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from '../../../../utils/otp';
import { storeOTP } from '../../../../utils/otpStore';
import { sendOTPEmail } from '../../../../services/emailService';

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Generate new OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        // Send OTP email
        const emailResult = await sendOTPEmail(email, otp, name);

        if (!emailResult.success) {
            return NextResponse.json({ message: 'Failed to send OTP email' }, { status: 500 });
        }

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
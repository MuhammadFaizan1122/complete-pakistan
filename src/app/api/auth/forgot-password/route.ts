import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import connectDB from "../../../../config/mongoose";
import User from "../../../../config/models/User";
import Otp from "../../../../config/models/Otp";
import { generateOTP } from "../../../../utils/otp";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email } = await req.json();
        // @ts-ignore
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const otp = generateOTP();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiryTime = new Date(Date.now() + 15 * 60 * 1000);
        // @ts-ignore
        await Otp.create({
            email,
            otpHash,
            expiryTime
        });
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
            from: `"Complete Pakistan" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `<p>Your OTP is: <b>${otp}</b></p><p>It expires in 10 minutes.</p>`,
        });

        return NextResponse.json({ success: true, message: "OTP sent to email" });
    } catch (err) {
        console.error("Forgot password error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// // app/api/auth/register/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connectDB from "../../../../config/mongoose";
// import User from '../../../../config/models/User';

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();

//         const { name, email, password, password_confirmation } = await req.json();

//         // Field validation
//         if (!name || !email || !password || !password_confirmation) {
//             return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//         }

//         if (password !== password_confirmation) {
//             return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
//         }

//         if (password.length < 6) {
//             return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
//         }
//         // @ts-ignore
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json({ message: 'User already exists' }, { status: 409 });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // @ts-ignore
//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         return NextResponse.json(
//             {
//                 message: 'User registered successfully',
//                 user: {
//                     id: newUser._id,
//                     name: newUser.name,
//                     email: newUser.email,
//                 },
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('Registration Error:', error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import User from '../../../../config/models/User';
import Otp from "../../../../config/models/Otp";
import { generateOTP } from "../../../../utils/otp";
// import { sendOTPEmail } from "../../../../services/emailService";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password, password_confirmation } = await req.json();

        // Basic validation
        if (!name || !email || !password || !password_confirmation) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        if (password !== password_confirmation) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        // Check if user already exists
        // @ts-ignore
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOTP();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000); 

        // @ts-ignore
        await Otp.findOneAndUpdate(
            { email },
            { otpHash, expiryTime, name: name, password: hashedPassword },
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
        <h2>Hello ${name},</h2>
        <p>Your OTP code is:</p>
        <h3 style="color:#4F46E5">${otp}</h3>
        <p>This code will expire in <b>5 minutes</b>.</p>
      `,
        });

        return NextResponse.json(
            {
                message: "OTP sent to your email. Please verify to complete registration.",
                email,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

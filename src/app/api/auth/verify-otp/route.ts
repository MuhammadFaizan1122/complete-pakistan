import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../config/models/User";
import Otp from "../../../../config/models/Otp";

export async function POST(req: NextRequest) {
    try {
        const { otp, userData } = await req.json();
        const { name, email, password } = userData.userData;
        // @ts-ignore
        const stored = await Otp.findOne({ email });
        if (!stored || stored.otp !== otp || stored.expiryTime < Date.now()) {
            return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
        }
        // @ts-ignore
        await User.create({
            name,
            email,
            password, 
        });
        await Otp.deleteOne({ email });
        return NextResponse.json({ message: "Registration successful" }, { status: 201 });
    } catch (err) {
        console.error("Error in verify-otp:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
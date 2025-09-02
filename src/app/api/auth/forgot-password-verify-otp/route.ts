import { NextResponse } from "next/server";
import connectDB from "../../../../config/mongoose";
import Otp from "../../../../config/models/Otp";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, otp } = await req.json();
        // @ts-ignore
        const record = await Otp.findOne({ email });
        if (!record) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // check expiry
        if (record.expiryTime < new Date()) {
            await Otp.deleteOne({ email });
            return NextResponse.json({ message: "OTP expired" }, { status: 400 });
        }
        // compare OTP hash
        const isMatch = await bcrypt.compare(otp, record.otpHash);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
        }
        await Otp.deleteOne({ email });

        // OTP is valid → allow reset
        return NextResponse.json({ success: true, message: "OTP verified" });
    } catch (err) {
        console.error("Verify OTP error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

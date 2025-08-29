import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import Otp from "../../../../config/models/Otp";
import User from "../../../../config/models/User";
import CompanyAccount from "../../../../config/models/CompanyAccount";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, otp } = await req.json();

        // @ts-ignore
        const record = await Otp.findOne({ email });
        if (!record) {
            return NextResponse.json({ message: "OTP not found" }, { status: 400 });
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

        let createdDoc;

        if (record.agencyData) {
            // @ts-ignore
            createdDoc = await CompanyAccount.create({
                ...record.agencyData,
                status: "pending",
            });
        }
        else {
            // @ts-ignore
            createdDoc = await User.create({
                name: record.name,
                email: record.email,
                password: record.password,
            });
        }

        await Otp.deleteOne({ email });

        return NextResponse.json({
            message: "Registration successful",
            id: createdDoc._id,
            type: record.agencyData ? "agency" : "user",
        });
    } catch (err) {
        console.error("Verify OTP error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

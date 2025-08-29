// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import User from "../../../../config/models/User";
// import Otp from "../../../../config/models/Otp";

// export async function POST(req: NextRequest) {
//     try {
//         const { otp, userData } = await req.json();
//         const { name, email, password } = userData.userData;
//         // @ts-ignore
//         const stored = await Otp.findOne({ email });
//         if (!stored || stored.otp !== otp || stored.expiryTime < Date.now()) {
//             return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
//         }
//         // @ts-ignore
//         await User.create({
//             name,
//             email,
//             password, 
//         });
//         await Otp.deleteOne({ email });
//         return NextResponse.json({ message: "Registration successful" }, { status: 201 });
//     } catch (err) {
//         console.error("Error in verify-otp:", err);
//         return NextResponse.json({ message: "Server error" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import Otp from "../../../../config/models/Otp";
import User from "../../../../config/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, otp } = await req.json();

        // @ts-ignore
        const record = await Otp.findOne({ email });
        if (!record) return NextResponse.json({ message: "OTP not found" }, { status: 400 });

        if (record.expiryTime < new Date()) {
            await Otp.deleteOne({ email });
            return NextResponse.json({ message: "OTP expired" }, { status: 400 });
        }
        const isMatch = await bcrypt.compare(otp, record.otpHash);
        if (!isMatch) return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });

        // @ts-ignore
        const user = await User.create({
            name: record.name,
            email: record.email,
            password: record.password,
        });

        await Otp.deleteOne({ email });

        return NextResponse.json({ message: "Registration successful", userId: user._id });
    } catch (err) {
        console.error("Verify OTP error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

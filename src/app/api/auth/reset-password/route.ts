import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import User from "../../../../config/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        // @ts-ignore
        await User.updateOne({ email }, { $set: { password: hashedPassword } });

        return NextResponse.json({ success: true, message: "Password reset successful" });
    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

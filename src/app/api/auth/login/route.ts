import connectDB from "../../../../config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../config/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
        }
        // @ts-ignore   
        const users = await User.find();
        const user = users.find(u => u.email);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 401 });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        const token = `secure-token-${user._id.toString()}`;

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

import connectDB from "../../../../config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../config/models/User";
import CompanyAccount from "../../../../config/models/CompanyAccount";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
        }

        // @ts-ignore
        const user = await User.findOne({ email });

        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }

            const token = `user-token-${user._id}`;
            return NextResponse.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role || 'user',
                    type: user.type,
                },
                token,
            });
        }

        // @ts-ignore
        const company = await CompanyAccount.findOne({ agencyEmail: email });

        if (company) {
            const isPasswordCorrect = await bcrypt.compare(password, company.password);
            if (!isPasswordCorrect) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
            if (!company.status || company.status !== 'approved') {
                return NextResponse.json({ message: "This company account is under review" }, { status: 401 });
            }

            const token = `company-token-${company._id}`;
            return NextResponse.json({
                user: {
                    id: company._id,
                    name: company.agencyName,
                    email: company.agencyEmail,
                    role: "company",
                    type: company.type,
                },
                token,
            });
        }

        return NextResponse.json({ message: "User not found" }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
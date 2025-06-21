// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import User from '../../../../config/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password, password_confirmation } = await req.json();

        // Field validation
        if (!name || !email || !password || !password_confirmation) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        if (password !== password_confirmation) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
        }
        // @ts-ignore
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // @ts-ignore
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

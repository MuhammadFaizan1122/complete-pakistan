import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../config/mongoose";
import NaqalKafalaRequest from "../../../config/models/NaqalKafalaRequest";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const {
            userId,
            name,
            passportNumber,
            iqamaStatus,
            iqamaExpiry,
            country,
            state,
            city,
            contactAbroad,
            contactPakistani,
            whatsapp,
            profession,
            education,
            completeAddress,
            experties,
            yearsOfExperience,
        } = body;

        if (
            !userId ||
            !name ||
            !passportNumber ||
            !iqamaStatus ||
            !iqamaExpiry ||
            !country ||
            !state ||
            !city ||
            !contactAbroad ||
            !contactPakistani ||
            !whatsapp ||
            !profession ||
            !education ||
            !completeAddress ||
            !Array.isArray(experties) ||
            experties.length === 0 ||
            !yearsOfExperience
        ) {
            return NextResponse.json(
                { message: "All required fields must be filled" },
                { status: 400 }
            );
        }
        // @ts-ignore
        const newRequest = await NaqalKafalaRequest.create({
            userId,
            name,
            passportNumber,
            iqamaStatus,
            iqamaExpiry,
            country,
            state,
            city,
            contactAbroad,
            contactPakistani,
            whatsapp,
            profession,
            education,
            completeAddress,
            experties,
            yearsOfExperience,
        });

        return NextResponse.json(
            { success: true, message: "Naqal Kafala request submitted", data: newRequest },
            { status: 201 }
        );
    } catch (error) {
        console.error("Naqal Kafala POST error:", error);
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        // @ts-ignore
        const requests = await NaqalKafalaRequest.find({ status: 'approved' }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: requests }, { status: 200 });
    } catch (error) {
        console.error("Naqal Kafala GET error:", error);
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );
    }
}

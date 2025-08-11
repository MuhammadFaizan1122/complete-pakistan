// backend/api/admin/cvs/route.js
import connectDB from '../../../../config/mongoose';
import CV from '../../../../config/models/CV';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    try {
        await connectDB();
        const body = await req.json();
        const cv = new CV(body);
        await cv.save();
        return NextResponse.json({ success: true, data: cv });
    } catch (error) {
        console.error('POST CV Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function GET(req: any) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        if (id) {
            // @ts-ignore
            const cv = await CV.findById(id);
            if (!cv) {
                return NextResponse.json({ success: false, message: 'CV not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: cv });
        }
        // @ts-ignore
        const cvs = await CV.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: cvs });
    } catch (error) {
        console.error('GET CVs Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}


// export async function GET(req: any) {
//     try {
//         await connectDB();
//         const id = req.nextUrl.searchParams.get('id');

//         if (id) {
//             // @ts-ignore
//             const cv = await CV.findById(id).populate('Navtac', 'name code');
//             if (!cv) {
//                 return NextResponse.json({ success: false, message: 'CV not found' }, { status: 404 });
//             }
//             return NextResponse.json({ success: true, data: cv });
//         }

//         // @ts-ignore
//         const cvs = await CV.find()
//             .populate('trade', 'name code') // only get name & code
//             .sort({ createdAt: -1 });

//         return NextResponse.json({ success: true, data: cvs });
//     } catch (error) {
//         console.error('GET CVs Error:', error);
//         return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
//     }
// }

export async function PATCH(req: any) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        // @ts-ignore
        const cv = await CV.findByIdAndUpdate(id, updateData, { new: true });
        if (!cv) {
            return NextResponse.json({ success: false, message: 'CV not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: cv });
    } catch (error) {
        console.error('PATCH CV Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: any) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        // @ts-ignore
        const cv = await CV.findByIdAndDelete(id);
        if (!cv) {
            return NextResponse.json({ success: false, message: 'CV not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'CV deleted successfully' });
    } catch (error) {
        console.error('DELETE CV Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
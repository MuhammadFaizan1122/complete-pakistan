// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '../../../../config/mongoose';
// import TTC from '../../../../config/models/TTC';

// // GET: Fetch all centers or a single center by ID
// export async function GET(req: any) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');

//         if (id) {
//             // @ts-ignore
//             const center = await TTC.findById(id);
//             if (!center) {
//                 return NextResponse.json({ error: 'Center not found' }, { status: 404 });
//             }
//             return NextResponse.json({ data: center }, { status: 200 });
//         }

//         const centers = await TTC.find();
//         return NextResponse.json({ data: centers }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching TTCs:', error);
//         return NextResponse.json({ error: 'Failed to fetch centers' }, { status: 500 });
//     }
// }

// // POST: Create a new center
// export async function POST(req: any) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         // @ts-ignore
//         const center = await TTC.create(body);
//         return NextResponse.json({ data: center }, { status: 201 });
//     } catch (error) {
//         console.error('Error creating TTC:', error);
//         // @ts-ignore
//         if (error.name === 'ValidationError') {
//             // @ts-ignore
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Failed to create center' }, { status: 500 });
//     }
// }

// // PUT: Update an existing center
// export async function PUT(req: any) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         const { _id, ...updateData } = body;
//         if (!_id) {
//             return NextResponse.json({ error: 'Center ID is required' }, { status: 400 });
//         }
//         const center = await TTC.findByIdAndUpdate(_id, updateData, { new: true });
//         if (!center) {
//             return NextResponse.json({ error: 'Center not found' }, { status: 404 });
//         }
//         return NextResponse.json({ data: center }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating TTC:', error);
//         return NextResponse.json({ error: 'Failed to update center' }, { status: 500 });
//     }
// }

// // DELETE: Delete a center
// export async function DELETE(req: any) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');
//         if (!id) {
//             return NextResponse.json({ error: 'Center ID is required' }, { status: 400 });
//         }
//         const center = await TTC.findByIdAndDelete(id);
//         if (!center) {
//             return NextResponse.json({ error: 'Center not found' }, { status: 404 });
//         }
//         return NextResponse.json({ data: 'Center deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting TTC:', error);
//         return NextResponse.json({ error: 'Failed to delete center' }, { status: 500 });
//     }
// }
// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '../../../../config/mongoose';
// import OEP from '../../../../config/models/';

// // GET: Fetch all promoters or a single promoter by ID
// export async function GET(req: any) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');

//         if (id) {
//             const promoter = await OEP.findById(id);
//             if (!promoter) {
//                 return NextResponse.json({ error: 'Promoter not found' }, { status: 404 });
//             }
//             return NextResponse.json({ data: promoter }, { status: 200 });
//         }

//         const promoters = await OEP.find();
//         return NextResponse.json({ data: promoters }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching OEPs:', error);
//         return NextResponse.json({ error: 'Failed to fetch promoters' }, { status: 500 });
//     }
// }

// // POST: Create a new promoter
// export async function POST(req: any) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         const promoter = await OEP.create(body);
//         return NextResponse.json({ data: promoter }, { status: 201 });
//     } catch (error) {
//         console.error('Error creating OEP:', error);
//         // @ts-ignore
//         if (error.name === 'ValidationError') {
//             // @ts-ignore
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Failed to create promoter' }, { status: 500 });
//     }
// }

// // PUT: Update an existing promoter
// export async function PUT(req: any) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         const { _id, ...updateData } = body;
//         if (!_id) {
//             return NextResponse.json({ error: 'Promoter ID is required' }, { status: 400 });
//         }
//         const promoter = await OEP.findByIdAndUpdate(_id, updateData, { new: true });
//         if (!promoter) {
//             return NextResponse.json({ error: 'Promoter not found' }, { status: 404 });
//         }
//         return NextResponse.json({ data: promoter }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating OEP:', error);
//         return NextResponse.json({ error: 'Failed to update promoter' }, { status: 500 });
//     }
// }

// // DELETE: Delete a promoter
// export async function DELETE(req: any) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');
//         if (!id) {
//             return NextResponse.json({ error: 'Promoter ID is required' }, { status: 400 });
//         }
//         const promoter = await OEP.findByIdAndDelete(id);
//         if (!promoter) {
//             return NextResponse.json({ error: 'Promoter not found' }, { status: 404 });
//         }
//         return NextResponse.json({ data: 'Promoter deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting OEP:', error);
//         return NextResponse.json({ error: 'Failed to delete promoter' }, { status: 500 });
//     }
// }
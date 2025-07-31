import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import GamcaMedical from '../../../config/models/GamcaMedical';

// Create new entry
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, country, state, city, address, phone, whatsapp } = body;

    if (!name || !email || !country || !state || !city || !address || !phone) {
      return NextResponse.json({ message: 'All required fields must be filled' }, { status: 400 });
    }
    // @ts-ignore
    const newEntry = await GamcaMedical.create({
      name,
      email,
      country,
      state,
      city,
      address,
      phone,
      whatsapp,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('GAMCA POST error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      // @ts-ignore
      const data = await GamcaMedical.findById(id);
      if (!data) {
        return NextResponse.json({ success: false, message: 'Medical center not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    }

    // @ts-ignore
    const allData = await GamcaMedical.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: allData }, { status: 200 });

  } catch (error) {
    console.error('GAMCA GET error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get('id');

    const body = await req.json();
    // @ts-ignore
    const updated = await GamcaMedical.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get('id');

    // @ts-ignore
    const deleted = await GamcaMedical.findByIdAndDelete(userId);

    if (!deleted) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

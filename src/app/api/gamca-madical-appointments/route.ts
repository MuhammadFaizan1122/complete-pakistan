import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import GamcaMedicalAppointments from '../../../config/models/GamcaMedicalAppointments';

// Create new entry
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      email,
      country,
      state,
      city,
      address,
      phone,
      whatsapp,
      workingDays,
      workingHours,
      googleMapLink,
      facebookPageLink,
      bannerImageUrl,
    } = body;

    // Validate required fields
    if (!name || !email || !country || !state || !city || !address || !phone || !workingDays || !workingHours) {
      return NextResponse.json({ message: 'All required fields must be filled' }, { status: 400 });
    }
    // @ts-ignore
    const newEntry = await GamcaMedicalAppointments.create({
      name,
      email,
      country,
      state,
      city,
      address,
      phone,
      whatsapp,
      workingDays,
      workingHours,
      googleMapLink,
      facebookPageLink,
      bannerImageUrl,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('GAMCA POST error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Get entries
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      // @ts-ignore
      const data = await GamcaMedicalAppointments.findById(id);
      if (!data) {
        return NextResponse.json({ success: false, message: 'Medical center not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    }

// @ts-ignore
    const allData = await GamcaMedicalAppointments.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: allData }, { status: 200 });

  } catch (error) {
    console.error('GAMCA GET error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Update entry
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get('id');

    const body = await req.json();
    const {
      name,
      email,
      country,
      state,
      city,
      address,
      phone,
      whatsapp,
      workingDays,
      workingHours,
      googleMapLink,
      facebookPageLink,
      bannerImageUrl
    } = body;

    // Validate required fields if they are provided
    if (
      (name !== undefined && !name) ||
      (email !== undefined && !email) ||
      (country !== undefined && !country) ||
      (state !== undefined && !state) ||
      (city !== undefined && !city) ||
      (address !== undefined && !address) ||
      (phone !== undefined && !phone) ||
      (workingDays !== undefined && !workingDays) ||
      (workingHours !== undefined && !workingHours)
    ) {
      return NextResponse.json({ message: 'Required fields cannot be empty' }, { status: 400 });
    }

    // @ts-ignore
    const updated = await GamcaMedicalAppointments.findByIdAndUpdate(
      id,
      {
        name,
        email,
        country,
        state,
        city,
        address,
        phone,
        whatsapp,
        workingDays,
        workingHours,
        googleMapLink,
        facebookPageLink,
        bannerImageUrl
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Delete entry
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get('id');

    // @ts-ignore
    const deleted = await GamcaMedicalAppointments.findByIdAndDelete(userId);

    if (!deleted) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
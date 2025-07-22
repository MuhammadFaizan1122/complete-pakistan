import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import MedicalCase from '../../../config/models/MedicalCase';

// Create new candidate medical case
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      designation,
      medicalStatus,
      passport,
      phone,
      medicalDate,
      email,
      fromCity,
      travelCountry,
      visaAppliedStatus,
      visaNumber,
      expiryDate,
      issueDate,
      country,
      candidateImageUrl,
      medicalReportUrl,
    } = body;

    // Validate required fields
    if (!name || !designation || !medicalStatus || !passport || !phone || !medicalDate || !email || !fromCity || !travelCountry || !visaAppliedStatus) {
      return NextResponse.json({ message: 'All required fields must be filled' }, { status: 400 });
    }
    // @ts-ignore
    const newEntry = await MedicalCase.create({
      name,
      designation,
      medicalStatus,
      passport,
      phone,
      medicalDate,
      email,
      fromCity,
      travelCountry,
      visaAppliedStatus,
      visaNumber,
      expiryDate,
      issueDate,
      country,
      candidateImageUrl,
      medicalReportUrl,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully', data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('Candidate Medical Case POST error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Get candidate medical cases
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      // @ts-ignore
      const data = await MedicalCase.findById(id);
      if (!data) {
        return NextResponse.json({ success: false, message: 'Candidate medical case not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data, status: 200 });
    }

    // @ts-ignore
    const allData = await MedicalCase.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: allData, status: 200 });

  } catch (error) {
    console.error('Candidate Medical Case GET error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Update candidate medical case
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get('id');

    const body = await req.json();
    const {
      name,
      designation,
      medicalStatus,
      passport,
      phone,
      medicalDate,
      email,
      fromCity,
      travelCountry,
      visaAppliedStatus,
      visaNumber,
      expiryDate,
      issueDate,
      country,
      candidateImageUrl,
      medicalReportUrl,
    } = body;

    // Validate required fields if they are provided
    if (
      (name !== undefined && !name) ||
      (designation !== undefined && !designation) ||
      (medicalStatus !== undefined && !medicalStatus) ||
      (passport !== undefined && !passport) ||
      (phone !== undefined && !phone) ||
      (medicalDate !== undefined && !medicalDate) ||
      (email !== undefined && !email) ||
      (fromCity !== undefined && !fromCity) ||
      (travelCountry !== undefined && !travelCountry) ||
      (visaAppliedStatus !== undefined && !visaAppliedStatus)
    ) {
      return NextResponse.json({ message: 'Required fields cannot be empty' }, { status: 400 });
    }

    // @ts-ignore
    const updated = await MedicalCase.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        medicalStatus,
        passport,
        phone,
        medicalDate,
        email,
        fromCity,
        travelCountry,
        visaAppliedStatus,
        visaNumber,
        expiryDate,
        issueDate,
        country,
        candidateImageUrl,
        medicalReportUrl,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Candidate medical case not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Candidate Medical Case PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// Delete candidate medical case
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get('id');

    // @ts-ignore
    const deleted = await MedicalCase.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Candidate medical case not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Candidate Medical Case DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
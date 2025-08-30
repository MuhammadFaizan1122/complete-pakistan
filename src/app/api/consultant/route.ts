import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/mongoose';
import Consultant from '../../../config/models/Consultant';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const locationCountry = searchParams.get('locationCountry');
    const search = searchParams.get('search');

    const filter = {};
    // @ts-ignore
    if (status) filter.registrationStatus = status;
    // @ts-ignore
    if (locationCountry) filter.locationCountry = locationCountry;
    // @ts-ignore
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    // @ts-ignore
    const consultants = await Consultant.find({
      ...filter,
      registrationStatus: 'approved'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const totalCount = await Consultant.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: consultants,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching immigration consultants:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch immigration consultants',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const requiredFields = [
      'fullName', 'title', 'locationCity', 'locationCountry', 'experienceYears',
      'phone', 'email', 'officeAddress', 'successRate', 'clientsHelped', 'about',
      'specializations', 'services', 'languages'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        missingFields
      }, { status: 400 });
    }

    // Filter out empty or invalid data
    body.portfolioItems = body.portfolioItems.filter(item => item.description && item.title);
    body.videoLinks = body.videoLinks.filter(link => link.trim() !== '');
    body.specializations = body.specializations.filter(spec => spec.trim() !== '');
    body.services = body.services.filter(service => service.trim() !== '');
    body.languages = body.languages.filter(lang => lang.trim() !== '');

    const newConsultant = new Consultant(body);
    const savedConsultant = await newConsultant.save();

    return NextResponse.json({
      success: true,
      message: 'Immigration consultant registration submitted successfully',
      data: savedConsultant
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating immigration consultant:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));

      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        validationErrors
      }, { status: 400 });
    }

    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Duplicate entry found',
        details: 'An immigration consultant with similar details already exists'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create immigration consultant registration',
      details: error.message
    }, { status: 500 });
  }
}
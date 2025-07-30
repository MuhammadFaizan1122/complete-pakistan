import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import CvProfile from '../../../../config/models/CvProfile';
import mongoose from 'mongoose';

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }
        // @ts-ignore
        const cv = await CvProfile.find({ userId });

        if (!cv) {
            return NextResponse.json({ message: 'CV not found' }, { status: 404 });
        }

        return NextResponse.json({ data: cv }, { status: 200 });
    } catch (error) {
        console.error('CV Fetch Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            userId,
            photo,
            name,
            fatherName,
            cnic,
            drivingLicence,
            dob,
            madicalDate,
            livingcity,
            village,
            gender,
            passport,
            passportIssue,
            passportExpiry,
            languages,
            countriesVisited,
            email,
            phone,
            whatsapp,
            otherNumber,
            backupNumber,
            backupEmail,
            country,
            state,
            city,
            localAddress,
            jobTitle,
            industry,
            category,
            subcategory,
            jobDetails,
            education,
            experience,
            skills,
            attachments,
            passportCopy,
            technicalEducation,
            pakistaniDrivingLicense,
            gulfDrivingLicense,
            licenseType,
            type
        } = body;

        if (!userId) {
            return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
        }

        // Validate array fields
        const parsedEducation = Array.isArray(education) ? education : [];
        const parsedExperience = Array.isArray(experience) ? experience : [];
        const parsedSkills = Array.isArray(skills) ? skills : [];
        const parsedLanguages = Array.isArray(languages) ? languages : [];
        const parsedCountriesVisited = Array.isArray(countriesVisited) ? countriesVisited : [];
        const parsedAttachments = Array.isArray(attachments) ? attachments : [];
        // @ts-ignore
        const newCv = await CvProfile.create({
            userId,
            photo,
            name,
            fatherName,
            cnic,
            drivingLicence,
            dob: dob ? new Date(dob) : undefined,
            madicalDate,
            livingcity,
            village,
            gender,
            passport,
            passportIssue: passportIssue ? new Date(passportIssue) : undefined,
            passportExpiry: passportExpiry ? new Date(passportExpiry) : undefined,
            languages: parsedLanguages,
            countriesVisited: parsedCountriesVisited,
            email,
            phone,
            whatsapp,
            otherNumber,
            backupNumber,
            backupEmail,
            country,
            state,
            city,
            localAddress,
            jobTitle,
            industry,
            category,
            subcategory,
            jobDetails,
            education: parsedEducation,
            experience: parsedExperience,
            skills: parsedSkills,
            attachments: parsedAttachments,
            passportCopy: passportCopy ? passportCopy : '',
            technicalEducation: technicalEducation ? technicalEducation : '',
            pakistaniDrivingLicense: pakistaniDrivingLicense ? pakistaniDrivingLicense : '',
            gulfDrivingLicense: gulfDrivingLicense ? gulfDrivingLicense : '',
            licenseType: licenseType ? licenseType : '',
            type
        });

        return NextResponse.json({ message: 'CV created successfully', data: newCv }, { status: 201 });
    } catch (error) {
        console.error('CV Create Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
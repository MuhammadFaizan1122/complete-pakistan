import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import CvProfile from '../../../../config/models/CvProfile';

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
            dob,
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
            dob: dob ? new Date(dob) : undefined,
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
        });

        return NextResponse.json({ message: 'CV created successfully', data: newCv }, { status: 201 });
    } catch (error) {
        console.error('CV Create Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
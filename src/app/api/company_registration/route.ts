import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../../config/mongoose";
import CompanyAccount from '../../../config/models/CompanyAccount';
import { companySignupSchema } from '../../../utils/validation';
import { saveFile } from '../../../utils/fileUploads';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        const data: any = {
            agencyName: formData.get('agencyName'),
            agencyEmail: formData.get('agencyEmail'),
            agencyLogo: formData.get('agencyLogo'),
            ntn: formData.get('ntn'),
            supportingDocument: formData.get('supportingDocument'),
            contactPersonName: formData.get('contactPersonName'),
            contactPersonPhone: formData.get('contactPersonPhone'),
            contactPersonIdFront: formData.get('contactPersonIdFront'),
            contactPersonIdBack: formData.get('contactPersonIdBack'),
            agencyCoverPhoto: formData.get('agencyCoverPhoto'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        };

        data.agencyLogo = [data.agencyLogo];
        data.supportingDocument = [data.supportingDocument];
        data.contactPersonIdFront = [data.contactPersonIdFront];
        data.contactPersonIdBack = [data.contactPersonIdBack];
        data.agencyCoverPhoto = [data.agencyCoverPhoto];

        await companySignupSchema.validate(data, { abortEarly: false });

        data.agencyLogo = await saveFile(data.agencyLogo[0]);
        data.supportingDocument = await saveFile(data.supportingDocument[0]);
        data.contactPersonIdFront = await saveFile(data.contactPersonIdFront[0]);
        data.contactPersonIdBack = await saveFile(data.contactPersonIdBack[0]);
        data.agencyCoverPhoto = await saveFile(data.agencyCoverPhoto[0]);

        data.password = await bcrypt.hash(data.password, 10);

        delete data.confirmPassword;

        // @ts-ignore
        const account = await CompanyAccount.create({ ...data, status: 'pending' });

        return NextResponse.json(
            { message: 'Account submitted for review', account },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Company Registration Error:", error);

        if (error.name === 'ValidationError') {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }

        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
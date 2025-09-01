import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string(),
    fullName: yup.string(),
    email: yup.string().email("Invalid email").required("Email is required"),
    toEmail: yup.string().email("Invalid recipient email").required("Recipient email is required"),
    phone: yup
        .string()
        .matches(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number")
        .optional(),
    location: yup.string().optional(),
    service: yup.string().optional(),
    message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
    preferredDate: yup.string().optional(),
}).test('name-or-fullname', 'Name or Full Name is required', function (value) {
    const { name, fullName } = value;
    return !!(name || fullName);
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await schema.validate(body, { abortEarly: false });

        // configure mailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const nameValue = body.fullName || body.name || 'N/A';

        await transporter.sendMail({
            from: `"Complete Pakistan" <${process.env.SMTP_USER}>`,
            to: body.toEmail,
            subject: "New client want to connect from Complete Pakistan",
            html: `
            <h2>New Inquiry</h2>
            <p><b>Name:</b> ${nameValue}</p>
            <p><b>Email:</b> ${body.email}</p>
            ${body.phone ? `<p><b>Phone:</b> ${body.phone}</p>` : ''}
            ${body.location ? `<p><b>Location:</b> ${body.location}</p>` : ''}
            ${body.service ? `<p><b>Service:</b> ${body.service}</p>` : ''}
            ${body.preferredDate ? `<p><b>Preferred Date:</b> ${body.preferredDate}</p>` : ''}
            <p><b>Message:</b></p>
            <p>${body.message}</p>`,
        });

        return NextResponse.json({ success: true, message: "Inquiry sent successfully!" });
    } catch (error: any) {
        console.error("Error sending inquiry:", error);
        let errorMessage = "Failed to send inquiry";
        if (error instanceof yup.ValidationError) {
            errorMessage = error.errors.join(", ");
        } else if (error.message) {
            errorMessage = error.message;
        }
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 400 }
        );
    }
}
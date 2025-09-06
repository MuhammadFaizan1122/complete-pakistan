import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    toEmail: yup.string().email("Invalid recipient email").required("Recipient email is required"),
    message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await schema.validate(body, { abortEarly: false });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        await transporter.sendMail({
            from: `"Complete Pakistan" <${process.env.SMTP_USER}>`,
            to: body.toEmail,
            subject: "New Contact Form Submission - Complete Pakistan",
            html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Message:</b></p>
        <p>${body.message}</p>
      `,
        });

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error: any) {
        console.error("Error sending contact message:", error);
        let errorMessage = "Failed to send message";
        if (error instanceof yup.ValidationError) {
            errorMessage = error.errors.join(", ");
        } else if (error.message) {
            errorMessage = error.message;
        }
        return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }
}

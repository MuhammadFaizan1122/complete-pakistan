import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  toEmail: yup.string().email().required(),
  phone: yup.string().required(),
  location: yup.string().required(),
  service: yup.string().required(),
  message: yup.string().required(),
  preferredDate: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await schema.validate(body, { abortEarly: false });

    // configure mailer
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
      subject: "New Consultation Request",
      html: `
        <h2>New Consultation Request</h2>
        <p><b>Name:</b> ${body.fullName}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Location:</b> ${body.location}</p>
        <p><b>Service:</b> ${body.service}</p>
        <p><b>Preferred Date:</b> ${body.preferredDate}</p>
        <p><b>Message:</b></p>
        <p>${body.message}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Consultation request sent successfully!" });
  } catch (error: any) {
    console.error("Error sending consultation request:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send consultation request" },
      { status: 500 }
    );
  }
}

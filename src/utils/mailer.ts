// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
//   port: Number(process.env.SMTP_PORT) || 587,
//   secure: false, // true for 465, false for 587
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export async function sendOTPEmail(to: string, otp: string) {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Your App" <${process.env.SMTP_USER}>`,
//       to,
//       subject: "Your OTP Code",
//       html: `
//         <h2>Verify Your Email</h2>
//         <p>Your OTP code is:</p>
//         <h3 style="color:#2d6cdf">${otp}</h3>
//         <p>This code will expire in 5 minutes.</p>
//       `,
//     });

//     console.log("Message sent: %s", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return false;
//   }
// }

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST, 
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// export async function sendOTPEmail(email, otp, userName) {
//     try {
//         const mailOptions = {
//             from: `"Complete Pakistan" <${process.env.SMTP_USER}>`,
//             to: email,
//             subject: "Your OTP Code",
//             html: `
//         <h2>Hello ${userName},</h2>
//         <p>Your OTP code is:</p>
//         <h3 style="color:#4F46E5">${otp}</h3>
//         <p>This code will expire in <b>5 minutes</b>.</p>
//         <p>If you didn’t request this, please ignore.</p>
//       `,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         return { success: true, messageId: info.messageId };
//     } catch (err) {
//         console.error("Email send error:", err);
//         return { success: false, error: err };
//     }
// }


// // import emailjs from 'emailjs-com';

// // export const sendOTPEmail = async (email, otp, userName) => {
// //     try {
// //         const payload = {
// //             to_email: email,
// //             to_name: userName,
// //             otp_code: otp,
// //             from_name: 'Complete Pakistan',
// //             reply_to: 'noreply@completepakistan.com',
// //             subject: 'abc',
// //             to_message: 'abc',
// //             user_email: 'muh.faizaan@gmail.com'
// //         };
// //         console.log('payload', payload)
// //         const response = await emailjs.send(
// //             process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
// //             process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
// //             payload,
// //             process.env.NEXT_PUBLIC_EMAILJS_USER_ID
// //         );

// //         return { success: true, data: response };
// //     } catch (error) {
// //         console.error('Email sending error:', error);
// //         return { success: false, error };
// //     }
// // };

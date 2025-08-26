// import emailjs from 'emailjs-com';

// // Initialize EmailJS
// emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);

// export const sendOTPEmail = async (email, otp, userName) => {
//   try {
//     const templateParams = {
//       to_email: email,
//       to_name: userName,
//       otp_code: otp,
//       from_name: 'Complete Pakistan',
//       reply_to: 'noreply@completepakistan.com'
//     };
// console.log('templateParams', templateParams)
//     const response = await emailjs.send(
//       process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//       process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
//       templateParams,
//       '_a5GkTDB1wp3eQSbi'
//     );

//     return { success: true, data: response };
//   } catch (error) {
//     console.error('Email sending error:', error);
//     return { success: false, error };
//   }
// };

// import emailjs from 'emailjs-com';
// import { storeOTP } from '../utils/otpStore';

// export const sendOTPEmail = async (email, otp, userName) => {
//     try {
//         const payload = {
//             to_email: email,
//             to_name: userName,
//             otp_code: otp,
//             from_name: 'Complete Pakistan',
//             reply_to: 'noreply@completepakistan.com',
//             subject: 'abc',
//             to_message: 'abc',
//             user_email: 'muh.faizaan@gmail.com'
//         };
//         console.log('payload', payload);
//         const response = await emailjs.send(
//             'service_sinbzgs',
//             'template_jgm4vo8',
//             payload,
//             '_a5GkTDB1wp3eQSbi',
//         );
//         storeOTP({ email, otp })
//         console.log('response', response)
//         return { success: true, data: response };
//     } catch (error) {
//         console.error('Email sending error:', error);
//         return { success: false, error };
//     }
// };


// @ts-nocheck
import emailjs from 'emailjs-com';

export const sendOTPEmail = async (email, otp, userName) => {
    try {
        const payload = {
            to_email: email,
            to_name: userName,
            otp_code: otp,
            from_name: 'Complete Pakistan',
            reply_to: 'noreply@completepakistan.com',
            subject: 'abc',
            to_message: 'abc',
            user_email: 'muh.faizaan@gmail.com'
        };

        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            payload,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        );

        return { success: true, data: response };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error };
    }
};

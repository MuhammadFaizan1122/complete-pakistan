// import { NextRequest, NextResponse } from "next/server";
// import Otp from "../../../../config/models/Otp";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, otp } = await req.json();
//     // const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiryTime = Date.now() + 600 * 1000; // 1 minute

//     // @ts-ignore
//     await Otp.findOneAndUpdate(
//       { email },
//       { otp, expiryTime },
//       { upsert: true, new: true }
//     );

//     console.log("📩 OTP generated:", otp);

//     // TODO: Send email here

//     return NextResponse.json({ message: "OTP sent" });
//   } catch (err) {
//     console.error("🔥 Error in send-otp:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../config/mongoose";
import Otp from "../../../../config/models/Otp";
import { generateOTP } from "../../../../utils/otp";
// import { sendOTPEmail } from "../../../../services/emailService";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, name } = await req.json();

    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);
    // @ts-ignore
    await Otp.findOneAndUpdate(
      { email },
      { otpHash, expiryTime },
      { upsert: true, new: true }
    );

    // const emailResult = await sendOTPEmail(email, otp, name);
    // if (!emailResult.success) {
    //   return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    // }

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Otp from "../../../../config/models/Otp";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 600 * 1000; // 1 minute

    // @ts-ignore
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiryTime },
      { upsert: true, new: true }
    );

    console.log("📩 OTP generated:", otp);

    // TODO: Send email here

    return NextResponse.json({ message: "OTP sent" });
  } catch (err) {
    console.error("🔥 Error in send-otp:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

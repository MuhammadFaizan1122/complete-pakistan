// // models/Otp.ts
// import mongoose from "mongoose";

// const OtpSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   otp: { type: String, required: true },
//   expiryTime: { type: Number, required: true },
// }, { timestamps: true });

// export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  otpHash: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  agencyData: { type: Object },
}, { timestamps: true });

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

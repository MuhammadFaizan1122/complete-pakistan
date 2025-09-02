import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  otpHash: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  agencyData: { type: Object },
}, { timestamps: true });

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

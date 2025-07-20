import mongoose from 'mongoose';

const gamcaMedicalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.models.GamcaMedical || mongoose.model('GamcaMedical', gamcaMedicalSchema);

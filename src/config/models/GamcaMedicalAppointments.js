import mongoose from 'mongoose';

const gamcaMedicalAppointmentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    workingDays: { type: String, required: true },
    workingHours: { type: String, required: true },
    googleMapLink: { type: String },
    facebookPageLink: { type: String },
    bannerImageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.GamcaMedicalAppointments || mongoose.model('GamcaMedicalAppointments', gamcaMedicalAppointmentsSchema);
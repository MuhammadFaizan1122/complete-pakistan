import mongoose from 'mongoose';

const MedicalCaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    medicalStatus: { 
      type: String, 
      required: true, 
      enum: ['unfit', 'fit', 'pending'],
      default: 'pending'
    },
    passport: { type: String, required: true },
    phone: { type: String, required: true },
    medicalDate: { type: Date, required: true },
    email: { type: String, required: true },
    fromCity: { type: String, required: true },
    travelCountry: { type: String, required: true },
    visaAppliedStatus: { 
      type: String, 
      required: true, 
      enum: ['applied', 'not applied', 'issued'],
      default: 'not applied'
    },
    visaNumber: { type: String, required: false },
    expiryDate: { type: Date, required: false },
    issueDate: { type: Date, required: false },
    country: { type: String, required: false },
    candidateImageUrl: { type: String, required: false },
    medicalReportUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.MedicalCase || mongoose.model('MedicalCase', MedicalCaseSchema);
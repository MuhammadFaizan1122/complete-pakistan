import mongoose from 'mongoose';

const CvProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    cnic: { type: String, required: true },
    dob: { type: Date, required: true },
    livingcity: { type: String, required: true },
    village: { type: String, required: true },
    gender: { type: String, required: true },
    passport: { type: String, required: true },
    passportIssue: { type: Date, required: true },
    passportExpiry: { type: Date, required: true },
    languages: { type: [String], required: true },
    countriesVisited: { type: [String], default: [] },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    otherNumber: { type: String },
    backupNumber: { type: String },
    backupEmail: { type: String },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    localAddress: { type: String, required: true },
    jobTitle: { type: String, required: true },
    industry: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    jobDetails: { type: String, required: true },
    education: [],
    experience: [],
    skills: { type: [String], required: true },
    attachments: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.CvProfile || mongoose.model('CvProfile', CvProfileSchema);
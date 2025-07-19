import mongoose from 'mongoose';

const CvProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: String, required: false },
    passportCopy: { type: String , required: false},
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    cnic: { type: String, required: true },
    drivingLicence: { type: Number },
    dob: { type: Date, required: true },
    madicalDate: { type: Date },
    livingcity: { type: String },
    village: { type: String },
    gender: { type: String }, // ✅ made optional
    passport: { type: String, required: true },
    passportIssue: { type: Date }, // ✅ made optional
    passportExpiry: { type: Date, required: true },
    languages: { type: [String], required: true },
    countriesVisited: { type: [String], default: [] }, // ✅ already optional
    email: { type: String }, // ✅ made optional
    phone: { type: String, required: true },
    whatsapp: { type: String },
    otherNumber: { type: String }, // ✅ made optional
    backupNumber: { type: String },
    backupEmail: { type: String }, // ✅ made optional
    country: { type: String }, // ✅ made optional
    state: { type: String }, // ✅ made optional
    city: { type: String, required: true },
    localAddress: { type: String }, // ✅ made optional
    jobTitle: { type: String, required: true },
    industry: { type: String, required: true },
    category: { type: String }, // ✅ made optional
    subcategory: { type: String }, // ✅ made optional
    jobDetails: { type: String }, // ✅ made optional
    technicalEducation: { type: String },
    pakistaniDrivingLicense: { type: String },
    gulfDrivingLicense: { type: String },
    licenseType: { type: String },
    education: [], // assumed optional
    experience: [], // ✅ already optional
    skills: { type: [String] }, // ✅ made optional
    attachments: { type: [String], default: [] }, // ✅ already optional
    type: { type: String, enum: ['others', 'default', 'summary'], default: 'default' },
  },
  { timestamps: true }
);

export default mongoose.models.CvProfile || mongoose.model('CvProfile', CvProfileSchema);

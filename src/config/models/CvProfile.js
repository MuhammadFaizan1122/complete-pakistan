import mongoose from 'mongoose';

const CvProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    dob: Date,
    email: String,
    phone: String,
    passport: String,
    madicalDate: Date,
    country: String,
    city: String,
    state: String,
    address: String,
    job: String,
    industry: String,
    category: String,
    subcategory: String,
    jobDetail: String,
    portfolio: String,
    education: [Object],
    experience: [Object],
    skills: [String],
    attachments: [String],
    cv: String,
  },
  { timestamps: true }
);

export default mongoose.models.CvProfile || mongoose.model('CvProfile', CvProfileSchema);

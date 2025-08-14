import mongoose from 'mongoose';

const VTPSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, default: 0 },
  userId: { type: String },
  workingWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }],
  pictures: [{ type: String }],
  cnic: { type: String, required: true, select: false, match: /^\d{5}-\d{7}-\d$/ },
  address: {
    country: { type: String, required: true, minlength: 2 },
    state: { type: String, minlength: 2 },
    city: { type: String, required: true, minlength: 2 },
    town: { type: String, minlength: 2 },
    fullAddress: { type: String, required: true, minlength: 5 }
  },
  homeTownAddress: { type: String, required: true, minlength: 5 },
  businessAddress: { type: String, required: true, minlength: 5 },
  bankAccount: {
    iban: { type: String, required: true, match: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/ },
  },
  contactNumber: { type: String, required: true, match: /^\+?\d{10,12}$/ },
  contactNumberVerified: { type: Boolean, default: false },
  whatsappNo: { type: String, required: true, match: /^\+?\d{10,12}$/ },
  whatsappVerified: { type: Boolean, default: false },
  website: { type: String, match: /^https?:\/\/.+/ },
  socialMedia: {
    facebook: { type: String, match: /^https?:\/\/(www\.)?facebook\.com\/.+/ },
    tiktok: { type: String, match: /^https?:\/\/(www\.)?tiktok\.com\/.+/ },
    youtube: { type: String, match: /^https?:\/\/(www\.)?youtube\.com\/.+/ },
    twitter: { type: String, match: /^https?:\/\/(www\.)?x\.com\/.+/ },
    instagram: { type: String, match: /^https?:\/\/(www\.)?instagram\.com\/.+/ }
  },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  emailVerified: { type: Boolean, default: false },
  lastEmailVerified: { type: Date, default: null },
  readyMedicalEntry: { type: Boolean, default: false },
  ownCVs: [{ type: String }],
  cvsMaking: { type: Boolean, default: false },
  jobPosting: { type: Boolean, default: false },
  permissionNo: { type: String, required: true, match: /^\d{7}$/ },
}, { timestamps: true, toJSON: { select: '-cnic' } });

export default mongoose.models.VTP || mongoose.model('VTP', VTPSchema);
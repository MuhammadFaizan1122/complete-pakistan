import mongoose from 'mongoose';

const SocialLinksSchema = new mongoose.Schema({
  twitter: { type: String },
  instagram: { type: String },
  youtube: { type: String }
});

const PortfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  successRate: { type: String },
  year: { type: String }
});

const ConsultantSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2 },
  title: { type: String, required: true, minlength: 2 },
  locationCity: { type: String, required: true },
  locationCountry: { type: String, required: true },
  experienceYears: { type: Number, required: true, min: 0 },
  phone: {
    type: String,
    required: true,
    match: [/^\+92[0-9]{10}$/, 'Invalid phone number format. Use +923001234567']
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  officeAddress: { type: String, required: true, minlength: 10 },

  successRate: { type: Number, required: true, min: 0, max: 100 },
  clientsHelped: { type: Number, required: true, min: 0 },

  about: { type: String, required: true, minlength: 10 },

  specializations: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 10;
      },
      message: 'Specializations must be between 1 and 10 items'
    }
  },
  services: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 10;
      },
      message: 'Services must be between 1 and 10 items'
    }
  },
  languages: { type: [String], required: true, validate: [v => v.length >= 1, 'At least one language is required'] },
  portfolioItems: { type: [PortfolioItemSchema], default: [] },
  videoLinks: { type: [String], default: [] },

  socialLinks: { type: SocialLinksSchema, default: {} },
  profilePhoto: { type: String },
  portfolioPdf: { type: String },
  gallery: { type: Array },
  notices: { type: Array },
  successStories: { type: Array },

  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  rating: { type: Number, default: 0, min: 0, max: 5 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ConsultantSchema.index({ fullName: 'text', title: 'text' });
ConsultantSchema.index({ locationCountry: 1 });
ConsultantSchema.index({ registrationStatus: 1 });
ConsultantSchema.index({ createdAt: -1 });

ConsultantSchema.virtual('fullContactInfo').get(function () {
  return {
    name: this.fullName,
    title: this.title,
    contact: {
      phone: this.phone,
      email: this.email
    }
  };
});

export default mongoose.models.Consultant || mongoose.model('Consultant', ConsultantSchema);
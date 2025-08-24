import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String }
});

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  contact: { type: String, required: true },
  whatsapp: { type: String },
  ptcl: { type: String }
});

const SocialLinksSchema = new mongoose.Schema({
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  youtube: { type: String }
});

const TicketingAgentSchema = new mongoose.Schema({
  // Business Details
  businessType: {
    type: String,
    required: true,
    enum: ['company', 'individual']
  },
  businessName: { type: String, required: true, minlength: 2 },
  proprietorName: { type: String, required: true, minlength: 2 },
  businessClassification: {
    type: String,
    required: true,
    enum: ['corporate', 'individual']
  },
  yearEstablished: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  iataAccreditation: {
    type: String,
    required: true,
    enum: ['full', 'associate', 'non-iata']
  },
  serviceSpecialization: {
    type: String,
    required: true,
    enum: ['full-service', 'domestic', 'corporate', 'leisure']
  },
  dealTypes: {
    type: String,
    required: true,
    enum: ['both', 'international', 'domestic']
  },

  // Contact Details
  primaryMobile: {
    type: String,
    required: true,
      match: [/^\+92[0-9]{10}$/, 'Invalid phone number format. Use +923001234567']
  },
  whatsappBusiness: {
    type: String,
    required: true,
    match: [/^\+92[0-9]{10}$/, 'Invalid WhatsApp number format. Use +923001234567']
  },
  officeDirectLine: {
    type: String,
    required: true
  },
  businessEmail: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  websiteUrl: {
    type: String,
    match: /^https?:\/\/.+/
  },

  // Office Details
  officeAddress: { type: String, required: true, minlength: 10 },
  officeTimings: { type: String, required: true },
  workingDays: { type: String, required: true },
  googleMapLink: {
    type: String,
    // match: /^https:\/\/maps\.google\.com\/.+/
  },

  // Services and Airlines
  services: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 6;
      },
      message: 'Services must be between 1 and 6 items'
    }
  },
  airlines: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 10;
      },
      message: 'Airlines must be between 1 and 10 items'
    }
  },

  // Nested Schemas
  branches: { type: [BranchSchema], default: [] },
  staff: { type: [StaffSchema], default: [] },
  socialLinks: { type: SocialLinksSchema, default: {} },

  // File Uploads (store file paths/URLs)
  corporateLogo: { type: String },
  businessLicense: { type: String },

  // Registration Status
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Additional Fields
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
TicketingAgentSchema.index({ businessName: 'text', proprietorName: 'text' });
TicketingAgentSchema.index({ businessClassification: 1 });
TicketingAgentSchema.index({ iataAccreditation: 1 });
TicketingAgentSchema.index({ dealTypes: 1 });
TicketingAgentSchema.index({ registrationStatus: 1 });
TicketingAgentSchema.index({ createdAt: -1 });

// Virtual for full address
TicketingAgentSchema.virtual('fullContactInfo').get(function() {
  return {
    name: this.businessName,
    proprietor: this.proprietorName,
    contact: {
      mobile: this.primaryMobile,
      whatsapp: this.whatsappBusiness,
      email: this.businessEmail
    }
  };
});

export default mongoose.models.TicketingAgent || mongoose.model('TicketingAgent', TicketingAgentSchema);
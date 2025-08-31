import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  packageTitle: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "7 days", "10 days"
  numberOfPeople: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  currency: { type: String, required: true, default: 'PKR' },
  price: { type: Number, required: true, min: 0 },
  type: {
    type: String,
    required: true,
    enum: ['umrah', 'hajj']
  },
  accommodations: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: 'At least one accommodation facility is required'
    }
  },
  whatsIncluded: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: 'At least one included item is required'
    }
  }
}, { timestamps: true });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  category: {
    type: String,
    enum: ['office', 'umrah', 'hajj', 'general'],
    default: 'general'
  }
}, { timestamps: true });

const SocialLinksSchema = new mongoose.Schema({
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  youtube: { type: String }
});

const TravelAgentSchema = new mongoose.Schema({
  // Basic Agency Details (from registration form)
  agencyName: { type: String, required: true, minlength: 2 },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  establishmentYear: {
    type: Number,
    required: true,
    min: 1990,
    max: new Date().getFullYear()
  },
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
  address: { type: String, required: true, minlength: 10 },
  website: {
    type: String,
    match: /^https?:\/\/.+/
  },
  logo: { type: String, required: true }, // URL to uploaded logo

  // Services and Languages (from registration form)
  services: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: 'At least one service is required'
    }
  },
  languages: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: 'At least one language is required'
    }
  },

  // Social Links (from registration form)
  socialLinks: { type: SocialLinksSchema, default: {} },

  // Additional fields (added later by admin/agency)
  umrahHajjPackages: {
    type: [PackageSchema],
    default: []
  },
  faq: {
    type: [FAQSchema],
    default: []
  },
  gallery: {
    type: [GallerySchema],
    default: []
  },

  // Registration Status
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Additional Fields
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
TravelAgentSchema.index({ agencyName: 'text' });
TravelAgentSchema.index({ country: 1, state: 1, city: 1 });
TravelAgentSchema.index({ services: 1 });
TravelAgentSchema.index({ registrationStatus: 1 });
TravelAgentSchema.index({ createdAt: -1 });
TravelAgentSchema.index({ rating: -1 });
TravelAgentSchema.index({ 'umrahHajjPackages.type': 1 });

// Virtual for location string
TravelAgentSchema.virtual('fullLocation').get(function () {
  return `${this.city}, ${this.state}, ${this.country}`;
});

// Virtual for package count
TravelAgentSchema.virtual('packageCount').get(function () {
  return {
    total: this.umrahHajjPackages.length,
    umrah: this.umrahHajjPackages.filter(p => p.type === 'umrah').length,
    hajj: this.umrahHajjPackages.filter(p => p.type === 'hajj').length
  };
});

// Method to add package
TravelAgentSchema.methods.addPackage = function (packageData) {
  this.umrahHajjPackages.push(packageData);
  return this.save();
};

// Method to update package
TravelAgentSchema.methods.updatePackage = function (packageId, updateData) {
  const packageIndex = this.umrahHajjPackages.findIndex(p => p._id.toString() === packageId);
  if (packageIndex !== -1) {
    Object.assign(this.umrahHajjPackages[packageIndex], updateData);
    return this.save();
  }
  throw new Error('Package not found');
};

// Method to remove package
TravelAgentSchema.methods.removePackage = function (packageId) {
  this.umrahHajjPackages = this.umrahHajjPackages.filter(p => p._id.toString() !== packageId);
  return this.save();
};

// Method to add FAQ
TravelAgentSchema.methods.addFAQ = function (question, answer) {
  this.faq.push({ question, answer });
  return this.save();
};

// Method to add gallery image
TravelAgentSchema.methods.addGalleryImage = function (imageUrl, caption, category) {
  this.gallery.push({ imageUrl, caption, category });
  return this.save();
};

export default mongoose.models.TravelAgent || mongoose.model('TravelAgent', TravelAgentSchema);
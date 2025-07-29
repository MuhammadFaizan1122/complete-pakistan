import mongoose from 'mongoose';

const CompanyAccountSchema = new mongoose.Schema({
    agencyName: { type: String, required: true, minlength: 2 },
    agencyEmail: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    agencyLogo: { type: String, required: true },
    type: { type: String, enum: ['OEP', 'TTC', 'VTP', 'consultancies'], default: 'consultancies' },
    ntn: { type: String, required: true, match: /^\d{7}-\d$/ },
    supportingDocument: { type: String, required: true },
    contactPersonName: { type: String, required: true, minlength: 2 },
    contactPersonPhone: { type: String, required: true, match: /^\+?\d{10,12}$/ },
    contactPersonIdFront: { type: String, required: true },
    contactPersonIdBack: { type: String, required: true },
    agencyCoverPhoto: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    licenceNo: { type: String, required: true, minlength: 3 },
    proprietorName: { type: String, required: true, minlength: 2 },
    licenceTitle: { type: String, required: true, minlength: 2 },
    licenceStatus: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    licenceExpiry: { type: Date, required: true },
    headOffice: { type: String, required: true, minlength: 5 },
    branchOffice: { type: String, minlength: 5 },
    ptcl: { type: String, match: /^\+?\d{10,12}$/ },
    whatsappNo: { type: String, required: true, match: /^\+?\d{10,12}$/ },
    websiteUrl: { type: String, match: /^https?:\/\/.+/ },
}, { timestamps: true });

export default mongoose.models.CompanyAccount || mongoose.model('CompanyAccount', CompanyAccountSchema);
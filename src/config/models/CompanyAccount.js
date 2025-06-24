// models/Account.ts
import mongoose from 'mongoose';

const CompanyAccountSchema = new mongoose.Schema({
    agencyName: { type: String, required: true, minlength: 2 },
    agencyEmail: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    agencyLogo: { type: String, required: true },
    ntn: { type: String, required: true, match: /^\d{7}-\d$/ },
    supportingDocument: { type: String, required: true },
    contactPersonName: { type: String, required: true, minlength: 2 },
    contactPersonPhone: { type: String, required: true, match: /^\+?\d{10,12}$/ },
    contactPersonIdFront: { type: String, required: true },
    contactPersonIdBack: { type: String, required: true },
    agencyCoverPhoto: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    type: { type: String, enum: ['OEP', 'TTC', 'VTP', 'consultancies'], default: 'consultancies' },
}, { timestamps: true });

export default mongoose.models.CompanyAccount || mongoose.model('CompanyAccount', CompanyAccountSchema);
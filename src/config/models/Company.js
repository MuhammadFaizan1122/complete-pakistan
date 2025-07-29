import mongoose from 'mongoose';

const VisaAuthorizedTradeSchema = new mongoose.Schema({
    permission_status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    visaNumber: { type: String, required: true },
    salary: { type: Number, required: true },
    currency: { type: String, enum: ['USD', 'AED', 'EUR'], default: 'USD' },
    type: { type: String, required: true },
    dutyTimings: { type: String, default: '8 hours/day' },
    overtime: { type: String, default: 'yes' },
    benefits: { type: [String], default: ['Medical Insurance'] },
    contractPeriod: { type: String, default: '2 years' },
    NAVTAC: { type: String, required: true },
});

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        visaNumber: { type: String, required: true },
        idNumber: { type: String, required: true },
        visaAuthorizedTrade: { type: [VisaAuthorizedTradeSchema], required: true },
        requiredTrade: { type: [String], required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
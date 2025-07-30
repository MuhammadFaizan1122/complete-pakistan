import mongoose from 'mongoose';

const VisaAuthorizedTradeSchema = new mongoose.Schema({
    salary: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    authorized_trade: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    required_trade: { type: String, required: true },
    dutyTimings: { type: String, default: '8 hours/day' },
    overtime: { type: String, default: 'yes' },
    benefits: { type: [String], default: ['Medical Insurance'] },
    contractPeriod: { type: String, default: '2 years' },
    NAVTAC: { type: String, required: true },
});

const CompanySchema = new mongoose.Schema(
    {
        permission_number: { type: Number, required: true },
        logo: { type: String },
        name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        visaNumber: { type: String, required: true },
        idNumber: { type: String, required: true },
        visaAuthorizedTrade: { type: [VisaAuthorizedTradeSchema], required: true },
        rating: { type: Number },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
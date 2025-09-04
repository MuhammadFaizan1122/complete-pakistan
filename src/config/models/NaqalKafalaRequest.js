import mongoose from "mongoose";

const naqalKafalaSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        passportNumber: {
            type: String,
            match: /^[A-Za-z]{2}\d{7}$/,
            required: true,
        },
        iqamaStatus: { type: String, required: true },
        iqamaExpiry: { type: Date, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        contactAbroad: { type: String, required: true },
        contactPakistani: { type: String, required: true },
        whatsapp: { type: String, required: true },
        profession: { type: String, required: true },
        education: { type: String, required: true },
        completeAddress: { type: String, required: true },
        experties: [{ type: String, required: true }],
        yearsOfExperience: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        expireAt: {
            type: Date,
            default: () => new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
            index: { expires: 0 },
        },
    },
    { timestamps: true }
);

export default mongoose.models.NaqalKafalaRequest ||
    mongoose.model("NaqalKafalaRequest", naqalKafalaSchema);

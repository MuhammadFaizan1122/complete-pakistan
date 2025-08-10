// backend/models/cv.js
import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    trade: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade', required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    medicalStatus: { type: String, enum: ['valid', 'pending'], required: true },
    education: { type: String, enum: ['matric', 'intermediate', 'graduate', 'diploma', 'other'], required: true },
    gulfVisited: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.CV || mongoose.model('CV', cvSchema);
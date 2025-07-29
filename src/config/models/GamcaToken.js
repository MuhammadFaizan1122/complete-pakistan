import mongoose from 'mongoose';

const GamcaTokenSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GamcaToken || mongoose.model('GamcaToken', GamcaTokenSchema);
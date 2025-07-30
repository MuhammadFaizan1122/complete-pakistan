import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'company'], default: 'user' },
    type: { type: String, enum: ['individual', 'OEP', 'TTC', 'VTP', 'consultancies'], default: 'individual' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
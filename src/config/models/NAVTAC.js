import mongoose from 'mongoose';

const NavtacSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  code: { type: String, required: true, minlength: 2, unique: true },
}, { timestamps: true });

export default mongoose.models.Navtac || mongoose.model('Navtac', NavtacSchema);
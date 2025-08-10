import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
});

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [imageSchema], validate: [v => v.length <= 3, 'Maximum 3 images allowed'] },
  },
  { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

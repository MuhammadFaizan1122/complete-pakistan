import mongoose from 'mongoose';

const SliderContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true },
    sliderImgs: [{ type: String }],
    news: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.SliderContent || mongoose.model('SliderContent', SliderContentSchema);
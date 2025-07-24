import mongoose from 'mongoose';

const SliderContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true },
    sliderImgs: [{
      url: { type: String, required: true },
      title: { type: String, required: true },
      subtitle: { type: String },
      description: { type: String },
      buttons: [{
        text: { type: String, required: true },
        link: { type: String, required: true },
      }],
    }],
    news: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.SliderContent || mongoose.model('SliderContent', SliderContentSchema);
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  userId: String,
  jobTitle: String,
  companyName: String,
  jobType: String,
  country: String,
  state: String,
  salaryMin: Number,
  salaryMax: Number,
  industry: String,
  category: String,
  jobDescription: String,
  keyResponsibilities: [String],
  selectedSkills: [String],
  selectedTags: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);

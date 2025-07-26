// config/models/JobApplication.ts
import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    applicant_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);

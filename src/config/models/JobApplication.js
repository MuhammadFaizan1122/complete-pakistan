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
    selection_type: {
      type: String,
      default: 'interview',
    },
    map_link: {
      type: String,
      default: '',
    },
    contact: {
      type: Number,
    },
    form: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
      default: '',
    },
    notice: {
      type: String,
      default: '',
    },
    interview_timings: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    interview_type: {
      type: String,
      default: '',
    },
    must_have: {
      type: Array,
      default: '',
    },
    benefits: {
      type: Array,
      default: '',
    },
    requirements: {
      type: Array,
      default: '',
    },
    license: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);

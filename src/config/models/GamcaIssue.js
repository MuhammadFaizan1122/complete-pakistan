import mongoose from 'mongoose';

const GamcaIssueSchema = new mongoose.Schema(
  {
    issue: { type: String, required: true },
    solution: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GamcaIssue || mongoose.model('GamcaIssue', GamcaIssueSchema);

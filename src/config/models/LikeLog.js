const mongoose = require('mongoose');

const LikeLogSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyAccount',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['liked'],
    required: true
  },
}, { timestamps: true });

// Prevent OverwriteModelError in Next.js hot reload
module.exports = mongoose.models.LikeLog || mongoose.model('LikeLog', LikeLogSchema);

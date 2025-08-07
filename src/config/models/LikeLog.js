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

module.exports = mongoose.model('LikeLog', LikeLogSchema);
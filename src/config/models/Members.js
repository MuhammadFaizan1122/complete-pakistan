import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    employeeId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model('Member', memberSchema);

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;
        
        if (!mongoUri) {
            throw new Error('MongoDB connection string is missing. Please check your environment variables.');
        }
        
        if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
            throw new Error('Invalid MongoDB URI format. URI must start with mongodb:// or mongodb+srv://');
        }
        
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: true,
        });
        
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error', error);
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

export default connectDB;
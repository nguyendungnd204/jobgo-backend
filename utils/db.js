import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;
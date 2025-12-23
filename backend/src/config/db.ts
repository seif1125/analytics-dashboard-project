import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Check if the URI exists in .env
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined in .env file");

 const conn=mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4
});
    
    console.log(`✅ MongoDB Connected: `);
  } catch (error) {
    console.error(`❌ Connection Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};

export default connectDB;
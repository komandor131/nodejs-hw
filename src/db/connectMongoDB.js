import mongoose from 'mongoose';
import dns from 'node:dns';

// Force DNS servers to Google and Cloudflare to resolve SRV querySrv issues on some networks
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL environment variable is not defined');
    }
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

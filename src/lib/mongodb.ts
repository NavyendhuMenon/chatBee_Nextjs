import mongoose from 'mongoose';

export async function connectDB() {
  try {
    console.log("Attempting to connect to MongoDB...");

    mongoose.connection.on('connected', () => {
      console.log("Connected to MongoDB ✅");
    });

    mongoose.connection.on('error', (error) => {
      console.error("MongoDB connection error ❌:", error);
    });

    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB. Skipping new connection.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any);

  } catch (error) {
    console.error("Something went wrong while connecting to MongoDB ❌:", error);
  }
}

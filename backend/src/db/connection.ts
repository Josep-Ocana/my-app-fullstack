import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    console.log("Intentando conectar a MongoDB...");

    await mongoose.connect(mongoUri as string);

    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
};

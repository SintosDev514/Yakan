import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error:", error);

    process.exit(1); //failure
  }
};

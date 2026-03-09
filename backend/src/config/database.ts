import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const monguri = process.env.MONGODB_URI;
    if (!monguri) {
      throw new Error("Mongo Uri Empty");
    }

    await mongoose.connect(monguri);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error:", error);

    process.exit(1); //failure
  }
};

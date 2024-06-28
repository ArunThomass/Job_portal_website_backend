import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("MongoDB connected"));
  } catch (error) {
    console.log(error.message);
  }
};

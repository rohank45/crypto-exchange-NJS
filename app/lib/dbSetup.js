import mongoose from "mongoose";

export async function dbSetup(req, res) {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB success");
  } catch (error) {
    console.log("DB error", error);
  }
}

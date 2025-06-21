import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = 5000;

async function main() {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error("DB_URI environment variable is not defined.");
    }
    await mongoose.connect(dbUri);
    console.log("Database connected successfully!");
    app.listen(port, () => {
      console.log(`Libraray Management System app listening on port ${port}`);
    });
  } catch (error) {}
}

main();

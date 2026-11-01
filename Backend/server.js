import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import TTRoutes from "./routes/TTRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", TTRoutes);

app.listen(PORT, () => {
  console.log(`app listening to port: ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database");
  } catch (err) {
    console.log("Failed to connnect with Db", err);
  }
};

app.get("/", (req, res) => {
  res.send("tt working");
});

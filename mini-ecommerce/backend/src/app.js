import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB conectada"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("Servidor en puerto 3000"));

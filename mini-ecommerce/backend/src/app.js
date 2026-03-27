import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// CORS: permite peticiones desde el frontend Vue (puerto 5173)
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Ruta de salud para verificar que el servidor está activo
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando" });
});

// Conexión a MongoDB
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Base de datos conectada");
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error al conectar la base de datos:", err.message);
    process.exit(1);
  });

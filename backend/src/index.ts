import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connection";
import userRouter from "./routes/userRoutes";

dotenv.config();

// Creamos la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
});

app.use("/api/users", userRouter);

// Conectamos con la BBDD
connectDB();

// El servidor escucha un puerto
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${3000}`);
});

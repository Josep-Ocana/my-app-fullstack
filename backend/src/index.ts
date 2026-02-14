import dotenv from "dotenv";
import express from "express";

dotenv.config();

// Creamos la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
});

// El servidor escucha un puerto
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${3000}`);
});

import express from "express";

// Creamos la aplicación de Express
const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
});

// El servidor escucha un puerto
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});

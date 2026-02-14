import express from "express";

// Creamos la aplicación de Express
const app = express();

// El servidor escucha un puerto
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});

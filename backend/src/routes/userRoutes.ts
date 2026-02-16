import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController";

const userRouter = Router();

// Crear usuario
userRouter.post("/", createUser);

// Obtener usuarios
userRouter.get("/", getAllUsers);

export default userRouter;

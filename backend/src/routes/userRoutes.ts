import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";

const userRouter = Router();

// Crear usuario
userRouter.post("/", createUser);

// Obtener usuarios
userRouter.get("/", getAllUsers);

// Obtener usuario por su Id
userRouter.get("/:id", getUserById);

export default userRouter;

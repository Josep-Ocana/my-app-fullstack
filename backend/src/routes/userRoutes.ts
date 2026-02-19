import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const userRouter = Router();

// Crear usuario
userRouter.post("/", createUser);

// Obtener usuarios
userRouter.get("/", getAllUsers);

// Obtener usuario por su Id
userRouter.get("/:id", getUserById);

// Eliminar usuario por su Id
userRouter.delete("/:id", deleteUser);

// Actualizar usuario
userRouter.put("/:id", updateUser);

export default userRouter;

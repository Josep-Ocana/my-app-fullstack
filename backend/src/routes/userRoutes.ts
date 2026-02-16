import { Router } from "express";
import { createUser } from "../controllers/userController";

const userRouter = Router();

// Crear usuario
userRouter.post("/", createUser);

export default userRouter;

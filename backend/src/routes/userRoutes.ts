import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router();

// Crear usuario
router.post("/", createUser);

export default router;

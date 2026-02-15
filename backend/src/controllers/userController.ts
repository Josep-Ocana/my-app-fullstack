import { Request, Response } from "express";
import { ZodError } from "zod";
import { User, UserSchema } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    //  Validamos los datos enviados por el cliente
    const validatedData = UserSchema.parse(req.body);

    const user = new User(validatedData);
    const savedUser = await user.save();

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: savedUser,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.issues,
      });
    }

    res.status(500).json({
      message: "Error al crear el Usuario",
    });
  }
};

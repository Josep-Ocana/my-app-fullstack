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
      const messages = error.issues.map((issue) => issue.message);
      return res.status(400).json({
        message: "Datos inválidos",
        errors: messages,
      });
    }

    res.status(500).json({
      message: "Error al crear el Usuario",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Usuarios obtenidos correctamente",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.status(200).json({
      message: "Usuario Obtenido correctamente",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener Usuario",
    });
  }
};

export const updatedUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //  Validamos los datos enviados por el cliente
    const validatedData = UserSchema.partial().parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true, // Retorna el documento actualizado
      runValidators: true, // Valida los cambios
    });

    if (!updatedUser) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.status(200).json({
      message: `Usuario Actualizado correctamente`,
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message);
      res.status(400).json({
        message: "Datos inválidos",
        errors: messages,
      });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.status(200).json({
      message: `Usuario Eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener Usuario",
    });
  }
};

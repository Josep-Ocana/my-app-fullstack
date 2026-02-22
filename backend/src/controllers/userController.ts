import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { User, UserSchema } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = UserSchema.parse(req.body);

    const user = new User(validatedData);

    const savedUser = await user.save();

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: savedUser,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message);
      return res.status(400).json({
        message: "Datos inválidos",
        errors: messages,
      });
    }

    // Error de MongoDB (email o teléfono duplicados)
    if (error.code === 11000 && error.keyPattern) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `El ${field} ya está registrado`,
      });
    }

    res.status(500).json({
      message: "Error al crear el Usuario",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

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

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //  Validamos los datos enviados por el cliente
    const validatedData = UserSchema.partial().parse(req.body);

    // Si se actualiza la contraseña, hashearla
    if (validatedData.password) {
      const salt = await bcrypt.genSalt(10);
      validatedData.password = await bcrypt.hash(validatedData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true, // Retorna el documento actualizado
      runValidators: true, // Valida los cambios
    }).select("-password");

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
      return res.status(400).json({
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

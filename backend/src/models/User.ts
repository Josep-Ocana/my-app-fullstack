import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import z from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 dígitos"),
  email: z.email("El email debe ser válido"),
  phone: z.string().min(9, "El telefono debe tener al menos 9 dígitos"),
});

export type IUser = z.infer<typeof UserSchema>;

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: 6,
      select: false, // Nunca se devuelve por defecto
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "El teléfono es requerido"],
      unique: true,
      trim: true,
      minlength: 9,
    },
  },
  { timestamps: true },
);

// Middleware para hashear la contraseña antes de guardar
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

export const User = mongoose.model<IUserDocument>("User", userSchema);

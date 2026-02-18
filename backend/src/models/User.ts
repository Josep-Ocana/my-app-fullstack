import mongoose, { Document, Schema } from "mongoose";
import z from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
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
      minLength: 3,
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
      minLength: 9,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>("User", userSchema);

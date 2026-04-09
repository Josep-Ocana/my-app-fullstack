import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../hook/useUsers";
import type { NewUser } from "../types/user";
import { useUserAlerts } from "./alerta/useUserAlerts";

const UserForm = () => {
  const { addUser, editingUser } = useUsers();
  const { showAlert } = useUserAlerts();

  // Inicializamos el hook de formularios
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>();

  useEffect(() => {
    if (editingUser) {
      // Rellenamos el formulario con los datos del usuario a editar
      reset(editingUser);
    } else {
      // Si no hay usuario editando (null), limpiamos el formulario
      reset();
    }
  }, [editingUser, reset]);

  // Esta función se ejecuta solo si pasamos las validaciones
  const onSubmit = async (data: NewUser) => {
    try {
      await addUser(data);
      reset(); // Limpiamos el formulario
      showAlert(
        editingUser
          ? "Usuario actualizado con éxito"
          : "Usuario creado con éxito",
        "success",
        3000,
      );
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      const errorMsg =
        serverMessage || "Hubo un error inesperado. Intentalo de nuevo";
      showAlert(errorMsg, "error", 4000);
    }
  };

  // Mostrar alerta cuando hay errores de validación
  useEffect(() => {
    const errorArray = Object.values(errors);
    if (errorArray.length > 0) {
      const errorMessages = errorArray
        .map((err: any) => err?.message)
        .filter(Boolean);

      if (errorMessages.length > 0) {
        showAlert(
          `Por favor, completa los campos: ${errorMessages.join(", ")}`,
          "warning",
          4000,
        );
      }
    }
  }, [errors, showAlert]);

  // Lógica para el texto del botón
  let buttonText = editingUser ? "Guardar Cambios" : "Crear Usuario";

  if (isSubmitting) {
    buttonText = editingUser ? "Guardando..." : "Creando...";
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
      </h2>

      {/* Campo: Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          {...register("name", { required: "El nombre es obligatorio" })}
          className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:outline-none transition-colors ${
            errors.name
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Ingresa tu nombre..."
        />
        {errors.name && (
          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4" />
            <p>{errors.name.message}</p>
          </div>
        )}
      </div>

      {/* Campo: Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: "El Password es obligatorio" })}
          className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:outline-none transition-colors ${
            errors.password
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="******"
        />
        {errors.password && (
          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4" />
            <p>{errors.password.message}</p>
          </div>
        )}
      </div>

      {/* Campo: email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
          className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:outline-none transition-colors ${
            errors.email
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Ingresa tu email..."
        />
        {errors.email && (
          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4" />
            <p>{errors.email.message}</p>
          </div>
        )}
      </div>

      {/* Campo: Telefono */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefono
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "El Telefono es obligatorio",
            minLength: {
              value: 9,
              message: "Demasiado corto (mínimo 9 dígitos)",
            },
          })}
          className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:outline-none transition-colors ${
            errors.phone
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="+34 600 000 000"
        />
        {errors.phone && (
          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
            <AlertCircle className="w-4 h-4" />
            <p>{errors.phone.message}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`rounded p-2 text-white uppercase w-full font-medium transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800"
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default UserForm;

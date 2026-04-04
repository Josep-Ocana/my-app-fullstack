import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsers } from "../hook/useUsers";
import type { NewUser } from "../types/user";

const UserForm = () => {
  const { addUser, editingUser } = useUsers();

  // Inicializamos el hook de formularios
  const {
    register,
    handleSubmit,
    reset,
    setError,
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
      alert("Usuario creado con éxito");
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;

      if (serverMessage && serverMessage.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Este correo ya existe en nuestra base de datos",
        });
      } else {
        alert("Hubo un error inesperado. Intentalo de nuevo");
      }
    }
  };

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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuevo Usuario</h2>

      {/* Campo: Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="string"
          {...register("name", { required: "El nombre es obligatorio" })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa tu nombre..."
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="******"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      {/* Campo: email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa tu email..."
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
            minLength: { value: 9, message: "Demasiado corto" },
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="+34 600 000 000"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`rounded p-2 text-white uppercase w-full ${isSubmitting ? "bg-gray-300" : "bg-blue-700"}`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default UserForm;

import { Edit, Trash2 } from "lucide-react";
import { useUsers } from "../hook/useUsers";
import type { User } from "../types/user";
import { useAlert } from "./alerta/useAlert";

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  const { deleteUser, selectUserToEdit } = useUsers();
  const { showAlert, showConfirm } = useAlert();

  const handleDelete = async () => {
    const confirmed = await showConfirm(
      `¿Estás seguro de que deseas eliminar al usuario ${user.name}?`,
      {
        title: "Eliminar Usuario",
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "error",
      },
    );

    if (confirmed) {
      try {
        await deleteUser(user._id);
        showAlert(
          `Usuario ${user.name} eliminado correctamente`,
          "success",
          3000,
        );
      } catch (error) {
        showAlert(`Error al eliminar el usuario ${user.name}`, "error", 4000);
      }
    }
  };

  const handleEdit = () => {
    selectUserToEdit(user);
    showAlert(`Editando usuario: ${user.name}`, "info", 2000);
  };

  return (
    <li className="border-b hover:bg-gray-50 transition-colors p-4 mb-2 rounded">
      {/* Contenedor de Información */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></div>
          <div className="flex-1">
            <p className="font-bold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">
              {user.email} <span className="text-gray-400 mx-1">•</span>
              {user.phone}
            </p>
          </div>
        </div>

        {/* Contenedor de Acciones */}
        <div className="flex gap-2">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded p-2 transition-colors flex items-center gap-2 text-sm"
            onClick={() => handleEdit()}
            title="Editar usuario"
          >
            <Edit className="w-4 h-4" />
            Editar
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-2 transition-colors flex items-center gap-2 text-sm"
            onClick={() => handleDelete()}
            title="Eliminar usuario"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserItem;

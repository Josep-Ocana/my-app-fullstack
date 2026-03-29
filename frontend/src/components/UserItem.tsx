import { useUsers } from "../hook/useUsers";
import type { User } from "../types/user";

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  const { deleteUser, updateUser } = useUsers();

  const handleDelete = () => {
    if (window.confirm(`Borrar el usuario ${user.name}?`)) {
      deleteUser(user._id);
    }
  };

  return (
    <li className="border-b hover:bg-gray-100 transition-colors p-2">
      {/* Contenedor de Información */}
      <div className=" flex justify-between w-full">
        <div className="flex items-center gap-4">
          <p className="font-bold text-gray-800">{user.name} </p>
          <span className="text-gray-300">|</span>
          <p className="text-sm text-gray-600">
            {user.email} <span className="mx-1">-</span>
            {user.phone}
          </p>
        </div>
        {/* Contenedor de Acciones */}
        <div className="flex gap-2">
          <button
            className="bg-red-600 hover:bg-red-700  text-center text-white rounded px-3 py-1 transition-colors"
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
          {/* <button
            className="bg-orange-500 text-center text-white rounded p-2"
            onClick={() =>
              updateUser({
                ...user,
                name: user.name + "🤞",
              })
            }
          >
            Actualizar
          </button> */}
        </div>
      </div>
    </li>
  );
};

export default UserItem;

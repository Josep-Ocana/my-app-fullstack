import { useUsers } from "../hook/useUsers";
import type { User } from "../types/user";

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  const { addUser, deleteUser, updateUser } = useUsers();
  return (
    <li>
      <div>
        <span>
          {user.name} - {user.email} - {user.phone}
        </span>
        <div>
          <button
            className="bg-green-500 text-center text-white rounded p-2"
            onClick={() => {
              const randomNum = Math.floor(Math.random() * 10000);
              addUser({
                name: `Usuario ${randomNum}`,
                email: `usuario${randomNum}@test.com`,
                phone: `600${randomNum.toString().padStart(6, "0")}`,
                password: "123456",
              });
            }}
          >
            Agregar
          </button>
          <button
            className="bg-red-800 text-center text-white rounded p-2"
            onClick={() => deleteUser(user._id)}
          >
            Eliminar
          </button>
          <button
            className="bg-orange-500 text-center text-white rounded p-2"
            onClick={() =>
              updateUser({
                ...user,
                name: user.name + "🤞",
              })
            }
          >
            Actualizar
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserItem;

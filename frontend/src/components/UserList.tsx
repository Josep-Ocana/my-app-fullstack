import { useUsers } from "../hook/useUsers";
import type { User } from "../types/user";
import UserItem from "./UserItem";

const UserList = () => {
  const { users } = useUsers();
  return (
    <>
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <ul>
          {users.map((user: User) => (
            <UserItem key={user._id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;

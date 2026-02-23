import type { User } from "../types/user";
import UserItem from "./UserItem";

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <ul>
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;

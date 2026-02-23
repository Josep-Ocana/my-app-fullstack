import type { User } from "../types/user";

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  return (
    <li>
      {user.name} - {user.email} - {user.phone}
    </li>
  );
};

export default UserItem;

export type User = {
  _id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
};

export type NewUser = Omit<User, "_id">;

export type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
};

export type UsersActionsType = {
  addUser: (user: NewUser) => void;
  deleteUser: (id: User["_id"]) => void;
  updateUser: (user: User) => void;
  fetchUsers: () => Promise<void>;
};

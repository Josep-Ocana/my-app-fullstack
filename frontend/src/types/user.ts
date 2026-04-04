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
  editingUser: User | null;
};

export type UsersActionsType = {
  addUser: (user: NewUser) => void;
  deleteUser: (id: User["_id"]) => void;
  fetchUsers: () => Promise<void>;
  selectUserToEdit: (user: User) => void;
  cancelEdit: () => void;
};

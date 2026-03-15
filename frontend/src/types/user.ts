export type User = {
  _id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
};

export type NewUser = Omit<User, "_id">;

import axios from "axios";
import type { User } from "../types/user";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};

export const addUserService = async (newUser: User) => {
  const response = await api.post("/users", newUser);
  return response.data;
};

export const deleteUserService = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const updateUserService = async (user: User) => {
  const response = await api.put(`/users/${user._id}`, user);
  return response.data;
};

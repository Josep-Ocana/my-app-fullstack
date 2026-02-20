import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;

export const getUsers = async () => {
  const response = await api.get("/users");
  console.log(response);
  return response.data.data;
};

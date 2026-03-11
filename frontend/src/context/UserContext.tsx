import { createContext, useEffect, useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import {
  createUser,
  deleteUserService,
  getUsers,
} from "../services/userService";
import type { User } from "../types/user";

// Type
type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: User) => void;
  deleteUser: (id: User["_id"]) => void;
  updateUser: (user: User) => void;
  fetchUsers: () => Promise<void>;
};

// Context
export const UsersContext = createContext<UsersContextType | null>(null);

// Provider
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, loading, error } = state;

  const fetchUsers = async () => {
    dispatch({ type: "FETCH_USERS_START" });

    try {
      const fetchedUsers = await getUsers();

      dispatch({ type: "FETCH_USERS_SUCCESS", payload: fetchedUsers });
    } catch (error) {
      dispatch({
        type: "FETCH_USERS_ERROR",
        payload: "Error al cargar Usuarios",
      });
    }
  };

  // Cargar los usuarios desde la Base de datos
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funciones
  const addUser = async (newUser: User) => {
    dispatch({ type: "ADD_USER_START" });
    try {
      const createdUser = await createUser(newUser);
      dispatch({ type: "ADD_USER_SUCCESS", payload: createdUser });
    } catch (error) {
      dispatch({ type: "ADD_USER_ERROR", payload: "Error al añadir Usuario" });
    }
  };

  const deleteUser = async (id: User["_id"]) => {
    dispatch({ type: "DELETE_USER_START" });
    try {
      await deleteUserService(id);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
    } catch (error) {
      dispatch({
        type: "DELETE_USER_ERROR",
        payload: "Error al eliminar Usuario",
      });
    }
  };

  const updateUser = async (editingUser: User) => {};

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        deleteUser,
        updateUser,
        fetchUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

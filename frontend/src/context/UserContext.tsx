import { createContext, useEffect, useReducer } from "react";
import { createUser, getUsers } from "../services/userService";
import type { User } from "../types/user";
import { initialState, userReducer } from "./userReducer";

// Type
type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: User) => void;
  deleteUser: (id: User["_id"]) => void;
  updateUser: (user: User) => void;
};

// Context
export const UsersContext = createContext<UsersContextType | null>(null);

// Provider
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, loading, error } = state;

  // Cargar los usuarios desde la Base de datos
  useEffect(() => {
    const loadUsers = async () => {
      dispatch({ type: "FETCH_USERS_START" });
      try {
        const users = await getUsers();
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: users });
      } catch (error) {
        dispatch({
          type: "FETCH_USERS_ERROR",
          payload: "Error al cargar Usuarios",
        });
      }
    };
    loadUsers();
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

  return (
    <UsersContext.Provider value={{ users, loading, error, addUser }}>
      {children}
    </UsersContext.Provider>
  );
}

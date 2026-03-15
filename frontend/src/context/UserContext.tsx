import { createContext, useCallback, useEffect, useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import {
  addUserService,
  deleteUserService,
  getUsers,
  updateUserService,
} from "../services/userService";
import type { NewUser, User } from "../types/user";

// Types
type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
};

type UsersActionsType = {
  addUser: (user: NewUser) => void;
  deleteUser: (id: User["_id"]) => void;
  updateUser: (user: User) => void;
  fetchUsers: () => Promise<void>;
};

// Context
export const UsersStateContext = createContext<UsersContextType | null>(null);
export const UsersActionsContext = createContext<UsersActionsType | null>(null);

// Provider
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, loading, error } = state;

  const fetchUsers = useCallback(async () => {
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
  }, [dispatch]);

  // Cargar los usuarios desde la Base de datos
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funciones
  const addUser = async (newUser: NewUser) => {
    dispatch({ type: "ADD_USER_START" });
    try {
      const createdUser = await addUserService(newUser);

      dispatch({
        type: "ADD_USER_SUCCESS",
        payload: createdUser,
      });
    } catch (error) {
      dispatch({
        type: "ADD_USER_ERROR",
        payload: "Error al añadir Usuario",
      });
    }
  };

  const deleteUser = async (UserId: User["_id"]) => {
    dispatch({ type: "DELETE_USER_START" });
    try {
      await deleteUserService(UserId);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: UserId });
    } catch (error) {
      dispatch({
        type: "DELETE_USER_ERROR",
        payload: "Error al eliminar Usuario",
      });
    }
  };

  const updateUser = async (editUser: User) => {
    dispatch({ type: "UPDATE_USER_START" });
    try {
      const updatedUser = await updateUserService(editUser);
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: updatedUser });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_ERROR",
        payload: "Error al actualizar Usuario",
      });
    }
  };

  return (
    <UsersStateContext.Provider
      value={{
        users,
        loading,
        error,
      }}
    >
      <UsersActionsContext.Provider
        value={{
          addUser,
          deleteUser,
          updateUser,
          fetchUsers,
        }}
      >
        {children}
      </UsersActionsContext.Provider>
    </UsersStateContext.Provider>
  );
}

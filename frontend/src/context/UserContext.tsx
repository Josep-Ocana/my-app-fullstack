import axios, { AxiosError } from "axios";
import { createContext, useCallback, useEffect, useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import {
  addUserService,
  deleteUserService,
  getUsers,
  updateUserService,
} from "../services/userService";
import type {
  NewUser,
  User,
  UsersActionsType,
  UsersContextType,
} from "../types/user";

interface ApiError {
  message: string;
}

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
  // Añadir usuario
  const addUser = async (newUser: NewUser) => {
    dispatch({ type: "ADD_USER_START" });
    try {
      const createdUser = await addUserService(newUser);

      dispatch({
        type: "ADD_USER_SUCCESS",
        payload: createdUser,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        const status = axiosError.response?.status;
        const message =
          axiosError.response?.data?.message || "Error al añadir Usuario";

        if (status !== 400) {
          dispatch({
            type: "ADD_USER_ERROR",
            payload: message,
          });
        }
      } else {
        dispatch({
          type: "ADD_USER_ERROR",
          payload: "Error inesperado en la aplicación",
        });
      }
      throw error;
    }
  };

  // Borrar Usuario
  const deleteUser = async (UserId: User["_id"]) => {
    dispatch({ type: "DELETE_USER_START" });

    try {
      // 1 Llamada al servicio(axios)
      await deleteUserService(UserId);

      // 2. Si todo va bien, actualizamos el estado global
      dispatch({ type: "DELETE_USER_SUCCESS", payload: UserId });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 3. Aqui le decimos a TS el tipo de dato que tendrá error: ApiError definido arriba
        const axiosError = error as AxiosError<ApiError>;

        // 4. Ahora message será reconocido correctamente
        const status = axiosError.response?.status;
        const message =
          axiosError.response?.data?.message || "Error al Borrar Usuario";

        if (status !== 400) {
          dispatch({
            type: "DELETE_USER_ERROR",
            payload: message,
          });
        }
      } else {
        dispatch({
          type: "DELETE_USER_ERROR",
          payload: "Error inesperado en la aplicación",
        });
      }
    }
  };

  // Actualizar Usuario
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

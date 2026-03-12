import { useContext } from "react";
import { UsersActionsContext, UsersStateContext } from "../context/UserContext";

export const useUsers = () => {
  const state = useContext(UsersStateContext);
  const actions = useContext(UsersActionsContext);

  if (!state || !actions)
    throw new Error("UseUsers must be used within UserProvider");

  return { ...state, ...actions };
};

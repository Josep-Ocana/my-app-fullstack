import type { User } from "../types/user";

export type State = {
  users: User[];
  loading: boolean;
  error: string | null;
  editingUser: User | null;
};

export const initialState: State = {
  users: [],
  loading: true,
  error: null,
  editingUser: null,
};

export type Action =
  | { type: "FETCH_USERS_START" }
  | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
  | { type: "FETCH_USERS_ERROR"; payload: string }
  | { type: "ADD_USER_START" }
  | { type: "ADD_USER_SUCCESS"; payload: User }
  | { type: "ADD_USER_ERROR"; payload: string }
  | { type: "DELETE_USER_START" }
  | { type: "DELETE_USER_SUCCESS"; payload: User["_id"] }
  | { type: "DELETE_USER_ERROR"; payload: string }
  | { type: "UPDATE_USER_START" }
  | { type: "UPDATE_USER_SUCCESS"; payload: User }
  | { type: "UPDATE_USER_ERROR"; payload: string }
  | { type: "SET_EDITING_USER"; payload: User | null };

export function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_USERS_START":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_USER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    case "ADD_USER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_USER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
        error: null,
      };
    case "DELETE_USER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_USER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
        error: null,
      };
    case "UPDATE_USER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_EDITING_USER":
      return {
        ...state,
        editingUser: action.payload,
      };

    default:
      return state;
  }
}

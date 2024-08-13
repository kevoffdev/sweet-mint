import {createContext, ReactNode, useReducer} from "react";

import {authReducer} from "../reducers/auth";
import {ActionsAuth, AUTH_ACTION, CreateUser, LoginUser, StateAuth, Status} from "../types";
import {revalidateJWTRequest} from "../../api/auth";

const initialContextAuth: StateAuth & ActionsAuth = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    token: "",
  },
  checkingCredentials: false,
  registerUser: () => {},
  loginUser: () => {},
  checkAuthToken: () => {},
};

const initialState = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    token: "",
  },
  checkingCredentials: false,
};

export const AuthContext = createContext(initialContextAuth);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (user: CreateUser) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
        credentials: "include",
      });
      const data = await response.json();

      if (!data.ok) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: data.msg});
      }

      return dispatch({type: AUTH_ACTION.REGISTER_USER, value: data.msg});
    } catch (error) {
      console.log(error);

      return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: "Hable con el administrador"});
    }
  };

  const loginUser = async (user: LoginUser) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await response.json();

      if (!data.ok) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: data.msg});
      }

      return dispatch({type: AUTH_ACTION.LOGIN_USER, value: data.user});
    } catch (error) {
      console.log(error);

      return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: "Hable con el administrador"});
    }
  };

  const checkAuthToken = async () => {
    dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.Checking});
    try {
      const response = await revalidateJWTRequest();

      // console.log(response);
      if (!response.ok) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: response.msg});
      }
      // console.log(response);

      return dispatch({type: AUTH_ACTION.LOGIN_USER, value: response.user});
    } catch (error) {
      console.error(error);
    }
  };

  const {status, errorMessage, message, profile, checkingCredentials} = state;

  return (
    <AuthContext.Provider
      value={{
        status,
        errorMessage,
        profile,
        message,
        checkingCredentials,
        registerUser,
        loginUser,
        checkAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

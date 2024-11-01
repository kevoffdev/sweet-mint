import {createContext, ReactNode, useReducer} from "react";

import {authReducer} from "../reducers/auth";
import {
  ActionsAuth,
  AUTH_ACTION,
  AUTH_ROLE,
  CreateUser,
  LoginUser,
  StateAuth,
  Status,
} from "../types";
import {loginRequest, logoutRequest, registerRequest, revalidateJWTRequest} from "../../api/auth";

const initialContextAuth: StateAuth & ActionsAuth = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    role: AUTH_ROLE.NOT_AUTHENTICATED,
  },
  checkingCredentials: false,
  registerUser: () => {},
  loginUser: () => {},
  checkAuthToken: () => {},
  logoutUser: () => {},
};

const initialState = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    role: AUTH_ROLE.NOT_AUTHENTICATED,
  },
  checkingCredentials: false,
};

export const AuthContext = createContext(initialContextAuth);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (user: CreateUser) => {
    try {
      const data = await registerRequest(user);

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
      const data = await loginRequest(user);

      console.log(data);
      if (!data.ok || data.user == null) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: data.msg});
      }

      return dispatch({
        type: AUTH_ACTION.LOGIN_USER,
        value: data.user,
      });
    } catch (error) {
      console.log(error);

      return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: "Hable con el administrador"});
    }
  };
  const logoutUser = async () => {
    const data = await logoutRequest();

    console.log(data);
    checkAuthToken();
  };

  const checkAuthToken = async () => {
    dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.Checking});
    try {
      const data = await revalidateJWTRequest();

      if (!data.ok || data.user == null) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: ""});
      }

      return dispatch({type: AUTH_ACTION.LOGIN_USER, value: data.user});
    } catch (error) {
      console.error(error);

      return dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.NotAuthenticated});
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
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

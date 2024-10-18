import {createContext, ReactNode, useReducer} from "react";

import {authReducer} from "../reducers/auth";
import {ActionsAuth, AUTH_ACTION, CreateUser, LoginUser, StateAuth, Status} from "../types";
import {loginRequest, logoutRequest, registerRequest, revalidateJWTRequest} from "../../api/auth";

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
  logoutUser: () => {},
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
      // const response = await fetch("http://localhost:3000/api/auth/register", {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(user),
      //   credentials: "include",
      // });
      // const data = await response.json();
      // console.log(user);
      // const data = await registerRequest(user);

      // console.log(data);
      // if (!data.ok) {
      //   console.log(data);

      //   return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: data.msg});
      // }
      // console.log(data);

      return dispatch({type: AUTH_ACTION.REGISTER_USER, value: "data"});
    } catch (error) {
      console.log(error);

      return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: "Hable con el administrador"});
    }
  };

  const loginUser = async (user: LoginUser) => {
    try {
      // const data = await loginRequest(user);
      // // const data = await response.json();

      // if (!data.ok) {
      //   return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: data.msg});
      // }

      return dispatch({
        type: AUTH_ACTION.LOGIN_USER,
        value: {firstName: "fer", lastName: "kev", token: ""},
      });
    } catch (error) {
      console.log(error);

      return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: "Hable con el administrador"});
    }
  };
  const logoutUser = async () => {
    const response = await logoutRequest();

    console.log(response);
    checkAuthToken();
  };

  const checkAuthToken = async () => {
    dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.Checking});
    try {
      const response = await revalidateJWTRequest();

      if (!response.ok) {
        return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: response.msg});
      }

      dispatch({type: AUTH_ACTION.LOGIN_USER, value: response.user});
    } catch (error) {
      console.error(error);

      dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.NotAuthenticated});
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

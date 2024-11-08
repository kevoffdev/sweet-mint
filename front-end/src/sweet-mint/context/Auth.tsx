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
import {getProductsRequest} from "../../api/products";

const initialContextAuth: StateAuth & ActionsAuth = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    role: AUTH_ROLE.NOT_AUTHENTICATED,
    user_id: "",
  },
  checkingCredentials: false,
  products: [],
  registerUser: () => {},
  loginUser: () => {},
  checkAuthToken: () => {},
  logoutUser: () => {},
  getProducts: () => {},
  cleanErrorMessage: () => {},
};

const initialState = {
  status: Status.Checking,
  errorMessage: undefined,
  message: undefined,
  profile: {
    firstName: "",
    lastName: "",
    role: AUTH_ROLE.NOT_AUTHENTICATED,
    user_id: "",
  },
  checkingCredentials: false,
  products: [],
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
    try {
      const data = await logoutRequest();

      checkAuthToken();
      if (!data.ok) return;

      return dispatch({type: AUTH_ACTION.LOGOUT_USER, value: initialState});
    } catch (error) {
      console.log(error);
    }
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

  const getProducts = async () => {
    try {
      const data = await getProductsRequest();

      if (!data.ok) {
        console.log(data);

        return;
        // return dispatch({type: AUTH_ACTION.ERROR_MESSAGE, value: ""});
      }

      return dispatch({type: AUTH_ACTION.GET_PRODUCTS, value: data.products});
    } catch (error) {
      console.error(error);
      // return dispatch({type: AUTH_ACTION.STATUS_AUTH, value: Status.NotAuthenticated});
    }
  };
  const cleanErrorMessage = () => {
    // console.log(state);
    return dispatch({type: AUTH_ACTION.CLEAN_ERRORMESSAGE, value: state});
  };
  const {status, errorMessage, message, profile, checkingCredentials, products} = state;

  return (
    <AuthContext.Provider
      value={{
        cleanErrorMessage,
        products,
        status,
        errorMessage,
        profile,
        message,
        checkingCredentials,
        registerUser,
        loginUser,
        checkAuthToken,
        logoutUser,
        getProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

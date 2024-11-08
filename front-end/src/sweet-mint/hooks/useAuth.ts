import {useContext} from "react";

import {AuthContext} from "../context/Auth";

export function useAuth() {
  const {
    errorMessage,
    message,
    status,
    profile,
    products,
    registerUser,
    loginUser,
    logoutUser,
    checkAuthToken,
    getProducts,
    cleanErrorMessage,
  } = useContext(AuthContext);

  return {
    errorMessage,
    message,
    status,
    profile,
    products,
    registerUser,
    loginUser,
    logoutUser,
    checkAuthToken,
    getProducts,
    cleanErrorMessage,
  };
}

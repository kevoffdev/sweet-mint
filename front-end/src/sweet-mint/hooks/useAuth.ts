import {useContext} from "react";

import {AuthContext} from "../context/Auth";

export function useAuth() {
  const {
    errorMessage,
    message,
    status,
    profile,
    registerUser,
    loginUser,
    logoutUser,
    checkAuthToken,
  } = useContext(AuthContext);

  return {
    errorMessage,
    message,
    status,
    profile,
    registerUser,
    loginUser,
    logoutUser,
    checkAuthToken,
  };
}

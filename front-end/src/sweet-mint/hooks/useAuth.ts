import {useContext} from "react";

import {AuthContext} from "../context/Auth";

export function useAuth() {
  const {errorMessage, message, status, profile, registerUser, loginUser, checkAuthToken} =
    useContext(AuthContext);

  return {errorMessage, message, status, profile, registerUser, loginUser, checkAuthToken};
}

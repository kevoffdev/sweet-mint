import {AUTH_ACTION, AUTH_ROLE, AuthAction, StateAuth, Status} from "../types";

export function authReducer(state: StateAuth, action: AuthAction) {
  switch (action.type) {
    case AUTH_ACTION.REGISTER_USER:
      return {...state, message: action.value};

    case AUTH_ACTION.ERROR_MESSAGE: {
      const newState = structuredClone(state);

      newState.status = Status.NotAuthenticated;
      newState.errorMessage = action.value;

      return newState;
    }

    case AUTH_ACTION.LOGIN_USER: {
      const value = action.value;
      const newState = structuredClone(state);

      if (value.role === AUTH_ROLE.ADMIN) {
        newState.profile.role = AUTH_ROLE.ADMIN;
      } else {
        newState.profile.role = AUTH_ROLE.CLIENT;
      }

      newState.profile.firstName = value.firstName;
      newState.profile.lastName = value.lastName;
      newState.status = Status.Authenticated;
      newState.checkingCredentials = true;

      return newState;
    }

    case AUTH_ACTION.STATUS_AUTH:
      return {...state, status: action.value};
    default:
      throw Error("uknow action");
  }
}

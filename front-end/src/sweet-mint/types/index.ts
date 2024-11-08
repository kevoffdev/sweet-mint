import {IProduct} from "../pages/AdminInvetory";

export interface ProductProps {
  title: string;
  price: number;
  categoria: string;
  tipo: string;
  image: string;
  quantity: number;
  id: number;
}

export enum SortBy {
  OLDTONEW = "oldToNew",
  NEWTOOLD = "newToOld",
  HIGHESTTOLOWESTPRICE = "highestToLowestPrice",
  LOWESTTOHIGHESTPRICE = "lowestToHighestPrice",
}

export interface CartContextProps {
  productsCart: Record<string, {quantity: number}>;
  addProduct: ({id, quantity}: {id: IProduct["id"]; quantity: number}) => void;
  removeProduct: (id: IProduct["id"]) => void;
  resetCart: () => void;
}

export enum AUTH_ROLE {
  ADMIN = "admin",
  CLIENT = "client",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
}

export interface User {
  firstName: string;
  lastName: string;
  role: AUTH_ROLE;
  user_id: string;
}

export interface StateAuth {
  status: Status;
  errorMessage: undefined | string;
  profile: User;
  checkingCredentials: boolean;
  message: string | undefined;
  products: IProduct[];
}

export interface ActionsAuth {
  registerUser: (value: CreateUser) => void;
  loginUser: (value: LoginUser) => void;
  checkAuthToken: () => void;
  logoutUser: () => void;
  getProducts: () => void;
  cleanErrorMessage: () => void;
}

export enum Status {
  NotAuthenticated = "not-authenticated",
  Authenticated = "authenticated",
  Checking = "checking",
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  emailAdress: string;
  password: string;
  confirmedPassword: string;
}

export type LoginUser = Pick<CreateUser, "password" | "emailAdress">;

export enum AUTH_ACTION {
  REGISTER_USER = "REGISTER_USER",
  ERROR_MESSAGE = "ERROR_MESSAGE",
  LOGIN_USER = "LOGIN_USER",
  STATUS_AUTH = "STATUS_AUTH",
  GET_PRODUCTS = "GET_PRODUCTS",
  LOGOUT_USER = "LOGOUT_USER",
  CLEAN_ERRORMESSAGE = "CLEAN_ERRORMESSAGE",
}

export type AuthAction =
  | {type: AUTH_ACTION.ERROR_MESSAGE; value: string}
  | {type: AUTH_ACTION.REGISTER_USER; value: string}
  | {type: AUTH_ACTION.LOGIN_USER; value: User}
  | {type: AUTH_ACTION.STATUS_AUTH; value: Status}
  | {type: AUTH_ACTION.STATUS_AUTH; value: Status}
  | {type: AUTH_ACTION.GET_PRODUCTS; value: IProduct[]}
  | {type: AUTH_ACTION.LOGOUT_USER; value: StateAuth}
  | {type: AUTH_ACTION.CLEAN_ERRORMESSAGE; value: StateAuth};

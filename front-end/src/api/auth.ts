import {CreateUser, LoginUser} from "../sweet-mint/types";

interface IResponseRequest {
  ok: boolean;
  msg: string;
}

interface IResponseRegisterRequest extends IResponseRequest {}

interface IResponseLoginRequest extends IResponseRequest {
  user?: {
    firstName: string;
    lastName: string;
  };
}

export const registerRequest = async (user: CreateUser): Promise<IResponseRegisterRequest> => {
  return await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const loginRequest = async (user: LoginUser): Promise<IResponseLoginRequest> => {
  return await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const logoutRequest = async (): Promise<IResponseRequest> => {
  return await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

export const revalidateJWTRequest = async (): Promise<IResponseLoginRequest> => {
  return await fetch("http://localhost:3000/api/auth/renew", {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

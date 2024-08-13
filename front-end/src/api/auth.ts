import {CreateUser, LoginUser} from "../sweet-mint/types";

export const registerRequest = async (user: CreateUser) => {
  await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const loginRequest = async (user: LoginUser) => {
  return await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const revalidateJWTRequest = async () => {
  return await fetch("http://localhost:3000/api/auth/renew", {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

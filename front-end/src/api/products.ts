import {IProduct} from "../sweet-mint/pages/AdminInvetory";

interface IResponseRequest {
  ok: boolean;
  msg: string;
}

interface IResponseGetProducts extends IResponseRequest {
  products: IProduct[];
}

// interface IResponseLoginRequest extends IResponseRequest {
// }

export const createProductRequest = async (product: IProduct): Promise<IResponseRequest> => {
  return await fetch("http://localhost:3000/api/products/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(product),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const deleteProductRequest = async (id: IProduct["id"]): Promise<IResponseRequest> => {
  return await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

export const updateProductRequest = async (
  id: IProduct["id"],
  product: Partial<IProduct>,
): Promise<IResponseRequest> => {
  return await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(product),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const getProductsRequest = async (): Promise<IResponseGetProducts> => {
  return await fetch("http://localhost:3000/api/products/", {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

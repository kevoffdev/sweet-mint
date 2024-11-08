interface IResponseRequest {
  ok: boolean;
  msg: string;
}

export interface IOrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  order_id: string;
  user_id: string;
  order_date: string;
  status: string;
  total_amount: number;
}

interface IProductOrder {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrderCreate {
  userId: string;
  totalAmount: number;
  items: IProductOrder[];
}

interface IResponseGetOrders extends IResponseRequest {
  orders: IOrder[];
}

interface IResponseGetOrderItems extends IResponseRequest {
  items: IOrderItem[];
}

export const createOrderRequest = async (order: IOrderCreate): Promise<IResponseRequest> => {
  return await fetch("http://localhost:3000/api/orders/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(order),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const deleteOrderRequest = async (orderId: string): Promise<IResponseRequest> => {
  return await fetch(`http://localhost:3000/api/orders/${orderId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

export const updateOrderRequest = async (
  orderId: string,
  order: {status: IOrder["status"]},
): Promise<IResponseRequest> => {
  return await fetch(`http://localhost:3000/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(order),
    credentials: "include",
  }).then((resp) => resp.json());
};

export const getOrdersRequest = async (): Promise<IResponseGetOrders> => {
  return await fetch("http://localhost:3000/api/orders/", {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

export const getOrderItemsRequest = async (orderId: string): Promise<IResponseGetOrderItems> => {
  return await fetch(`http://localhost:3000/api/orders/${orderId}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((resp) => resp.json());
};

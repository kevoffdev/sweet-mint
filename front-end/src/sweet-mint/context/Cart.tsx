import {createContext, ReactNode, useState} from "react";

import {CartContextProps} from "../types";
import {IProduct} from "../pages/AdminInvetory";
const initialContextCart: CartContextProps = {
  productsCart: {},
  addProduct: () => {},
  removeProduct: () => {},
  resetCart: () => {},
};

export const CartContext = createContext<CartContextProps>(initialContextCart);

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [productsCart, setProduct] = useState<CartContextProps["productsCart"]>({});

  const addProduct: CartContextProps["addProduct"] = ({id, quantity}) => {
    setProduct((prevProductCart) => {
      if (prevProductCart[id]) {
        return {...prevProductCart, [id]: {quantity: quantity + prevProductCart[id].quantity}};
      }

      return {...prevProductCart, [id]: {quantity}};
    });
  };

  const removeProduct = (id: IProduct["id"]) => {
    setProduct((prevProducts) => {
      const {[id]: _, ...newProductsCart} = prevProducts;

      return newProductsCart;
    });
  };

  const resetCart = () => {
    setProduct({});
  };

  return (
    <CartContext.Provider value={{productsCart, addProduct, removeProduct, resetCart}}>
      {children}
    </CartContext.Provider>
  );
};

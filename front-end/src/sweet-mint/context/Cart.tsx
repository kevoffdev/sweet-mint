import {createContext, ReactNode, useState} from "react";

import {CartContextProps, ProductProps} from "../types";
const initialContextCart: CartContextProps = {
  productsCart: {},
  addProduct: () => {},
  removeProduct: () => {},
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

  const removeProduct = (id: ProductProps["id"]) => {
    setProduct((prevProducts) => {
      const {[id]: _, ...newProductsCart} = prevProducts;

      return newProductsCart;
    });
  };

  return (
    <CartContext.Provider value={{productsCart, addProduct, removeProduct}}>
      {children}
    </CartContext.Provider>
  );
};

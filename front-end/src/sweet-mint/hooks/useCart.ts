import {useContext} from "react";

import {CartContext} from "../context/Cart";

export function useCart() {
  const {addProduct, removeProduct, productsCart, resetCart} = useContext(CartContext);

  return {addProduct, removeProduct, productsCart, resetCart};
}

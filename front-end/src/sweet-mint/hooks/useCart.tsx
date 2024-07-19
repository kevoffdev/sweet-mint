import {useContext} from "react";

import {CartContext} from "../context/Cart";

export function useCart() {
  const {addProduct, removeProduct, productsCart} = useContext(CartContext);

  return {addProduct, removeProduct, productsCart};
}

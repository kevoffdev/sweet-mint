import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import products from "../../data/productos.json";
import {useCart} from "../hooks/useCart";
import {ProductProps} from "../types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({isOpen, onClose}: CartModalProps) => {
  const {productsCart, removeProduct, addProduct} = useCart();
  const modalRef = useRef<null | HTMLDivElement>(null);
  const sumPriceProducts = products.reduce((value, product) => {
    if (productsCart[product.id]) {
      const priceProduct = product.price * productsCart[product.id].quantity;

      value = priceProduct + value;
    }

    return value;
  }, 0);
  const productsCartLength = Object.values(productsCart).length;

  const handleClickSum = (id: ProductProps["id"]) => {
    const productQuantity = products.find((product) => product.id === id)?.quantity;

    if (!productQuantity) return;
    if (productQuantity - (productsCart[id].quantity + 1) < 0) return;

    addProduct({id, quantity: 1});
  };

  const handleClickMinus = (id: ProductProps["id"]) => {
    if (productsCart[id].quantity - 1 < 1) return;
    addProduct({id, quantity: -1});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 z-50 flex h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div ref={modalRef} className="relative w-[480px] overflow-auto bg-white p-6 shadow-lg">
        <button className="mr-2 mt-2 text-gray-500 hover:text-black" onClick={onClose}>
          &times;
        </button>
        <h2 className="mb-4 text-2xl">Mi carrito</h2>
        <div className="mb-4 h-[1px] w-full bg-gray-200" />
        {productsCartLength > 0 ? (
          <section className="flex flex-col gap-4">
            {products.map((product) => {
              return (
                productsCart[product.id] && (
                  <article key={product.id} className="flex items-center gap-3">
                    <img
                      alt={product.title}
                      className="h-20 w-20 rounded-md object-cover"
                      src={product.image}
                    />
                    <div className="flex flex-col gap-2">
                      <p>{product.title}</p>
                      <div className="flex gap-1">
                        <button
                          className="w-8 rounded-full border bg-slate-100 py-1 transition duration-100 hover:bg-black hover:text-white"
                          onClick={() => handleClickMinus(product.id)}
                        >
                          -
                        </button>
                        <span className="flex w-12 items-center justify-center rounded-full border py-1">
                          {productsCart[product.id].quantity}
                        </span>
                        <button
                          className="w-8 rounded-full border bg-slate-100 py-1 transition duration-100 hover:bg-black hover:text-white"
                          onClick={() => handleClickSum(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                      <p>${product.price * productsCart[product.id].quantity}</p>
                      <button type="button" onClick={() => removeProduct(product.id)}>
                        <svg
                          className="size-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </article>
                )
              );
            })}
            <ul className="[&>li]:py-4">
              <li className="flex justify-between border-y-2">
                <p>Subtotal</p>
                <p className="">${sumPriceProducts}</p>
              </li>
              <li className="border-b-2">Calculá el costo de envío</li>
              <li className="flex justify-between border-b-2">
                <p>Total</p>
                <p>${sumPriceProducts}</p>
              </li>
            </ul>
            <button className="mt-5 rounded-full bg-black p-4 text-white">INICIAR COMPRA</button>
            <div className="text-center">
              <Link className="mt-2 underline decoration-1" to={"/"}>
                Seguir comprando
              </Link>
            </div>
          </section>
        ) : (
          <p>El carrito de compras está vacío.</p>
        )}
      </div>
    </div>
  );
};

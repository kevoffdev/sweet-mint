import {ReactNode, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

import {linksProductos} from "../../data/links.json";
import shopping_cart from "../../assets/images/shopping-cart.png";
import sweetMint from "../../assets/images/sweetmint.jpg";
import {ArrowDown, ArrowRight} from "../iconsSvg/icons";
import {SearchUsuario} from "../../components/SearchUsuario";
import {Login} from "../../components/Login";
import {CartModal} from "../modals/CartModal";
import {useCart} from "../hooks/useCart";

import "../../app.css";

export const Layout = ({children}: {children: ReactNode}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useRef<null | HTMLDivElement>(null);
  const {productsCart} = useCart();
  const productsCartLength = Object.values(productsCart).length;

  useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <CartModal isOpen={isModalOpen} onClose={closeModal} />}
      <div
        ref={data}
        className={`grid min-h-screen w-full grid-rows-[auto,auto,1fr,auto] ${isModalOpen ? "pointer-events-none opacity-50" : ""}`}
      >
        <header className="relative">
          <div className="m-auto flex w-full max-w-6xl items-center justify-between py-3">
            <SearchUsuario />
            <Link className="block h-36 w-36" to="/">
              <img alt="logo de la tienda" src={sweetMint} />
            </Link>
            <Login />
          </div>
        </header>
        <nav className="sticky top-0 z-20">
          <ul className="flex items-center justify-center border-y border-gray-300 bg-white uppercase [&>li>a]:p-4">
            <li className="hover:bg-gray-100">
              <Link className="block h-full w-full" to="/">
                Inicio
              </Link>
            </li>
            <li className="menu-item hover:bg-gray-100">
              <Link className="flex items-center justify-between gap-2" to="/productos">
                Productos
                <ArrowDown />
              </Link>
              <ul className="submenu hidden">
                <li className="bg-white hover:bg-gray-100">
                  <Link
                    className="flex items-center justify-between gap-2 p-2"
                    to="/productos/nacionales"
                  >
                    Nacionales
                    <div>
                      <ArrowRight />
                    </div>
                  </Link>
                  <ul className="hidden">
                    {linksProductos.map((link) => (
                      <li key={link} className="flex bg-white">
                        <Link
                          className="w-full p-4 hover:bg-gray-100"
                          to={`/productos/nacionales/${link.toLowerCase()}`}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="bg-white hover:bg-gray-100">
                  <Link className="flex justify-between p-2" to="/productos/importados">
                    Importados
                    <div className="arrow_right">
                      <ArrowRight />
                    </div>
                  </Link>
                  <ul className="hidden">
                    {linksProductos.map((link) => (
                      <li key={link} className="flex bg-white">
                        <Link
                          className="w-full p-4 hover:bg-gray-100"
                          to={`/productos/importados/${link.toLowerCase()}`}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
            <li className="hover:bg-gray-100">
              <Link className="block h-full w-full" to="/">
                Concacto
              </Link>
            </li>
            <li className="hover:bg-gray-100">
              <button
                className="flex h-full w-full cursor-pointer items-center gap-2 p-4"
                onClick={openModal}
              >
                <div className="h-6 w-6">
                  <img alt="carrito de compras" className="h-full w-full" src={shopping_cart} />
                </div>
                <span className="block">{productsCartLength}</span>
              </button>
            </li>
          </ul>
        </nav>
        <main className="flex flex-col">{children}</main>
        <footer className="border-y">
          <p className="mx-auto w-full max-w-6xl py-4">© by Kevoff</p>
        </footer>
      </div>
    </>
  );
};

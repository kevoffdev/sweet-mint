import {ReactNode} from "react";
import {Link} from "react-router-dom";

import shopping_cart from "../../assets/images/shopping-cart.png";
import sweetMint from "../../assets/images/sweetmint.jpg";
import "../../app.css";
import {ArrowDown, ArrowRight} from "../iconsSvg/icons";
import {FormUsuario} from "../../components/FormUsuario";
import {Login} from "../../components/Login";

export const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr,auto]">
      <header>
        <div className="m-auto flex w-full max-w-6xl items-center justify-between py-3">
          <FormUsuario />
          <Link className="block h-36 w-36" to="/">
            <img alt="logo de la tienda" src={sweetMint} />
          </Link>
          <Login />
        </div>
        <div className="bg-red-500">
          <ul className="sticky top-0 flex items-center justify-center border border-gray-300 bg-white uppercase [&>li>a]:p-4">
            <li className="hover:bg-gray-100">
              <a className="block h-full w-full" href="/">
                Inicio
              </a>
            </li>
            <li className="menu-item hover:bg-gray-100">
              <Link className="flex items-center justify-between gap-2" to="/productos">
                Productos
                <ArrowDown />
              </Link>
              <ul className="submenu hidden">
                <li className="bg-white hover:bg-gray-100">
                  <a className="flex items-center justify-between gap-2 p-2" href="#nacionales">
                    Nacionales
                    <div>
                      <ArrowRight />
                    </div>
                  </a>
                  <ul className="hidden">
                    <li>Bebidas</li>
                    <li>snack</li>
                    <li>chocolate</li>
                    <li>varios</li>
                  </ul>
                </li>
                <li className="bg-white hover:bg-gray-100">
                  <a className="flex justify-between p-2" href="#importados">
                    Importados
                    <div className="arrow_right">
                      <ArrowRight />
                    </div>
                  </a>
                  <ul className="hidden">
                    <li>Bebidas</li>
                    <li>snack</li>
                    <li>chocolate</li>
                    <li>varios</li>
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
              <Link className="flex h-full w-full items-center gap-2" to="/">
                <div className="h-6 w-6">
                  <img alt="carrito de compras" className="h-full w-full" src={shopping_cart} />
                </div>
                <span className="block">0</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main className="flex flex-col">{children}</main>
      <footer className="border-2 p-4 text-center">© by Kevoff</footer>
    </div>
  );
};

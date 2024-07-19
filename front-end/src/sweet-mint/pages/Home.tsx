import {useLocation} from "react-router-dom";

import {Layout} from "../components/Layout";
import {ListaProductos} from "../components/ListaProductos";

export const Home = () => {
  const search = new URLSearchParams(useLocation().search).get("query");

  return (
    <Layout>
      <div className="flex h-40 items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-light tracking-wide">TODOS NUESTROS PRODUCTOS</h2>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <ListaProductos category="productos" search={search} />
      </div>
    </Layout>
  );
};

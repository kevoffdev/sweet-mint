import {Link} from "react-router-dom";

import {Layout} from "../components/Layout";
import {ListaProductos} from "../components/ListaProductos";

export const Home = () => {
  return (
    <Layout>
      <div className="flex h-40 items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-light tracking-wide">TODOS NUESTROS PRODUCTOS</h2>
      </div>
      <ListaProductos />
      <div className="mb-10 text-center">
        <Link className="bg-black px-8 py-3 uppercase text-white" to="/productos">
          Ver más
        </Link>
      </div>
    </Layout>
  );
};

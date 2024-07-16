import {Link, useParams} from "react-router-dom";

import {Layout} from "../components/Layout";
import {ListaProductos} from "../components/ListaProductos";

export const CategoryTipoPage = () => {
  const {category, tipo} = useParams();

  return (
    <Layout>
      <div className="mx-auto grid w-full max-w-6xl grid-rows-[100px,1fr]">
        <div className="flex items-center justify-between">
          <ul className="flex gap-3 capitalize">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <span>/</span>
            <li>
              <Link to={`/productos/${category}`}>{category}</Link>
            </li>
            <span>/</span>
            <li>
              <Link to={`/productos/${category}/${tipo}`}>{tipo}</Link>
            </li>
          </ul>
          <select className="border-2 border-black" id="" name="">
            <option value="1">Más viejo a más nuevo</option>
            <option value="">Más nuevo a más viejo</option>
            <option value="">Precio mayor a menor</option>
            <option value="">Precio menor a mayor</option>
          </select>
        </div>
        <div>
          <ListaProductos category={category} tipo={tipo} />
        </div>
      </div>
    </Layout>
  );
};

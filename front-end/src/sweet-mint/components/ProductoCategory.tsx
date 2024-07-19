import {Link, useLocation} from "react-router-dom";

import {ListaProductos} from "./ListaProductos";
import {Layout} from "./Layout";

interface ProductoPageLayoutProps {
  path: string | undefined;
  links: string[];
}

export const ProductoPageLayout = ({path, links}: ProductoPageLayoutProps) => {
  const search = new URLSearchParams(useLocation().search).get("query");

  if (!path) return <div>error</div>;

  return (
    <Layout>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-4 grid-rows-[100px,1fr]">
        <div className="col-span-4 flex items-center justify-between">
          <ul className="flex gap-2">
            <li>
              <Link to={"/"}>Incio</Link>
            </li>
            <span>/</span>
            <li className="capitalize">{path}</li>
          </ul>
          <select className="border-2 border-black" id="" name="">
            <option value="1">Más viejo a más nuevo</option>
            <option value="">Más nuevo a más viejo</option>
            <option value="">Precio mayor a menor</option>
            <option value="">Precio menor a mayor</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl capitalize">{path}</p>
          <ul>
            {links.map((link) => {
              return (
                <li key={link}>
                  <Link className="capitalize" to={`/productos/${path}/${link.toLowerCase()}`}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-3">
          <ListaProductos category={path} search={search} />
        </div>
      </div>
    </Layout>
  );
};

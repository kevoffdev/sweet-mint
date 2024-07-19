import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

import {SortBy} from "../types";

import {ListaProductos} from "./ListaProductos";
import {Layout} from "./Layout";
import {SortBySelect} from "./SortBySelect";

interface ProductoPageLayoutProps {
  path: string | undefined;
  links: string[];
}

export const ProductoPageLayout = ({path, links}: ProductoPageLayoutProps) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.OLDTONEW);
  const search = new URLSearchParams(useLocation().search).get("query");

  const onChange = (value: SortBy) => {
    setSortBy(value);
  };

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
          <SortBySelect onChange={onChange} />
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
          <ListaProductos category={path} search={search} sortBy={sortBy} />
        </div>
      </div>
    </Layout>
  );
};

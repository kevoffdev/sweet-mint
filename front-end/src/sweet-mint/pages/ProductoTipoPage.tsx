import {Link, useLocation, useParams} from "react-router-dom";
import {useState} from "react";

import {Layout} from "../components/Layout";
import {ListaProductos} from "../components/ListaProductos";
import {SortBySelect} from "../components/SortBySelect";
import {SortBy} from "../types";

export const CategoryTipoPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.OLDTONEW);

  const onChange = (value: SortBy) => {
    setSortBy(value);
  };
  const {category, type} = useParams();
  const search = new URLSearchParams(useLocation().search).get("query");

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
              <Link to={`/productos/${category}/${type}`}>{type}</Link>
            </li>
          </ul>
          <SortBySelect onChange={onChange} />
        </div>
        <div>
          <ListaProductos category={category} search={search} sortBy={sortBy} type={type} />
        </div>
      </div>
    </Layout>
  );
};

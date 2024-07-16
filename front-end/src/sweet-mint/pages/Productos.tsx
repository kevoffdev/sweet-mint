import {useLocation} from "react-router-dom";

import {ProductoPageLayout} from "../components/ProductoCategory";
import {categoriasProductos} from "../../data/links.json";

export const Productos = () => {
  const {pathname} = useLocation();
  const path = pathname.replace("/", "");

  return <ProductoPageLayout links={categoriasProductos} path={path} />;
};

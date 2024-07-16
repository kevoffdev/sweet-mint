import {useParams} from "react-router-dom";

import {ProductoPageLayout} from "../components/ProductoCategory";
import {linksProductos} from "../../data/links.json";

export const CategoryPage = () => {
  const {category} = useParams();

  return <ProductoPageLayout links={linksProductos} path={category} />;
};

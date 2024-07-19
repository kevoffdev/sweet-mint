import {useMemo} from "react";
import {Link, useLocation} from "react-router-dom";

import products from "../../data/productos.json";
import {ArrowDown} from "../iconsSvg/icons";
import {SortBy} from "../types/index";
import {useDebounce} from "../hooks/useDebounce";
import {getProductsSorted} from "../../helpers/getProductsSorted";

interface ListaProductosProps {
  category?: string;
  type?: string;
  search?: string | null;
  sortBy?: SortBy;
}

export const ListaProductos = ({category, type, search, sortBy}: ListaProductosProps) => {
  const {pathname} = useLocation();

  const debouncedSearch = useDebounce(search, 500);

  const productsFiltered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category !== "productos" ? product.categoria === category : true;
      const searchMatch = debouncedSearch
        ? product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;
      const typeMatch = type ? product.tipo === type : true;

      return categoryMatch && typeMatch && searchMatch;
    });
  }, [category, type, debouncedSearch]);

  const productsSorted = sortBy ? getProductsSorted(sortBy, productsFiltered) : productsFiltered;

  return (
    <>
      {productsSorted.length === 0 ? (
        <div className="m-5 text-center text-xl font-thin">No se encontraron productos</div>
      ) : (
        <div>
          <section className="my-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-content-center place-items-center gap-10">
            {productsSorted.map((product) => {
              const title = product.title.toLowerCase().split(" ").join("-");

              return (
                <article
                  key={product.id}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <Link
                    className="relative inline-block h-64 w-64"
                    to={`/productos/${product.categoria}/${product.tipo}/${title}`}
                  >
                    {product.quantity > 0 === false && (
                      <span className="z-5 absolute z-10 flex h-full w-full items-center justify-center font-bold">
                        SIN STOCK
                      </span>
                    )}
                    <img
                      alt={product.image}
                      className={`h-full w-full object-contain ${product.quantity > 0 ? "" : "opacity-50"}`}
                      src={product.image}
                    />
                  </Link>
                  <Link
                    className="hover:underline hover:decoration-1"
                    to={`/productos/${product.categoria}/${product.tipo}/${title}`}
                  >
                    {product.title}
                  </Link>
                  <span>${product.price}</span>
                </article>
              );
            })}
          </section>
          {pathname === "/" ? (
            <div className="mb-10 text-center">
              <Link className="bg-black px-8 py-3 uppercase text-white" to="/productos">
                Ver más
              </Link>
            </div>
          ) : (
            <div className="m-16 flex items-center justify-center">
              <button className="flex items-center justify-center bg-black px-8 py-3 text-white">
                {<ArrowDown size={5} />}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

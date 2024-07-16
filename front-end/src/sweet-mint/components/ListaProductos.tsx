import {useMemo} from "react";

import productos from "../../data/productos.json";

interface ListaProductosProps {
  category?: string;
  tipo?: string;
}

export const ListaProductos = ({category, tipo}: ListaProductosProps) => {
  const productosFiltered = useMemo(() => {
    return productos.filter((producto) => {
      const categoryMatch = category !== "productos" ? producto.categoria === category : true;

      const tipoMatch = tipo ? producto.tipo === tipo : true;

      return categoryMatch && tipoMatch;
    });
  }, [category, tipo]);

  return (
    <section className="place-items- my-10 grid grid-cols-4 gap-14">
      {productosFiltered.map((producto, i) => {
        return (
          <article key={i} className="text-center">
            <img alt={producto.image} className="h-56 w-56 object-contain" src={producto.image} />
            <p>{producto.title}</p>
            <span>${producto.price}</span>
          </article>
        );
      })}
    </section>
  );
};

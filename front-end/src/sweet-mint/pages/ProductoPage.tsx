import {Link, useParams} from "react-router-dom";
import {useState} from "react";

import {Layout} from "../components/Layout";
import products from "../../data/productos.json";
import {useCart} from "../hooks/useCart";

export const ProductoPage = () => {
  const [count, setCount] = useState<"" | number>(1);
  const {addProduct, productsCart} = useCart();
  const {name, type, category} = useParams();

  const productNameSanitized = name?.split("-").join(" ");
  const product = products.find((product) => product.title.toLowerCase() === productNameSanitized);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const productCart = productsCart[product?.id];

  const stockAvailabe = productCart ? product.quantity - productCart.quantity : product.quantity;
  const stock = product.quantity > 0 && stockAvailabe > 0;

  const handleClickAddProductCart = ({id, quantity}: {id: number; quantity: number | ""}) => {
    if (quantity === "" || quantity > stockAvailabe || quantity <= 0) return;
    addProduct({id, quantity});
    setCount(1);
  };

  const handleClickSum = () => {
    if (count === "") return;
    if (count === stockAvailabe || stockAvailabe <= 0) return;
    setCount(count + 1);
  };
  const handleClickMinus = () => {
    if (count === "") return;

    if (count <= 1) return;
    setCount(count - 1);
  };

  return (
    <Layout>
      <article className="mx-auto my-16 grid max-w-6xl grid-cols-[1fr,1fr] gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <img alt={product.title} className="h-20 w-20 object-cover" src={product?.image} />
            <img
              alt={product.title}
              className="h-[420px] w-[420px] object-contain"
              src={product?.image}
            />
          </div>
          <p>Goma blanda rellena, sabor frutal</p>
        </div>
        <section className="flex flex-col gap-4 px-12">
          <ul className="flex flex-wrap">
            <Link className="after:m-2 after:content-['/']" to={"/"}>
              Incio
            </Link>
            <Link
              className="capitalize after:m-2 after:content-['/']"
              to={`/productos/${category}`}
            >
              {category}
            </Link>
            <Link
              className="capitalize after:m-2 after:content-['/']"
              to={`/productos/${category}/${type}`}
            >
              {type}
            </Link>
            <li>{product.title}</li>
          </ul>
          <p className="text-4xl">{product.title}</p>
          <span className="text-2xl font-bold">${product.price}</span>
          <div className="flex flex-col gap-2">
            {stock && (
              <>
                <p>Ver formas de pago</p>
                <label className="" htmlFor="quantity">
                  <p>
                    Cantidad:
                    <strong className="text-sm">
                      {stockAvailabe <= 0 ? "SIN STOCK" : stockAvailabe}
                    </strong>
                  </p>
                </label>
                <div className="flex gap-3">
                  <button className="border bg-black px-6 text-white" onClick={handleClickMinus}>
                    -
                  </button>
                  <input
                    className="w-full border border-slate-400 p-2 text-center outline-none"
                    type="number"
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value === "" ? "" : Number(e.target.value));
                    }}
                  />
                  <button className="border bg-black px-6 text-white" onClick={handleClickSum}>
                    +
                  </button>
                </div>
              </>
            )}
            <button
              className={`w-full ${!stock ? "border-2 border-black text-black" : "bg-black text-white"} p-3`}
              disabled={!stock}
              type="button"
              onClick={() => handleClickAddProductCart({id: product.id, quantity: count})}
            >
              {!stock ? "SIN STOCK" : "AGREGAR AL CARRITO"}
            </button>
          </div>
        </section>
      </article>
    </Layout>
  );
};

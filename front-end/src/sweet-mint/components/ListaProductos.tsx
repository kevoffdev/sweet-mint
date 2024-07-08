import lata from "../../assets/images/lata.webp";

export const ListaProductos = () => {
  const arr = Array.from({length: 12}, () => ({
    image: lata,
    title: "Warheads Manzana verde",
    price: `${Math.ceil(Math.random() * 10)}.200,00`,
  }));

  return (
    <section className="mx-auto my-10 grid w-full max-w-6xl grid-cols-4 place-items-center">
      {arr.map((image, i) => {
        return (
          <article key={i} className="p-2">
            <img alt="" className="h-60 w-60" src={image.image} />
            <p>{image.title}</p>
            <span>${image.price}</span>
          </article>
        );
      })}
    </section>
  );
};

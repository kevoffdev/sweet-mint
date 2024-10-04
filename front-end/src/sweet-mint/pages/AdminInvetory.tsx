import {useState} from "react";
import "../../adminstyle.css";

const AdminInventory = () => {
  const [products, setProducts] = useState<{name: string; price: number; quantity: number}[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState<number | "">("");
  const [productQuantity, setProductQuantity] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || productPrice === "" || productQuantity === "") return;

    const newProduct = {
      name: productName,
      price: Number(productPrice),
      quantity: Number(productQuantity),
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
  };

  return (
    <div className="inventory-page">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <span className="text-xl">Sweet Mint</span>
        <h1 className="">Panel de Administración</h1>
        <button className="text-xl font-medium text-red-500" type="button">
          SALIR
        </button>
      </header>

      <main className="admin-panel">
        <div className="inventory-grid">
          <section className="product-form">
            <h2>Gestión de Productos</h2>
            <form id="add-product-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="product-name">Nombre del Producto:</label>
                <input
                  required
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Precio:</label>
                <input
                  required
                  id="product-price"
                  min="0"
                  step="0.01"
                  type="number"
                  value={productPrice}
                  onChange={(e) =>
                    setProductPrice(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-quantity">Cantidad:</label>
                <input
                  required
                  id="product-quantity"
                  min="0"
                  type="number"
                  value={productQuantity}
                  onChange={(e) =>
                    setProductQuantity(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
              </div>
              <button className="add-btn" type="submit">
                Agregar Producto
              </button>
            </form>
          </section>

          <section className="inventory-list">
            <h2>Inventario Actual</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <footer>
        <p>Panel de Administración de Inventario</p>
      </footer>
    </div>
  );
};

export default AdminInventory;

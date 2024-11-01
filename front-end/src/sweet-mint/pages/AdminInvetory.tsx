import {useEffect, useState} from "react";

import "../../adminstyle.css";
import {useAuth} from "../hooks/useAuth";
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from "../../api/products";
import {ProductModal} from "../modals/ProductModal";
import {useModal} from "../hooks/useModal";

export interface IProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  type: string;
  image: string;
  quantity: number;
}

const AdminInventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productForm, setProductForm] = useState({
    title: "",
    price: "" as number | "",
    category: "",
    type: "",
    image: "",
    quantity: "" as number | "",
  });
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const {isModalOpen, openModal, closeModal} = useModal();

  const {logoutUser, profile} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: name === "price" || name === "quantity" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {title, price, quantity} = productForm;

    if (!title || price === "" || quantity === "") return;

    const newProduct = {
      id: crypto.randomUUID(),
      title: productForm.title,
      price: Number(productForm.price),
      category: productForm.category,
      type: productForm.type,
      image: productForm.image,
      quantity: Number(productForm.quantity),
    };

    const data = await createProductRequest(newProduct);

    if (!data.ok) return console.log(data);

    setProductForm({title: "", price: "", category: "", type: "", image: "", quantity: ""});
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleClickDeleteProduct = async (id: IProduct["id"]) => {
    const data = await deleteProductRequest(id);

    if (!data.ok) return;
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleEditProduct = async (productUpdate: Partial<IProduct>, id: IProduct["id"]) => {
    const data = await updateProductRequest(id, productUpdate);

    if (!data.ok) return;
    setProducts((preValues) => {
      const newProducts = [...preValues].map((product) => {
        if (product.id === id) {
          return {...product, ...productUpdate};
        }

        return product;
      });

      return newProducts;
    });
    closeEditModal();
  };

  const handleModalEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    openModal();
  };

  const closeEditModal = () => {
    closeModal();
    setSelectedProduct(null);
  };

  useEffect(() => {
    async function getProduct() {
      const data = await getProductsRequest();

      if (data.ok) {
        setProducts(data.products);
      }
    }
    getProduct();
  }, []);

  return (
    <div className="inventory-page">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl">Sweet Mint</span>
          <div className="flex gap-2 text-lg">
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </div>
        </div>
        <h1>Panel de Administración</h1>
        <button className="text-xl font-medium text-red-500" type="button" onClick={logoutUser}>
          SALIR
        </button>
      </header>

      <main className="admin-panel">
        <div className="inventory-grid">
          <section className="product-form">
            <h2>Gestión de Productos</h2>
            <form id="add-product-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="product-title">Nombre del Producto:</label>
                <input
                  required
                  id="product-title"
                  name="title"
                  type="text"
                  value={productForm.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Precio:</label>
                <input
                  required
                  id="product-price"
                  min="0"
                  name="price"
                  step="0.01"
                  type="number"
                  value={productForm.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-category">Categoria:</label>
                <input
                  required
                  id="product-category"
                  name="category"
                  type="text"
                  value={productForm.category}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-type">Tipo:</label>
                <input
                  required
                  id="product-type"
                  name="type"
                  type="text"
                  value={productForm.type}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-image">Imagen:</label>
                <input
                  required
                  id="product-image"
                  name="image"
                  type="text"
                  value={productForm.image}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-quantity">Cantidad:</label>
                <input
                  required
                  id="product-quantity"
                  min="0"
                  name="quantity"
                  type="number"
                  value={productForm.quantity}
                  onChange={handleChange}
                />
              </div>
              <button className="add-btn" type="submit">
                Agregar
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
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Imagen</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.type}</td>
                    <td>{product.image.slice(0, 5)}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleModalEditProduct(product)}>
                        Editar
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleClickDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        {isModalOpen && selectedProduct != null && (
          <ProductModal
            closeEditModal={closeEditModal}
            handleEditProduct={handleEditProduct}
            product={selectedProduct}
          />
        )}
      </main>
      <footer>
        <p>Panel de Administración de Inventario</p>
      </footer>
    </div>
  );
};

export default AdminInventory;

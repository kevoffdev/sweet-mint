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
import {getOrderItemsRequest, getOrdersRequest, IOrder, IOrderItem} from "../../api/orders";

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
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersItems, setOrdersItems] = useState<IOrderItem[]>([]);

  const {logoutUser, profile} = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
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

    if (!data.ok) return;

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

  const openOrderDetails = async (order: IOrder) => {
    const data = await getOrderItemsRequest(order.order_id);

    console.log(data);
    if (data.ok) {
      setOrdersItems(data.items);

      setSelectedOrder(order);
    }
  };

  const handleModalEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    openModal();
  };

  const closeEditModal = () => {
    closeModal();
    setSelectedProduct(null);
  };
  const closeOrderDetails = () => {
    setOrdersItems([]);
    setSelectedOrder(null);
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

  useEffect(() => {
    async function getOrders() {
      const data = await getOrdersRequest();

      console.log(data.orders);
      if (data.ok) {
        const orders = data.orders.map((order) => {
          if (order.order_date) {
            const dateTime = order.order_date;
            const [date, time] = dateTime.split("T");
            const formattedDateTime = `${date} ${time.split(".")[0]}`; // Resultado: "2024-11-08 05:39:58"

            return {...order, order_date: formattedDateTime};
          }

          return order;
        });

        setOrders(orders);
      }
    }
    getOrders();
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
                <label htmlFor="category">Categoria:</label>
                <div className="grid grid-cols-3">
                  <label className="flex items-center">
                    Nacional
                    <input
                      name="category"
                      type="radio"
                      value="nacionales"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex items-center">
                    Importado
                    <input
                      name="category"
                      type="radio"
                      value="importados"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="product-type">Tipo:</label>
                <select
                  required
                  id="product-type"
                  name="type"
                  value={productForm.type}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Snack">Snack</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Varios">Varios</option>
                </select>
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
                  // onChange={handleImageUpload}
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
                    <td className="h-8 w-8">
                      <img alt={product.title} src={product.image} />
                    </td>
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
          <section className="order-report">
            <h2>Reporte de pedidos</h2>
            <table>
              <thead>
                <tr>
                  <th>Codigo de pedido</th>
                  <th>Fecha y hora</th>
                  <th>Estatus</th>
                  <th>Id del cliente</th>
                  <th>Total</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.status}</td>
                    <td>{order.user_id}</td>
                    <td>${order.total_amount}</td>
                    <td>
                      <button onClick={() => openOrderDetails(order)}>Ver detalles</button>
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
        {selectedOrder && (
          <div className="modal">
            <div className="modal-content">
              <h2>Detalles del Pedido: {selectedOrder?.order_id}</h2>
              <p>
                <strong>Fecha:</strong> {selectedOrder?.order_date}
              </p>
              <p>
                <strong>Estatus:</strong> {selectedOrder?.status}
              </p>

              {ordersItems.map((item) => (
                <div key={item.product_id} className="flex gap-2">
                  <p>
                    <strong>Producto:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Precio:</strong>${item.price}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {item.quantity}
                  </p>
                </div>
              ))}

              <p>
                <strong>Total:</strong> ${selectedOrder?.total_amount}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button className="btn-confirm">Confirmar</button>
                <button className="btn-cancelate">Cancelar pedido</button>
                <button className="btn-close" onClick={closeOrderDetails}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>Panel de Administración de Inventario</p>
      </footer>
    </div>
  );
};

export default AdminInventory;

import {FormEvent, useState} from "react";

import {IProduct} from "../pages/AdminInvetory";

export const ProductModal = ({
  product,
  closeEditModal,
  handleEditProduct,
}: {
  product: IProduct;
  closeEditModal: () => void;
  handleEditProduct: (product: Partial<IProduct>, id: IProduct["id"]) => void;
}) => {
  const [productForm, setProductForm] = useState(product);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;

    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: name === "price" || name === "quantity" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const {title} = productForm;

    if (!title) return;
    const updatedFields = Object.entries(productForm).reduce((changes, [key, value]) => {
      if (product[key as keyof IProduct] !== value) {
        changes[key as keyof IProduct] = value;
      }
      //   if (changes[key as keyof IProduct] === "price") {
      //   }

      return changes;
    }, {} as Partial<IProduct>);

    if (Object.entries(updatedFields).length === 0) return;
    handleEditProduct(updatedFields, product.id);
  };

  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
      id="crud-modal"
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Create New Product</h3>
            <button
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="crud-modal"
              type="button"
              onClick={closeEditModal}
            >
              <svg
                aria-hidden="true"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="flex flex-col items-center p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="title">
                  Nombre del producto:
                </label>
                <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  id="title"
                  name="title"
                  type="text"
                  value={productForm.title}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="price">
                  Precio:
                </label>
                <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  id="price"
                  min="0"
                  name="price"
                  step="0.01"
                  type="number"
                  value={productForm.price}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="category">
                  Categoria:
                </label>
                <div className="grid grid-cols-2">
                  <label className="flex items-center">
                    Nacional
                    <input
                      checked={productForm.category === "nacionales"}
                      name="category"
                      type="radio"
                      value="nacionales"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex items-center">
                    Importado
                    <input
                      checked={productForm.category === "importados"}
                      name="category"
                      type="radio"
                      value="importados"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="type">
                  Tipo:
                </label>
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
                {/* <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  id="type"
                  name="type"
                  type="text"
                  value={productForm.type}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="image">
                  Imagen:
                </label>
                <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  id="image"
                  name="image"
                  type="text"
                  value={productForm.image}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="quantity">
                  Cantidad:
                </label>
                <input
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  id="quantity"
                  min="0"
                  name="quantity"
                  step="0.01"
                  type="number"
                  value={productForm.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Editar producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import {Navigate, Route, Routes} from "react-router-dom";

import {Home} from "../sweet-mint/pages/Home";
import {Productos} from "../sweet-mint/pages/Productos";
import {CategoryPage} from "../sweet-mint/pages/CategoryPage";
import {CategoryTipoPage} from "../sweet-mint/pages/ProductoTipoPage";
import {ProductoPage} from "../sweet-mint/pages/ProductoPage";

export const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route element={<Home />} path="/" />
        <Route element={<Productos />} path="/productos" />
        <Route element={<CategoryPage />} path="/productos/:category" />

        <Route element={<CategoryTipoPage />} path="/productos/:category/:type" />
        <Route element={<ProductoPage />} path="/productos/:category/:type/:name" />
        <Route element={<Navigate to="/" />} path="/*" />
      </>
    </Routes>
  );
};

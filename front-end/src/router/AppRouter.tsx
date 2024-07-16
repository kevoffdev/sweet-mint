import {Navigate, Route, Routes} from "react-router-dom";

import {Home} from "../sweet-mint/pages/Home";
import {Productos} from "../sweet-mint/pages/Productos";
import {CategoryPage} from "../sweet-mint/pages/CategoryPage";
import {CategoryTipoPage} from "../sweet-mint/pages/ProductoTipoPage";

export const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route element={<Home />} path="/" />
        <Route element={<Productos />} path="/productos" />
        <Route element={<CategoryPage />} path="/productos/:category" />

        <Route element={<CategoryTipoPage />} path="/productos/:category/:tipo" />

        <Route element={<Navigate to="/" />} path="/*" />
      </>
    </Routes>
  );
};

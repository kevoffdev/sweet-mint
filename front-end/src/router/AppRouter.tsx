import {Navigate, Route, Routes} from "react-router-dom";
import {useEffect} from "react";

import {Home} from "../sweet-mint/pages/Home";
import {Productos} from "../sweet-mint/pages/Productos";
import {CategoryPage} from "../sweet-mint/pages/CategoryPage";
import {CategoryTipoPage} from "../sweet-mint/pages/ProductoTipoPage";
import {ProductoPage} from "../sweet-mint/pages/ProductoPage";
import {useAuth} from "../sweet-mint/hooks/useAuth";
import {Status} from "../sweet-mint/types";
import AdminInventory from "../sweet-mint/pages/AdminInvetory";

export const AppRouter = () => {
  const {checkAuthToken, status} = useAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);
  if (status === Status.Checking) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <>
        {status === Status.Authenticated ? (
          <>
            <Route element={<AdminInventory />} path="/panel/admin" />
            <Route element={<Navigate to="/panel/admin" />} path="/*" />
          </>
        ) : (
          <>
            <Route element={<Home />} path="/" />
            <Route element={<Productos />} path="/productos" />
            <Route element={<CategoryPage />} path="/productos/:category" />
            <Route element={<CategoryTipoPage />} path="/productos/:category/:type" />
            <Route element={<ProductoPage />} path="/productos/:category/:type/:name" />
            <Route element={<Navigate to="/" />} path="/*" />
          </>
        )}
      </>
    </Routes>
  );
};

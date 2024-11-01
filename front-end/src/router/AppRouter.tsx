import {Navigate, Route, Routes} from "react-router-dom";
import {useEffect} from "react";

import {Home} from "../sweet-mint/pages/Home";
import {Products} from "../sweet-mint/pages/Products";
import {CategoryPage} from "../sweet-mint/pages/CategoryPage";
import {CategoryTipoPage} from "../sweet-mint/pages/ProductTypePage";
import {ProductPage} from "../sweet-mint/pages/ProductPage";
import {useAuth} from "../sweet-mint/hooks/useAuth";
import {AUTH_ROLE, Status} from "../sweet-mint/types";
import AdminInventory from "../sweet-mint/pages/AdminInvetory";

export const AppRouter = () => {
  const {checkAuthToken, status, profile} = useAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === Status.Checking) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <>
        {status === Status.Authenticated && profile.role === AUTH_ROLE.ADMIN ? (
          <>
            <Route element={<AdminInventory />} path="/panel/admin" />
            <Route element={<Navigate to="/panel/admin" />} path="/*" />
          </>
        ) : (
          <>
            <Route element={<Home />} path="/" />
            <Route element={<Products />} path="/productos" />
            <Route element={<CategoryPage />} path="/productos/:category" />
            <Route element={<CategoryTipoPage />} path="/productos/:category/:type" />
            <Route element={<ProductPage />} path="/productos/:category/:type/:name" />
            <Route element={<Navigate to="/" />} path="/*" />
          </>
        )}
      </>
    </Routes>
  );
};

import {Navigate, Route, Routes} from "react-router-dom";

import {Home} from "../sweet-mint/pages/Home";
import {Productos} from "../sweet-mint/pages/Productos";

export const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route element={<Home />} path="/" />

        <Route element={<Productos />} path="/productos" />
        <Route element={<Navigate to="/" />} path="/*" />
      </>
    </Routes>
  );
};

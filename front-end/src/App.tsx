import {HashRouter} from "react-router-dom";

import {AppRouter} from "./router/AppRouter";
import {CartProvider} from "./sweet-mint/context/Cart";
import {AuthProvider} from "./sweet-mint/context/Auth";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;

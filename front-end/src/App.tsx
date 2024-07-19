import {HashRouter} from "react-router-dom";

import {AppRouter} from "./router/AppRouter";
import {CartProvider} from "./sweet-mint/context/Cart";

function App() {
  return (
    <>
      <HashRouter>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </HashRouter>
    </>
  );
}

export default App;

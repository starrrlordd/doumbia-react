import CartContextProvider from "./store/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import {
  WindowSizeContext,
  WindowSizeProvider,
} from "./store/windowSize-context";
import AuthProvider from "./store/auth-context";
import AppRoutes from "./AppRoutes";
import { LoadingProvider } from "./store/loading-context";

const App = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartContextProvider>
          <WindowSizeProvider>
            <Router>
              <AppRoutes />
            </Router>
          </WindowSizeProvider>
        </CartContextProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;

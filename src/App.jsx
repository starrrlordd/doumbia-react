import CartContextProvider from "./store/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import { WindowSizeContext, WindowSizeProvider } from "./store/windowSize-context";
import AuthProvider from "./store/auth-context";
import AppRoutes from "./AppRoutes";


const App = () => {
  return (
    <AuthProvider>
      <CartContextProvider>
        <WindowSizeProvider>
          <Router>
            <AppRoutes />
          </Router>
        </WindowSizeProvider>
      </CartContextProvider>
    </AuthProvider>
  );
};

export default App;

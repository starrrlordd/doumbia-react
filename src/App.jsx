import CartContextProvider from "./store/cart-context";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Contact from "./pages/Contact";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import ProductInfoPage from "./components/shop/ProductInfoPage";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import ForgottenPassword from "./pages/Auth/ForgottenPassword";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WindowSizeProvider } from "./store/windowSize-context";
import AuthProvider from "./store/auth-context";

import AccountLayout from "./pages/Account/AccountLayout";
import PersonalInfo from "./pages/Account/PersonalInfo";
import Orders from "./pages/Account/Orders";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <CartContextProvider>
        <WindowSizeProvider>
          <Router>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/Shop" element={<Shop />} />

              <Route path="/Cart" element={<Cart />} />

              <Route path="/Login" element={<Login />} />

              <Route path="/Contact" element={<Contact />} />

              <Route path="/product/:id" element={<ProductInfoPage />} />

              <Route path="/SignUp" element={<SignUp />}></Route>

              <Route
                path="/ForgottenPassword"
                element={<ForgottenPassword />}
              ></Route>

              <Route
                path="Admin/AdminAddProduct"
                element={<AdminAddProduct />}
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AccountLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PersonalInfo />} />
                <Route path="personal" element={<PersonalInfo />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </WindowSizeProvider>
      </CartContextProvider>
    </AuthProvider>
  );
};

export default App;

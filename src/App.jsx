import React from "react";
import CartContextProvider from "./store/cart-context";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import ProductInfoPage from "./components/shop/ProductInfoPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import { WindowSizeProvider } from "./store/windowSize-context";

const App = () => {
  return (
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

            <Route path="Admin/AdminAddProduct" element={<AdminAddProduct />} />
          </Routes>
          <Footer />
        </Router>
      </WindowSizeProvider>
    </CartContextProvider>
  );
};

export default App;

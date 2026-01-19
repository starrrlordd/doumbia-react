import { useContext } from "react";
import { WindowSizeContext } from "./store/windowSize-context";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgottenPassword from "./pages/Auth/ForgottenPassword";
import Contact from "./pages/Contact";
import ProductInfoPage from "./components/shop/ProductInfoPage";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import AccountLayout from "./pages/Account/AccountLayout";
import { Routes, Route } from "react-router-dom";
import AccountOverview from "./pages/Account/AccountOverview";
import ContactDetails from "./pages/Account/ContactDetails";
import Orders from "./pages/Account/Orders";
import AccountSettings from "./pages/Account/AccountSettings";
import Footer from "./components/layout/Footer";

const AppRoutes = () => {
  const { isMobileSize } = useContext(WindowSizeContext);

  return (
    <>
      <ScrollToTop />
      <Header />

       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotten-password" element={<ForgottenPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductInfoPage />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={isMobileSize ? <AccountOverview /> : <ContactDetails />}
          />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="account-settings" element={<AccountSettings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;

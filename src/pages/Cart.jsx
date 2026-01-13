import { useContext } from "react";
import { CartContext } from "../store/cart-context";
// import { Outlet } from "react-router-dom";

import Card from "../components/UI/Card";

import classes from "./Cart.module.css";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import BlackButton from "../components/UI/BlackButton";
import WhiteButton from "../components/UI/WhiteButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Cart = () => {
  const { cart: ctxCartItems, clearCart } = useContext(CartContext);

  console.log(ctxCartItems.length);

  const navigate = useNavigate();

  const proceedToCheckoutHandler = () => {
    if (ctxCartItems.length < 1 ) return; 
          
    const user = auth.currentUser;

    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout");
    }
  };

  return (
    <div className={classes.cart}>
      <h1>Shopping Cart</h1>
      <div className={classes.container}>
        <Card>
          {ctxCartItems.length === 0 && (
            <p className={classes.emptyCart}>Your cart is empty</p>
          )}
          {<CartItem cart={ctxCartItems} />}
        </Card>
        <CartSummary className={classes.cartSummary} />
        {ctxCartItems.length > 0 && (
          <div className={classes.actions}>
            <BlackButton
              className={classes.actionButton}
              onClick={proceedToCheckoutHandler}
            >
              Proceed to checkout
            </BlackButton>
            <WhiteButton className={classes.actionButton} onClick={clearCart}>
              Clear cart
            </WhiteButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

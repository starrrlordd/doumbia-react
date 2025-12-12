import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../store/cart-context";

import Card from "../components/UI/Card";

import classes from "./Cart.module.css";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";


const Cart = () => {
  const {
    cart: ctxCartItems,
  } = useContext(CartContext);

  return (
    <div className={classes.cart}>
      <h1>Shopping Cart</h1>
      <div className={classes.container}>
        <Card>
          {ctxCartItems.length === 0 && <p className={classes.emptyCart}>Your cart is empty</p>}
          {<CartItem cart={ctxCartItems} />}
        </Card>
        <CartSummary className={classes.cartSummary} />
      </div>
    </div>
  );
};

export default Cart;

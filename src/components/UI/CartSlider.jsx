import { useContext, useState } from "react";
import { CartContext } from "../../store/cart-context";

import BlackButton from "./BlackButton";

import classes from "./CartSlider.module.css";

const CartSlider = () => {
  const { cart, removeItem, total, isCartOpen, closeCart } =
    useContext(CartContext);

  return (
    <>
      {isCartOpen && <div className={classes.backdrop} onClick={closeCart} />}
      <div
        className={`${classes.cartSlider} ${isCartOpen ? classes.open : ""}`}
      >
        <div className={classes.cartHead}>
          <h2>Shopping Cart</h2>
          <BlackButton onClick={closeCart}>Close</BlackButton>
        </div>

        {cart.length === 0 ? (
          <p className={classes.emptyCart}>Your cart is empty </p>
        ) : (
          <>
            <ul className={classes.cartItem}>
              {cart.map((item) => (
                <li className={classes.li} key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className={classes.description}>
                    <p>{item.name}</p>
                    <div>¢{item.price}</div>
                  </div>
                  <div className={classes.quantity}>({item.quantity})</div>
                  <div className={classes.actions}>
                    <BlackButton
                      onClick={() => removeItem(item.id)}
                      className={classes.remove}
                    >
                      Remove
                    </BlackButton>
                    <div className={classes.totalPrice}>
                      ¢{item.price * item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h4>Total: ¢{total}</h4>
          </>
        )}
      </div>
    </>
  );
};

export default CartSlider;

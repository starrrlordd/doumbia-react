import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

import BlackButton from "../UI/BlackButton";
import WhiteButton from "../UI/WhiteButton";
import classes from "./CartSummary.module.css";

const CartSummary = (className) => {
  const {clearCart, cart, total} = useContext(CartContext);

  console.log(cart); 

  return (
    <div className={`${className} ${classes.cartSummary}`}>
      <div className={classes.total}>
        <h2>Total: ¢{total}</h2>
      </div>
      <div className={classes.actions}>
        <BlackButton className={classes.actionButton}>
          Proceed to checkout
        </BlackButton>
        <WhiteButton className={classes.actionButton} onClick={clearCart}>Clear Cart</WhiteButton>
      </div>
    </div>
  );
};

export default CartSummary;

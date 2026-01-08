import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

import classes from "./CartSummary.module.css";

const CartSummary = (className) => {
  const { total } = useContext(CartContext);

  

  return (
    <div className={`${className} ${classes.cartSummary}`}>
      <div className={classes.total}>
        <h2>Total: ¢{total}</h2>
      </div>

    </div>
  );
};

export default CartSummary;

import { useEffect } from "react";
import classes from "./CartItem.module.css";
import BlackButton from "../UI/BlackButton";
import { CartContext } from "../../store/cart-context";
import { useContext } from "react";

const CartItem = () => {
  const { cart, removeItem, increaseCart, decreaseCart } = useContext(CartContext);

  const cartItems = cart;

  console.log(cartItems);
  

  return (
    <ul className={classes.cartItem}>
      {cartItems.map((item) => (
        <li className={classes.li} key={item.id}>
          <div className={classes.details}>
            <img src={item.image} alt={item.name} />
            <div className={classes.description}>
              <p>{item.name}</p>
              <div>¢{item.price}</div>
            </div>
            <div className={classes.controls}>
              <button onClick={() => decreaseCart(item.id)}>-</button>
              <div className={classes.quantity}>{item.quantity}</div>
              <button onClick={() => increaseCart(item.id)}>+</button>
            </div>
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItem;

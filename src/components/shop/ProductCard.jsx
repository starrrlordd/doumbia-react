import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { CartContext } from "../../store/cart-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import classes from "./ProductCard.module.css";

const ProductCard = ({ product, cardBoxType }) => {
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <NavLink to={`/product/${product.id}`} className={classes.cardLink}>
      <div className={`${classes.card} ${classes[cardBoxType]}`}>
        <img src={product.image} alt={product.name} className={classes.image} />
        {cardBoxType !== "card3" && (
          <div className={classes.details}>
            <div className={classes.extra}>
              <p className={classes.name}>{product.name}</p>
              <div className={classes.addButton} onClick={addToCartHandler} role="button" aria-label="Add to cart">
                <FontAwesomeIcon icon={faPlus} className={classes.icon} />
              </div>
            </div>
            <p className={classes.price}>¢{product.price}</p>
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default ProductCard;

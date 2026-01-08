import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../store/cart-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import classes from "./ProductCard.module.css";

const ProductCard = ({ product, cardBoxType }) => {
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product)
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={classes.cardLink}
    >
      <div className={`${classes.card} ${classes[cardBoxType]}`}>
        <img src={product.image} alt={product.name} className={classes.image} />
        {cardBoxType !== "card3" && (
          <div className={classes.details}>
            <div className={classes.extra}>
              <p className={classes.name}>{product.name}</p>
              <button
                className={classes.addButton}
                onClick={addToCartHandler}
              >
                <FontAwesomeIcon icon={faPlus} className={classes.icon} />
              </button>
            </div>
            <p className={classes.price}>¢{product.price}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;

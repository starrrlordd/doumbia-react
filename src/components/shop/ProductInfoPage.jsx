import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CartContext } from "../../store/cart-context";
import classes from "./ProductInfoPage.module.css";
import BlackButton from "../UI/BlackButton";
import CartSlider from "../UI/CartSlider";

const ProductInfoPage = () => {
  const location = useLocation();

  console.log(location)

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const db = getFirestore();

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [db, id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <CartSlider />
      <div className={classes.productPage}>
        <button onClick={() => navigate(-1)} className={classes.closeBtn}>
          Back
        </button>
        <div className={classes.left}>
          <img
            src={product.image}
            alt={product.name}
            className={classes.image}
          />
        </div>

        <div className={classes.proDescription}>
          <h2 className={classes.name}>{product.name}</h2>
          <p className={classes.price}>¢{product.price}</p>

          {product.category && (
            <p className={classes.category}>Category: {product.category}</p>
          )}

          {product.description && (
            <p className={classes.description}>{product.description}</p>
          )}

          <BlackButton
            onClick={() => addToCart(product)}
            className={classes.cartBtn}
          >
            Add to Cart
          </BlackButton>
        </div>
      </div>
    </>
  );
};

export default ProductInfoPage;

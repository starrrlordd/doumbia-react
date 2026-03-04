import { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { auth } from "../firebase";
import {  sendEmailVerification } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import FilterBar from "../components/shop/FilterBar";
import ProductItems from "../components/shop/ProductItems";
import Newsletter from "../components/layout/Newsletter";
import CartSlider from "../components/UI/CartSlider";

import classes from "./Shop.module.css";
import BlackButton from "../components/UI/BlackButton";
import { LoadingContext } from "../store/loading-context";

const Shop = () => {
  const PRODUCTS_PER_PAGE = 8;
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(null);

  const {isLoading, showLoading, hideLoading} = useContext(LoadingContext)

  const [products, setProducts] = useState([]);

  const filterBarItems = [
    "Inventory",
    "Tshirts",
    "Jeans",
    "Joggers",
    "Cargos",
    "Shorts",
    "Khaki",
  ];

  const user = auth.currentUser;

  const verifiedUser = user ? user.emailVerified : false;

  const { cart } = useContext(CartContext);

  const [gridColumns, setGridColumns] = useState(2);

  const [cardBox, setCardBox] = useState("card2");

  const [status, setStatus] = useState("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Inventory");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGridChange = (num) => {
    setGridColumns(num);
    setCardBox(`card${num}`);
  };

  const handleCardBoxType = () => {
    console.log("gridColumns");
  };

  const onFilterSelect = (item) => {
    setSelectedCategory(item);
  };

  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const urlCategory = params.get("category");

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory || "Inventory");
    }
  }, [urlCategory]);

  const db = getFirestore();

  const fetchProducts = async (reset = false) => {
    showLoading();

    let q;

    if (selectedCategory === "Inventory") {
      q =
        reset || !lastDoc
          ? query(
              collection(db, "products"),
              orderBy("createdAt"),
              limit(PRODUCTS_PER_PAGE),
            )
          : query(
              collection(db, "products"),
              orderBy("createdAt"),
              startAfter(lastDoc),
              limit(PRODUCTS_PER_PAGE),
            );
    } else {
      q =
        reset || !lastDoc
          ? query(
              collection(db, "products"),
              where("category", "==", selectedCategory),
              orderBy("createdAt"),
              limit(PRODUCTS_PER_PAGE),
            )
          : query(
              collection(db, "products"),
              where("category", "==", selectedCategory),
              orderBy("createdAt"),
              startAfter(lastDoc),
              limit(PRODUCTS_PER_PAGE),
            );
    }

    const snapshot = await getDocs(q);

    const loaded = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts((prev) => (reset ? loaded : [...prev, ...loaded]));

    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === PRODUCTS_PER_PAGE);
    hideLoading();
  };

  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    setHasMore(true);
    fetchProducts(true);
  }, [selectedCategory]);

  const verifyEmailHandler = async () => {
    if (!user) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      await sendEmailVerification(user);
      setStatus("success");
      setIsModalVisible(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={classes.shop}>
      <CartSlider />

      <FilterBar
        items={filterBarItems}
        onFilterSelect={onFilterSelect}
        onGridChange={handleGridChange}
        handleCardBoxType={handleCardBoxType}
        isActive={selectedCategory}
      />

      {user && !verifiedUser && (
        <div className={classes.verifyEmail}>
          <button
            className={classes.verifyEmailButton}
            onClick={verifyEmailHandler}
            disabled={status === "sending" || user.emailVerified}
          >
            {status === "sending" ? "sending..." : "Verify Email"}
          </button>

          {status === "success" && isModalVisible && (
            <div className={classes.modal}>
              <div className={classes.modalContent}>
                <p>
                  {" "}
                  The requested link has been dispatched to your email. If it
                  does not arrive within a few minutes, please check your spam
                  folder.
                </p>
                <button
                  className={classes.closeModalButton}
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <p className={classes.textRed}>Error: {errorMessage}</p>
          )}
        </div>
      )}

      <ProductItems
        products={products}
        layoutClass={`grid-${gridColumns}`}
        cardBoxType={cardBox}
      />

      {hasMore && !isLoading && (
        <div className={classes.loadMore}>
          <BlackButton onClick={() => fetchProducts()}>
            Load more products
          </BlackButton>
        </div>
      )}

      <Newsletter />
    </div>
  );
};

export default Shop;

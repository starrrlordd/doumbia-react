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
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import FilterBar from "../components/shop/FilterBar";
import ProductItems from "../components/shop/ProductItems";
import Newsletter from "../components/layout/Newsletter";
import CartSlider from "../components/UI/CartSlider";

import classes from "./Shop.module.css";
import BlackButton from "../components/UI/BlackButton";

const Shop = () => {
  const PRODUCTS_PER_PAGE = 8;
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [isVerifiedUser, setIsVerifiedUser] = useState(false);

  const filterBarItems = [
    "Inventory",
    "Tshirts",
    "Jeans",
    "Shirts",
    "Joggers",
    "Cargos",
    "Sleeveless",
    "Sweaters",
    "Hoodies",
    "Shorts",
    "Khaki",
  ];

  const user = auth.currentUser;

  const verifiedUser = user ? user.emailVerified : false;

  console.log(verifiedUser)

  const { cart } = useContext(CartContext);

  const [gridColumns, setGridColumns] = useState(2);

  const [cardBox, setCardBox] = useState("card2");

  const handleGridChange = (num) => {
    console.log(num);
    setGridColumns(num);
    setCardBox(`card${num}`);
    console.log(cardBox);
  };

  const handleCardBoxType = () => {
    console.log("gridColumns");
  };

  const [selectedCategory, setSelectedCategory] = useState("Inventory");

  // const filteredProducts =
  //   selectedCategory === "Inventory"
  //     ? products
  //     : products.filter((item) => item.category === selectedCategory);

  const onFilterSelect = (item) => {
    setSelectedCategory(item);
    console.log(`${item} is active`);
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
    setIsLoading(true);

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
    setIsLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    setHasMore(true);
    fetchProducts(true);
  }, [selectedCategory]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsVerifiedUser(user.emailVerified);
      } else {
        setIsVerifiedUser(false);
      }
    })

    return () => unsubscribe();
  }, [] )

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
          <NavLink>Verify your email</NavLink>
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

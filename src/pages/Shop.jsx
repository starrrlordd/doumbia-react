import { useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import FilterBar from "../components/shop/FilterBar";
import ProductItems from "../components/shop/ProductItems";
import Newsletter from "../components/layout/Newsletter";
import CartSlider from "../components/UI/CartSlider";

import classes from "./Shop.module.css";

// import tShirt from "../assets/images/products/tshirts/img7.jpg";
// import BlackButton from "../components/UI/BlackButton";

const Shop = () => {
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
    "Caps",
  ];

  const { cart } = useContext(CartContext);

  // console.log(cart);

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

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("Inventory");

  const filteredProducts =
    selectedCategory === "Inventory"
      ? products
      : products.filter((item) => item.category === selectedCategory);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const loadedProducts = [];

        querySnapshot.forEach((doc) => {
          loadedProducts.push({ id: doc.id, ...doc.data() });
        });

        setProducts(loadedProducts);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products from database : ", error);
      }
    };

    fetchProducts();
  }, [db]);
  // console.log(products);

  const location = useLocation();

  console.log(location.state);

  useEffect(() => {
    return () => {
      sessionStorage.setItem("shopScrollY", window.scrollY.toString());
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const savedScrollY = sessionStorage.getItem("shopScrollY");

    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollY ? Number(savedScrollY) : 0);
    });
  }, [isLoading]);

  return (
    <div className={classes.shop}>
      <CartSlider />

      <FilterBar
        items={filterBarItems}
        onFilterSelect={onFilterSelect}
        onGridChange={handleGridChange}
        handleCardBoxType={handleCardBoxType}
      />

      <ProductItems
        products={filteredProducts}
        layoutClass={`grid-${gridColumns}`}
        cardBoxType={cardBox}
      />

      <Newsletter />
    </div>
  );
};

export default Shop;

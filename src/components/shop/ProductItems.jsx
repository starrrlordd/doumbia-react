import React from "react";
import ProductCard from "./ProductCard";
import classes from "./ProductItems.module.css";

const ProductItems = ({ products, layoutClass, cardBoxType }) => {
  
  return (
    <ul className={`${classes.grid} ${classes[layoutClass]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cardBoxType={cardBoxType}
        />
      ))}
    </ul>
  );
};

export default ProductItems;

import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import classes from "./AdminAddProduct.module.css";
import BlackButton from "../../components/UI/BlackButton";

const AdminAddProduct = () => {
  const categoryOptions = [
    "Tshirts",
    "Jeans",
    "Shirts",
    "Joggers",
    "Jackets",
    "Cargos",
    "Sleeveless",
    "Sweaters",
    "Hoodies",
    "Shorts",
  ];

  const [enteredName, setEnteredName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [enteredStock, setEnteredStock] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const imageURLChangeHandler = (event) => {
    setImageURL(event.target.value);
  };

  const stockChangeHandler = (event) => {
    setEnteredStock(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const productData = {
      name: enteredName,
      price: Number(enteredPrice),
      stock: Number(enteredStock),
      category: enteredCategory,
      image: imageURL,
      createdAt: serverTimestamp(),
    };

    if (
      !enteredName ||
      !enteredPrice ||
      !enteredStock ||
      !enteredCategory ||
      !imageURL
    ) {
      alert("Fill all input fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), productData);
      alert("Product added to database");

      setEnteredName("");
      setEnteredPrice("");
      setEnteredStock("");
      setEnteredCategory("");
      setImageURL("");
    } catch (error) {
      console.error("There was an error adding product to database: ", error);
      alert("Failed to add product to database");
    }
  };

  return (
    <div className={classes.admin}>
      <h1>Add Products (Admin)</h1>

      <form className={classes.form} onSubmit={formSubmitHandler}>
        <label htmlFor="enterName">Product Name</label>
        <input
          id="enterName"
          type="text"
          placeholder="Enter Product Name"
          value={enteredName}
          onChange={nameChangeHandler}
        />

        <label htmlFor="enterPrice">Product Price</label>
        <input
          id="enterPrice"
          type="number"
          placeholder="Enter Product Price"
          value={enteredPrice}
          onChange={priceChangeHandler}
        />

        <label htmlFor="enterStock">Product stock</label>
        <input
          id="enterStock"
          type="number"
          placeholder="Enter stock quantity"
          value={enteredStock}
          onChange={stockChangeHandler}
        />

        <label htmlFor="selectCategory">Product Category</label>
        <select
          id="selectCategory"
          value={enteredCategory}
          onChange={categoryChangeHandler}
        >
          <option>Choose an option</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="productImage">Image URL</label>
        <input
          id="productImage"
          type="text"
          placeholder="Enter Image URL"
          value={imageURL}
          onChange={imageURLChangeHandler}
        />

        <BlackButton type="submit">Add Product</BlackButton>
      </form>
    </div>
  );
};

export default AdminAddProduct;

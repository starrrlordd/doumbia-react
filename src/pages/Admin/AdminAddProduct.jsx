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
    "Khaki",
  ];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const { name, price, stock, category, image } = formData;

    if (!name || !price || !stock || !category || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      image,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "products"), productData);
      alert("Product added successfully!");

      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className={classes.admin}>
      <h1>Add Products (Admin)</h1>

      <form className={classes.form} onSubmit={formSubmitHandler}>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Product Price</label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter Product Price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="stock">Product Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter Stock Quantity"
          value={formData.stock}
          onChange={handleInputChange}
        />

        <label htmlFor="category">Product Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Choose an option</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="text"
          placeholder="Enter Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />

        <BlackButton type="submit">Add Product</BlackButton>
      </form>
    </div>
  );
};

export default AdminAddProduct;

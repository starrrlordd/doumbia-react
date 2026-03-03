import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/cart-context";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import BlackButton from "../components/UI/BlackButton";

import classes from "./Checkout.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const { cart, total: subtotal } = useContext(CartContext);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    region: "Greater Accra",
    city: "",
    delivery: "0",
  });

  const total = parseFloat(subtotal) + parseFloat(formData.delivery);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      if (!user) return;

      try {
        const detailsRef = doc(
          db,
          "users",
          user.uid,
          "userDelivery",
          "details",
        );
        const detailsSnapshot = await getDoc(detailsRef);

        if (detailsSnapshot.exists()) {
          const userDetails = detailsSnapshot.data();

          setFormData({
            name: userDetails.name || "",
            surname: userDetails.surname || "",
            email: userDetails.email || "",
            phone: userDetails.phone || "",
            region: userDetails.region || "Greater Accra",
            city: userDetails.city || "",
            delivery: userDetails.delivery || "0",
          });
        }
      } catch (error) {
        console.error("Failed to fetch delivery details: ", error);
      }
    };

    fetchDeliveryDetails();
  }, [user]);

  const handleChekoutSubmission = async (event) => {
    event.preventDefault();

    if (cart.length < 1) {
      alert("Your cart is empty");
      return;
    }

    const { name, surname, email, phone, region, city, delivery } = formData;

    if (!name || !surname || !email || !phone || !region || !city) {
      alert("Please fill in all required fields");
      return;
    }

    const userDelivery = {
      name,
      surname,
      email,
      phone,
      region,
      city,
      delivery,
      createdAt: new Date(),
    };

    try {
      const deliveryRef = doc(db, "users", user.uid, "userDelivery", "details");
      await setDoc(deliveryRef, userDelivery);
      navigate("/Payment");
    } catch (error) {
      console.error("Failed to save delivery details", error);
      alert("Failed to save delivery details. Please try again");
    }
  };

  return (
    <div className={classes.checkout}>
      <Card className={classes.deliveryMethod}>
        <div className={classes.navigation}>
          <p>Delivery</p>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>Payment</p>
          <FontAwesomeIcon icon={faAngleRight} />

          <p>Confirmation</p>
        </div>
        <h3 className={classes.address}>Delivery Method</h3>

        <form onSubmit={handleChekoutSubmission}>
          <div className={classes.method}>
            <input
              type="radio"
              name="delivery"
              value="25"
              checked={formData.delivery === "25"}
              onChange={handleInputChange}
              id="express"
            />
            <label htmlFor="express">Express Delivery - ¢25.00</label>
          </div>
          <div className={classes.method}>
            <input
              type="radio"
              name="delivery"
              value="0"
              checked={formData.delivery === "0"}
              onChange={handleInputChange}
              id="weekend"
            />
            <label htmlFor="weekend">Weekend Delivery - Free</label>
          </div>
          <div className={classes.deliveryDetails}>
            <h3>Delivery details</h3>

            <Input
              type="text"
              placeholder="Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
            />
            <Input
              type="text"
              placeholder="Surname"
              id="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
              autoComplete="surnname"
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />
            <Input
              type="phone"
              placeholder="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              autoComplete="tel"
            />

            <select
              className={classes.region}
              id="region"
              value={formData.region}
              onChange={handleInputChange}
              required
              autoComplete="address-level1"
            >
              <option value="Select Region" disabled required>
                Select Region
              </option>
              <option value="Greater Accra">Greater Accra</option>
            </select>

            <Input
              type="text"
              placeholder="City/ Town "
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              autoComplete="address-level2"
            />
          </div>

          <BlackButton className={classes.paymentButton}>
            Continue to Payment
          </BlackButton>
        </form>
      </Card>

      <aside className={classes.aside}>
        <Card className={classes.shoppingBag}>
          <h3>Your shopping bag</h3>
          <div className={classes.promoCode}>
            <Input type="text" placeholder="Promotional Code" />
            <BlackButton className={classes.promoButton}>Apply</BlackButton>
          </div>

          <p className={classes.bagInfo} style={{ marginTop: "30px" }}>
            Subtotal <span>¢{subtotal.toFixed(2)}</span>{" "}
          </p>
          <p className={classes.bagInfo}>
            Discount <span>¢0.00</span>{" "}
          </p>
          <p className={classes.bagInfo}>
            Delivery <span>¢{formData.delivery}</span>{" "}
          </p>

          <p className={classes.bagInfo}>
            Total <span>¢{total.toFixed(2)}</span>
          </p>

          <div className={classes.bagSummary}>
            <h2>Items ({cart.length})</h2>

            <ul>
              {cart.map((item) => (
                <li className={classes.items} key={item.id}>
                  <img src={item.image} className={classes.itemImage} />
                  <div className={classes.itemsOthers}>
                    <div>
                      <p>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p>¢{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </aside>
    </div>
  );
};

export default Checkout;

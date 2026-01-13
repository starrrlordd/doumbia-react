import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";

import Card from "../components/UI/Card";
import WhiteButton from "../components/UI/WhiteButton";
import BlackButton from "../components/UI/BlackButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./Payment.module.css";

import visa from "../assets/images/icons/visa.jpg";
import mastercard from "../assets/images/icons/mastercard.png";
import mtn from "../assets/images/icons/mtn.jpeg";
import telecel from "../assets/images/icons/telecel.jpg";
import airtelTigo from "../assets/images/icons/airtelTigo.png";

const Payment = () => {
  const [payment, setPayment] = useState("cash");
  const [showButton, setShowButton] = useState(false);
  const { cart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const user = auth.currentUser;

  const choosePaymentHandler = (event) => {
    setPayment(event.target.value);
    console.log(payment);

    const paymentMethod = payment;

    if (paymentMethod == "unavailable") {
      setShowButton(false);
    } else if (paymentMethod == "cash") {
      setShowButton(true);
    }
    console.log(paymentMethod);
  };

  const confirmOrderHandler = async () => {
    if (!user || cart.length === 0) return;

    const deliveryRef = doc(db, "users", user.uid, "userDelivery", "details");
    const deliverySnapshot = await getDoc(deliveryRef);

    console.log(deliverySnapshot.data());

    const cartRef = collection(db, "users", user.uid, "cart");
    const cartSnapshot = await getDocs(cartRef);

    const totalCartAmount = cartSnapshot.docs.reduce((sum, doc) => {
      const item = doc.data();
      console.log(item);
      return sum + item.price * item.quantity;
    }, 0);
    console.log(totalCartAmount);

    const deliveryDetails = deliverySnapshot.data();
    const deliveryFee = parseFloat(deliveryDetails.delivery);
    console.log(deliveryFee);

    const totalAmount = totalCartAmount + deliveryFee;

    const orderData = {
      items: cart,
      delivery: {
        name: deliveryDetails.name,
        surname: deliveryDetails.surname,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone,
        region: deliveryDetails.region,
        city: deliveryDetails.city,
        fees: deliveryFee,
      },
      totalAmount,
      status: "pending",
      createdAt: Timestamp.now(),
    };

    try {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const orderDoc = await addDoc(ordersRef, orderData);

      console.log("Order Created: ", orderDoc.id);
      console.log(totalAmount);
      navigate(`/order-confirmation/${orderDoc.id}`);
    } catch (error) {
      console.error("Order failed: ", error);
    }
    clearCart();
  };

  return (
    <div className={classes.payment}>
      <Card className={classes.paymentCard}>
        <div className={classes.navigation}>
          <p>Delivery</p>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>Payment</p>
          <FontAwesomeIcon icon={faAngleRight} />

          <p>Confirmation</p>
        </div>
        <div className={classes.paymentSoon}>
          <div className={classes.paymentInput}>
            <input
              type="radio"
              name="soon"
              value="unavailable"
              id="unavailable"
              checked={payment === "unavailable"}
              onChange={choosePaymentHandler}
            />
            <label htmlFor="soon">
              <div className={classes.iconImage}>
                <img src={visa} />
                <img src={mastercard} />
                <img src={mtn} />
                <img src={telecel} />
                <img src={airtelTigo} />
                <p>(Coming soon)</p>
              </div>
            </label>
          </div>

          <div className={classes.paymentInput}>
            <input
              type="radio"
              name="cash"
              value="cash"
              id="cash"
              onChange={choosePaymentHandler}
              checked={payment === "cash"}
            />
            <label htmlFor="cash">Cash on delivery</label>
          </div>
        </div>
        <div className={classes.confirmOrderButton}>
          <WhiteButton onClick={() => navigate("/checkout")}>Back</WhiteButton>

          <BlackButton onClick={confirmOrderHandler} disabled={showButton}>
            Confirm your order
          </BlackButton>
        </div>
      </Card>
    </div>
  );
};

export default Payment;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import { usePaystackPayment } from "react-paystack";

import { auth, db } from "../firebase";
import { collection, doc, getDoc, addDoc, Timestamp } from "firebase/firestore";

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

const PAYMENT_METHODS = {
  PAYSTACK: "paystack",
  CASH: "cash",
};

const Payment = () => {
  const [payment, setPayment] = useState("paystack");
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const totalCartAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const choosePaymentHandler = (event) => {
    setPayment(event.target.value);
  };

  const saveOrderToFirebase = async (paymentStatus, reference = "CASH") => {
    try {
      if (!user) throw new Error("User not authenticated");

      const deliveryRef = doc(db, "users", user.uid, "userDelivery", "details");
      const deliverySnapshot = await getDoc(deliveryRef);

      if (!deliverySnapshot.exists()) {
        throw new Error("Delivery details not found");
      }

      const deliveryDetails = deliverySnapshot.data();
      const deliveryFee = parseFloat(deliveryDetails.delivery);
      const totalAmount = totalCartAmount + deliveryFee;

      const orderData = {
        items: cart,
        delivery: { ...deliveryDetails, fees: deliveryFee },
        totalAmount,
        paymentMethod: payment,
        paymentStatus: paymentStatus,
        orderStatus: "pending",
        reference: reference,
        createdAt: Timestamp.now(),
      };

      const ordersRef = collection(db, "users", user.uid, "orders");
      const orderDoc = await addDoc(ordersRef, orderData);

      clearCart();
      navigate(`/order-confirmation/${orderDoc.id}`);
    } catch (error) {
      console.error("Order failed: ", error);
      alert("Something went wrong saving your order");
    }
  };

  const confirmOrderHandler = async () => {
    if (!user) {
      alert("You must be logged in to place an order");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (payment === PAYMENT_METHODS.PAYSTACK) {
      try {
        const deliveryRef = doc(
          db,
          "users",
          user.uid,
          "userDelivery",
          "details",
        );
        const deliverySnapshot = await getDoc(deliveryRef);

        if (!deliverySnapshot.exists()) {
          throw new Error("Delivery details not found");
        }

        const deliveryFee = parseFloat(deliverySnapshot.data().delivery);
        const finalTotal = (totalCartAmount + deliveryFee) * 100;

        const config = {
          reference: new Date().getTime().toString(),
          email: user.email,
          amount: finalTotal,
          publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
          currency: "GHS",
        };

        const initializePayment = usePaystackPayment(config);

        initializePayment(
          (reference) => saveOrderToFirebase("paid", reference.reference),
          () => console.log("Payment closed"),
        );
        saveOrderToFirebase("success");
      } catch (error) {
        console.error("Payment initialization failed: ", error.message);
        alert("Failed to initialize payment. Please try again");
      }
    } else {
      saveOrderToFirebase("pending");
    }
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
              name="payment"
              value={PAYMENT_METHODS.PAYSTACK}
              id="paystack"
              checked={payment === PAYMENT_METHODS.PAYSTACK}
              onChange={choosePaymentHandler}
            />
            <label htmlFor="soon">
              <div className={classes.iconImage}>
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="Mastercard" />
                <img src={mtn} alt="MTN" />
                <img src={telecel} alt="Telecel" />
                <img src={airtelTigo} alt="AirtelTigo" />
              </div>
            </label>
          </div>

          <div className={classes.paymentInput}>
            <input
              type="radio"
              name="payment"
              value={PAYMENT_METHODS.CASH}
              id="cash"
              onChange={choosePaymentHandler}
              checked={payment === PAYMENT_METHODS.CASH}
            />
            <label htmlFor="cash">Cash on delivery</label>
          </div>
        </div>
        <div className={classes.confirmOrderButton}>
          <WhiteButton onClick={() => navigate("/checkout")}>Back</WhiteButton>

          <BlackButton onClick={confirmOrderHandler}>
            {payment === PAYMENT_METHODS.PAYSTACK ? "Pay Now" : "Confirm Order"}
          </BlackButton>
        </div>
      </Card>
    </div>
  );
};

export default Payment;

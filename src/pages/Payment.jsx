import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/cart-context";

import { auth, db } from "../firebase";
import { collection, doc, getDoc, addDoc, Timestamp } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

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
import { LoadingContext } from "../store/loading-context";

const PAYMENT_METHODS = {
  PAYSTACK: "paystack",
  CASH: "cash",
};

const Payment = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const {showLoading, hideLoading} = useContext(LoadingContext);

  const functions = getFunctions();
  const createCashOrder = httpsCallable(functions, "createCashOrder");
  const initializePayment = httpsCallable(functions, "initializePayment");
  const verifyPayment = httpsCallable(functions, "verifyPayment");

  const choosePaymentHandler = (event) => {
    setPayment(event.target.value);
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
      showLoading();

      try {
        const response = await initializePayment();

        window.location.href = response.data.data.authorization_url;
      } catch (error) {
        console.error("Payment initialization failed: ", error);
        alert("Failed to initialize payment.");
      }
    } else {
      try {
        const result = await createCashOrder();

        if (result.data.success) {
          navigate(`/order-confirmation/${result.data.orderId}`)
        }
      } catch (error) {
        console.error("Cash order failed: ", error);
        alert("Failed to place order");
      } finally {
        hideLoading();
      }
    }
  };

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference");

      if (!reference) return;

      try {
        const result = await verifyPayment({ reference });

        if (result.data.success) {
          navigate(`/order-confirmation/${result.data.orderId}`);
        }
      } catch (error) {
        console.error("Verification failed: ", error);
        alert("Payment verification failed");
      }
    };
    
    verify();
  }, []);

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

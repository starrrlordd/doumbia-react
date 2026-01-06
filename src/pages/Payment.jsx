import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import WhiteButton from "../components/UI/WhiteButton";
import BlackButton from "../components/UI/BlackButton";

import classes from "./Payment.module.css";

import visa from "../assets/images/icons/visa.jpg";
import mastercard from "../assets/images/icons/mastercard.png";
import mtn from "../assets/images/icons/mtn.jpeg";
import telecel from "../assets/images/icons/telecel.jpg";
import airtelTigo from "../assets/images/icons/airtelTigo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

console.log(telecel);

const Payment = () => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cash");

  const choosePaymentHandler = (event) => {
    setPayment(event.target.value);
  };

  const confirmOrderHandler = () => {
    console.log("Order confirmed with payment method:", payment);

    navigate("/orderconfirmation")
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
          <BlackButton onClick={confirmOrderHandler}>
            Confirm your order
          </BlackButton>
        </div>
      </Card>
    </div>
  );
};

export default Payment;

import { useNavigate, useParams } from "react-router-dom";

import classes from "./OrderConfirmation.module.css";

import Card from "../components/UI/Card";
import BlackButton from "../components/UI/BlackButton";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const {orderId} = useParams();

  console.log(orderId);

  return (
    <div className={classes.orderConfirmation}>
      <Card className={classes.confirmationCard}>
        <h1>Thank you for your order!</h1>
        <p>
          You will be contacted via your information you provided to ensure safe
          and effective delivery
        </p>

        <div className={classes.orderNumber}>
          <p>
            Order Number: #<strong>{orderId}</strong>{" "}
          </p>
          <p>
            Estimated Delivery: <strong>Sat - Sunday 9am - 4pm</strong>
          </p>
        </div>

        <div className={classes.buttonWrapper}>
            <BlackButton className={classes.continueShopping} onClick={() => navigate("/Shop")}>Continue shopping</BlackButton>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;

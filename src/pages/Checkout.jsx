import Card from "../components/UI/Card";
import Input from "../components/UI/Input";

import classes from "./Checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartContext } from "../store/cart-context";
import BlackButton from "../components/UI/BlackButton";

const Checkout = () => {
  const { cart, total: subtotal } = useContext(CartContext);

  const [delivery, setDelivery] = useState("0");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("Select Region");
  const [city, setCity] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setSurname(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };

  const regionChangeHandler = (event) => {
    setRegion(event.target.value);
  };

  const deliveryChangeHandler = (event) => {
    setDelivery(event.target.value);
  };

  const cityChangleHandler = (event) => {
    setCity(event.target.value);
  };

  const total = parseFloat(subtotal) + parseFloat(delivery);

  const checkoutSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(name, surname, email, phone, region, city);
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

        <form onSubmit={checkoutSubmissionHandler}>
          <div className={classes.method}>
            <input
              type="radio"
              name="delivery"
              value="25"
              checked={delivery === "25"}
              onChange={deliveryChangeHandler}
              id="express"
            />
            <label htmlFor="express">Express Delivery - ¢25.00</label>
          </div>
          <div className={classes.method}>
            <input
              type="radio"
              name="delivery"
              value="0"
              checked={delivery === "0"}
              onChange={deliveryChangeHandler}
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
              value={name}
              onChange={nameChangeHandler}
            />
            <Input
              type="text"
              placeholder="Surname"
              id="surname"
              value={surname}
              onChange={surnameChangeHandler}
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={emailChangeHandler}
            />
            <Input
              type="phone"
              placeholder="Phone Number"
              id="phone"
              value={phone}
              onChange={phoneChangeHandler}
            />

            <select
              className={classes.region}
              id="region"
              value={region}
              onChange={regionChangeHandler}
            >
              <option value="Select Region" disabled>
                Select Region
              </option>
              <option value="Greater Accra">Greater Accra</option>
            </select>

            <Input
              type="text"
              placeholder="City/ Town "
              id="city"
              value={city}
              onChange={cityChangleHandler}
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
            Subtotal <span>¢{subtotal}</span>{" "}
          </p>
          <p className={classes.bagInfo}>
            Discount <span>¢0</span>{" "}
          </p>
          <p className={classes.bagInfo}>
            Delivery <span>¢{delivery}</span>{" "}
          </p>

          <p className={classes.bagInfo}>
            Total <span>¢{total}</span>
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

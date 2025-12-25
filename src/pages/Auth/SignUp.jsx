import { NavLink } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";

import classes from "./SignUp.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid)),
        {
          email,
          phone,
          createdAt: new Date(),
        };

      console.log("User created: ", user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.signUp}>
      <h1>Create your account</h1>

      <div>
        <form className={classes.signUpForm} onSubmit={signUpHandler}>
          <label htmlFor="email"></label>
          <Input
            placeholder="E-mail"
            id="email"
            type="text"
            value={email}
            onChange={emailChangeHandler}
            className={classes.inputInput}
          />

          <label htmlFor="password"></label>
          <Input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            className={classes.inputInput}
          />

          <label htmlFor="phone"></label>
          <Input
            placeholder="Phone"
            id="phone"
            type="tel"
            value={phone}
            onChange={phoneChangeHandler}
            className={classes.inputInput}
          />

          <label className={classes.offers}>
            <input type="checkbox" id="offers" /> I would like 10% off my next
            purchase, plus personalized offers, news and the latest trends
          </label>

          <BlackButton className={classes.createAccount}>
            Create account
          </BlackButton>
        </form>
      </div>

      <div className={classes.haveAccount}>
        <p>Already have an account?</p>
        <span>
          <NavLink to="/Login" className={classes.haveLogin}>
            Login
          </NavLink>
        </span>
      </div>

      <div className={classes.tAndC}>
        <p>
          By creating an account and subscribing, you confirm that you have read
          our <span className={classes.bold}>privacy policy</span> and accept
          our <span className={classes.bold}>terms and conditions</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

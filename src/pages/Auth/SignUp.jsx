import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";

import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";

import classes from "./SignUp.module.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SignUp = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const [signupSuccess, setSignupSuccess] = useState(false);

  const inputChangeHandler = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const validateSignup = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (data.phone.length < 10) {
      errors.phone = "Phone must be at least 10 digits";
    } else if (data.phone.length > 10) {
      errors.phone = "Phone must not be more than 10 digits";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(data.password)) {
      errors.password = "Password must include at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(data.password)) {
      errors.password = "Password must include at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(data.password)) {
      errors.password = "Password must include at least one number";
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    setIsDisabled(true);

    const validationErrors = validateSignup(signupData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsDisabled(false);
      return; // Stop execution if there are validation errors
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone: signupData.phone || null,
        createdAt: serverTimestamp(),
        emailVerified: false,
      });

      console.log("User created:", user.uid);

      setSignupSuccess(true);
    } catch (error) {
      console.error("Signup error: ", error.message);
      setErrors({ general: error.message });
    } finally {
      setIsDisabled(false);
    }
  };

  const returnToLoginHandler = () => {
    console.log("buttno clo")
    navigate("/login");
  }

  return (
    <div className={classes.signUp}>
      <h1>Create your account</h1>

      <div>
        <form className={classes.signUpForm} onSubmit={signUpHandler}>
          <label htmlFor="email"></label>
          <Input
            placeholder="E-mail"
            name="email"
            type="text"
            value={signupData.email}
            onChange={inputChangeHandler}
            className={classes.inputInput}
          />
          {errors.email && <p className={classes.error}>{errors.email}</p>}

          <label htmlFor="phone"></label>
          <Input
            placeholder="Phone"
            name="phone"
            type="tel"
            value={signupData.phone}
            onChange={inputChangeHandler}
            className={classes.inputInput}
          />
          {errors.phone && <p className={classes.error}>{errors.phone}</p>}

          <label htmlFor="password"></label>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={signupData.password}
            onChange={inputChangeHandler}
            className={classes.inputInput}
          />
          {errors.password && (
            <p className={classes.error}>{errors.password}</p>
          )}
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={signupData.confirmPassword}
            onChange={inputChangeHandler}
            className={classes.inputInput}
          />
          {errors.confirmPassword && (
            <p className={classes.error}>{errors.confirmPassword}</p>
          )}

          <label className={classes.offers}>
            <input type="checkbox" id="offers" /> I would like 10% off my next
            purchase, plus personalized offers, news and the latest trends
          </label>

          {!isDisabled && (
            <BlackButton className={classes.createAccount}>
              Create account
            </BlackButton>
          )}
          {isDisabled && (
            <BlackButton
              className={`${classes.createAccount} ${classes.createAccountDisabled}`}
            >
              Please wait...
            </BlackButton>
          )}
        </form>
      </div>


      {signupSuccess && (
        <div className={classes.cardOverlay}>
        <div className={classes.confirmSignup}>
          <Card className={classes.verifyCard}>
            <p>You have signed up successfully</p>
            <p>Please return to login</p>
            <div className={classes.returnButton}>
            <BlackButton onClick={returnToLoginHandler}>Return to Login</BlackButton>
            </div>
          </Card>
        </div>
      </div>
      )}            
      
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

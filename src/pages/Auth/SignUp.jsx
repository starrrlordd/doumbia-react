import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";

import classes from "./SignUp.module.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const [signupSuccess, setSignupSuccess] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const inputChangeHandler = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = (event) => {
    event.preventDefault();
    setIsConfirmVisible((prev) => !prev);
  };

  const validateSignup = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.firstname) {
      errors.firstname = "Name is required";
    }

    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (data.phone.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits";
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
      return; 
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
        firstname: signupData.firstname,
        phone: signupData.phone || null,
        createdAt: serverTimestamp(),
        emailVerified: false,
      });

      console.log("User created:", user.uid);

      setSignupSuccess(true);

      updateProfile(user, {
        displayName: signupData.firstname,
      });
    } catch (error) {
      console.error("Signup error: ", error.message);
      setErrors({ general: error.message });
    } finally {
      setIsDisabled(false);
    }
  };

  const returnToLoginHandler = () => {
    navigate("/login");
  };

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
          <label htmlFor="firstname"></label>
          <Input
            placeholder="Firstname"
            name="firstname"
            type="text"
            value={signupData.firstname}
            onChange={inputChangeHandler}
            className={classes.inputInput}
          />
          {errors.firstname && (
            <p className={classes.error}>{errors.firstname}</p>
          )}

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
          <div className={classes.passwordWrap}>
            <Input
              placeholder="Password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={signupData.password}
              onChange={inputChangeHandler}
              className={classes.inputInput}
            />

            <button
              className={classes.showPasswordInside}
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
            >
              <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
            </button>
          </div>

          {errors.password && (
            <p className={classes.error}>{errors.password}</p>
          )}
          <div className={classes.passwordWrap}>
            <Input
              placeholder="Confirm Password"
              name="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
              value={signupData.confirmPassword}
              onChange={inputChangeHandler}
              className={classes.inputInput}
            />
            <button
              className={classes.showPasswordInside}
              onClick={toggleConfirmPasswordVisibility}
              aria-label="Toggle password visibility"
            >
              <FontAwesomeIcon icon={isConfirmVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className={classes.error}>{errors.confirmPassword}</p>
          )}

          <label className={classes.offers}>
            <input type="checkbox" id="offers" /> I would like 10% off my next
            purchase, plus personalized offers, news and the latest trends
          </label>

          <BlackButton
            className={`${classes.createAccount} ${isDisabled ? classes.createAccountDisabled : ""}`}
            disabled={isDisabled}
          >
            {isDisabled ? "Please wait..." : "Create Account"}
          </BlackButton>
        </form>
      </div>

      {signupSuccess && (
        <div className={classes.cardOverlay}>
          <div className={classes.confirmSignup}>
            <Card className={classes.verifyCard}>
              <p>You have signed up successfully</p>
              <p>Please return to login</p>
              <div className={classes.returnButton}>
                <BlackButton onClick={returnToLoginHandler}>
                  Return to Login
                </BlackButton>
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

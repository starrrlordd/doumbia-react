import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useState } from "react";

import classes from "./Login.module.css";
import Input from "../../components/UI/Input";
import BlackButton from "../../components/UI/BlackButton";
import WhiteButton from "../../components/UI/WhiteButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState("");

  const [password, setPassword] = useState("");

  const user = auth.currentUser;

  const navigate = useNavigate();

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    setIsDisabled(true);
    setError("");
    setLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await user.reload();

      if (user.emailVerified) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().emailVerified === false) {
          await updateDoc(userRef, {
            emailVerified: true,
          });
        }
      }

      navigate("/shop", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Incorrect Email or Password");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later");
          break;
        default:
          console.log(error);
          setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
      setIsDisabled(false);
      setPassword("");
    }
  };

  return (
    <div className={classes.login}>
      <h4>Login</h4>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email" />
          <Input
            className={classes.inputText}
            placeholder="E-mail"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className={classes.passwordWrap}>
          <label htmlFor="password" />
          <Input
            className={`${classes.inputText} ${classes.inputInput} ${error ? classes.inputError : ""}`}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={isVisible ? "text" : "password"}
            name="password"
            required
          />
          <button
            type="button"
            className={classes.showPasswordInside}
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
            disabled={loading}
          >
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
          </button>
        </div>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.actions}>
          {/* <div className={classes.staySignedIn}>
            <input type="checkbox" id="staySignedIn" name="staySignedIn" />
            <label htmlFor="staySignedIn">Stay signed in</label>
          </div> */}
          {!isDisabled && <BlackButton type="submit">Login</BlackButton>}
          {isDisabled && (
            <BlackButton className={classes.loginButtonDisabled}>
              Please wait...
            </BlackButton>
          )}
        </div>
      </form>
      <NavLink to="/SignUp">
        <WhiteButton type="button" className={classes.createAccount}>
          Create an account
        </WhiteButton>
      </NavLink>
      <NavLink to="/forgotten-password">
        <p className={classes.forgottenPassword}>Forgotten your Password?</p>
      </NavLink>
    </div>
  );
};

export default Login;

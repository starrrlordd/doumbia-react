import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import classes from "./Login.module.css";
import Input from "../../components/UI/Input";
import BlackButton from "../../components/UI/BlackButton";
import WhiteButton from "../../components/UI/WhiteButton";

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    console.log(email);
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/shop", { replace: true });
    } catch (error) {
      console.error(error.message);
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
        <div>
          <label htmlFor="password" />
          <Input
            className={classes.inputText}
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <div className={classes.staySignedIn}>
            <input type="checkbox" id="staySignedIn" name="staySignedIn" />
            <label htmlFor="staySignedIn">Stay signed in</label>
          </div>
          <BlackButton type="submit">Login</BlackButton>
        </div>
      </form>
      <NavLink to="/SignUp">
        <WhiteButton type="button" className={classes.createAccount}>
          Create an account
        </WhiteButton>
      </NavLink>
      <NavLink to="/ForgottenPassword">
        <p className={classes.forgottenPassword}>Forgotten your Password?</p>
      </NavLink>
    </div>
  );
};

export default Login;

import classes from "./Login.module.css";
import Input from "../../components/UI/Input";
import BlackButton from "../../components/UI/BlackButton";
import WhiteButton from "../../components/UI/WhiteButton";
import ForgottenPassword from "./ForgottenPassword";

const Login = () => {
  return (
    <div className={classes.login}>
      <h4>Login</h4>
      <form>
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
        <div >
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
          <WhiteButton type="button">Create an account</WhiteButton>
        </div>
        <ForgottenPassword />
      </form>
    </div>
  );
};

export default Login;

import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import classes from "./ForgottenPassword.module.css";

const ForgottenPassword = () => {
  return (
    <div className={classes.forgottenPassword}>
      <h1>Forgotten your password?</h1>
      <p>
        Please enter your e-mail and we will send you a link to reset your
        password
      </p>
      <form className={classes.resetEmail}>
        <label htmlFor="email">
          <Input
            id="email"
            placeholder="E-mail"
            type="email"
            required
            className={classes.forgottenInput}
          />
        </label>
        <BlackButton className={classes.forgotSend}>Send</BlackButton>
      </form>
    </div>
  );
};

export default ForgottenPassword;

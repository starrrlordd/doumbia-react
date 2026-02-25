import { useState } from "react";
import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import { auth } from "../../firebase";
import classes from "./ForgottenPassword.module.css";

import { sendPasswordResetEmail } from "firebase/auth";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
    } catch (error) {
      console.error("Reset error: ", error);
      setStatus("error");

      if (error.code === "auth/user-not-found") {
        setErrorMsg("No account found with this email");
      } else {
        setErrorMsg("Failed to send reset email. Please try again");
      }
    }
  };

  return (
    <div className={classes.forgottenPassword}>
      <h1>Forgotten your password?</h1>
      <p>
        Please enter your e-mail and we will send you a link to reset your
        password
      </p>
      <form className={classes.resetEmail} onSubmit={resetPasswordHandler}>
        <label htmlFor="email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

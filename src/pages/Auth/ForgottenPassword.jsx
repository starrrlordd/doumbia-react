import { useState } from "react";
import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import classes from "./ForgottenPassword.module.css";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("idle"); 
      setIsModalVisible(true); 
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

  const closeModalHandler = () => {
    setIsModalVisible(false);
    setEmail(""); 
    setErrorMsg("");
  };

  return (
    <div className={classes.forgottenPassword}>
      <h1>Forgotten your password?</h1>
      <p>
        Please enter your e-mail and we will send you a link to reset your
        password
      </p>

      
      <form className={classes.resetEmail} onSubmit={resetPasswordHandler}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={classes.forgottenInput}
          disabled={status === "loading"}
        />
        <BlackButton
          className={classes.forgotSend}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Reset Link"}
        </BlackButton>

        {status === "error" && <p className={classes.errorText}>{errorMsg}</p>}
      </form>

      
      {isModalVisible && (
        <div className={classes.backdrop} onClick={closeModalHandler}>
          <div
            className={classes.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={classes.successText}>Success!</h3>
            <p>
              The requested link has been dispatched to your email. If it does
              not arrive within a few minutes, please check your spam folder.
            </p>
            <button
              className={classes.closeModalButton}
              onClick={closeModalHandler}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgottenPassword;

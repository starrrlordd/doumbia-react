import { useState } from "react";

import classes from "./Newsletter.module.css";
import Input from "../UI/Input";
import WhiteButton from "../UI/WhiteButton";

const Newsletter = () => {
  const [userMail, setUserMail] = useState("");

  const emailChangeHandler = (event) => {
    setUserMail(event.target.value)
  }

  const submitEmailHandler = (event) => {
    event.preventDefault();
    console.log(userMail)
  }

  return <div>
    <div className={classes.newsletterContainerParent}>
        <div className={classes["newsletter-container"]}>
          <h4>10% of your next purchase by subscribing to newsletter</h4>
          <form onSubmit={submitEmailHandler} className={classes["newsletter-form"]}>
            <Input 
              className={classes["newsletter-input"]}
              id="newsletter-input"
              type="text"
              placeholder="E-mail"
              onChange={emailChangeHandler}
            />
            <WhiteButton className={classes["newsletterButton"]}>Sign Up</WhiteButton>
          </form>
          <p className={classes.subscribing}>
            By Subscribing, you confirm that you have read the
            <span>
              <a href="#"> privacy policy</a>
            </span>
          </p>
        </div>
      </div>
  </div>;
};

export default Newsletter;

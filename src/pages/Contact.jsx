import { useState } from "react";
import BlackButton from "../components/UI/BlackButton";
import classes from "./Contact.module.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialState);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitUserForm = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialState);
  };

  return (
    <div>
      <div className={classes.contact}>
        <h4>Want to reach us?</h4>
        <p>Call us to place an order directly</p>
        <p>054-988-2629</p>
        <p>Or</p>
        <p>Fill out this form if we can help you with something else</p>
      </div>

      <form className={classes.contactForm} onSubmit={submitUserForm}>
        <div className={classes.fullName}>
          <label htmlFor="firstName" />
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="First name"
            onChange={inputChangeHandler}
            value={formData.firstName}
          />

          <label htmlFor="lastName" />
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Last name"
            onChange={inputChangeHandler}
            value={formData.lastName}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email" />
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="E-mail"
            onChange={inputChangeHandler}
            value={formData.email}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="phone" />
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="Phone number"
            onChange={inputChangeHandler}
            value={formData.phone}
          />
        </div>

        <label htmlFor="message" />
        <textarea
          id="message"
          name="message"
          rows="10"
          required
          placeholder="Tell us what we can help you with..."
          onChange={inputChangeHandler}
          value={formData.message}
        ></textarea>

        <BlackButton type="submit" className={classes.button}>
          Submit
        </BlackButton>
        <p>
          By contacting us you agree to our <span>terms of service</span> and{" "}
          <span>privacy policy</span>
        </p>
      </form>
    </div>
  );
};

export default Contact;

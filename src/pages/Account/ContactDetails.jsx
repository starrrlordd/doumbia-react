import { useState } from "react";

import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

import classes from "./ContactDetails.module.css";
import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";

const ContactDetails = () => {
  const user = auth.currentUser;

  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [enteredBirthdate, setEnteredBirthdate] = useState("");

  const nameChangerHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setEnteredSurname(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setSelectedGender(event.target.value);
  };

  const birthdateChangeHandler = (event) => {
    setEnteredBirthdate(event.target.value);
  };

  const contactDetailsSubmitHandler = async (event) => {
    event.preventDefault();

    const contactDetails = {
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      phone: enteredPhone,
      gender: selectedGender,
      birthdate: enteredBirthdate,
    };

    try {
      const contactRef = doc(db, "users", user.uid, "contactDetails", "details");

      await setDoc(contactRef, contactDetails);
    } catch (error) {
      console.error("couldnt save contact details: ", error);
    }
  };

  return (
    <div className={classes.contactDetails}>
      <h2>Contact Details</h2>

      <form
        onSubmit={contactDetailsSubmitHandler}
        className={classes.contactCard}
      >
        <div>
          <div className={classes.fullName}>
            <Input
              placeholder="First Name"
              onChange={nameChangerHandler}
              value={enteredName}
              autocomplete="given-name"
              required
            />
            <Input
              placeholder="Surname"
              onChange={surnameChangeHandler}
              value={enteredSurname}
              autocomplete="family-name"
              required
            />
          </div>

          <div className={classes.group}>
            <Input
              placeholder="E-mail"
              onChange={emailChangeHandler}
              value={enteredEmail}
              type="email"
              autocomplete="email"
              required
            />
          </div>
          <div className={classes.group}>
            <Input
              placeholder="Phone"
              type="tel"
              onChange={phoneChangeHandler}
              value={enteredPhone}
              autocomplete="tel"
              required
            />
          </div>
          <div className={classes.genderGroup}>
            <label>Gender: </label>
            <div className={classes.group3}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={selectedGender === "male"}
                onChange={genderChangeHandler}
              />
              <label htmlFor="male"> Male</label>
            </div>
            <div className={classes.group3}>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={selectedGender === "female"}
                onChange={genderChangeHandler}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className={classes.group4}>
            <label htmlFor="birthDate">Birthday: </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              max={new Date().toISOString().split("T")[0]}
              onChange={birthdateChangeHandler}
              value={enteredBirthdate}
              required
            />
          </div>

          <div className={classes.group}>
            <Input placeholder="Enter Password" type="password" required />
          </div>

          <div className={classes.group5}>
            <BlackButton>Save changes</BlackButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;

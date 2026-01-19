import { useState } from "react";
import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";
import WhiteButton from "../../components/UI/WhiteButton";
import classes from "./PersonalInfo.module.css";

const PersonalInfo = () => {
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

    console.log(enteredBirthdate);
  }

  const personalInfoSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes.card} onSubmit={personalInfoSubmitHandler}>
      <h2>Contact Details</h2>

      <div className={classes.group1}>
        <Input
          placeholder="First Name"
          onChange={nameChangerHandler}
          value={enteredName}
        />
        

      <div className={classes.group}>
        <Input placeholder="E-mail" onChange={emailChangeHandler}
          value={enteredEmail} />
      </div>
      <div className={classes.group}>
        <Input placeholder="Phone" type="tel" onChange={phoneChangeHandler}
          value={enteredPhone}  />
      </div>
      <div className={classes.group1}>
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
      <div className={classes.group}>
        <div className={classes.group4}>
          <label htmlFor="birthDate">Birthday: </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            max={new Date().toISOString().split("T")[0]}
            onChange={birthdateChangeHandler}
            value={enteredBirthdate}
          />
        </div>
      </div>
      <div className={classes.group}>
        <Input placeholder="Enter Password" type="string" />
      </div>

      <div className={classes.group}>
        <div className={classes.group5}>
          <WhiteButton>Cancel</WhiteButton>
          <BlackButton>Save changes</BlackButton>
        </div>
      </div>
      </div>
    </form>
  );
};

export default PersonalInfo;

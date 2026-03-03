import { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import classes from "./ContactDetails.module.css";
import BlackButton from "../../components/UI/BlackButton";
import Input from "../../components/UI/Input";

const ContactDetails = () => {
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
  });

  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [status, setStatus] = useState("idle");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (!user) return;

      try {
        const contactRef = doc(
          db,
          "users",
          user.uid,
          "contactDetails",
          "details",
        );
        const contactSnapshot = await getDoc(contactRef);

        if (contactSnapshot.exists()) {
          const contactData = contactSnapshot.data();

          setFormData({
            firstname: contactData.name || "",
            surname: contactData.surname || "",
            email: contactData.email || "",
            phone: contactData.phone || "",
            gender: contactData.gender || "",
            birthdate: contactData.birthdate || "",
          });
          setHasFetchedData(true);
        }
      } catch (error) {
        console.error("Failed to fetch contact details: ", error);
      }
    };

    fetchContactDetails();
  }, [user]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const contactDetailsSubmitHandler = async (event) => {
    event.preventDefault();

    const contactDetails = {
      name: formData.firstname,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      birthdate: formData.birthdate,
    };

    try {
      const contactRef = doc(
        db,
        "users",
        user.uid,
        "contactDetails",
        "details",
      );

      await setDoc(contactRef, contactDetails);
      setStatus("success");
      setIsModalVisible(true);
    } catch (error) {
      console.error("couldnt save contact details: ", error);
    }
  };

  return (
    <div className={classes.contactDetails}>
      <h2 className={classes.contactDetailsFont}>Contact Details</h2>

      {hasFetchedData ? (
        <div className={classes.contactCard}>
          <div className={classes.dataFullName}>
            <div>
              <h2 className={classes.dataGroup}>First name</h2>
              <p>{formData.firstname}</p>
            </div>
            <div>
              <h2 className={classes.dataGroup}>Last name</h2>
              <p>{formData.surname}</p>
            </div>
          </div>

          <div className={classes.dataEmail}>
            <div className={classes.dataGroup}>
              <h2>Email</h2>
              <p>{formData.email}</p>
            </div>
          </div>
          <div className={classes.dataEmail}>
            <div className={classes.dataGroup}>
              <h2>Phone</h2>
              <p>{formData.phone}</p>
            </div>
          </div>

          <div className={classes.dataFullName}>
            <div>
              <h2 className={classes.dataGroup}>Gender</h2>
              <p>{formData.gender}</p>
            </div>
            <div>
              <h2 className={classes.dataGroup}>Birthdate</h2>
              <p>{formData.birthdate}</p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={contactDetailsSubmitHandler}
          className={classes.contactCard}
        >
          <div>
            <div className={classes.fullName}>
              <Input
                name="firstname"
                placeholder="First Name"
                onChange={inputChangeHandler}
                value={formData.name}
                autocomplete="given-name"
                required
              />
              <Input
                name="surname"
                placeholder="Surname"
                onChange={inputChangeHandler}
                value={formData.surname}
                autocomplete="family-name"
                required
              />
            </div>

            <div className={classes.group}>
              <Input
                name="email"
                placeholder="E-mail"
                onChange={inputChangeHandler}
                value={formData.email}
                type="email"
                autocomplete="email"
                required
              />
            </div>
            <div className={classes.group}>
              <Input
                name="phone"
                placeholder="Phone"
                type="tel"
                onChange={inputChangeHandler}
                value={formData.phone}
                autocomplete="tel"
                required
              />
            </div>
            <div className={classes.genderGroup}>
              <label>Gender: </label>
              <div className={classes.group3}>
                <input
                  name="gender"
                  type="radio"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={inputChangeHandler}
                />
                <label htmlFor="male"> Male</label>
              </div>
              <div className={classes.group3}>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={inputChangeHandler}
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
                onChange={inputChangeHandler}
                value={formData.birthdate}
                required
                className={classes.birthdayInput}
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
      )}
    </div>
  );
};

export default ContactDetails;

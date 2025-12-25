import BlackButton from "../../components/UI/BlackButton";
import classes from "./PersonalInfo.module.css";

const PersonalInfo = () => {
    return (
        <div className={classes.card}>
            <h2>Personal Information</h2>

            <div className={classes.group}>
                <p>Name</p>
                <span>Lordd Aleh</span>
            </div>

            <div className={classes.group}>
                <p>Phone Number</p>
                <span>+233 XXX XXX XXX</span>
            </div>

            <h2>Login Details</h2>

            <div className={classes.group2}>
                <p>Emaill</p>
                <span>Kafuilord07@gmail.com</span>
                <BlackButton>Edit</BlackButton>
            </div>

            <div className={classes.group2}>
                <p>Password</p>
                <span>*********</span>
                <BlackButton>Edit</BlackButton>
            </div>

            <button className={classes.danger}>Delete Account</button>
        </div>
    )
}

export default PersonalInfo;
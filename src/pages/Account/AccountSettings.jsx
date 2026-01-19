import BlackButton from "../../components/UI/BlackButton";
import WhiteButton from "../../components/UI/WhiteButton";
import classes from "./AccountSettings.module.css";

const AccountSettings = () => {
  return (
    <div className={classes.accountWrapper}>
      <h2>Account Settings</h2>

      <div className={classes.settingGroup}>
        <h2>Email</h2>
        <div className={classes.settingGroup1}>
          <p>kafuilord07@gmail.com</p>
          <BlackButton>Edit</BlackButton>
        </div>
      </div>
      <div className={classes.settingGroup}>
        <h2>Password</h2>
        <div className={classes.settingGroup1}>
          <p>********</p>
          <BlackButton>Edit</BlackButton>
        </div>
      </div>
      <div className={classes.settingGroup1}>
        <h2>Newsletters</h2>
        <BlackButton>Unsubscribe</BlackButton>
      </div>

      <div className={classes.settingButton}>
      <WhiteButton>Cancel</WhiteButton>
      <BlackButton>Save Changes</BlackButton>
      </div>
    </div>
  );
};

export default AccountSettings;

import { NavLink } from "react-router-dom";

import Card from "../../components/UI/Card";

import classes from "./AccountOverview.module.css";

const AccountOverview = () => {
  return (
    <div>
      <Card className={classes.overviewCard}>
        <div className={classes.overviewLayout}>
          <NavLink className={classes.ovewviewContent} to="/account/contact-details">Contact details</NavLink>
          <NavLink className={classes.ovewviewContent} to="/account/orders">Orders History</NavLink>
          <NavLink className={classes.ovewviewContent} to="/account/account-settings">Account Settings</NavLink>
          <NavLink className={classes.ovewviewContent}>Contact details</NavLink>
          
        </div>
      </Card>
    </div>
  );
};

export default AccountOverview;

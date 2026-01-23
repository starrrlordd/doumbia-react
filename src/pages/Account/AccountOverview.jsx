import { NavLink, useNavigate } from "react-router-dom";

import Card from "../../components/UI/Card";
import WhiteButton from "../../components/UI/WhiteButton";
import BlackButton from "../../components/UI/BlackButton";

import classes from "./AccountOverview.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";

const AccountOverview = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const confirmLogoutHandler = () => {
    logout();
    navigate("/shop");
    setShowConfirm(false);
    console.log("logout button clicked");
  };

  return (
    <div>
      <Card className={classes.overviewCard}>
        <div className={classes.overviewLayout}>
          <NavLink
            className={classes.ovewviewContent}
            to="/account/contact-details"
          >
            Contact details
          </NavLink>
          <NavLink className={classes.ovewviewContent} to="/account/orders">
            Orders History
          </NavLink>
          <NavLink
            className={classes.ovewviewContent}
            to="/account/account-settings"
          >
            Account Settings
          </NavLink>
          <div
            className={classes.logout}
            onClick={() => setShowConfirm(true)}
            role="button"
            aria-label="logout"
          >
            Logout
          </div>
        </div>

        {showConfirm && (
          <div className={classes.backdrop}>
            <div className={classes.logoutModal}>
              <div className={classes.modalBox}>
                <p>Are you sure you want to logout?</p>

                <div className={classes.logoutActions}>
                  <WhiteButton onClick={() => setShowConfirm(false)}>
                    Cancel
                  </WhiteButton>
                  <BlackButton onClick={confirmLogoutHandler}>
                    Yes, I want to logout
                  </BlackButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AccountOverview;

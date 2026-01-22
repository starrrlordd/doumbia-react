import { Navigate, NavLink } from "react-router-dom";
import classes from "./AccountSidebar.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import WhiteButton from "../../components/UI/WhiteButton";
import BlackButton from "../../components/UI/BlackButton";

const AccountSidebar = ({ mobileOpen, closeMenu }) => {
  const { logout } = useContext(AuthContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const confirmLogoutHandler = () => {
    logout();
    Navigate("/shop");
    setShowConfirm(false);
  };

  return (
    <aside className={`${classes.sidebar} ${mobileOpen ? classes.open : ""}`}>
      <NavLink to="/account/contact-details" onClick={closeMenu}>
        Contact Details
      </NavLink>

      <NavLink to="/account/orders" onClick={closeMenu}>
        Orders History
      </NavLink>

      <NavLink to="/account/account-settings" onClick={closeMenu}>
        Account Settings
      </NavLink>

      <button className={classes.logout} onClick={() => setShowConfirm(true)}>
        Logout
      </button>

      {showConfirm && (
        <div className={classes.backdrop}>
          <div className={classes.logoutModal}>
          <div className={classes.modalBox}>
            <p>Are you sure you want to logout?</p>

            <div className={classes.logoutActions}>
              <WhiteButton onClick={() => setShowConfirm(false)}>Cancel</WhiteButton>
              <BlackButton onClick={confirmLogoutHandler}>Yes</BlackButton>
            </div>
          </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AccountSidebar;

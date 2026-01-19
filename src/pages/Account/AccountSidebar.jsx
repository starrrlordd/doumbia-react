import { NavLink } from "react-router-dom";
import classes from "./AccountSidebar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const AccountSidebar = ({ mobileOpen, closeMenu }) => {
  const {logout} = useContext(AuthContext);

  return (
    <aside
      className={`${classes.sidebar} ${
        mobileOpen ? classes.open : ""
      }`}
    >
      <NavLink to="/account/contact-details" onClick={closeMenu}>
        Contact Details
      </NavLink>



      <NavLink to="/account/orders" onClick={closeMenu}>
        Orders History
      </NavLink>

      <NavLink to="/account/account-settings" onClick={closeMenu}>
        Account Settings
      </NavLink>
     

      <button className={classes.logout} onClick={logout}>Logout</button>
    </aside>
  );
};

export default AccountSidebar;

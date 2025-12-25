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
      <NavLink to="personal" onClick={closeMenu}>
        Personal Information
      </NavLink>


      <NavLink to="orders" onClick={closeMenu}>
        Orders
      </NavLink>

     

      <button className={classes.logout} onClick={logout}>Logout</button>
    </aside>
  );
};

export default AccountSidebar;

import { Navigate, NavLink } from "react-router-dom";

import classes from "./AdminSidebar.module.css";

const AdminSidebar = ( { mobileOpen }) => {
  return (
    <aside className={`${classes.adminSidebar} ${mobileOpen ? classes.open : ""}`}>
      <ul className={classes.adminNavigation}>
        <li>
          <NavLink to="admin-orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admin/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">Users</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

import classes from "./AdminDashboard.module.css";

import { NavLink } from "react-router-dom";

import Card from "../../components/UI/Card";

const AdminDashboard = () => {
  return (
    <div className={classes.adminDashboard}>
      <Card>
        <NavLink to="admin-orders">Orders</NavLink>
      </Card>
    </div>
  );
};

export default AdminDashboard;

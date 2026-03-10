import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import AdminSidebar from "./AdminSidebar";
import { WindowSizeContext } from "../../store/windowSize-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import classes from "./AdminLayout.module.css";

const AdminLayout = () => {
    const { isMobileSize } = useContext(WindowSizeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className={classes.adminWrapper}>
      <h1>Admin Dashboard</h1>

      <div className={classes.adminLayout}>
        {!isMobileSize && <AdminSidebar />}

        <div className={classes.adminContent}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;

import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { WindowSizeContext } from "../../store/windowSize-context";

import AccountSidebar from "./AccountSidebar";
import classes from "./AccountLayout.module.css";

const AccountLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isMobileSize } = useContext(WindowSizeContext);

  return (
    <section className={classes.wrapper}>
      {/* Mobile overlay */}
      {isMobileSize && showMenu && (
        <div
          className={classes.overlay}
          onClick={() => setShowMenu(false)}
        />
      )}

      <h1>Account Overview</h1>

      {/* Mobile menu button only */}
      {isMobileSize && (
        <button
          className={classes.menuBtn}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          Account Menu
        </button>
      )}

      <div className={classes.layout}>
        <AccountSidebar
          mobileOpen={isMobileSize ? showMenu : true}
          closeMenu={() => setShowMenu(false)}
        />

        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AccountLayout;

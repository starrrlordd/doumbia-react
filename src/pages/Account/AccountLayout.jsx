import { Outlet } from "react-router-dom";
import { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import classes from "./AccountLayout.module.css";


const AccountLayout = () => {
  const [showMenu, setShowMenu] = useState(false);


  return (
    <section className={classes.wrapper}>
        {showMenu && <div className={classes.overlay} onClick={() => setShowMenu(false)} />}

      <h1>Account Overview</h1>

      
      <button
        className={classes.menuBtn}
        onClick={() => setShowMenu(prev => !prev)}
      >
        Account Menu
      </button>

      <div className={classes.layout}>
        <AccountSidebar
          mobileOpen={showMenu}
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

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { WindowSizeContext } from "../../store/windowSize-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import AccountSidebar from "./AccountSidebar";
import classes from "./AccountLayout.module.css";

const AccountLayout = () => {
  const { isMobileSize } = useContext(WindowSizeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const backButtonHandler = () => {
    navigate("/account");
  }

  const showBackButton = isMobileSize && location.pathname !== "/account";

  return (
    <section className={classes.wrapper}>
      

      <h1>Account Overview</h1>

      {showBackButton && (
        <button
          className={classes.menuBtn}
          onClick={backButtonHandler}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      <div className={classes.layout}>
        <AccountSidebar          
        />

        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AccountLayout;

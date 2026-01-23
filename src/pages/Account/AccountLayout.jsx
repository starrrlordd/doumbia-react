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

  const backButtonHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/account");
  };

  const showBackButton = isMobileSize && location.pathname !== "/account";

  return (
    <section className={classes.wrapper}>
      <h1>Account Overview</h1>

      {showBackButton && (
        <div
          className={classes.menuBtn}
          onClick={backButtonHandler}
          role="button"
          aria-label="back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      )}

      <div className={classes.layout}>
        <AccountSidebar />

        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AccountLayout;

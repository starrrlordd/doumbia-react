import React from "react";
import classes from "./WhiteButton.module.css";

const WhiteButton = (props) => {
  return (
    <button className={`${classes.whiteButton} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default WhiteButton;

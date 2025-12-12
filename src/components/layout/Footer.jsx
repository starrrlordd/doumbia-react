import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>      
      <div className={classes["social-links"]}>
        <ul>
          <li>
            <a
              href="https://web.facebook.com/profile.php?id=61578253329608"
              target="_blank"
            >
              Facebook
            </a>
          </li>
          <li>
            <a href="https://x.com/DoumbiaOnline" target="_blank">
              x
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/doumbiaonline/" target="_blank">
              instagram
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@doumbiaonline" target="_blank">
              tiktok
            </a>
          </li>
          <li>
            <a href="#">snapchat</a>
          </li>
          <li>
            <a href="#">youtube</a>
          </li>
        </ul>
      </div>
      <ul className={classes["navigation-list"]}>
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Terms and conditions</a>
        </li>
        <li>
          <a href="#">Help</a>
        </li>
        <li>
          <a href="#">Delivery information</a>
        </li>
        <li>
          <a href="#">Privacy policy</a>
        </li>
        <li>
          <a href="#">My wishlist</a>
        </li>
        <li>
          <a href="#">Contact us</a>
        </li>
        <li>
          <a href="#">Returns</a>
        </li>
        <li>
          <a href="#">Track my order</a>
        </li>
      </ul>

      <p className={classes["legal-info"]}>
        ©2025 Doumbia Online All rights reserved
      </p>
    </footer>
  );
};

export default Footer;

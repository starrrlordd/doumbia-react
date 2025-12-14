import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../store/cart-context";

import classes from "./Header.module.css";

import shopIcon from "../../assets/images/icons/search.svg";
import cartIcon from "../../assets/images/icons/cart.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import contactIcon from "../../assets/images/icons/contact.svg";
import hamburgerIcon from "../../assets/images/icons/hamburger.svg";
import { WindowSizeContext } from "../../store/windowSize-context";

const Header = () => {
  const { isMobileSize } = useContext(WindowSizeContext);

  const { cart, openCart } = useContext(CartContext);

  const cartLength = cart.length;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={classes.header}>
      <NavLink to="/" onClick={closeMenu}>
        Doumbia Online
      </NavLink>
      <div className={classes.links}>
        <nav className={classes["nav-buttons"]}>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <img src={shopIcon} alt="search" className={classes.icon} />
            <span className={classes.text}>Shop</span>
          </NavLink>
          <div className={classes.cartActions}>
            <NavLink
              to="/Cart"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <img src={cartIcon} alt="cart" className={classes.icon} />
              <span className={classes.text}>Cart</span>
            </NavLink>
            {cart.length > 0 && (
              <p className={classes.bigScreenCart}>({cartLength})</p>
            )}
          </div>
          <NavLink
            to="/Login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <img src={profileIcon} alt="login" className={classes.icon} />
            <span className={classes.text}>Login</span>
          </NavLink>
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <img src={contactIcon} alt="contact" className={classes.icon} />
            <span className={classes.text}>Contact Us</span>
          </NavLink>
        </nav>
      </div>

      <div className={classes.cartHamburger}>
        <div className={classes.cartActions}>
          <button
            className={`${classes.cart} ${classes.button}`}
            aria-label="Toggle cart"
            onClick={openCart}
          >
            <img src={cartIcon} alt="cart" className={classes.cart} />
          </button>
          {cart.length > 0 && <p>{cart.length}</p>}
        </div>
        <button
          className={`${classes.hamburgerButton} ${classes.button}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src={hamburgerIcon} alt="menu" className={classes.hamburger} />
        </button>
      </div>

      {isMobileSize && (
        <div className={`${classes.popupMenu} ${menuOpen ? classes.open : ""}`}>
          <NavLink to="/shop" onClick={toggleMenu}>
            Shop
          </NavLink>
          <NavLink to="/cart" onClick={toggleMenu}>
            Cart
          </NavLink>
          <NavLink to="/login" onClick={toggleMenu}>
            Profile
          </NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;

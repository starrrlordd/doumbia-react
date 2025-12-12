import Hoodies from "../assets/images/banner/hoodie.jpg";
import Tshirt from "../assets/images/banner/t-shirt1.jpg";
import Jeans from "../assets/images/banner/jeans.jpg";
import Cargos from "../assets/images/banner/cargo1.jpg";
import LeatherBag from "../assets/images/banner/leatherbag1.jpg";
import heroVideo from "../assets/videos/herovideo.mp4";

import { NavLink } from "react-router-dom";

import DiscoverButton from "../components/UI/DiscoverButton";
import SeeAllButton from "../components/UI/SeeAllButton";
import Newsletter from "../components/layout/Newsletter";

import classes from "./Home.module.css";
import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CartSlider from "../components/UI/CartSlider";

const Home = () => {
  const banners = [
    { name: "T-shirts", image: Tshirt, category: "Tshirts" },
    { name: "Jeans", image: Jeans, category: "Jeans" },
    { name: "Cargos", image: Cargos, category: "Cargos" },
    { name: "Hoodies", image: Hoodies, category: "Hoodies" },
  ];

  const seoBannerItems = [
    "Inventory",
    "Tshirts",
    "Jeans",
    "Shirts",
    "Joggers",
    "Cargos",
    "Sleeveless",
    "Sweaters",
    "Hoodies",
    "Shorts",
    "Caps",
  ];

  const {} = useContext(CartContext);

  return (
    <>
    <CartSlider />
      <main role="main">
        <section className={classes.hero}>
          <NavLink to="/shop">
            <video autoPlay muted loop className={classes.heroVideo}>
              <source src={heroVideo} type="video/mp4" /> Your browser does not
              support the video tag.
            </video>
            <div className={classes.heroOverlay}></div>
            <div className={classes.heroContent}>
              <h3>50% off on new arrivals</h3>
              <DiscoverButton />
            </div>
          </NavLink>
        </section>

        <section className={classes.bannerContainer}>
          {banners.map((item) => (
            <div role="banner" key={item.name} className={classes.banner}>
              <NavLink to={`/shop?category=${item.category}`}>
                <h4>{item.name}</h4>
                <img src={item.image} alt={item.name} />
                <SeeAllButton className={classes.seeAll} />
              </NavLink>
            </div>
          ))}
        </section>
        <section className={classes.lbContainer}>
          <div>
            <div className={classes.lbContent}>
              <img src={LeatherBag} alt="Leather Bags" />
              <div className={classes.lbOverlay}></div>
              <div className={classes.lbText}>
                <h1>Leather Bags</h1>
                <DiscoverButton />
              </div>
            </div>
          </div>
        </section>
        <section className={classes.seoBannerContainer}>
          <h4>Shop our inventory</h4>
          <ul>
            {seoBannerItems.map((item, index) => (
              <li key={index}>
                <NavLink to={`/shop?category=${item}`}>{item}</NavLink>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Newsletter />
    </>
  );
};

export default Home;

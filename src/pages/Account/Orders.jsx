import WhiteButton from "../../components/UI/WhiteButton";
import classes from "./Orders.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  return (
    <div className={classes.card}>
      <div className={classes.ordersHeader}>
        <h2>Orders History</h2>
      </div>

      <div className={classes.orderItem}>
        <div className={classes.itemGroup}>
          <p className={classes.orderNumber}>Order #: ORD-1001</p>
          <p className={classes.orderAmount}>GHS 840.50</p>
        </div>
        <div className={classes.itemGroup}>
          <p className={classes.orderDate}>2026-01-14</p>
          <p className={classes.orderStatus}>Delivered</p>
        </div>
        <WhiteButton className={classes.orderItemButton}>
          View details
        </WhiteButton>
      </div>
      <div className={classes.orderItem}>
        <div className={classes.itemGroup}>
          <p className={classes.orderNumber}>Order #: ORD-1001</p>
          <p className={classes.orderAmount}>GHS 840.50</p>
        </div>
        <div className={classes.itemGroup}>
          <p className={classes.orderDate}>2026-01-14</p>
          <p className={classes.orderStatusPending}>Pending</p>
        </div>
        <WhiteButton className={classes.orderItemButton}>
          Hide details
        </WhiteButton>
        <div className={classes.borderLine}></div>
        <div className={classes.orderItemDetails}>
          <div className={classes.orderDetailsGroup}>
            <div className={classes.orderDetailsGroup1}>
              <p>Rush soul in the flesh</p>
              <p>x 2</p>
            </div>
            <p>GHS 560.00</p>
          </div>
        </div>
        <div className={classes.orderItemDetails}>
          <div className={classes.orderDetailsGroup}>
            <div className={classes.orderDetailsGroup1}>
              <p>Cotton Strip Denim shirt</p>
              <p>x 1</p>
            </div>
            <p>GHS 560.00</p>
          </div>
        </div>
      </div>
      <div className={classes.orderItem}>
        <div className={classes.itemGroup}>
          <p className={classes.orderNumber}>Order #: ORD-1001</p>
          <p className={classes.orderAmount}>GHS 840.50</p>
        </div>
        <div className={classes.itemGroup}>
          <p className={classes.orderDate}>2026-01-14</p>
          <p className={classes.orderStatus}>Delivered</p>
        </div>
        <WhiteButton className={classes.orderItemButton}>
          View details
        </WhiteButton>
      </div>

      <div className={classes.orderNavigationWrapper}>
        <div className={classes.orderNavigation}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p className={classes.orderItemActive}>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};

export default Orders;

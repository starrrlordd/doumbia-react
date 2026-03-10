import Card from "../../components/UI/Card";
import WhiteButton from "../../components/UI/WhiteButton";

import classes from "./AdminOrders.module.css";



const AdminOrders = () => {
    return <div>
        <Card className={classes.adminCard}>
          <div className={classes.orderDetails}>
            <div className={classes.orderDetailsRow}>
              <p>Order #ORD-1001</p>
              <p>GHS 850.00</p>
            </div>
            <div className={classes.orderDetailsRow}>
              <p>2026-03-09</p>
              <p className={classes.orderStatusDelivered}>Delivered</p>
            </div>

            <WhiteButton className={classes.viewDetails}>
              Hide details
            </WhiteButton>
            <div className={classes.borderLine}></div>

            <div className={classes.orderCartItems}>
              <p>Rush Soul - in the flesh</p>
              <p> x 2</p>
              <p> GHS 560</p>
            </div>
            <div className={classes.orderCartItems}>
              <p>Cotton strip denim shirt</p>
              <p> x 1</p>
              <p> GHS 300</p>
            </div>
          </div>
          <div className={classes.orderDetails}>
            <div className={classes.orderDetailsRow}>
              <p>Order #ORD-1001</p>
              <p>GHS 850.00</p>
            </div>
            <div className={classes.orderDetailsRow}>
              <p>2026-03-09</p>
              <p className={classes.orderStatusDelivered}>Delivered</p>
            </div>

            <WhiteButton className={classes.viewDetails}>
              View details
            </WhiteButton>
          </div>
        </Card>
    </div>
}

export default AdminOrders;
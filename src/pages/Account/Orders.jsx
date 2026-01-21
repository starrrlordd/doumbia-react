import { auth } from "../../firebase";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import WhiteButton from "../../components/UI/WhiteButton";
import classes from "./Orders.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Orders = () => {
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const querySnapshot = await getDocs(ordersRef);

        const loadedOrders = [];

        querySnapshot.forEach((doc) => {
          loadedOrders.push({ id: doc.id, ...doc.data() });
        });

        setLoadedOrders(loadedOrders);
      } catch (error) {
        console.error("Failed to load orders: ", error);
      }
    };

    if (user?.uid) {
      fetchOrders();
    }
  }, [user?.uid]);

  console.log(loadedOrders);

  return (
    <div className={classes.card}>
      <div className={classes.ordersHeader}>
        <h2>Orders History</h2>
      </div>
      {loadedOrders.length === 0 && (
        <p className={classes.noOrders}>You have no orders yet</p>
      )}

      {loadedOrders.map((orderItem) => (
        <div className={classes.orderItem} key={orderItem.id}>
          <div className={classes.itemGroup}>
            <p className={classes.orderNumber}>Order #: {orderItem.id}</p>
            <p className={classes.orderAmount}>GHS {orderItem.totalAmount}</p>
          </div>
          <div className={classes.itemGroup}>
            <p className={classes.orderDate}>
              {orderItem.createdAt.toDate().toLocaleDateString()}
            </p>
            <p className={classes.orderStatusPending}>Pending</p>
          </div>
          <WhiteButton
            className={classes.orderItemButton}
            onClick={() =>
              setExpandedOrder(
                expandedOrder === orderItem.id ? null : orderItem.id
              )
            }
          >
            {expandedOrder === orderItem.id ? "Hide details" : "View Details"}
          </WhiteButton>
          {expandedOrder === orderItem.id && (
            <div>
              <div className={classes.borderLine}></div>
              <div className={classes.orderItemDetails}>
                {orderItem.items.map((item) => (
                  <div className={classes.orderDetailsGroup}>
                    <div className={classes.orderDetailsGroup1} key={item.id}>
                      <p>{item.name}</p>
                      <p>x {item.quantity}</p>
                    </div>
                    <p>GHS {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {loadedOrders.length > 0 && (
        <div className={classes.orderNavigationWrapper}>
          <div className={classes.orderNavigation}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <button className={classes.activeButton}>1</button>
            <button className={classes.nonActiveButton}>2</button>
         
            
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

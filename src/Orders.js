import React, { useEffect, useState } from "react";
import "./Orders.css";
import Order from "./Order";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(
          (
            snapshot //a real time snapshot database
          ) =>
            setOrders(
              //update the most recently placed order
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

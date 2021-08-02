import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
//use this as a router to have a multi-page website
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51JB9DkGSnaCxyYWA9sRqVh356wAEGujtOCOGUsbc0CWnLEOmAxOXsZU0R2xJwtEgTOWjurtbI3wkVutKpi1NDi1t00QB19D9mV"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("USER IS >>>", authUser);
      if (authUser) {
        //the user just logged in / was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM convention
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/*passing the stripe promise * */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          {/* Default route at the bottom */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

    /* Header */
    /*Home */
  );
}

export default App;

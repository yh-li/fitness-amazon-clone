import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  //console.log(basket);
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    //generate the special stripe secret which allows
    //us to charge a customer
    console.log("Basket has changed");
    const getClientSecret = async () => {
      //axios is when we make a request
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${Math.round(
          getBasketTotal(basket) * 100
        )}`,
      });
      console.log("Got client secret:");
      console.log(response);
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("The secret >>>", clientSecret);
  const handleSubmit = async (e) => {
    //do the stripe stuff
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };
  const handleChange = (e) => {
    //listen for changes in the card element
    //and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} //part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
          <div className="payment__details__notice">
            <p className="payment__details__watchout">WATCH OUT!</p>
            This is just a SHOWCASE site of Yihan's portofolio without
            connections to any existing business. Please do NOT enter your real
            card information. Be aware that no payment can be refunded and NO
            PRODUCTS will be delivered. For the purpose of testing the payment
            funciton, we suggest that you enter the testing card information
            provided by{" "}
            <span>
              <a href="https://www.stripe.com">stripe.js</a>
            </span>
            , with number 4242 4242 4242 4242, valid through 04 / 24, CVC 242
            and ZIP 42424.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JB9DkGSnaCxyYWA5bNsCYA9N8qkiThuIlfM8461Zk7tMMZ3vLinBKOtDXgt3S5MJ4uVMda5AVz6bbNvZTL5IuX100WhxQqBDb"
);

//API

//App Config
const app = express();
//Middlewares
app.use(cors({ origin: "https://fitness-deliverer-c88c7.firebaseapp.com" }));
app.use(express.json());
//API routes
app.get("/", (request, response) =>
  response.status(200).send("Yihan's eCommerce website backend root route")
);
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });
  //OK - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen command
exports.api = functions.https.onRequest(app);

// server/api/index.js
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const connectDB = require("./dbConnect"); // MongoDB connection
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing JSON bodies

// Connect to MongoDB
connectDB();

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Stripe API setup (assuming you have these in your .env)
const stripe = require("stripe")(process.env.STRIPE_KEY);
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    let { amount } = req.body;
    amount = Math.round(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const rawBody = req.rawBody;
  const webhookSecret = process.env.WEBHOOK_SIGNING_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("PaymentIntent was successful:", paymentIntent.id);
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// Export the app for Vercel serverless functions
module.exports = app;

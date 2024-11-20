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
    res.send(`
      <html>
        <head>
          <title>API Operations</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 10px; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>Metro Backend</h1>
          <p>Available API endpoints:</p>
  
          <h2>User API Endpoints:</h2>
          <ul>
            <li><a href="/api/users">Get All Users</a></li>
            <li><a href="/api/users/1">Get User by ID (Example: ID = 1)</a></li>
            <li><a href="/api/users/login">Login User</a></li>
            <li><a href="/api/users/register">Register User</a></li>
          </ul>
  
          <h2>Product API Endpoints:</h2>
          <ul>
            <li><a href="/api/products">Get All Products</a></li>
            <li><a href="/api/products/1">Get Product by ID (Example: ID = 1)</a></li>
            <li><a href="/api/products/create">Create a New Product</a></li>
            <li><a href="/api/products/update/1">Update Product (Example: ID = 1)</a></li>
            <li><a href="/api/products/delete/1">Delete Product (Example: ID = 1)</a></li>
          </ul>
  
          <h2>Order API Endpoints:</h2>
          <ul>
            <li><a href="/api/orders">Get All Orders</a></li>
            <li><a href="/api/orders/user/1">Get Orders by User ID (Example: User ID = 1)</a></li>
            <li><a href="/api/orders/create">Create a New Order</a></li>
            <li><a href="/api/orders/delete/1">Delete Order (Example: ID = 1)</a></li>
          </ul>
  
          <h2>API Response Example:</h2>
          <pre>
          <code>GET /api/orders --> Returns a list of all orders.</code>
          </pre>
        </body>
      </html>
    `);
  });
  

// Export the app for Vercel serverless functions
module.exports = app;

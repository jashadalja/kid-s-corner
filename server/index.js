require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;
let db;

// Initialize MongoDB connection
async function initializeDB() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB Atlas successfully");
    db = client.db("kidscorner");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);  // Exit process if MongoDB connection fails
  }
}

// // Razorpay setup
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Middleware to ensure DB connection
function ensureDBConnection(req, res, next) {
  if (!db) {
    return res.status(500).json({ error: "Database not connected" });
  }
  next();
}


// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay Secret Key
});

// API endpoint to create an order
app.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency,
    });
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// API endpoint to verify payment
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secretKey = process.env.RAZORPAY_KEY_SECRET; //  Razorpay Secret Key

  // Generate HMAC
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");

  // Compare signatures
  if (generated_signature === razorpay_signature) {
    res.json({ status: "success", message: "Payment verified successfully" });
  } else {
    res.status(400).json({ status: "failure", message: "Payment verification failed" });
  }
});

// Apply DB connection check for the following routes
app.use(ensureDBConnection);

app.get("/animals", async (req, res, next) => {
  try {
    const animalsCollection = db.collection("animals");
    const animalData = await animalsCollection.findOne({}, {
      projection: { tortoise: 1, cow: 1, fish: 1, frog: 1, horse: 1, lion: 1 },
    });

    if (!animalData) {
      return res.status(404).json({ message: "No animals found" });
    }

    res.json({ result: animalData });
  } catch (error) {
    next(error);
  }
});

app.get("/shopping", async (req, res, next) => {
  try {
    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();
    res.json({ result: products });
  } catch (error) {
    next(error);
  }
});

app.post("/getproduct", async (req, res, next) => {
  const productId = req.body.id;

  try {
    const productsCollection = db.collection("products");
    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
});

app.post("/buy-product", async (req, res, next) => {
  const { id, name1, mobile1, address, quantity, priceT, c, email } = req.body;

  try {
    const ordersCollection = db.collection("orders");
    const order = {
      product_id: id,
      product_name: name1,
      user_mobile: mobile1,
      user_address: address,
      order_quantity: quantity,
      total_price: priceT,
      timestamp: c,
      user_email: email,
    };

    const result = await ordersCollection.insertOne(order);
    res.json({ message: "Order placed successfully", orderId: result.insertedId });
  } catch (error) {
    next(error);
  }
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start server after DB connection is ready
initializeDB().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});

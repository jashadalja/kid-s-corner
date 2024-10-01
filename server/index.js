require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const Razorpay = require("razorpay");
const { ObjectId } = require("mongodb");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

let db;

const client = new MongoClient(uri);

client
  .connect()
  .then((client) => {
    console.log("Connected to MongoDB Atlas successfully");
    db = client.db("kidscorner");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount,
      currency,
      receipt,
    });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).send({
      error: "Failed to create order",
      details: error,
    });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const secretKey = "0ZiI8iZ185Dx20ZY9S1Mck12";

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.send({ status: "success" });
  } else {
    res.send({ status: "failure" });
  }
});

app.get("/animals", async (req, res) => {
  try {
    const animalsCollection = db.collection("animals");
    const animalData = await animalsCollection.findOne(
      {},
      {
        projection: {
          tortoise: 1,
          cow: 1,
          fish: 1,
          frog: 1,
          horse: 1,
          lion: 1,
        },
      }
    );

    if (!animalData) {
      return res.status(404).json({ message: "No animals found" });
    }

    res.json({ result: animalData });
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).send("Error fetching data");
  }
});

app.get("/shopping", async (req, res) => {
  try {
    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();
    //   console.log(products)
    res.json({ result: products });
  } catch (err) {
    console.error("Error fetching product data from MongoDB:", err);
    res.status(500).send("Error fetching product data");
  }
});

app.post("/getproduct", async (req, res) => {
  const productId = req.body.id;
  console.log(productId);
  try {
    const productsCollection = db.collection("products");
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    console.log(product);
    if (product) {
      res.json({ result: product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching product from MongoDB:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.post("/buy-product", async (req, res) => {
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

    res.json({
      message: "Order placed successfully",
      orderId: result.insertedId,
    });
  } catch (err) {
    console.error("Error processing order:", err);
    res.status(500).json({ message: "Error processing order" });
  }
});

app.listen(3001, () => {
  console.log("server is running on 3001");
});

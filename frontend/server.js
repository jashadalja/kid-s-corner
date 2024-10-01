import express from 'express';
import Razorpay from 'razorpay';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto'; // Import crypto module
import mysql from 'mysql2';



// Create Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies


app.use(bodyParser.json());
app.use(cors()); // Enable CORS
// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'sql200.infinityfree.com',   // Replace with your MySQL host
  user: 'if0_37417604',        // Replace with your MySQL username
  password: 'vJYrL05NHjFR', // Replace with your MySQL password
  database: 'if0_37417604_kidscorner' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


const razorpay = new Razorpay({
    key_id: 'rzp_test_pVMPiZnpHDsa6g',
    key_secret: '0ZiI8iZ185Dx20ZY9S1Mck12'
});

app.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount,
            currency,
            receipt
        });
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error); 
        res.status(400).send({
            error: 'Failed to create order',
            details: error
        });
    }
});

app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', '0ZiI8iZ185Dx20ZY9S1Mck12');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.send({ status: 'success' });
    } else {
        res.send({ status: 'failure' });
    }
});


app.get('/animals', (req, res) => {
    const query = 'SELECT tortoise, cow, fish, frog, horse, lion FROM animals'; // Replace with the correct table name and column names
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).send('Error fetching data');
      } else {
        // Assuming there's only one row in the animals table
        const animalData = results[0];
        res.json({ result: animalData });
      }
    });
  });


  app.get('/shopping', (req, res) => {
    const query = 'SELECT * FROM products'; // Adjust the query if you need specific columns
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).send('Error fetching product data');
      } else {
        res.json({ result: results });
      }
    });
  });
  
  
  app.post('/getproduct', (req, res) => {
    const productId = req.body.id; // Get product ID from request body
    const query = 'SELECT * FROM products WHERE product_id = ?'; // Adjust this based on your actual table structure
  
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Error fetching product' });
      } else {
        if (result.length > 0) {
          res.json({ result: result[0] }); // Send the first product (assuming one result per ID)
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
  });

  
  app.post('/buy-product', (req, res) => {
    const { id,name1, mobile1, address, quantity, priceT , c , email } = req.body;
    const query = 'INSERT INTO orders (product_id,product_name, user_mobile, user_address, order_quantity, total_price ,timestamp ,user_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [id,name1, mobile1, address, quantity, priceT , c , email], (err, result) => {
      if (err) {
        console.error('Error inserting order:', err);
        res.status(500).json({ message: 'Error processing order' });
      } else {
        res.json({ message: 'Order placed successfully', orderId: result.insertId });
      }
    });
  });
  

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

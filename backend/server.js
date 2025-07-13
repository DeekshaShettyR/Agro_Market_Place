



//2
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DEE05@mysql', // Update with your MySQL password
    database: 'abc' // Update with your database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

// Farmer Login API
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM Farmers WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (results.length === 0) return res.status(401).send({ message: 'Invalid email or password' });
        res.send({ message: 'Login successful', user: results[0] });
    });
});

// Buyer Login API
app.post('/buyer-login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM Buyers WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (results.length === 0) return res.status(401).send({ message: 'Invalid email or password' });
        res.send({ message: 'Login successful', user: results[0] });
    });
});

// Add Product API
app.post('/products', (req, res) => {
    const { name, price, quantity, farmer_id } = req.body;
    const query = `INSERT INTO Products (name, price, quantity, farmer_id) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, price, quantity, farmer_id], (err) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        res.send({ message: 'Product added successfully' });
    });
});

// Get Products API
app.get('/products', (req, res) => {
    const query = `SELECT * FROM Products WHERE quantity > 0`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        res.send(results);
    });
});

// Place Order API
app.post('/orders', (req, res) => {
    const { buyer_id, product_id, quantity } = req.body;

    // Check if sufficient quantity is available
    const checkQuery = `SELECT quantity FROM Products WHERE id = ?`;
    db.query(checkQuery, [product_id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (results.length === 0) return res.status(404).send({ message: 'Product not found' });

        const availableQuantity = results[0].quantity;
        if (availableQuantity < quantity) {
            return res.status(400).send({ message: 'Insufficient product quantity' });
        }

        // Place order and update product quantity
        const orderQuery = `INSERT INTO Orders (buyer_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.query(orderQuery, [buyer_id, product_id, quantity], (err) => {
            if (err) return res.status(500).send({ message: 'Server error' });

            const updateQuery = `UPDATE Products SET quantity = quantity - ? WHERE id = ?`;
            db.query(updateQuery, [quantity, product_id], (err) => {
                if (err) return res.status(500).send({ message: 'Server error' });
                res.send({ message: 'Order placed successfully' });
            });
        });
    });
});

// Get Buyer Orders API
app.get('/buyer-orders/:buyer_id', (req, res) => {
    const { buyer_id } = req.params;
    const query = `
        SELECT Orders.id, Products.name AS product_name, Orders.quantity 
        FROM Orders 
        JOIN Products ON Orders.product_id = Products.id 
        WHERE Orders.buyer_id = ?`;
    db.query(query, [buyer_id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        res.send(results);
    });
});

// Add Rating API
app.post('/ratings', (req, res) => {
    const { product_id, buyer_id, rating, review } = req.body;
    const query = `INSERT INTO Ratings (product_id, buyer_id, rating, review) VALUES (?, ?, ?, ?)`;
    db.query(query, [product_id, buyer_id, rating, review], (err) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        res.send({ message: 'Rating added successfully' });
    });
});

// Start server
app.listen(2200, () => {
    console.log('Server running on http://localhost:2200');
});







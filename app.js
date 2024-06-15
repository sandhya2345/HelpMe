const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
    origin: '*',
    allowedHeaders: '*'
}));
app.use(express.static(path.join(__dirname, 'Front-end')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pet_adoption'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/pet_adoption', (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    const sql = 'INSERT INTO login (name, email, phone, password, confirmPassword) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, phone, password, confirmPassword], (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            res.status(500).send('Error signing up');
            return;
        }
        console.log('User signed up successfully');
        res.status(200).send({ message: 'User signed up successfully' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in');
        }

        if (results.length > 0) {
            console.log('User logged in successfully');
            // Send a JSON response indicating successful login
            return res.status(200).send({ message: 'Login successful', user: results[0] });
        } else {
            // Send a JSON response indicating invalid credentials
            return res.status(401).send({ message: 'Invalid username or password' });
        }
    });
});


//add to cart features

app.post('/add-to-cart', (req, res) => {
    const { user_id, pet_id } = req.body;
    console.log(`Adding to cart - user_id: ${user_id}, pet_id: ${pet_id}`);

    // Fetch pet details
    const petQuery = 'SELECT name, price FROM pets WHERE id = ?';
    connection.query(petQuery, [pet_id], (err, results) => {
        if (err) {
            console.error('Error fetching pet details:', err);
            res.status(500).send('Error fetching pet details');
            return;
        }

        if (results.length > 0) {
            const animalName = results[0].name;
            const price = results[0].price;

            // Insert into cart
            const insertQuery = 'INSERT INTO cart (user_id, animal_name, price, pet_id) VALUES (?, ?, ?, ?)';
            connection.query(insertQuery, [user_id, animalName, price, pet_id], (err, result) => {
                if (err) {
                    console.error('Error adding to cart:', err);
                    res.status(500).send('Error adding to cart');
                    return;
                }
                console.log('Item added to cart successfully');
                res.status(200).send({ message: 'Item added to cart successfully' });
            });
        } else {
            res.status(404).send({ message: 'Pet not found' });
        }
    });

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 

const app = express();
const port = 5000; 

app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Karthik@123',
  database: 'userdb', 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Create table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table "users" is ready!');
  }
});

//JWT token
const JWT_SECRET = 'your_jwt_secret_key'; 

// Function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Handle signup route
app.post('/signup', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Passwords must match
  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return res.status(400).json({ message: "Passwords don't match!" });
  }

  // Check if the user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user existence', error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password', error: err });
      }

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error inserting user', error: err });
        }
        
        // Generate JWT for the new user
        const token = generateToken(result.insertId); 

        res.status(201).json({ message: 'User signed up successfully!', token });
      });
    });
  });
});

// Handle login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user existence', error: err });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const storedPassword = result[0].password;

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, storedPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords', error: err });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password!' });
      }

      // Generate JWT after successful login
      const token = generateToken(result[0].id); 

      res.status(200).json({ message: 'Login successful!', token });
    });
  });
});

// Middleware to verify JWT token (for protected routes)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
    
    req.user = decoded; // Add user data to the request
    next();
  });
};

// Example of a protected route



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

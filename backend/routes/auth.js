const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Auth route working!");
});

router.post("/register", async (req, res) => {
  console.log("Received request:", req.body);  

  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    console.log("User registered:", newUser.rows[0]); 
    res.json({ message: "User registered successfully", user: newUser.rows[0] });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server error");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ 
      token, 
      user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } 
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Server error");
  }
});


module.exports = router;

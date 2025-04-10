const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const { authenticateUser } = require('../middleware/auth');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", 
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Get All Products
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, location } = req.query;
    
    let query = `
      SELECT products.*, users.name AS poster_name
      FROM products
      JOIN users ON products.user_id = users.id
      WHERE 1=1
    `;
    let values = [];

    if (search) {
      query += " AND LOWER(name) LIKE LOWER($1)";
      values.push(`%${search}%`);
    }
    if (category) {
      query += ` AND category = $${values.length + 1}`;
      values.push(category);
    }
    if (minPrice) {
      query += ` AND price >= $${values.length + 1}`;
      values.push(minPrice);
    }
    if (maxPrice) {
      query += ` AND price <= $${values.length + 1}`;
      values.push(maxPrice);
    }
    if (location) {
      query += ` AND location = $${values.length + 1}`;
      values.push(location);
    }

    query += " ORDER BY created_at DESC";

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a Single Product by ID 
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      `SELECT products.*, users.name AS poster_name 
       FROM products 
       JOIN users ON products.user_id = users.id 
       WHERE products.id = $1`, 
      [id]
    );
    if (product.rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(product.rows[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Server error");
  }
});

// Add a New Product with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Received data:", req.body); 
    console.log("Received file:", req.file); 

    const { title, description, price, location, contact, user_id } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    console.log("Extracted fields:", { title, description, price, location, contact, imageUrl });

    const result = await pool.query(
      "INSERT INTO products (title, description, price, location, image_url, contact, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, price, location, imageUrl, contact, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// routes/products.js 
router.get('/my-products', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await pool.query(
      'SELECT * FROM products WHERE user_id = $1',
      [userId]
    );
    res.json(products.rows);
  } catch (err) {
    console.error("Error fetching user's products:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Delete a Product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

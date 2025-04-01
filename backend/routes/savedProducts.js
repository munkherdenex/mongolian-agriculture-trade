const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all saved products
router.get("/", async (req, res) => {
  try {
    const savedProducts = await pool.query(`
      SELECT products.* FROM saved_products 
      JOIN products ON saved_products.product_id = products.id
    `);
    res.json(savedProducts.rows);
  } catch (error) {
    console.error("Error fetching saved products:", error);
    res.status(500).send("Server error");
  }
});

// Save a product
router.post("/", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    const result = await pool.query(
      "INSERT INTO saved_products (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [user_id, product_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("Server error");
  }
});

// Remove a saved product
router.delete("/:user_id/:product_id", async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    const result = await pool.query(
      "DELETE FROM saved_products WHERE user_id = $1 AND product_id = $2 RETURNING *",
      [user_id, product_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Saved product not found");
    }

    res.send("Saved product removed");
  } catch (error) {
    console.error("Error removing saved product:", error);
    res.status(500).send("Server error");
  }
});



module.exports = router;

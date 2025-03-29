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

// Remove a saved product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM saved_products WHERE id = $1", [id]);
    res.send("Saved product removed");
  } catch (error) {
    console.error("Error removing saved product:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

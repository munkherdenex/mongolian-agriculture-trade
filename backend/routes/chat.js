const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET messages for a specific room
router.get("/messages", async (req, res) => {
  const { roomId } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM messages WHERE room_id = $1 ORDER BY created_at ASC",
      [roomId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;

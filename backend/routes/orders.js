const { authenticateUser } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Confirm order and notify seller via chat
router.post("/confirm", authenticateUser, async (req, res) => {
  const {
    orders, // [{ product_id, seller_id }]
    recipient_name,
    phone,
    address,
  } = req.body;

  const buyer_id = req.user.id;

  try {
    for (const order of orders) {
      const { product_id, seller_id } = order;

      const newOrder = await pool.query(
        `INSERT INTO orders 
          (product_id, buyer_id, seller_id, recipient_name, phone, address)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [product_id, buyer_id, seller_id, recipient_name, phone, address]
      );

      let convo = await pool.query(
        `SELECT * FROM conversations 
         WHERE product_id = $1 AND buyer_id = $2 AND seller_id = $3`,
        [product_id, buyer_id, seller_id]
      );

      if (convo.rows.length === 0) {
        const newConvo = await pool.query(
          `INSERT INTO conversations (product_id, buyer_id, seller_id) 
           VALUES ($1, $2, $3) RETURNING *`,
          [product_id, buyer_id, seller_id]
        );
        convo = newConvo;
      }

      const convoId = convo.rows[0].id;

      const message = `
🛒 Шинэ захиалга ирлээ!

Бүтээгдэхүүн ID: ${product_id}
Хүлээн авагч: ${recipient_name}
Утас: ${phone}
Хаяг: ${address}
      `.trim();

      await pool.query(
        `INSERT INTO messages (conversation_id, sender_id, message, created_at)
         VALUES ($1, $2, $3, NOW())`,
        [convoId, buyer_id, message]
      );
    }

    res.json({ success: true, message: "Захиалга амжилттай илгээгдлээ." });
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).json({ error: "Захиалга илгээхэд алдаа гарлаа." });
  }
});

module.exports = router;
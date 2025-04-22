import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleConfirmOrder = async () => {
    if (!recipientName || !phone || !address) {
      setMessage("Бүх талбарыг бөглөнө үү.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      // Step 1: Confirm the order
      const orderResponse = await axios.post(
        "http://localhost:5000/api/orders/confirm",
        {
          orders: cartItems,
          recipient_name: recipientName,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (orderResponse.status === 200) {
        // Step 2: For each product, send a chat message to the seller
        for (const item of cartItems) {
          try {
            await axios.post(
              `http://localhost:5000/api/chat/sendMessage`,
              {
                productId: item.id,
                recipientId: item.seller_id, // you must have `seller_id` in your cart items
                message: `Таны "${item.name}" бараанд шинэ захиалга ирлээ!`,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (err) {
            console.error(`Failed to send message to seller for product ${item.id}`, err);
          }
        }
  
        // Step 3: Clear cart and reset form
        setMessage("✅ Захиалга амжилттай илгээгдлээ!");
        setCartItems([]);
        localStorage.removeItem("cart");
        setRecipientName("");
        setPhone("");
        setAddress("");
      }
    } catch (err) {
      console.error("❌ Order confirmation failed:", err);
      setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Миний сагс</h2>
      {cartItems.length === 0 ? (
        <p>Сагс хоосон байна.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong> — {item.price}₮
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Устгах
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="order-form" style={{ marginTop: "20px" }}>
        <h3>Захиалгын мэдээлэл</h3>
        <input
          type="text"
          placeholder="Хүлээн авагчийн нэр"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Утасны дугаар"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Хүргүүлэх хаяг"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <button onClick={handleConfirmOrder}>Захиалгыг баталгаажуулах</button>
        {message && (
          <p style={{ marginTop: "10px", color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;

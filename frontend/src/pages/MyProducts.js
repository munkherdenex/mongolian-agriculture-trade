import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming JWT stored here
        const response = await axios.get("http://localhost:5000/api/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching your products:", err);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Миний бүтээгдэхүүнүүд</h2>
      {products.length === 0 ? (
        <p>Та бүтээгдэхүүн оруулаагүй байна.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-3 border rounded shadow hover:bg-gray-50"
            >
              <strong>{product.name}</strong> — {product.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;

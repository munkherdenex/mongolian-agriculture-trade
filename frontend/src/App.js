// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SavedProducts from "./pages/SavedProducts";
import Navbar from "./components/Navbar";

function App() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    setSavedProducts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
  }, [savedProducts]);

  const handleSave = (product) => {
    if (!savedProducts.find((p) => p.id === product.id)) {
      setSavedProducts((prev) => [...prev, product]);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products handleSave={handleSave} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/saved-products" element={<SavedProducts savedProducts={savedProducts} setSavedProducts={setSavedProducts} />} />
      </Routes>
    </Router>
  );
}

export default App;

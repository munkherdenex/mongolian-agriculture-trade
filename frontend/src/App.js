// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products"; // ✅ Add Products back
import SavedProducts from "./pages/SavedProducts";
import Navbar from "./components/Navbar";

function App() {
  const [savedProducts, setSavedProducts] = useState([]);

  const handleSave = (product) => {
    if (!savedProducts.find((p) => p.id === product.id)) {
      setSavedProducts((prev) => [...prev, product]);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home handleSave={handleSave} />} />
        <Route path="/products" element={<Products handleSave={handleSave} />} />  {/* ✅ Add Products page back */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/saved-products" element={<SavedProducts savedProducts={savedProducts} />} />
      </Routes>
    </Router>
  );
}

export default App;

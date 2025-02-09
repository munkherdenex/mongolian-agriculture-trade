import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products"; // Import Products Page
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer

function App() {
  return (
    <Router>
      <Navbar />  {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} /> {/* Add Products route */}
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}

export default App;

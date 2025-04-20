import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import socket from "./socket";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SavedProducts from "./pages/SavedProducts";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import ProductDetails from './pages/ProductDetails';
import axios from "axios";
import MyProducts from "./pages/MyProducts";

// ✅ Moved the inner logic into a separate component
function AppContent() {
  const { user } = useContext(AuthContext);
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    socket.connect();
    if (user && user.id) {
      socket.emit("registerUser", user.id);
    }

    const fetchSavedProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/saved-products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedProducts(response.data);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchSavedProducts();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/chat/:productId/:recipientId" element={<ChatPage />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/saved-products" element={<SavedProducts savedProducts={savedProducts} />} />
        </Route>
      </Routes>
    </Router>
  );
}

// ✅ Wrap the app with AuthProvider here
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

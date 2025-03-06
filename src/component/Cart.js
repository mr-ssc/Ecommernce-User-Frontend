import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css';
import Navbar from '../component/Navbar';
import { DarkModeContext } from '../component/DarkModeContext';
import Footer from "../component/Footer"
import SubFooter from "../component/SubFooter"

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const initialCartItems = location.state?.cartItems || [];

  const [cartItems, setCartItems] = useState(() => {
    return initialCartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Ensure default quantity is 1
    }));
  });

  // Update body class for dark mode
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  // 🔹 Increase Quantity
  const increaseQuantity = (index) => {
    setCartItems((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🔹 Decrease Quantity (Minimum 1)
  const decreaseQuantity = (index) => {
    setCartItems((prevCart) =>
      prevCart.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 🔹 Remove Item from Cart
  const removeFromCart = (index) => {
    setCartItems((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // 🔹 Calculate Total Price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  };

  return (
    <>
      <Navbar toggleTheme={toggleDarkMode} theme={isDarkMode ? 'dark' : 'light'} />
      <div className={`cart-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h2>Your Cart List</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </td>
                  <td>${item.discountedPrice.toFixed(2)}</td>
                  <td>
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.discountedPrice * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-from-cart-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                    <button className="buy-now-btn">Buy Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h4>Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
        <button
          className="back-to-products-btn"
          onClick={() => navigate('/', { state: { cartItems } })}
        >
          Back to Products
        </button>
      </div>
      <Footer/>
      <SubFooter/>
    </>
  );
};

export default Cart;
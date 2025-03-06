import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const products = [
    {
      image: "https://picsum.photos/150",
      name: "Product 1",
      originalPrice: 100,
      discountedPrice: 80,
    },
    {
      image: "https://picsum.photos/151",
      name: "Product 2",
      originalPrice: 120,
      discountedPrice: 90,
    },
  ];

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    navigate('/cart', { state: { cartItems: updatedCart } }); // Pass cartItems to Cart
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.name !== product.name);
    setCartItems(updatedCart);
    navigate('/cart', { state: { cartItems: updatedCart } }); // Pass updated cart
  };

  const isProductInCart = (product) => {
    return cartItems.some((item) => item.name === product.name);
  };

  return (
    <div className="product-container">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-prices">
                <span className="original-price">${product.originalPrice}</span>
                <span className="discounted-price">${product.discountedPrice}</span>
              </div>
              <div className="product-actions">
                {isProductInCart(product) ? (
                  <button
                    className="remove-from-cart-btn"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
                <button className="buy-now-btn">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
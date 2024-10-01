// src/components/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shopping.css'; // Make sure to import your styles
import cardBg1 from '../assets/card-bg1.png';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store quantities for each product


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/shopping`); // Ensure the URL points to your backend
        console.log(response.data.result);
        setProducts(response.data.result);

        // Initialize quantities for each product to 1
        const initialQuantities = response.data.result.reduce((acc, product) => {
          acc[product._id] = 1; // Assuming "id" is the primary key in your products table
          return acc;
        }, {});

        setQuantities(initialQuantities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Failed to fetch product data');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (productId) => {
    console.log(productId);
    navigate(`/productdetails/${productId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="products movies" id="movies">
      <div className='productsSection'>
        <h1 className="heading">Products Of Kid's Corner</h1>
      </div>
      <div className="box-container">
        {products.map((product, index) => (
          <div key={index} className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
            {/* Show "Out of stock" span and disable the button if stock is 0 */}
            {product.stock_quantity === 0 && (
              <span className="choise1">Out of stock</span>
            )}
            <div className="movie">
              <img
                src={product.img_url}
                className='productImg'
                style={{ height: '30vh', width: '22vw' }}
                alt={product.name}
              />
              <p>{product.name}</p>
            </div>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price.toFixed(2)}  rs</p>
            {/* <p>Stock: {product.stock_quantity}</p> */}



            {/* Buy button */}
            <button
              className='btn'
              onClick={() => handleBuy(product._id)}
              disabled={product.stock_quantity === 0} // Disable buy button if out of stock
            >
              Buy Product
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

import React from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const products = [
    { id: 1, name: 'Tomatoes', price: 5000, location: 'Ulaanbaatar', category: 'Vegetables' },
    { id: 2, name: 'Potatoes', price: 3000, location: 'Darkhan', category: 'Vegetables' },
  ];

  return (
    <div>
      <h1>Welcome to Mongolian Agriculture Trade</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

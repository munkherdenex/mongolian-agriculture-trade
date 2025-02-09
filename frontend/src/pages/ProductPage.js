import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchedProduct = { id, name: 'Tomatoes', price: 5000, location: 'Ulaanbaatar', category: 'Vegetables' };
    setProduct(fetchedProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price} MNT</p>
      <p>Location: {product.location}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductPage;

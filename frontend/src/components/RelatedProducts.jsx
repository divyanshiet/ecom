import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const relatedprod = () => {
    const filteredProducts = products.filter(
      (item) =>
        item.category.includes(category) &&
        item.subCategory.includes(subCategory)
    );
    setRelatedProducts(filteredProducts);
  };

  useEffect(() => {
    relatedprod();
  }, [category, subCategory, products]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {relatedProducts.map((item, index) => (
        <ProductItem
          key={index}
          name={item.name}
          id={item._id}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;

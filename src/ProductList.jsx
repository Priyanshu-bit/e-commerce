import React, { useState, useEffect } from 'react';

const ProductList = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      const productPrice = parseFloat(product.price);

      const isMinPriceValid = !minPrice || productPrice >= parseFloat(minPrice);
      const isMaxPriceValid = !maxPrice || productPrice <= parseFloat(maxPrice);

      return isMinPriceValid && isMaxPriceValid;
    });

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Single Product:', data);
      } else {
        console.error('Failed to fetch single product');
      }
    } catch (error) {
      console.error('Error during single product fetch:', error);
    }
  };

  const searchProducts = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Search Results:', data);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  useEffect(() => {
    fetchSingleProduct(1);

    searchProducts('phone');
  }, []); 

  return (
    <div className="container mx-auto my-8 text-center">
      <h3 className="text-3xl font-semibold mb-4">Explore Our Products</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 inline-block"
        />
      </div>
      <div className="flex mb-4 justify-center">
        <div className="mr-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-28 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-28 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded overflow-hidden shadow-md">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
              <p className="text-gray-700 mb-2">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
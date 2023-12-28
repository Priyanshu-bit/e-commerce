import React, { useState, useEffect, useContext } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import CartIcon from './CartIcon';
import { AuthContext } from './App';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error during product fetch:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartVisible((prevIsCartVisible) => !prevIsCartVisible);
  };

  return (
    <div>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <CartIcon cart={cart} toggleCart={toggleCart} />
      </div>
      {isCartVisible && <Cart cart={cart} />}
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Home;
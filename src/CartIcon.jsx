import React from 'react';
import cartIcon from '/src/assets/bag.png';

const CartIcon = ({ cart, toggleCart }) => {
  const cartCount = cart.length;

  return (
    <div className="relative cursor-pointer flex items-center">
      <img
        src={cartIcon}
        alt="Cart Icon"
        className="h-8 w-8 relative" 
        onClick={toggleCart}
      />

      {cartCount > 0 && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {cartCount}
        </div>
      )}

    
    </div>
  );
};

export default CartIcon;
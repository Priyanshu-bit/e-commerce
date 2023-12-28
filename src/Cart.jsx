import React from 'react';

const Cart = ({ cart }) => {
  const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="bg-white p-3 rounded shadow-md absolute top-0 right-0 mt-12">
      <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
      <p className="text-gray-700 mb-2">Items in Cart: {cart.length}</p>
      <p className="text-gray-700 mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
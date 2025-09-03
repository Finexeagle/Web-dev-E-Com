import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useApp } from '../../context/AppContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useApp();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id });
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { productId: item.product.id, quantity: newQuantity }
      });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id });
  };

  return (
    <div className="flex items-center space-x-4 py-6 border-b border-slate-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
          {item.product.name}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{item.product.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-slate-900">
            ${item.product.price.toFixed(2)}
          </span>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Minus className="w-4 h-4 text-slate-600" />
            </button>
            
            <span className="w-12 text-center text-sm font-medium text-slate-900">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
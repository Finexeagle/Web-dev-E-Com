import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity: 1 }
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100">
        <Heart className="w-4 h-4 text-slate-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 h-10">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-slate-500 mt-1">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-slate-400 ml-2">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
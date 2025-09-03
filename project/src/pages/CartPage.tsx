import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export function CartPage() {
  const { state } = useApp();

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto w-12 h-12 text-slate-400 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
            <p className="text-slate-600 mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Continue Shopping
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Cart Items ({state.cart.length})
              </h2>
              
              <div className="divide-y divide-slate-200">
                {state.cart.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block mt-6">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Shipping Benefits */}
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-green-600" />
                  {shipping === 0 ? 'Free shipping applied!' : 'Add $' + (50 - subtotal).toFixed(2) + ' for free shipping'}
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-4 h-4 mr-2 text-blue-600" />
                  30-day return policy
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-purple-600" />
                  Secure checkout guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
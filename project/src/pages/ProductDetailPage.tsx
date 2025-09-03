import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { mockProducts, mockReviews } from '../data/mockData';

export function ProductDetailPage() {
  const { id } = useParams();
  const { dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` }
  ];

  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/products?category=${product.category.toLowerCase()}` },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square w-full mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-slate-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 font-medium mt-1">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-medium text-slate-900">Quantity:</label>
                <div className="flex items-center border border-slate-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-slate-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-slate-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="px-6">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-slate-700">
                <Truck className="w-4 h-4 mr-3 text-green-600" />
                Free shipping on orders over $50
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <RotateCcw className="w-4 h-4 mr-3 text-blue-600" />
                30-day return policy
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <Shield className="w-4 h-4 mr-3 text-purple-600" />
                2-year warranty included
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900">{key}</span>
                    <span className="text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-slate-900">{review.userName}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{review.createdAt}</span>
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { mockProducts } from '../data/mockData';

export function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const filterGroups = [
    {
      name: 'Category',
      key: 'category',
      options: [
        { id: 'electronics', label: 'Electronics', count: 45 },
        { id: 'home-office', label: 'Home & Office', count: 32 },
        { id: 'fashion', label: 'Fashion', count: 28 },
        { id: 'food-beverage', label: 'Food & Beverage', count: 15 }
      ]
    },
    {
      name: 'Price Range',
      key: 'price',
      options: [
        { id: '0-50', label: 'Under $50', count: 23 },
        { id: '50-100', label: '$50 - $100', count: 34 },
        { id: '100-200', label: '$100 - $200', count: 28 },
        { id: '200+', label: 'Over $200', count: 15 }
      ]
    },
    {
      name: 'Brand',
      key: 'brand',
      options: [
        { id: 'audiotech', label: 'AudioTech', count: 12 },
        { id: 'fittech', label: 'FitTech', count: 8 },
        { id: 'modernlight', label: 'ModernLight', count: 6 },
        { id: 'brewmaster', label: 'BrewMaster', count: 4 }
      ]
    },
    {
      name: 'Rating',
      key: 'rating',
      options: [
        { id: '4+', label: '4+ Stars', count: 78 },
        { id: '3+', label: '3+ Stars', count: 92 },
        { id: '2+', label: '2+ Stars', count: 98 }
      ]
    }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply filters (mock implementation)
    // In a real app, this would filter based on actual product data

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return products;
  }, [sortBy, activeFilters]);

  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: checked
        ? [...(prev[filterKey] || []), value]
        : (prev[filterKey] || []).filter(v => v !== value)
    }));
  };

  const handleClearAll = () => {
    setActiveFilters({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Products' }]} />
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
            <p className="text-slate-600 mt-2">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex border border-slate-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:flex lg:space-x-8">
          {/* Filters Sidebar */}
          <ProductFilters
            filters={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700">
                  Previous
                </button>
                
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 text-sm rounded-md ${
                      page === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
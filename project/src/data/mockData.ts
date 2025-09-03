import { Product, Category, Order, Review } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    features: ['Wireless Bluetooth 5.0', 'Active Noise Cancellation', '30-hour Battery Life', 'Quick Charge'],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications.',
    images: [
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
      'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg'
    ],
    category: 'Electronics',
    brand: 'FitTech',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Rating': '5ATM',
      'Weight': '45g'
    }
  },
  {
    id: '3',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'Sleek and modern desk lamp with adjustable brightness and USB charging port.',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg'
    ],
    category: 'Home & Office',
    brand: 'ModernLight',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    features: ['LED Technology', 'USB Charging Port', 'Touch Controls', 'Adjustable Brightness'],
    specifications: {
      'Power': '12W LED',
      'Color Temperature': '3000K-6500K',
      'Materials': 'Aluminum & Steel',
      'Height': '45cm'
    }
  },
  {
    id: '4',
    name: 'Organic Coffee Blend',
    price: 24.99,
    description: 'Premium organic coffee beans sourced from sustainable farms worldwide.',
    images: [
      'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg'
    ],
    category: 'Food & Beverage',
    brand: 'BrewMaster',
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    features: ['100% Organic', 'Fair Trade Certified', 'Medium Roast', 'Single Origin'],
    specifications: {
      'Weight': '500g',
      'Roast Level': 'Medium',
      'Origin': 'Colombia',
      'Processing': 'Washed'
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
  },
  {
    id: '2',
    name: 'Home & Office',
    slug: 'home-office',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg'
  },
  {
    id: '3',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
  },
  {
    id: '4',
    name: 'Food & Beverage',
    slug: 'food-beverage',
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely love these headphones! The sound quality is incredible and the noise cancellation works perfectly.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great build quality and comfortable to wear for long periods. Battery life is as advertised.',
    createdAt: '2024-01-10'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[2], quantity: 2 }
    ],
    total: 479.97,
    status: 'delivered',
    createdAt: '2024-01-01',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  }
];
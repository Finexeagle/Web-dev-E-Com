import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'New Arrivals', href: '/new' },
        { name: 'Sale', href: '/sale' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Account',
      links: [
        { name: 'My Account', href: '/profile' },
        { name: 'Order History', href: '/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Track Order', href: '/track' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">EcomStore</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Your trusted partner for quality products and exceptional shopping experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-slate-400">
                Get the latest updates on new products and exclusive offers.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-8">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            &copy; 2025 EcomStore. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <span className="text-sm text-slate-400">We accept:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-300">
                VISA
              </div>
              <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-300">
                MC
              </div>
              <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-300">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
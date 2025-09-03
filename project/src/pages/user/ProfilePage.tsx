import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useApp } from '../../context/AppContext';
import { mockOrders } from '../../data/mockData';

export function ProfilePage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save - in real app, this would call your API
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-slate-100 text-slate-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="lg:grid lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-slate-50 lg:rounded-l-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">{state.user?.name}</h2>
                    <p className="text-sm text-slate-600">{state.user?.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 hover:bg-white hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Profile Information</h1>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      size="sm"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-6">Order History</h1>
                  
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-slate-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                            <p className="text-sm text-slate-600">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center space-x-4">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900">{item.product.name}</h4>
                                <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-medium text-slate-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                          <span className="font-semibold text-slate-900">
                            Total: ${order.total.toFixed(2)}
                          </span>
                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-6">My Wishlist</h1>
                  <div className="text-center py-12">
                    <Heart className="mx-auto w-12 h-12 text-slate-400 mb-4" />
                    <p className="text-slate-600">Your wishlist is empty</p>
                    <Link to="/products" className="mt-4 inline-block">
                      <Button>Browse Products</Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>
                  
                  <div className="space-y-6">
                    <div className="border border-slate-200 rounded-lg p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-slate-700">Email notifications for order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-slate-700">Promotional emails and special offers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-slate-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-slate-700">Make profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-slate-700">Share data with partners for better recommendations</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-red-200 rounded-lg p-6">
                      <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="danger" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
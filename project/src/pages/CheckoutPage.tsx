import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useApp } from '../context/AppContext';

export function CheckoutPage() {
  const { state } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Billing Address
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: ''
  });

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const steps = [
    { id: 1, title: 'Shipping' },
    { id: 2, title: 'Payment' },
    { id: 3, title: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/cart" className="text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= stepItem.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 text-slate-400'
                }`}>
                  {stepItem.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= stepItem.id ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-px w-12 ${
                    step > stepItem.id ? 'bg-blue-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Street Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button onClick={() => setStep(2)} size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-green-600" />
                    Payment Information
                  </h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                    
                    <Input
                      label="Name on Card"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Billing Address */}
                  <div className="mt-8">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleInputChange}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 text-sm text-slate-700">
                        Billing address same as shipping
                      </label>
                    </div>

                    {!formData.sameAsShipping && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Input
                            label="Billing Address"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Input
                          label="City"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          name="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Shipping
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Review Your Order</h2>
                  
                  {/* Order Items */}
                  <div className="mb-8">
                    <h3 className="font-medium text-slate-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {state.cart.map((item) => (
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
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-8 p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium text-slate-900 mb-2">Shipping Address</h3>
                    <p className="text-sm text-slate-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back to Payment
                    </Button>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
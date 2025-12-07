import { useState } from 'react';
import { ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout({ onBack, onClose }) {
  const { cart, getTotal, checkout } = useCart();
  const [step, setStep] = useState('form');
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '', 
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const order = checkout({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
        }
      });

      setOrderNumber(order.order_number);
      setStep('success');
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Failed to process order. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
              <CheckCircle className="w-20 h-20 text-green-600 dark:text-green-400 relative" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Order Confirmed!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Order Number</p>
            <p className="font-mono font-bold text-slate-900 dark:text-white text-lg break-all">
              {orderNumber}
            </p>
          </div>

          <div className="space-y-3 text-left bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Nova X Pro × {item.quantity}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.color} • {item.storage}
                  </p>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
              <p className="font-bold text-slate-900 dark:text-white">Total</p>
              <p className="font-bold text-slate-900 dark:text-white">
                ₹{getTotal().toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
          </p>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-y-auto">
        <div className="sticky top-0 flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Checkout
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter yoyr email"
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={2}
            />
            {errors.address && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"

              />
              {errors.city && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.state && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-700 dark:text-red-400 text-sm">
                {errors.submit}
              </p>
            </div>
          )}

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Items ({cart.length})</span>
              <span>₹{getTotal().toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Shipping</span>
              <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span>₹{getTotal().toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all sticky bottom-0"
          >
            Place Order</button>
        </form>
      </div>
    </div>
  );
}

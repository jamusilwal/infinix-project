import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import Checkout from './Checkout.jsx';

export default function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotal, isLoading } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-slate-900 dark:text-white" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Infinix Pro Max
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.color}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.storage}
                      </p>
                    </div>
                    <button
                      onClick={() => item.id && removeFromCart(item.id)}
                      disabled={isLoading}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                      <button
                        onClick={() =>
                          item.id &&
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={isLoading}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                      </button>
                      <span className="px-3 py-1 font-medium text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          item.id &&
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isLoading}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>₹{getTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-slate-900 dark:text-white text-lg">
                <span>Total</span>
                <span>₹{getTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              disabled={isLoading || cart.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

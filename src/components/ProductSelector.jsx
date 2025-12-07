import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { PHONE_VARIANTS, getStoragePrice } from '../constants/phoneVariants.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductSelector() {
  const [selectedColor, setSelectedColor] = useState('midnight');
  const [selectedStorage, setSelectedStorage] = useState('256gb');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const selectedColorData = PHONE_VARIANTS.colors.find(c => c.id === selectedColor);
  const price = getStoragePrice(selectedStorage);

  const handleAddToCart = () => {
    try {
      setIsAdding(true);
      addToCart({
        color: selectedColorData?.name || '',
        storage: PHONE_VARIANTS.storage.find(s => s.id === selectedStorage)?.label || '',
        quantity,
        price,
      });
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section id="product" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                Infinix Pro Max
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Premium Flagship Smartphone
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedColorData?.name} • {PHONE_VARIANTS.storage.find(s => s.id === selectedStorage)?.label}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                    Color
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {PHONE_VARIANTS.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`relative group rounded-lg p-3 transition-all ${
                          selectedColor === color.id
                            ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-800'
                            : ''
                        }`}
                      >
                        <div
                          className="w-full h-16 rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 text-center line-clamp-2">
                          {color.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                    Storage
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {PHONE_VARIANTS.storage.map((storage) => {
                      const storagePrice = getStoragePrice(storage.id);
                      const priceIncrease = storagePrice - PHONE_VARIANTS.basePrice;

                      return (
                        <button
                          key={storage.id}
                          onClick={() => setSelectedStorage(storage.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            selectedStorage === storage.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {storage.label}
                            </p>
                            {priceIncrease > 0 && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                +₹{priceIncrease.toLocaleString('en-IN')}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <span className="px-4 font-semibold text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-all`}
                style={{
                  background: `linear-gradient(135deg, ${selectedColorData?.hex}44, ${selectedColorData?.hex}22)`
                }}
              />
              <div
                className="relative rounded-3xl w-64 h-96 md:w-80 md:h-[500px] shadow-2xl flex items-center justify-center border border-white/10 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${selectedColorData?.hex}, ${selectedColorData?.hex}dd)`
                }}
              >
                <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />
                <div className="text-white/20 text-8xl font-bold">X</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

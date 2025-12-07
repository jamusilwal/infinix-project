import { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Gallery from './components/Gallery.jsx';
import Specifications from './components/Specifications.jsx';
import ProductSelector from './components/ProductSelector.jsx';
import Cart from './components/Cart.jsx';
import { useTheme } from './hooks/useTheme.js';
import { CartProvider, useCart } from './context/CartContext.jsx';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navigation
        isDark={isDark}
        toggleTheme={toggleTheme}
        cartCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <Features />
      <Gallery />
      <Specifications />
      <ProductSelector />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <footer className="bg-slate-900 dark:bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 Infinix Company Ltd. All rights reserved. <br />
            Contact: 9812345671 <br />
            Email: infinix@company.com <br />
            Kathmandu, Nepal
            
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;

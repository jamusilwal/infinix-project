import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('sessionId') || `session_${Date.now()}_${Math.random()}`;
    localStorage.setItem('sessionId', id);
    setSessionId(id);
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      setIsLoading(true);
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (item) => {
    try {
      setIsLoading(true);
      const existing = cart.find(
        (cartItem) => cartItem.color === item.color && cartItem.storage === item.storage
      );

      if (existing) {
        const newQuantity = existing.quantity + item.quantity;
        const updatedCart = cart.map((cartItem) =>
          cartItem.id === existing.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
        saveCart(updatedCart);
      } else {
        const newItem = {
          ...item,
          id: `${Date.now()}_${Math.random()}`,
        };
        saveCart([...cart, newItem]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (id) => {
    try {
      setIsLoading(true);
      const updatedCart = cart.filter((item) => item.id !== id);
      saveCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    try {
      setIsLoading(true);
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('cart');
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = (customerInfo) => {
    try {
      setIsLoading(true);
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const totalAmount = getTotal();

      const order = {
        id: `${Date.now()}_${Math.random()}`,
        order_number: orderNumber,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        items: cart,
        total_amount: totalAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      return order;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        checkout,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

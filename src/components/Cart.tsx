import { Minus, Plus, ShoppingBag, Trash2, CreditCard, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onRequestOrder: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onRequestOrder }: CartProps) {
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = items.length > 0 ? 500 : 0; // Sample delivery fee
  const total = subtotal + delivery;
  
  // Highlight newly added items
  useEffect(() => {
    const newItemIds = items.map(item => item.product.id).filter(id => !animatedItems.includes(id));
    
    if (newItemIds.length > 0) {
      setAnimatedItems(prev => [...prev, ...newItemIds]);
      
      // Remove highlight after animation completes
      const timer = setTimeout(() => {
        setAnimatedItems(prev => prev.filter(id => !newItemIds.includes(id)));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="flex flex-col items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <button 
            onClick={() => document.querySelector('.modal-backdrop')?.dispatchEvent(new MouseEvent('click'))} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4">
        {items.map((item) => {
          const isNew = animatedItems.includes(item.product.id);
          return (
            <div 
              key={item.product.id} 
              className={`flex items-center gap-3 p-3 border border-gray-100 rounded-lg ${isNew ? 'animate-pulse bg-blue-50' : 'bg-white'}`}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.product.name}</h3>
                {item.product.category === 'cement' && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mb-1">Premium</span>
                )}
                <p className="text-gray-800 font-bold">KSh {item.product.price.toLocaleString()}</p>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => item.quantity > 1 && onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        onUpdateQuantity(item.product.id, value);
                      }
                    }}
                    className="w-12 text-center border-x border-gray-200 py-1 focus:outline-none"
                  />
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-gray-600">
            <span>Subtotal</span>
            <span>KSh {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Delivery Fee</span>
            <span>KSh {delivery.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-gray-900 font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onRequestOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            <CreditCard className="w-5 h-5" />
            Request Order via WhatsApp
          </button>
          <button 
            onClick={() => document.querySelector('.modal-backdrop')?.dispatchEvent(new MouseEvent('click'))} 
            className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
import { ShoppingCart, MessageCircle, Clock, Award, Heart, Truck } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRequestOffer: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onRequestOffer }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Random value for offer expiration (14, 21, or 30 days)
  const offerDays = [14, 21, 30][Math.floor(Math.random() * 3)];
  const [liked, setLiked] = useState(false);
  
  // Check if product should have special offer based on price or category
  const hasSpecialOffer = product.category === 'cement' || product.price > 1000;
  const discount = hasSpecialOffer ? Math.floor(Math.random() * 15) + 5 : 0; // 5-20% discount
  const originalPrice = hasSpecialOffer ? Math.round(product.price / (1 - discount/100)) : product.price;
  
  // No countdown timer needed as we're using fixed days

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasSpecialOffer && (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 rounded-br-lg font-bold">
            {discount}% OFF
          </div>
        )}
        <button 
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          {product.category === 'cement' && (
            <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              <Award className="w-3 h-3 mr-1" /> Premium
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
        
        {/* Price display with original price if discounted */}
        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-gray-900 mr-2">
            KSh {product.price.toLocaleString()}
          </span>
          {hasSpecialOffer && (
            <span className="text-sm text-gray-500 line-through">
              KSh {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Tags display */}
        {product.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Urgency and delivery information */}
        <div className="space-y-2 mb-3">
          {hasSpecialOffer && (
            <div className="flex items-center text-amber-600 text-sm">
              <Clock className="w-4 h-4 mr-1" /> 
              <span>Limited offer ends in {offerDays} days</span>
            </div>
          )}
          
          <div className="flex items-center text-green-600 text-sm">
            <Truck className="w-4 h-4 mr-1" /> 
            <span>Free Delivery Countrywide</span>
          </div>
          
          <div className="flex items-center text-blue-600 text-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> 
            <span>In Stock</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors transform hover:scale-105 active:scale-95 duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={() => onRequestOffer(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors transform hover:scale-105 active:scale-95 duration-200"
            title="Request custom offer"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
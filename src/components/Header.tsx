import { useState } from 'react';
import { ShoppingCart, Menu, X, Phone, MapPin, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  isCartAnimating?: boolean;
}

export default function Header({ cartItemCount, onCartClick, isCartAnimating = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchInput);
    setSearchInput('');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar with contact info and special offers */}
      <div className="bg-blue-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:0717589355" className="flex items-center hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4 mr-1" /> 0717 589 355
            </a>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> Nairobi, Kenya
            </span>
          </div>
          <div>
            <span className="animate-pulse font-semibold">🔥 Special Offer: 10% Off on All Cement Products - Limited Time! 🔥</span>
          </div>
        </div>
      </div>

      {/* Main header with logo, search and cart */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - responsive text size */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Simba Cement & Steel
            </h1>
          </div>

          {/* Desktop Navigation and Search */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Products <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Cement Products</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Steel Products</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Water Tanks</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Roofing Materials</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Building Supplies</a>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </nav>

            <button
              onClick={onCartClick}
              className={`relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 active:scale-95 duration-200 flex items-center ${isCartAnimating ? 'animate-bounce' : ''}`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile cart button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={onCartClick}
              className={`relative bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors ${isCartAnimating ? 'animate-bounce' : ''}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4 shadow-lg">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <nav className="space-y-3">
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100">Home</a>
            <div>
              <button 
                onClick={() => console.log('Toggle product submenu')} 
                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100"
              >
                Products <ChevronDown className="w-4 h-4" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                <a href="#" className="block text-gray-600 hover:text-blue-600 py-1">Cement Products</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 py-1">Steel Products</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 py-1">Water Tanks</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 py-1">Roofing Materials</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 py-1">Building Supplies</a>
              </div>
            </div>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100">Services</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100">Contact</a>
            <div className="py-2">
              <a href="tel:0717589355" className="flex items-center text-blue-600 font-medium">
                <Phone className="w-4 h-4 mr-2" /> Call Us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
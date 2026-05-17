/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Menu, MapPin, ChevronDown } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Wireless Headphones",
    price: 49.99,
    rating: 4.5,
    image: "https://picsum.photos/seed/headphones/300/300",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch with Health Tracker",
    price: 89.00,
    rating: 4.2,
    image: "https://picsum.photos/seed/watch/300/300",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Cotton Casual T-Shirt",
    price: 15.99,
    rating: 3.8,
    image: "https://picsum.photos/seed/tshirt/300/300",
    category: "Clothing"
  },
  {
    id: 4,
    name: "Professional Kitchen Blender",
    price: 120.50,
    rating: 4.7,
    image: "https://picsum.photos/seed/blender/300/300",
    category: "Kitchen"
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 199.99,
    rating: 4.0,
    image: "https://picsum.photos/seed/chair/300/300",
    category: "Furniture"
  },
  {
    id: 6,
    name: "Reusable Water Bottle (32oz)",
    price: 12.99,
    rating: 4.8,
    image: "https://picsum.photos/seed/bottle/300/300",
    category: "Outdoor"
  }
];

type Page = 'home' | 'deals' | 'service' | 'registry' | 'gift-cards' | 'sell';

export default function App() {
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'deals':
        return (
          <div className="bg-white p-8 shadow-md rounded-md border border-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-orange-600">Today's Deals</h1>
            <p className="text-gray-600 mb-6">Welcome to the deals page! Here you will see all discounted items.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border p-4 rounded bg-red-50 border-red-200">
                <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">HOT DEAL</span>
                <h3 className="mt-2 font-bold">50% Off Headphones</h3>
                <button className="mt-4 bg-yellow-400 px-4 py-2 rounded text-sm font-bold">View Deal</button>
              </div>
              <div className="border p-4 rounded bg-blue-50 border-blue-200">
                <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">NEW DEAL</span>
                <h3 className="mt-2 font-bold">20% Off Kitchen Items</h3>
                <button className="mt-4 bg-yellow-400 px-4 py-2 rounded text-sm font-bold">View Deal</button>
              </div>
            </div>
          </div>
        );
      case 'service':
        return (
          <div className="bg-white p-8 shadow-md rounded-md border border-gray-200">
            <h1 className="text-3xl font-bold mb-4">Customer Service</h1>
            <p className="text-gray-600 mb-4">How can we help you today?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="p-6 border rounded shadow-sm hover:bg-gray-50 flex flex-col items-center">
                <span className="font-bold">Your Orders</span>
                <span className="text-xs text-gray-500">Track and return items</span>
              </button>
              <button className="p-6 border rounded shadow-sm hover:bg-gray-50 flex flex-col items-center">
                <span className="font-bold">Payment Methods</span>
                <span className="text-xs text-gray-500">Edit or add cards</span>
              </button>
              <button className="p-6 border rounded shadow-sm hover:bg-gray-50 flex flex-col items-center">
                <span className="font-bold">Help Desk</span>
                <span className="text-xs text-gray-500">Chat with support</span>
              </button>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <>
            {/* Hero Banner */}
            <div className="relative mb-6">
              <div className="h-48 md:h-64 lg:h-96 w-full overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/amazon-banner/1600/400" 
                  alt="Hero Banner" 
                  className="w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
            </div>

            {/* Main Grid */}
            <div className="px-4 max-w-screen-2xl mx-auto -mt-12 md:-mt-24 lg:-mt-48 relative z-10 pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                {/* Welcome Box */}
                <div className="bg-white p-6 shadow-md border-2 border-dashed border-orange-400">
                  <h2 className="text-xl font-bold mb-4 italic">Welcome to Amazon!</h2>
                  <p className="text-sm text-gray-600 mb-4">Shop the latest deals and items here. Use the navigation bar to explore more!</p>
                  <button className="w-full bg-[#f0c14b] border border-[#a88734] py-1 text-sm rounded shadow hover:bg-[#e7b43a]">
                    Start Browsing
                  </button>
                </div>

                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div 
                      key={p.id} 
                      className="bg-white p-4 flex flex-col h-full shadow border border-gray-200 hover:scale-[1.01] transition-transform"
                      id={`product-${p.id}`}
                    >
                      <div className="h-48 mb-4 overflow-hidden flex justify-center items-center bg-gray-50 rounded">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h3 className="font-bold text-sm line-clamp-2 mb-1 hover:text-orange-700 cursor-pointer">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-orange-400">
                          {"★".repeat(Math.floor(p.rating))}
                          {"☆".repeat(5 - Math.floor(p.rating))}
                        </div>
                        <span className="text-xs text-blue-600">1,245 ratings</span>
                      </div>
                      <div className="text-lg font-bold mb-4">
                        <span className="text-xs align-top mt-1 mr-0.5">$</span>
                        {p.price.toFixed(2)}
                      </div>
                      <div className="mt-auto space-y-2">
                        <button 
                          onClick={() => addToCart(p.id)}
                          className="w-full bg-[#f0c14b] border border-[#a88734] py-1 text-sm rounded-lg shadow hover:bg-[#e7b43a] active:bg-[#d8a82d]"
                        >
                          Add to Cart
                        </button>
                        <button className="w-full bg-[#ffa41c] border border-[#c87800] py-1 text-sm rounded-lg shadow hover:bg-[#f39700]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-500 bg-white shadow rounded underline underline-offset-4 decoration-orange-300">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 max-w-7xl mx-auto border-x-4 border-gray-300 shadow-2xl">
      {/* Header / Navbar */}
      <nav className="bg-[#131921] text-white p-2 flex items-center gap-4 sticky top-0 z-50">
        <div 
          className="flex items-center gap-2 px-2 py-1 border border-transparent hover:border-white cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <div className="text-2xl font-black text-white italic tracking-tighter">amazon<span className="text-[#febd69] text-xl">.in</span></div>
        </div>

        <div className="hidden md:flex flex-col text-xs px-2 py-1 border border-transparent hover:border-white cursor-pointer">
          <span className="text-gray-400">Deliver to</span>
          <div className="flex items-center font-bold">
            <MapPin size={14} className="mr-1" />
            <span>Select Location</span>
          </div>
        </div>

        {/* WHITE Search Bar */}
        <div className="flex-1 flex items-center">
          <div className="bg-gray-200 flex items-center px-3 py-2 rounded-l-md text-gray-700 text-sm border-r border-gray-400 cursor-pointer hover:bg-gray-300">
            All <ChevronDown size={14} className="ml-1" />
          </div>
          <input 
            type="text" 
            placeholder="Search Amazon" 
            className="w-full p-2 outline-none text-black bg-white" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#febd69] p-2 rounded-r-md hover:bg-[#f3a847] transition-colors border border-[#febd69]">
            <Search size={22} className="text-[#131921]" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs font-bold px-2 py-1 border border-transparent hover:border-white cursor-pointer">
          <div>
            <span className="text-gray-400 block font-normal">Hello, sign in</span>
            <span>Account & Lists</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col text-xs font-bold px-2 py-1 border border-transparent hover:border-white cursor-pointer">
          <span className="text-gray-400 font-normal">Returns</span>
          <span>& Orders</span>
        </div>

        <div className="flex items-center gap-1 font-bold px-2 py-1 border border-transparent hover:border-white cursor-pointer relative">
          <ShoppingCart size={30} />
          <span className="absolute top-[-2px] right-[40px] bg-orange-600 px-1.5 rounded-full text-white text-xs font-bold">
            {cart.length}
          </span>
          <span className="hidden md:block self-end text-sm">Cart</span>
        </div>
      </nav>

      {/* Sub-nav with Navigation functionality */}
      <div className="bg-[#232f3e] text-white p-2 flex gap-4 text-sm font-medium items-center overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-500">
        <div 
          className="flex items-center gap-1 px-2 border border-transparent hover:border-white cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <Menu size={18} /> All
        </div>
        <span 
          className={`px-2 border border-transparent hover:border-white cursor-pointer ${currentPage === 'deals' ? 'border-white' : ''}`}
          onClick={() => setCurrentPage('deals')}
        >
          Today's Deals
        </span>
        <span 
          className={`px-2 border border-transparent hover:border-white cursor-pointer ${currentPage === 'service' ? 'border-white' : ''}`}
          onClick={() => setCurrentPage('service')}
        >
          Customer Service
        </span>
        <span className="px-2 border border-transparent hover:border-white cursor-pointer">Registry</span>
        <span className="px-2 border border-transparent hover:border-white cursor-pointer">Gift Cards</span>
        <span className="px-2 border border-transparent hover:border-white cursor-pointer">Sell</span>
      </div>

      {/* Dynamic Content Area */}
      <main className="p-4">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#232f3e] text-white border-t-8 border-gray-600">
        <div className="bg-[#37475a] p-4 text-center text-sm hover:bg-[#485769] cursor-pointer font-bold" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Back to top
        </div>
        
        <div className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-l-2 border-gray-600 pl-4">
            <h4 className="font-bold mb-3 text-base text-[#febd69]">Get to Know Us</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">About Amazon</li>
              <li className="hover:underline cursor-pointer">Investor Relations</li>
            </ul>
          </div>
          <div className="border-l-2 border-gray-600 pl-4">
            <h4 className="font-bold mb-3 text-base text-[#febd69]">Make Money with Us</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise</li>
            </ul>
          </div>
          <div className="border-l-2 border-gray-600 pl-4">
            <h4 className="font-bold mb-3 text-base text-[#febd69]">Payment</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon Rewards</li>
              <li className="hover:underline cursor-pointer">Shop with Points</li>
            </ul>
          </div>
          <div className="border-l-2 border-gray-600 pl-4">
            <h4 className="font-bold mb-3 text-base text-[#febd69]">Help Desk</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#131921] py-8 text-center text-xs text-gray-400">
          <div className="flex justify-center gap-4 mb-4">
            <span className="p-1 border border-gray-600 rounded">English</span>
            <span className="p-1 border border-gray-600 rounded">India</span>
          </div>
          <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}

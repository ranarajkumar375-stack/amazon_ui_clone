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
    image: "data:image/jpeg;base64,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",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch with Health Tracker",
    price: 89.00,
    rating: 4.2,
    image: "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw472776ec/images/Fastrack/Catalog/38184PP02K_1.jpg?sw=600&sh=600",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Cotton Casual T-Shirt",
    price: 15.99,
    rating: 3.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDM_k3K4w1gYq_24C3CxiKoorF0J2UIofuEg&s",
    category: "Clothing"
  },
  {
    id: 4,
    name: "Professional Kitchen Blender",
    price: 120.50,
    rating: 4.7,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh8I9W4guMYt5kE5xBvmgs7zF4FNUXCTCRZQ&s",
    category: "Kitchen"
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 199.99,
    rating: 4.0,
    image: "https://cellbell.in/cdn/shop/files/B08R5GR57J.MAIN.png?v=1772305272&width=1946",
    category: "Furniture"
  },
  {
    id: 6,
    name: "Reusable Water Bottle (32oz)",
    price: 12.99,
    rating: 4.8,
    image: "https://5.imimg.com/data5/SELLER/Default/2025/12/571980142/KY/GQ/LJ/126088954/whatsapp-image-2025-12-14-at-7-01-05-pm-1-500x500.jpeg",
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

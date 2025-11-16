"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { ChevronRight, Zap, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=8");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    { title: "Mega Summer Sale", discount: "Up to 70% Off", color: "from-purple-600 to-purple-800" },
    { title: "Fashion Week", discount: "Exclusive Collections", color: "from-orange-500 to-pink-600" },
    { title: "Tech Fest", discount: "Latest Gadgets", color: "from-blue-600 to-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Dynamic Rotating Hero Banner */}
      <section className={`bg-gradient-to-r ${banners[currentBanner].color} text-white py-20 transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-300" size={24} />
                <span className="text-sm font-semibold text-yellow-300">TRENDING NOW</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
                {banners[currentBanner].title}
              </h1>
              <p className="text-xl mb-2 text-gray-100">
                {banners[currentBanner].discount}
              </p>
              <p className="text-gray-200 mb-8">
                Limited time offer. Shop now and save big on your favorite products!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition transform hover:scale-105"
              >
                Explore Now <ChevronRight size={20} />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-300 h-72 rounded-2xl flex items-center justify-center shadow-2xl">
              <img
                src="/urban-lifestyle-shopping.jpg"
                alt="Hero"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          
          {/* Banner indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentBanner ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 dark:bg-card py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-3 p-4">
              <Truck className="text-primary" size={24} />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Shield className="text-primary" size={24} />
              <div>
                <p className="font-semibold text-sm">100% Authentic</p>
                <p className="text-xs text-muted-foreground">Verified sellers only</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <RotateCcw className="text-primary" size={24} />
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Award className="text-primary" size={24} />
              <div>
                <p className="font-semibold text-sm">Best Prices</p>
                <p className="text-xs text-muted-foreground">Price match guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground mb-12">Explore our curated collections</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Electronics", emoji: "📱", color: "from-blue-500 to-cyan-500" },
              { name: "Fashion", emoji: "👗", color: "from-pink-500 to-rose-500" },
              { name: "Home & Living", emoji: "🏠", color: "from-amber-500 to-orange-500" },
              { name: "Sports & Outdoor", emoji: "⚽", color: "from-green-500 to-emerald-500" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.name}`}
                className={`bg-gradient-to-br ${cat.color} text-white p-6 rounded-xl text-center hover:shadow-lg transition transform hover:scale-105 cursor-pointer group`}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">{cat.emoji}</div>
                <p className="font-bold text-lg">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground">Featured Picks</h2>
              <p className="text-muted-foreground mt-2">Handpicked for you</p>
            </div>
            <Link
              href="/products"
              className="text-primary hover:text-primary/80 font-bold flex items-center gap-2 hover:gap-3 transition"
            >
              View All <ChevronRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} id={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-primary to-purple-700 text-white py-16 my-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap size={40} className="text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-bold">Exclusive Deals</h2>
          </div>
          <p className="text-lg mb-2 text-gray-100">
            Use code <span className="font-bold text-2xl text-yellow-300">SAVE20</span> for 20% off!
          </p>
          <p className="text-gray-200 mb-8">Or use FLAT50 for flat 50 discount on orders above $100</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/offers"
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              View All Offers
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">U</div>
                UrbanCart
              </h3>
              <p className="text-sm">Your premium destination for urban lifestyle shopping.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
                <li><Link href="/offers" className="hover:text-white transition">Offers</Link></li>
                <li><Link href="/cart" className="hover:text-white transition">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p className="mb-4">Follow us on social media</p>
            <p>&copy; 2025 UrbanCart. All rights reserved. | Premium Urban Shopping Destination</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

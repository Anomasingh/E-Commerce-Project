"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, LogOut, Heart, User, Search, TrendingUp } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const items = JSON.parse(cart);
        setCartCount(items.length);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between h-10 text-xs border-b border-white/20">
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition">Free Shipping on Orders Over $50</a>
            <a href="#" className="hover:text-secondary transition">24/7 Customer Support</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-secondary transition">Track Order</a>
            <a href="#" className="hover:text-secondary transition">Returns</a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-3xl font-bold flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-bold text-xl">U</div>
            <span>UrbanCart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 mx-8 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Search size={18} className="text-white/60" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full px-3 text-white placeholder-white/60 outline-none"
            />
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-secondary transition font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-secondary transition font-medium flex items-center gap-1">
              <TrendingUp size={18} />
              Trending
            </Link>
            <Link href="/offers" className="hover:text-secondary transition font-medium">
              Offers
            </Link>
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link href="/cart" className="relative hover:text-secondary transition">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link href="/profile" className="hover:text-secondary transition">
                  <User size={24} />
                </Link>
                <div className="flex items-center gap-3 pl-6 border-l border-white/20">
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-white/70 capitalize">{user.role}</p>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="ml-4 px-3 py-1 bg-secondary text-primary rounded-full text-xs font-bold hover:bg-white transition"
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user.role === "vendor" && (
                    <Link
                      href="/vendor"
                      className="ml-4 px-3 py-1 bg-secondary text-primary rounded-full text-xs font-bold hover:bg-white transition"
                    >
                      Vendor Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="ml-4 hover:text-red-300 transition p-1"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-secondary text-primary rounded-full font-bold hover:bg-white transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 border-2 border-secondary text-white rounded-full font-bold hover:bg-secondary/20 transition"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4 border-t border-white/20 pt-4">
            <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-lg px-3 py-2">
              <Search size={18} className="text-white/60" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 px-3 text-white placeholder-white/60 outline-none text-sm"
              />
            </form>
            
            <Link href="/" className="block hover:text-secondary font-medium">
              Home
            </Link>
            <Link href="/products" className="block hover:text-secondary font-medium">
              Trending
            </Link>
            <Link href="/offers" className="block hover:text-secondary font-medium">
              Offers
            </Link>
            <Link href="/cart" className="block hover:text-secondary font-medium flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            
            {user ? (
              <div className="space-y-3 border-t border-white/20 pt-4">
                <p className="font-semibold">{user.name}</p>
                <Link href="/profile" className="block hover:text-secondary">
                  My Profile
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" className="block hover:text-secondary">
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "vendor" && (
                  <Link href="/vendor" className="block hover:text-secondary">
                    Vendor Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t border-white/20 pt-4">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-secondary text-primary rounded-lg text-center font-bold"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 border-2 border-secondary rounded-lg text-center font-bold"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

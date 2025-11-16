"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { Filter, X, Sliders } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedCategory) query.append("category", selectedCategory);
        if (search) query.append("search", search);
        const response = await fetch(`/api/products?${query}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, search]);

  const filteredProducts = products
    .filter((p: any) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a: any, b: any) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const categories = ["Electronics", "Fashion", "Home & Living", "Sports & Outdoor"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore Products</h1>
          <p className="text-muted-foreground">{filteredProducts.length} items available</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-card rounded-xl shadow-md p-6 sticky top-24 border border-border">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-foreground">
                <Sliders size={20} className="text-primary" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="font-semibold mb-4 text-foreground">Category</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="text-primary text-sm hover:underline font-medium mt-2"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="font-semibold mb-4 text-foreground">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-1/2 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-1/2 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</p>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition"
              >
                <Filter size={20} />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 bg-card border border-border rounded-xl p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2">
                          <input
                            type="radio"
                            value={cat}
                            checked={selectedCategory === cat}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="accent-primary"
                          />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-primary"
                    />
                    <p className="text-sm text-muted-foreground mt-2">${priceRange[0]} - ${priceRange[1]}</p>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setPriceRange([0, 500]);
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

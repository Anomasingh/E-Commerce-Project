"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert("Added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="text-primary hover:underline mb-6 inline-block">
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4 bg-muted rounded-xl overflow-hidden aspect-square">
              <img
                src={product.image || "/placeholder.svg?height=500&width=500&query=product"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < Math.round(product.rating) ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <span className="font-bold text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-2xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-green-600 font-semibold">You save ${(product.originalPrice - product.price).toFixed(2)}</p>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8 space-y-4">
              <label className="block text-sm font-semibold text-foreground">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  -
                </button>
                <span className="px-6 py-2 font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="flex-1 border-2 border-border py-3 rounded-xl hover:bg-muted transition font-semibold flex items-center justify-center gap-2"
                >
                  <Heart size={20} className={isFavorited ? "fill-red-500 text-red-500" : ""} />
                  {isFavorited ? "Favorited" : "Favorite"}
                </button>
                <button className="flex-1 border-2 border-border py-3 rounded-xl hover:bg-muted transition font-semibold flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 p-6 bg-muted rounded-xl">
              <div className="flex items-start gap-3">
                <Truck className="text-primary" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="text-primary" size={24} />
                <div>
                  <p className="font-semibold text-foreground">100% Authentic</p>
                  <p className="text-sm text-muted-foreground">Verified and guaranteed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="text-primary" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">30-day return guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4">
                  <p className="font-semibold text-foreground mb-2 line-clamp-2">Similar Product {i}</p>
                  <p className="text-primary font-bold mb-3">$29.99</p>
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

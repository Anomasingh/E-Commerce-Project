"use client";

import { Star, ShoppingCart, Heart } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find((item: any) => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      
      setTimeout(() => setIsAdding(false), 500);
    } catch (error) {
      setIsAdding(false);
      console.error("Failed to add to cart:", error);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-card rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden cursor-pointer group border border-border hover:border-primary/50 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-56">
          <img
            src={image || "/placeholder.svg?height=224&width=224&query=product"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{discount}%
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-secondary hover:text-white transition-all shadow-lg"
          >
            <Heart size={20} className={isFavorited ? "fill-red-500 text-red-500" : ""} />
          </button>

          {/* Stock Status */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs font-semibold">In Stock</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < Math.round(rating) ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">${price}</span>
            {originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold disabled:opacity-70"
          >
            <ShoppingCart size={18} />
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}

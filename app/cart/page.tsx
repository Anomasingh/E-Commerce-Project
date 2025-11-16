"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, Zap } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (updatedCart: any) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter((item: any) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    saveCart(
      cart.map((item: any) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const applyCoupon = () => {
    let discountAmount = 0;
    if (coupon.toUpperCase() === "SAVE20") {
      discountAmount = 0.2;
      setAppliedCoupon("SAVE20");
    } else if (coupon.toUpperCase() === "FLAT50") {
      discountAmount = 50;
      setAppliedCoupon("FLAT50");
    } else if (coupon.toUpperCase() === "SUMMER30") {
      discountAmount = 0.3;
      setAppliedCoupon("SUMMER30");
    } else {
      setAppliedCoupon("");
      alert("Invalid coupon code");
      return;
    }
    setDiscount(discountAmount);
    setCoupon("");
  };

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const finalDiscount = discount > 1 ? discount : subtotal * discount;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - finalDiscount) * 0.1;
  const total = Math.max(0, subtotal - finalDiscount + shipping + tax);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">{cart.length} item(s) in your cart</p>

        {cart.length === 0 ? (
          <div className="bg-card border-2 border-dashed border-border p-12 rounded-xl text-center">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-foreground text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Add some items to get started</p>
            <Link
              href="/products"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary/90 font-semibold transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition"
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.image || "/placeholder.svg?height=120&width=120&query=product"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
                      <p className="text-primary font-bold text-xl">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-muted rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-border rounded text-foreground"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-3 font-semibold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-border rounded text-foreground"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <p className="font-bold text-lg text-foreground min-w-24 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/20 rounded-lg text-destructive transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl shadow-md p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>{appliedCoupon}</span>
                      <span className="font-semibold">-${finalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                {/* Coupon Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 font-semibold transition"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-xs text-muted-foreground space-y-1">
                    <p className="font-semibold">Available codes:</p>
                    <p>SAVE20 (20% off) | FLAT50 ($50 off) | SUMMER30 (30% off)</p>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full block text-center bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 font-bold transition flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="w-full block text-center bg-muted text-foreground py-3 rounded-xl hover:bg-border transition font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

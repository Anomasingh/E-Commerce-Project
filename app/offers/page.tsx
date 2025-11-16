"use client";

import Navbar from "@/components/navbar";
import { Zap, Copy, Gift, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';

export default function OffersPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const offers = [
    {
      code: "SAVE20",
      discount: "20% OFF",
      description: "Save 20% on your entire purchase",
      minOrder: "No minimum",
      expires: "30 days",
      icon: Gift,
      color: "from-blue-500 to-blue-600",
    },
    {
      code: "FLAT50",
      discount: "$50 OFF",
      description: "Get $50 off on orders over $200",
      minOrder: "$200",
      expires: "15 days",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      code: "SUMMER30",
      discount: "30% OFF",
      description: "Summer special - 30% off selected items",
      minOrder: "No minimum",
      expires: "7 days",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-secondary rounded-xl">
              <Zap size={32} className="text-secondary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">Special Offers</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock exclusive discounts and save big on your favorite UrbanCart products. Use our promo codes at checkout to get instant savings!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.code}
                className={`bg-gradient-to-br ${offer.color} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition transform hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-4xl font-bold">{offer.discount}</h2>
                    <p className="text-white/80 text-sm">{offer.description}</p>
                  </div>
                  <Icon size={32} className="opacity-80" />
                </div>

                <div className="space-y-3 mb-6 border-t border-white/20 pt-6">
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase">Code</p>
                    <p className="text-2xl font-mono font-bold tracking-widest">{offer.code}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-xs font-semibold uppercase">Min Order</p>
                      <p className="font-semibold">{offer.minOrder}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-semibold uppercase">Expires In</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Clock size={14} /> {offer.expires}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyCode(offer.code)}
                  className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                    copied === offer.code
                      ? "bg-white text-green-600"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  <Copy size={18} />
                  {copied === offer.code ? "Copied!" : "Copy Code"}
                </button>
              </div>
            );
          })}
        </div>

        {/* How to Use */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" size={28} />
            How to Use Promo Codes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Browse", desc: "Explore our amazing collection" },
              { step: 2, title: "Add Items", desc: "Add products to your cart" },
              { step: 3, title: "Checkout", desc: "Go to checkout page" },
              { step: 4, title: "Apply Code", desc: "Enter promo code & save!" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-muted border border-border rounded-xl p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-3">Terms & Conditions:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Codes are valid for a limited time only</li>
            <li>One code per order (cannot be combined)</li>
            <li>Free shipping applies on orders over $50</li>
            <li>Returns are accepted within 30 days</li>
            <li>Discounts apply only to product prices, not shipping or tax</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

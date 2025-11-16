"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-12 text-center space-y-6 mb-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle size={96} className="text-green-600" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          {/* Order Confirmation */}
          <div className="bg-muted p-6 rounded-xl text-left space-y-4 my-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Order Number</p>
                <p className="font-bold text-foreground">#UC-2025-1234</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Order Date</p>
                <p className="font-bold text-foreground">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Estimated Delivery</p>
                <p className="font-bold text-foreground">5-7 days</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Order Total</p>
                <p className="font-bold text-primary text-lg">$99.99</p>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              A confirmation email has been sent to your registered email address with order details and tracking information.
            </p>
          </div>

          {/* Timeline */}
          <div className="my-8 space-y-4 text-left">
            <p className="font-semibold text-foreground text-center mb-4">What's Next?</p>
            <div className="space-y-3">
              {[
                { icon: Package, title: "Processing", desc: "Your order is being prepared for shipment" },
                { icon: Truck, title: "Shipped", desc: "We'll send you a tracking number via email" },
                { icon: CheckCircle, title: "Delivered", desc: "Receive your order at your doorstep" },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-border">
            <Link
              href="/profile"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-1">Can I modify my order?</p>
              <p className="text-muted-foreground">Orders can be modified within 1 hour of placement. Contact our support team immediately.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">What about returns?</p>
              <p className="text-muted-foreground">We offer a 30-day returns guarantee. Items must be in original condition.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">How do I track my order?</p>
              <p className="text-muted-foreground">Check your email for tracking information or visit your profile to view order status.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

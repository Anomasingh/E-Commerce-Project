"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Store, Package, ShoppingCart, TrendingUp, DollarSign, Eye } from 'lucide-react';

export default function VendorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "vendor") {
      router.push("/");
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
      </div>
    );
  }

  const stats = [
    { icon: Package, label: "My Products", value: "42", color: "from-blue-500 to-blue-600" },
    { icon: ShoppingCart, label: "My Orders", value: "156", color: "from-purple-500 to-purple-600" },
    { icon: DollarSign, label: "My Revenue", value: "$12,345", color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="p-3 bg-primary rounded-lg text-primary-foreground">
              <Store size={32} />
            </div>
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Welcome, {user?.name}! Manage your shop and grow your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                  <Icon size={32} className="opacity-80" />
                </div>
                <p className="text-white/70 text-xs mt-4 flex items-center gap-1">
                  <TrendingUp size={14} /> Stable performance
                </p>
              </div>
            );
          })}
        </div>

        {/* Management Options */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Eye className="text-primary" size={32} />
            Shop Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "My Products",
                desc: "Add, edit, and manage your product listings",
                icon: Package,
                href: "/vendor/products",
              },
              {
                title: "My Orders",
                desc: "View and track orders from customers",
                icon: ShoppingCart,
                href: "/vendor/orders",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-lg text-secondary-foreground group-hover:scale-110 transition">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Shop Rating", value: "4.8/5", desc: "From 2,341 reviews" },
            { title: "Response Time", value: "<2 hrs", desc: "Average customer reply" },
            { title: "Repeat Customers", value: "68%", desc: "Of your total sales" },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-muted-foreground text-sm font-medium mb-2">{item.title}</p>
              <p className="text-3xl font-bold text-foreground mb-1">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

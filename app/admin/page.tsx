"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { BarChart3, ShoppingCart, Users, Package, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
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
    if (parsedUser.role !== "admin") {
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
    { icon: ShoppingCart, label: "Total Orders", value: "1,234", color: "from-blue-500 to-blue-600" },
    { icon: DollarSign, label: "Revenue", value: "$45,678", color: "from-green-500 to-green-600" },
    { icon: Users, label: "Total Users", value: "567", color: "from-purple-500 to-purple-600" },
    { icon: Package, label: "Products", value: "234", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back, {user?.name}! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  <TrendingUp size={14} /> Up 12% from last month
                </p>
              </div>
            );
          })}
        </div>

        {/* Management Options */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <BarChart3 className="text-primary" size={32} />
            Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Manage Products",
                desc: "Add, edit, delete and organize all products",
                icon: Package,
                href: "/admin/products",
              },
              {
                title: "Manage Orders",
                desc: "View, track and manage all customer orders",
                icon: ShoppingCart,
                href: "/admin/orders",
              },
              {
                title: "Manage Users",
                desc: "View user profiles, roles and activity",
                icon: Users,
                href: "/admin/users",
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
                    <div className="p-3 bg-primary rounded-lg text-primary-foreground group-hover:scale-110 transition">
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
      </div>
    </div>
  );
}

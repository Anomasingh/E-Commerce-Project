"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { User, Mail, LogOut, ShoppingCart, Settings, Heart } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "profile", icon: User, label: "Profile" },
                  { id: "orders", icon: ShoppingCart, label: "Orders" },
                  { id: "favorites", icon: Heart, label: "Favorites" },
                  { id: "settings", icon: Settings, label: "Settings" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full mt-6 px-4 py-3 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">Full Name</label>
                    <p className="text-lg font-semibold text-foreground">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">Email</label>
                    <p className="text-lg font-semibold text-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">Account Type</label>
                    <p className="text-lg font-semibold text-foreground capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">Member Since</label>
                    <p className="text-lg font-semibold text-foreground">2025</p>
                  </div>
                </div>

                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition">
                  Edit Profile
                </button>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">My Orders</h2>
                {orders.length > 0 ? (
                  orders.map((order: any) => (
                    <div key={order._id} className="bg-card border border-border rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-foreground">Order #{order._id?.toString().slice(-8)}</p>
                          <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold capitalize">
                          {order.status || "Pending"}
                        </span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground">Total: ${order.total?.toFixed(2) || "0.00"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Link href="/products" className="text-primary hover:underline font-semibold">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                    <span className="text-foreground">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                    <span className="text-foreground">Order updates</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-foreground">Promotional offers</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

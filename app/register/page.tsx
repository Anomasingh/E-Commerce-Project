"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, ShoppingBag } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground">
              <UserPlus size={24} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          </div>

          {error && (
            <div className="bg-destructive/20 text-destructive border border-destructive/30 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">At least 8 characters recommended</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`p-3 border-2 rounded-lg cursor-pointer transition ${formData.role === 'customer' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <p className="font-semibold text-sm mt-1">Customer</p>
                  <p className="text-xs text-muted-foreground">Shop & browse</p>
                </label>
                <label className={`p-3 border-2 rounded-lg cursor-pointer transition ${formData.role === 'vendor' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.role === "vendor"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <p className="font-semibold text-sm mt-1">Vendor</p>
                  <p className="text-xs text-muted-foreground">Sell products</p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 p-4 bg-muted rounded-lg space-y-2">
            <p className="text-sm font-bold text-foreground">UrbanCart Benefits:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="flex items-center gap-2"><ShoppingBag size={14} className="text-primary" /> Free shipping on orders over $50</p>
              <p className="flex items-center gap-2"><ShoppingBag size={14} className="text-primary" /> 30-day returns guarantee</p>
              <p className="flex items-center gap-2"><ShoppingBag size={14} className="text-primary" /> 100% authentic products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

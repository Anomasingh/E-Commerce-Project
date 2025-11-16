"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
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

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <LogIn size={24} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
          </div>

          {error && (
            <div className="bg-destructive/20 text-destructive border border-destructive/30 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              New to UrbanCart?{" "}
              <Link href="/register" className="text-primary hover:underline font-semibold">
                Create an account
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-secondary/20 border border-secondary/40 rounded-lg space-y-3">
            <p className="text-sm font-bold text-foreground">Demo Accounts:</p>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => fillDemoAccount("admin@example.com", "admin123")}
                className="w-full text-left p-2 bg-primary/20 hover:bg-primary/30 rounded text-primary-foreground transition"
              >
                Admin: admin@example.com
              </button>
              <button
                onClick={() => fillDemoAccount("vendor@example.com", "vendor123")}
                className="w-full text-left p-2 bg-secondary/20 hover:bg-secondary/30 rounded text-secondary-foreground transition"
              >
                Vendor: vendor@example.com
              </button>
              <button
                onClick={() => fillDemoAccount("customer@example.com", "customer123")}
                className="w-full text-left p-2 bg-primary/20 hover:bg-primary/30 rounded text-primary-foreground transition"
              >
                Customer: customer@example.com
              </button>
            </div>
            <p className="text-xs text-muted-foreground pt-2">Password: same as username (remove @example.com)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

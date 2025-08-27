"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic removed - form will just handle state
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-100 px-4 py-6">
      <div className="w-full max-w-sm">
        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-pink-100">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">☕</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Sign in to your coffee account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none bg-white/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none bg-white/50 text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-pink-300 text-pink-500 focus:ring-pink-200 w-4 h-4"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Forgot?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-3 border border-pink-200 rounded-xl shadow-sm bg-white/50 text-xs font-medium text-gray-700 hover:bg-pink-50 transition-colors">
                <span className="mr-1">🔍</span>
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-3 border border-pink-200 rounded-xl shadow-sm bg-white/50 text-xs font-medium text-gray-700 hover:bg-pink-50 transition-colors">
                <span className="mr-1">📘</span>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-pink-600 hover:text-pink-700"
              >
                Sign up free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

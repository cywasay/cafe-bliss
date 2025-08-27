"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy signup logic
    console.log("New user registered:", { name, email, password });
    // After signup, redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-100 px-4 py-6">
      <div className="w-full max-w-sm">
        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-pink-100">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">☕</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-pink-600 bg-clip-text text-transparent">
              Join Café Bliss
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Create your coffee account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none bg-white/50 text-sm"
                required
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none bg-white/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none bg-white/50 text-sm"
                required
              />
            </div>

            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                className="rounded border-pink-300 text-pink-500 focus:ring-pink-200 w-4 h-4 mr-2"
                required
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
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
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-700"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-4 bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200 rounded-xl p-3 text-center">
          <div className="text-lg mb-1">🎉</div>
          <h3 className="text-sm font-medium text-amber-800 mb-1">
            Welcome to Café Bliss!
          </h3>
          <p className="text-xs text-amber-700">
            Join our community of coffee lovers
          </p>
        </div>
      </div>
    </div>
  );
}

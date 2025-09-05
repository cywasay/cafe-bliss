"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await signup(email, password, name);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-white via-rose-50 to-pink-100">
      {/* Desktop Layout - Horizontal Split */}
      <div className="hidden lg:flex h-full w-full">
        {/* Left Panel - Branding */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-amber-700 via-pink-600 to-rose-600 p-6">
          <div className="text-center text-white max-w-xs">
            <div className="text-3xl mb-3">☕</div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Café Bliss</h1>
            <p className="text-base opacity-90 leading-relaxed mb-4">
              Join our community of coffee lovers
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs opacity-75">
              <div className="text-center">
                <div className="text-lg font-bold">1000+</div>
                <div>Customers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">4.9★</div>
                <div>Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">50+</div>
                <div>Varieties</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-light text-gray-900 mb-1">Create account</h2>
              <p className="text-gray-500 text-xs">Enter your details to get started</p>
            </div>

            <SignupForm 
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              error={error}
              loading={loading}
              handleSubmit={handleSubmit}
            />

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-pink-600 hover:text-pink-700 transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="lg:hidden h-full flex flex-col justify-center px-4 py-4">
        <div className="w-full max-w-sm mx-auto">
          <div className="text-center mb-4">
            <div className="text-xl mb-2">☕</div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-amber-800 to-pink-600 bg-clip-text text-transparent">
              Join Café Bliss
            </h2>
            <p className="text-gray-600 mt-1 text-xs">
              Create your coffee account
            </p>
          </div>

          <SignupForm 
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            loading={loading}
            handleSubmit={handleSubmit}
          />

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-pink-600 hover:text-pink-700 transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupForm({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, handleSubmit }) {
  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors outline-none text-sm text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors outline-none text-sm text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors outline-none text-sm text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors outline-none text-sm text-gray-900 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="flex items-start py-1">
          <input
            type="checkbox"
            className="mt-0.5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 w-3 h-3 mr-2 flex-shrink-0"
            required
          />
          <span className="text-xs text-gray-600 leading-tight">
            I agree to the{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
              Privacy Policy
            </a>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-md font-semibold hover:from-pink-700 hover:to-rose-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-gray-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24">
            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-xs font-medium">Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24">
            <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-xs font-medium">Facebook</span>
        </button>
      </div>
    </div>
  );
}
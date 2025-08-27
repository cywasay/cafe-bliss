"use client";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header on login and signup pages
  const hideHeader = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {!hideHeader && <Header />}
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

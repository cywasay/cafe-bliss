import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import ErrorBoundary from "../components/ErrorBoundary";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Café Bliss - Premium Coffee Shop",
  description: "Discover the finest coffee blends, freshly roasted and delivered to your doorstep. Experience premium quality coffee from Café Bliss.",
  keywords: "coffee, premium coffee, coffee shop, coffee beans, roasted coffee, specialty coffee",
  authors: [{ name: "Café Bliss Team" }],
  openGraph: {
    title: "Café Bliss - Premium Coffee Shop",
    description: "Discover the finest coffee blends, freshly roasted and delivered to your doorstep.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Bliss - Premium Coffee Shop",
    description: "Discover the finest coffee blends, freshly roasted and delivered to your doorstep.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ErrorBoundary>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <LayoutClient>
                  {children}
                </LayoutClient>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  // Hide header on login and signup pages
  const hideHeader = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
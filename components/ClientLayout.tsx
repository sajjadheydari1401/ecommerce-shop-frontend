"use client";
import React, { useState } from "react";
import Providers from "./Providers";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar onToggleCart={() => setCartOpen(v => !v)} />
        <main className="container py-6">{children}</main>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </Providers>
  );
}

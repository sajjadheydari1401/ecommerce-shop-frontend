"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "../store/cart";

export default function Navbar({
  onToggleCart,
}: {
  onToggleCart?: () => void;
}) {
  const items = useCart((state) => state.items);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          E-Commerce Demo
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleCart}
            className="flex items-center gap-2 rounded bg-indigo-600 px-3 py-1 text-white"
          >
            Cart
            {totalCount > 0 && (
              <span className="rounded-full bg-white text-indigo-600 px-2 text-sm">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

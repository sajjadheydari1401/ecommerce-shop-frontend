"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../store/cart";
import { AppButton } from "./common/AppButton";

export default function Navbar() {
  const items = useCart((state) => state.items);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDark(stored === "dark");
        document.documentElement.classList.toggle("dark", stored === "dark");
      } else {
        const prefers =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDark(prefers);
        document.documentElement.classList.toggle("dark", prefers);
      }
    } catch (e) {
      // ignore (SSR safe)
    }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {}
  }

  return (
    <header className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm sticky top-0 z-30">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand rounded-md flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            724 Online Shop
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <AppButton
            onClick={toggleTheme}
            isGhost
            variant="secondary"
            aria-label="Toggle theme"
          >
            {dark ? "Light" : "Dark"}
          </AppButton>

          <Link href="/cart" target="_blank">
            <AppButton variant="primary" className="flex items-center gap-2">
              <span>Cart</span>
              {totalCount > 0 && (
                <span className="rounded-full bg-white text-brand px-2 text-xs font-medium">
                  {totalCount}
                </span>
              )}
            </AppButton>
          </Link>
        </div>
      </div>
    </header>
  );
}

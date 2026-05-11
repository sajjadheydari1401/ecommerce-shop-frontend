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

  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) {
        setDark(stored === 'dark');
        document.documentElement.classList.toggle('dark', stored === 'dark');
      } else {
        const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(prefers);
        document.documentElement.classList.toggle('dark', prefers);
      }
    } catch (e) {
      // ignore (SSR safe)
    }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {}
  }

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          E-Commerce Demo
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="px-3 py-1 border rounded text-sm">
            {dark ? 'Light' : 'Dark'}
          </button>
          <button onClick={onToggleCart} className="flex items-center gap-2 rounded bg-brand px-3 py-1 text-white">
            Cart
            {totalCount > 0 && <span className="rounded-full bg-white text-brand px-2 text-sm">{totalCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

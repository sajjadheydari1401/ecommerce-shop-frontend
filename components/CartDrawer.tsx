"use client";
import React from "react";
import { useCart } from "../store/cart";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);
  const setQuantity = useCart((state) => state.setQuantity);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-start">
      <div className="flex-1" onClick={onClose} />
      <aside className="w-full sm:w-96 bg-white dark:bg-gray-800 p-4 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Cart</h3>
        {items.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400">Your cart is empty</div>
        )}
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
              <img
                src={i.image}
                alt={i.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">${Number(i.price).toLocaleString()} each</div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(i.id, i.quantity - 1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <div className="px-3">{i.quantity}</div>
                  <button
                    onClick={() => setQuantity(i.id, i.quantity + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(i.id)}
                    className="ml-4 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">${(Number(i.price) * i.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between font-semibold">Total <span>${total.toFixed(2)}</span></div>
          <div className="mt-3">
            <button className="w-full bg-brand text-white py-2 rounded">Checkout</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

"use client";
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
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 py-8">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src={i.image}
                    alt={i.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{i.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ${Number(i.price).toLocaleString()} each
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(i.id, i.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <div className="px-3">{i.quantity}</div>
                    <button
                      onClick={() => setQuantity(i.id, i.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => remove(i.id)}
                      className="ml-3 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-medium">
                  IRR {(Number(i.price) * i.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center font-semibold mb-3">
            <span>Total</span>
            <span>IRR {total.toFixed(2)}</span>
          </div>
          <button className="w-full btn btn-primary">Checkout</button>
        </div>
      </aside>
    </div>
  );
}

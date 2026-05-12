"use client";

import { CartFooter } from "@/components/cart/CartFooter";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);
  const setQuantity = useCart((state) => state.setQuantity);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const { handleCheckout } = useCheckout();

  if (!open) return null;

  return (
    <div>
      <CartHeader />

      {items?.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          {items?.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={setQuantity}
              onRemove={remove}
            />
          ))}
        </div>
      )}

      <CartFooter
        total={total}
        onCheckout={handleCheckout}
        isEmpty={items?.length === 0}
      />
    </div>
  );
}

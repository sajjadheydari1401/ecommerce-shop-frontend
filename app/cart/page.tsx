"use client";

import { CartFooter } from "@/components/cart/CartFooter";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { useCheckout } from "@/hooks/useCheckout";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);
  const setQuantity = useCart((state) => state.setQuantity);
  const [isHydrated, setIsHydrated] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const { handleCheckout } = useCheckout();

  useEffect(() => {
    //this is used to show skeleton while page is not ready

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <CartSkeleton />;
  }

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

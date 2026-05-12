import { useCallback } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/store/cart";

export const useCheckout = () => {
  const clearCart = useCart((state) => state.clear);

  const handleCheckout = useCallback(() => {
    // Show loading toast
    const toastId = toast.loading("Processing your order...");

    // Wait 2 seconds, then show success and clear cart
    setTimeout(() => {
      toast.update(toastId, {
        render: "Order placed successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      clearCart();
    }, 2000);
  }, [clearCart]);

  return { handleCheckout };
};

import { CartFooterProps } from "@/types/cart";

export const CartFooter = ({ total, onCheckout, isEmpty }: CartFooterProps) => (
  <div className="mt-6 border-t pt-4">
    <div className="flex justify-between items-center font-semibold mb-3">
      <span>Total</span>
      <span>IRR {total.toFixed(2)}</span>
    </div>
    <button
      onClick={onCheckout}
      className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      disabled={isEmpty}
    >
      Checkout
    </button>
  </div>
);

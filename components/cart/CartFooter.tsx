import { CartFooterProps } from "@/types/cart";

export const CartFooter = ({ total, onCheckout, isEmpty }: CartFooterProps) => (
  <div className="mt-6 border-t pt-4">
    <div className="flex justify-between items-center font-semibold mb-3">
      <span>Total</span>
      <span>IRR {total.toFixed(2)}</span>
    </div>
    <AppButton
      onClick={onCheckout}
      fullWidth
      disabled={isEmpty}
      variant="primary"
    >
      Checkout
    </AppButton>
  </div>
);

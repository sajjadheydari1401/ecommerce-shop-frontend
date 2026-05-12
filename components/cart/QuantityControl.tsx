import { AppButton } from "../common/AppButton";

interface QuantityControlProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const QuantityControl = ({
  quantity,
  onDecrement,
  onIncrement,
  onRemove,
}: QuantityControlProps) => (
  <div className="mt-2 inline-flex items-center gap-2">
    <AppButton
      onClick={onDecrement}
      size="sm"
      disabled={quantity <= 1}
      aria-label="Decrease quantity"
      className="cursor-pointer"
    >
      -
    </AppButton>

    <div className="px-3 min-w-10 text-center font-medium">{quantity}</div>

    <AppButton
      onClick={onIncrement}
      size="sm"
      aria-label="Increase quantity"
      className="cursor-pointer"
    >
      +
    </AppButton>

    <AppButton
      onClick={onRemove}
      isGhost
      variant="danger"
      size="sm"
      aria-label="Remove item"
      className="cursor-pointer"
    >
      Remove
    </AppButton>
  </div>
);

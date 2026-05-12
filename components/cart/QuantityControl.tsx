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
    <button
      onClick={onDecrement}
      className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Decrease quantity"
      disabled={quantity <= 1}
    >
      -
    </button>
    <div className="px-3 min-w-[40px] text-center">{quantity}</div>
    <button
      onClick={onIncrement}
      className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Increase quantity"
    >
      +
    </button>
    <button
      onClick={onRemove}
      className="ml-3 text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
      aria-label="Remove item"
    >
      Remove
    </button>
  </div>
);

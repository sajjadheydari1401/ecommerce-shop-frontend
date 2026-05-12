import resolveImage from "@/utils/image";
import { CartItemProps } from "@/types/cart";
import { QuantityControl } from "./QuantityControl";

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const itemTotal = Number(item.price) * item.quantity;

  return (
    <div className="flex items-center gap-4">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={resolveImage(item.image)}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="font-medium text-sm">{item.title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ${Number(item.price).toLocaleString()} each
        </div>

        <QuantityControl
          quantity={item.quantity}
          onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
          onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onRemove={() => onRemove(item.id)}
        />
      </div>

      {/* Item Total */}
      <div className="text-right font-medium">IRR {itemTotal.toFixed(2)}</div>
    </div>
  );
};

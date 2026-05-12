export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export interface CartFooterProps {
  total: number;
  onCheckout: () => void;
  isEmpty: boolean;
}

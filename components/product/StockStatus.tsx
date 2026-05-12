interface Props {
  isInStock: boolean;
  available?: number;
}

export const StockStatus = ({ isInStock, available }: Props) => {
  if (isInStock) {
    return (
      <div className="text-sm">
        <span className="text-green-600 font-medium">
          ✓ In Stock ({available} available)
        </span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <span className="text-red-600 font-medium">✗ Out of Stock</span>
    </div>
  );
};

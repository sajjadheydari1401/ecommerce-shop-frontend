interface Props {
  price: number | null;
  discountedPrice: number | null;
}

export const PriceDisplay = ({ price, discountedPrice }: Props) => {
  if (discountedPrice) {
    return (
      <div className="text-2xl font-bold">
        <div className="flex items-baseline gap-3">
          <span className="text-blue-600">
            IRR {Number(discountedPrice).toLocaleString()}
          </span>
          <small className="text-sm text-gray-500 line-through">
            IRR {Number(price || 0).toLocaleString()}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="text-2xl font-bold">
      <span>IRR {Number(price || 0).toLocaleString()}</span>
    </div>
  );
};

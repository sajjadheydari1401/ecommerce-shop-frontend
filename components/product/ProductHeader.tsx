interface Props {
  itemCount: number;
}

export const ProductHeader = ({ itemCount }: Props) => (
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-2xl font-semibold">Products</h1>
    <div className="text-sm text-gray-500">Showing {itemCount} items</div>
  </div>
);

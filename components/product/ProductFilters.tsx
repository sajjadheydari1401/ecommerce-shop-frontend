interface Props {
  search: string;
  category: string;
  categories: any[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const ProductFilters = ({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: Props) => (
  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
    <input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products"
      className="border rounded-lg px-4 py-2 flex-1 shadow-sm"
    />
    <div className="flex gap-2 mt-3 sm:mt-0">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded-lg px-3 py-2 shadow-sm"
      >
        <option value="">All categories</option>
        {categories?.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

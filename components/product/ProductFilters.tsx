import { AppInput } from "../common/AppInput";
import { AppSelect } from "../common/AppSelect";

interface Category {
  id: string;
  name: string;
}

interface Props {
  search: string;
  category: string;
  categories: Category[];
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
    <AppInput
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products"
      fullWidth
      icon={
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
    />

    <div className="flex gap-2 mt-3 sm:mt-0">
      <AppSelect
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={categories}
        optionValueKey="id"
        optionLabelKey="name"
        placeholder="All categories"
        fullWidth
      />
    </div>
  </div>
);

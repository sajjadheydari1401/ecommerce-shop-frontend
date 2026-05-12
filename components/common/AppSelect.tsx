import { SelectHTMLAttributes, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[] | any[];
  optionValueKey?: string;
  optionLabelKey?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
}

export const AppSelect = ({
  label,
  error,
  options,
  optionValueKey = "value",
  optionLabelKey = "label",
  icon,
  fullWidth = false,
  placeholder = "Select an option",
  className = "",
  id,
  value,
  onChange,
  ...props
}: Props) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const getOptionValue = (option: any): string => {
    if (typeof option === "string") return option;
    return option[optionValueKey] || option.value || option.id || "";
  };

  const getOptionLabel = (option: any): string => {
    if (typeof option === "string") return option;
    return (
      option[optionLabelKey] ||
      option.label ||
      option.name ||
      option.title ||
      ""
    );
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`
            border rounded-lg px-4 py-2 shadow-sm pr-10
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            outline-none transition-colors appearance-none
            disabled:bg-gray-100 disabled:cursor-not-allowed
            dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
            ${fullWidth ? "w-full" : ""}
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options?.map((option, idx) => {
            const optionValue = getOptionValue(option);
            const optionLabel = getOptionLabel(option);

            return (
              <option key={optionValue || idx} value={optionLabel}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

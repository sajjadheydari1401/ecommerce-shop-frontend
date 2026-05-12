interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className="px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        First
      </button>
      <button
        onClick={() => onPageChange((p: number) => Math.max(1, p - 1))}
        disabled={isFirstPage}
        className="px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {"<"}
      </button>
      <div>
        Page {page} / {totalPages}
      </div>
      <button
        onClick={() => onPageChange((p: number) => p + 1)}
        disabled={isLastPage}
        className="px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className="px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Last
      </button>
    </div>
  );
};

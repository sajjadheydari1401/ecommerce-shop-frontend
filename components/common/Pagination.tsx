import { AppButton } from "./AppButton";

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
      <AppButton
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        size="sm"
      >
        First
      </AppButton>
      <AppButton
        onClick={() => onPageChange((p: number) => Math.max(1, p - 1))}
        disabled={isFirstPage}
        size="sm"
      >
        {"<"}
      </AppButton>
      <div>
        Page {page} / {totalPages}
      </div>
      <AppButton
        onClick={() => onPageChange((p: number) => p + 1)}
        disabled={isLastPage}
        size="sm"
      >
        {">"}
      </AppButton>
      <AppButton
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        size="sm"
      >
        Last
      </AppButton>
    </div>
  );
};

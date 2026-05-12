import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useDebouncedValue from "@/hooks/useDebounce";

export const useProductFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(Number(searchParams.get("page") || "1"));
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (page && page > 1) params.page = String(page);
    if (debouncedSearch) params.search = debouncedSearch;
    if (category) params.category = category;

    const query = new URLSearchParams(params).toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [page, debouncedSearch, category, router]);

  return {
    page,
    search,
    category,
    setPage,
    setSearch,
    setCategory,
  };
};

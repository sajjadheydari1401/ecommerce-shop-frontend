import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

type UseProductsParams = {
  page?: number;
  size?: number;
  search?: string;
  category?: string | null;
};

export function useProducts({
  page = 1,
  size = 20,
  search,
  category,
}: UseProductsParams = {}) {
  return useQuery(["products", page, size, search, category], async () => {
    const params: Record<string, any> = { page, size };
    if (search) params.textSearch = search;
    if (category) params.category = category;

    const res = await api.get("/products", { params });
    const data = res.data || {};
    return {
      items: data.result || [],
      pagination: data.pagination || null,
    };
  });
}

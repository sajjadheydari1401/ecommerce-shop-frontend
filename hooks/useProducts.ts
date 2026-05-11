import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

type UseProductsParams = {
  page?: number;
  size?: number;
  search?: string;
  minPrice?: number | string | null;
  maxPrice?: number | string | null;
  category?: string | null;
};

export function useProducts({
  page = 1,
  size = 10,
  search,
  minPrice,
  maxPrice,
}: UseProductsParams = {}) {
  return useQuery(
    [
      "products",
      page,
      size,
      search,
      minPrice,
      maxPrice,
      arguments[0]?.category,
    ],
    async () => {
      const params: Record<string, any> = { page, size };
      if (search) params.search = search;
      if (minPrice != null && minPrice !== "") params.minPrice = minPrice;
      if (maxPrice != null && maxPrice !== "") params.maxPrice = maxPrice;
      if ((arguments[0] as UseProductsParams)?.category)
        params.category = (arguments[0] as UseProductsParams).category;

      const res = await api.get("/products", { params });
      const data = res.data || {};
      return {
        items: data.result || [],
        pagination: data.pagination || null,
      };
    },
  );
}

export function useProduct(productId: string | string[] | undefined) {
  return useQuery(
    ["product", productId],
    async () => {
      if (!productId) return null;
      const res = await api.get(`/products/${productId}`);
      const data = res.data || {};
      return data.result || null;
    },
    { enabled: !!productId },
  );
}

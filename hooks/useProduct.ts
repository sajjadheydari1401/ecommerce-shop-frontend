import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

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

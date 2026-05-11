import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

export default function useCategories() {
  return useQuery(
    ["categories"],
    async () => {
      const res = await api.get("/products", {
        params: { page: 1, size: 100 },
      });
      const data = res.data || {};
      const items = data.result || [];
      const set = new Set<string>();
      items.forEach((p: any) => {
        const name = p.categoryName || p.category;
        if (name) set.add(String(name));
      });
      return Array.from(set);
    },
    { staleTime: 1000 * 60 * 60 },
  );
}

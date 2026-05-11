import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

export default function useCategories() {
  return useQuery(
    ["categories"],
    async () => {
      const res = await api.get("/products/categories");
      return res.data || [];
    },
    {
      staleTime: 1000 * 60 * 60,
    },
  );
}

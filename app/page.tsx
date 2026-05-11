"use client";

import { useMemo, useState, useEffect } from "react";
import useDebouncedValue from "../hooks/useDebounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(Number(searchParams.get("page") || "1"));
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (page && page > 1) params.page = String(page);
    if (debouncedSearch) params.textSearch = debouncedSearch;
    if (category) params.category = category;
    const query = new URLSearchParams(params).toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [page, debouncedSearch, category, router]);

  const { data, isLoading, isError } = useProducts({
    page,
    size: 20,
    search: debouncedSearch,
    category: category || null,
  });
  const products = data?.items || [];
  const totalPages = data?.pagination?.totalPages || [];

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.result || [];

  const filtered = useMemo(() => products, [products]);

  if (isError)
    return <div className="text-red-600">Failed to load products.</div>;

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="border rounded-lg px-4 py-2 flex-1 shadow-sm"
        />
        <div className="flex gap-2 mt-3 sm:mt-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 w-44 shadow-sm"
          >
            <option value="">All categories</option>
            {categories?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 card">
              <Skeleton className="h-40 mb-3" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="text-gray-500">No products available</div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Products</h1>
            <div className="text-sm text-gray-500">
              Showing {filtered.length} items
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p: any) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  title: p.title || p.name,
                  price: p.price ?? p.salesPrice ?? 0,
                  discountedPrice: p.discountedPrice ?? p.discountPrice,
                  image: p.imageSrc || "",
                  category: p.categoryName || p.category,
                }}
              />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border rounded-lg"
            >
              Previous
            </button>
            <div>
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

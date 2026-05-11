"use client";
import React, { useMemo, useState, useEffect } from "react";
import useDebouncedValue from "../hooks/useDebounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(Number(searchParams.get("page") || "1"));
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (page && page > 1) params.page = String(page);
    if (debouncedSearch) params.search = debouncedSearch;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (category) params.category = category;
    const query = new URLSearchParams(params).toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [page, debouncedSearch, minPrice, maxPrice, router]);

  const { data, isLoading, isError } = useProducts({
    page,
    size: 12,
    search: debouncedSearch,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
    category: category || null,
  });
  const products = data?.items || [];
  const { data: categoriesData } = useCategories()
  const categories = categoriesData || []

  const filtered = useMemo(() => products, [products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 border rounded">
            <div className="h-40 bg-gray-200 animate-pulse mb-3"></div>
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError)
    return <div className="text-red-600">Failed to load products.</div>;

  if (!products || products.length === 0)
    return <div className="text-gray-500">No products available</div>;

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="border rounded px-3 py-2 flex-1"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            className="border rounded px-2 py-2 w-28"
          />
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            className="border rounded px-2 py-2 w-28"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-2 py-2 w-40">
            <option value="">All categories</option>
            {categories.map((c: any) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p: any) => (
          <ProductCard
            key={p.id}
            product={{
              id: p.id,
              title: p.title || p.name,
              price: p.price ?? p.salesPrice ?? 0,
              discountedPrice: p.discountedPrice ?? p.discountPrice,
              image: p.imageSrc || p.images?.[0] || "/vercel.svg",
              category: p.categoryName || p.category,
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded"
        >
          Previous
        </button>
        <div>Page {page}</div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

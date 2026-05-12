"use client";

import { useProducts } from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductsSkeleton } from "@/components/product/ProductsSkeleton";
import { Pagination } from "@/components/common/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductHeader } from "@/components/product/ProductHeader";

export default function Home() {
  const { page, search, category, setPage, setSearch, setCategory } =
    useProductFilters();

  const { data, isLoading, isError } = useProducts({
    page,
    size: 20,
    search,
    category: category || null,
  });

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.result || [];
  const products = data?.items || [];
  const totalPages = data?.pagination?.totalPages;

  if (isError) {
    return <div className="text-red-600">Failed to load products.</div>;
  }

  return (
    <div>
      <ProductFilters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {isLoading ? (
        <ProductsSkeleton />
      ) : !products || products.length === 0 ? (
        <div className="text-gray-500">No products available</div>
      ) : (
        <>
          <ProductHeader itemCount={products.length} />
          <ProductGrid products={products} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

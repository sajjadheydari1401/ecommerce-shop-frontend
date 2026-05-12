import ProductsView from "@/components/product/ProductsView";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense
      fallback={<div className="text-gray-500">Loading products...</div>}
    >
      <ProductsView />
    </Suspense>
  );
}

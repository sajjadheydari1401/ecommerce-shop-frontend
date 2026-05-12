"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { ErrorState } from "@/components/common/ErrorState";
import { NotFoundState } from "@/components/common/NotFoundState";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSkeleton } from "@/components/product/ProductSkeleton";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) return <ProductSkeleton />;
  if (isError) return <ErrorState />;
  if (!product) return <NotFoundState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
    </div>
  );
}

"use client";
import { AppButton } from "@/components/common/AppButton";
import LazyImage from "@/components/LazyImage";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/store/cart";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const { data: product, isLoading, isError } = useProduct(id);
  const add = useCart((state) => state.add);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) return <div className="h-64 bg-gray-200 animate-pulse" />;
  if (isError)
    return <div className="text-red-600">Failed to load product</div>;
  if (!product) return <div className="text-gray-500">Product not found</div>;

  const images = product.images && product.images.length ? product.images : [];
  const price = product.mutations?.[0]?.salesPrice ?? null;
  const discountedPrice = product.mutations?.[0]?.discountPrice ?? null;
  const displayPrice = discountedPrice ?? price;
  const isInStock = product.branches?.["انبار اصلی"]?.available > 0;

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1,
      );
    }
  };

  const handleAddToCart = () => {
    add({
      id: product.id,
      title: product.name,
      price: Number(displayPrice ?? 0),
      image: images[0] || "",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Image Gallery Section */}
      <div className="md:col-span-2">
        {/* Main Image with Slider Controls */}
        <div className="relative h-96 bg-white dark:bg-gray-800 flex items-center justify-center rounded-lg">
          {images.length > 0 ? (
            <>
              <LazyImage
                src={images[currentImageIndex]}
                alt={product.name}
                className="h-96 w-full object-contain"
              />

              {/* Slider Controls - Show only if more than 1 image */}
              {images.length > 1 && (
                <>
                  <AppButton
                    onClick={prevImage}
                    isGhost
                    variant="secondary"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 !px-2 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </AppButton>

                  <AppButton
                    onClick={nextImage}
                    isGhost
                    variant="secondary"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 !px-2 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </AppButton>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-gray-500">No image available</div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-auto">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-24 h-24 flex-shrink-0 border-2 rounded-lg transition-colors overflow-hidden ${
                  idx === currentImageIndex
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <LazyImage
                  src={img}
                  alt={`${product.name} - Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="space-y-4">
        {/* Product Name */}
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        {/* Category Info */}
        {(product.categoryName || product.subCategoryName) && (
          <div className="text-sm text-gray-500">
            {[product.categoryName, product.subCategoryName]
              .filter(Boolean)
              .join(" > ")}
          </div>
        )}

        {/* Price Section */}
        <div className="text-2xl font-bold">
          {discountedPrice ? (
            <div className="flex items-baseline gap-3">
              <span className="text-blue-600">
                IRR {Number(discountedPrice).toLocaleString()}
              </span>
              <small className="text-sm text-gray-500 line-through">
                IRR {Number(price || 0).toLocaleString()}
              </small>
            </div>
          ) : (
            <span>IRR {Number(price || 0).toLocaleString()}</span>
          )}
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {product.description || product.name}
        </p>

        {/* Stock Status */}
        {product.branches && (
          <div className="text-sm">
            {isInStock ? (
              <span className="text-green-600 font-medium">
                ✓ In Stock ({product.branches["انبار اصلی"].available}{" "}
                available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">✗ Out of Stock</span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="pt-4">
          <AppButton
            onClick={handleAddToCart}
            variant="primary"
            fullWidth
            disabled={!isInStock}
            className="cursor-pointer"
          >
            Add to Cart
          </AppButton>
        </div>
      </div>
    </div>
  );
}

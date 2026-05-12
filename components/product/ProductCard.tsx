"use client";
import Link from "next/link";
import { useCart } from "../../store/cart";
import LazyImage from "../LazyImage";
import resolveImage from "../../utils/image";
import { AppButton } from "../common/AppButton";

type Product = {
  id: number;
  title: string;
  price?: string | number;
  discountedPrice?: string | number;
  image: string;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((state) => state.add);

  const handleAddToCart = () => {
    add({
      id: product.id,
      title: product.title,
      price: Number(product.discountedPrice ?? product.price ?? 0),
      image: resolveImage(product.image),
    });
  };

  return (
    <div className="card p-4 flex flex-col hover:shadow-lg transition-transform transform hover:-translate-y-1 border border-amber-50">
      <div className="h-44 mb-3 overflow-hidden rounded-md bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
        <LazyImage
          src={product.image || ""}
          alt={product.title}
          className="h-full w-full"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-sm leading-tight mb-1 dark:text-gray-100">
          {product.title}
        </h3>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-3">
        <div className="text-lg font-semibold">
          {product.discountedPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-brand">
                IRR {Number(product.discountedPrice).toLocaleString()}
              </span>
              <small className="text-sm text-gray-500 line-through">
                IRR {Number(product.price || 0).toLocaleString()}
              </small>
            </div>
          ) : (
            <span>IRR {Number(product.price || 0).toLocaleString()}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/product/${product.id}`}
            target="_blank"
            className="w-full"
          >
            <AppButton isGhost variant="primary" fullWidth>
              Details
            </AppButton>
          </Link>

          <AppButton onClick={handleAddToCart} variant="primary" fullWidth>
            Add to Cart
          </AppButton>
        </div>
      </div>
    </div>
  );
}

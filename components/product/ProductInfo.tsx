"use client";

import { useCart } from "@/store/cart";
import { AppButton } from "../common/AppButton";
import { Breadcrumb } from "../common/Breadcrumb";
import { PriceDisplay } from "../common/PriceDisplay";
import { StockStatus } from "./StockStatus";

interface Props {
  product: any;
}

export const ProductInfo = ({ product }: Props) => {
  const add = useCart((state) => state.add);

  const images = product.images?.length ? product.images : [];
  const price = product.mutations?.[0]?.salesPrice ?? null;
  const discountedPrice = product.mutations?.[0]?.discountPrice ?? null;
  const displayPrice = discountedPrice ?? price;
  const isInStock = product.branches?.["انبار اصلی"]?.available > 0;

  const handleAddToCart = () => {
    add({
      id: product.id,
      title: product.name,
      price: Number(displayPrice ?? 0),
      image: images[0] || "",
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <Breadcrumb
        title={product.categoryName}
        subTitle={product.subCategoryName}
      />

      <PriceDisplay price={price} discountedPrice={discountedPrice} />

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {product.description || product.name}
      </p>

      <StockStatus
        isInStock={isInStock}
        available={product.branches?.["انبار اصلی"]?.available}
      />

      <div className="pt-4">
        <AppButton
          onClick={handleAddToCart}
          variant="primary"
          fullWidth
          disabled={!isInStock}
        >
          Add to Cart
        </AppButton>
      </div>
    </div>
  );
};

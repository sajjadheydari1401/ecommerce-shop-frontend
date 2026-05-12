import ProductCard from "@/components/product/ProductCard";

interface Props {
  products: any[];
}

export const ProductGrid = ({ products }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((p: any) => (
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
);

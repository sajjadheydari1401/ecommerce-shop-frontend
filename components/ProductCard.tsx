"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "../store/cart";

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

  return (
    <article className="border rounded p-4 flex flex-col bg-white">
      <div className="h-40 mb-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm leading-tight">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold">
          ${((product.discountedPrice ?? product.price) as any) || 0}
        </div>
        <div className="flex gap-2">
          return (
            <article className="border rounded p-4 flex flex-col bg-white dark:bg-gray-800">
              <div className="h-40 mb-3 flex items-center justify-center">
                <img src={product.image} alt={product.title} className="max-h-40 object-contain w-full" loading="lazy" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.title}</h3>
                {product.category && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-lg font-semibold">
                  {product.discountedPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-indigo-600">${Number(product.discountedPrice).toLocaleString()}</span>
                      <small className="text-sm text-gray-500 line-through">${Number(product.price || 0).toLocaleString()}</small>
                    </div>
                  ) : (
                    <span>${Number(product.price || 0).toLocaleString()}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/product/${product.id}`} className="px-3 py-1 border rounded text-sm">Details</Link>
                  <button onClick={() => add({ id: product.id, title: product.title, price: Number(product.discountedPrice ?? product.price ?? 0), image: product.image })} className="px-3 py-1 bg-brand text-white rounded text-sm">Add</button>
                </div>
              </div>
            </article>
          )
      </div>
    </article>
  );
}

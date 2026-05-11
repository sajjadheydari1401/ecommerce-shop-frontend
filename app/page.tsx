"use client"
import React from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { data: products, isLoading, isError } = useProducts()

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
    )
  }

  if (isError) return <div className="text-red-600">Failed to load products.</div>

  if (!products || products.length === 0) return <div className="text-gray-500">No products available</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={{ id: p.id, title: p.title || p.name, price: p.price || p.basePrice || 0, image: p.images?.[0] || p.image || '/vercel.svg', category: p.category?.name || p.category }} />
        ))}
      </div>
    </div>
  )
}

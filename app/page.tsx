"use client"
import React, { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  const { data, isLoading, isError } = useProducts({ page, size: 12 })
  const products = data?.items || []

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return products.filter((p: any) => {
      const title = (p.title || p.name || '').toString().toLowerCase()
      if (s && !title.includes(s)) return false

      const price = Number(p.discountedPrice ?? p.price ?? 0)
      if (minPrice && price < Number(minPrice)) return false
      if (maxPrice && price > Number(maxPrice)) return false

      return true
    })
  }, [products, search, minPrice, maxPrice])

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
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products" className="border rounded px-3 py-2 flex-1" />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min price" className="border rounded px-2 py-2 w-28" />
          <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price" className="border rounded px-2 py-2 w-28" />
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p: any) => (
          <ProductCard key={p.id} product={{ id: p.id, title: p.title || p.name, price: p.price ?? p.salesPrice ?? 0, discountedPrice: p.discountedPrice ?? p.discountPrice, image: p.imageSrc || p.images?.[0] || '/vercel.svg', category: p.categoryName || p.category }} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Previous</button>
        <div>Page {page}</div>
        <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  )
}

"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useProduct } from '../../../../hooks/useProducts'
import { useCart } from '../../../../store/cart'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id
  const { data: product, isLoading, isError } = useProduct(id)
  const add = useCart(state => state.add)

  if (isLoading) return <div className="h-64 bg-gray-200 animate-pulse" />
  if (isError) return <div className="text-red-600">Failed to load product</div>
  if (!product) return <div className="text-gray-500">Product not found</div>

  const images = product.images && product.images.length ? product.images : (product.image ? [product.image] : [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="h-96 bg-white flex items-center justify-center">
          {images[0] ? <img src={images[0]} alt={product.title || product.name} className="object-contain max-h-96" /> : <div>No image</div>}
        </div>
        <div className="mt-2 flex gap-2 overflow-auto">
          {images.map((img: string, idx: number) => (
            <img key={idx} src={img} className="w-24 h-24 object-contain border" />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title || product.name}</h1>
        <p className="text-gray-500 mt-2">{product.category?.name || product.category}</p>
        <div className="text-2xl font-bold mt-4">${product.price || product.basePrice || 0}</div>
        <p className="mt-4 text-sm text-gray-700">{product.description || product.short_description}</p>
        <div className="mt-6">
          <button onClick={() => add({ id: product.id, title: product.title || product.name, price: product.price || product.basePrice || 0, image: images[0] || '' })} className="bg-indigo-600 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

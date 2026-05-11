"use client"
import Link from 'next/link'
import React from 'react'
import { useCart } from '../store/cart'

type Product = {
  id: number
  title: string
  price: number
  image: string
  category?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart(state => state.add)

  return (
    <article className="border rounded p-4 flex flex-col bg-white">
      <div className="h-40 mb-3 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-40 object-contain" loading="lazy" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm leading-tight">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold">${product.price}</div>
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`}>
            <a className="px-3 py-1 border rounded text-sm">Details</a>
          </Link>
          <button onClick={() => add({ id: product.id, title: product.title, price: product.price, image: product.image })} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Add</button>
        </div>
      </div>
    </article>
  )
}

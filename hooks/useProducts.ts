import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"

type UseProductsParams = {
  page?: number
  size?: number
}

export function useProducts({ page = 1, size = 10 }: UseProductsParams = {}) {
  return useQuery(["products", page, size], async () => {
    const res = await api.get('/products', { params: { page, size } })
    const data = res.data || {}
    return {
      items: data.result || [],
      pagination: data.pagination || null,
    }
  })
}

export function useProduct(productId: string | string[] | undefined) {
  return useQuery([
    'product',
    productId,
  ], async () => {
    if (!productId) return null
    const res = await api.get(`/products/${productId}`)
    const data = res.data || {}
    return data.result || null
  }, { enabled: !!productId })
}

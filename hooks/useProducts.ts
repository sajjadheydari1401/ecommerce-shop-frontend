import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api'

export function useProducts() {
  return useQuery(['products'], async () => {
    const res = await api.get('/products')
    return res.data || []
  })
}

export function useProduct(productId: string | string[] | undefined) {
  return useQuery(['product', productId], async () => {
    if (!productId) return null
    const res = await api.get(`/products/${productId}`)
    return res.data
  }, { enabled: !!productId })
}

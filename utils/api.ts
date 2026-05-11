import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.sport724.ir/api',
  timeout: 10000,
})

export default api

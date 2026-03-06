import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export async function searchImages(query, { sources = [], page = 1, perPage = 20 } = {}) {
  const params = { q: query, page, per_page: perPage }
  if (sources.length) params.sources = sources.join(',')
  const { data } = await api.get('/search/', { params })
  return data
}

export async function getSources() {
  const { data } = await api.get('/sources/')
  return data
}
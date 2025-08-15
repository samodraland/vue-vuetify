import api from '@/plugins/axios'
import type { MovieInterface } from '@/types/movie'

export async function getMovies(searchBy?: string, keyword?: string, page: number = 1): Promise<MovieInterface> {
  const params: Record<string, string | number> = { page };

  if (searchBy && keyword) params[searchBy] = keyword

  const result = await api.get<MovieInterface>("/search", {
    params
  })
  return result.data
}

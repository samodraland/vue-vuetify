import api from '@/plugins/axios'
import type { MovieInterface } from '@/types/movie'

export async function getMovies(searchBy?: string, keyword?: string, page: number = 1): Promise<MovieInterface> {
  const params: Record<string, string | number> = { page };

  if (searchBy && keyword) params[searchBy] = keyword

  try{
    const result = await api.get<MovieInterface>("/search", {
      params
    })
    return result.data
  }catch(error){
    throw new Error("Unknown error")
  }
}

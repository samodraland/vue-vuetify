import { defineStore } from "pinia"
import { getMovies } from "@/services/movie";
import type { MovieInterface } from "@/types/movie";
import type { MovieList } from "@/types/movie";

export const useAppStore = defineStore("app", {
  state: () => ({
    moviesData: null as MovieInterface | null,
    favorites: [] as MovieList | []
  }),
  actions:{
    async fetchData(searchBy: string, keyword: string, page: number) {
      try {
        this.moviesData = await getMovies(
          searchBy,
          keyword.trim(),
          page
        );
      } catch(error) {
        console.log("error", error)
      }
    },
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem("fav") || "[]")
    },
    toggleFavorite(movie: MovieList) {
      const index = this.favorites.findIndex(m => m.imdbID === movie.imdbID)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(movie)
      }
      localStorage.setItem("fav", JSON.stringify(this.favorites))
    },
    isFavorite(id: string) {
      return this.favorites.some(m => m.imdbID === id)
    }
  },
})

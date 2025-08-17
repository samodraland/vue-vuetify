import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStore } from "../../stores/app";
import type { MovieList } from "../../types/movie";
import { getMovies } from "@/services/movie";

let store: ReturnType<typeof useAppStore>
const movie: MovieList = { Title: "The Avengers", Year: 2012, imdbID: "tt0848228" };

describe("useAppStore", () => {

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.clearAllMocks()
    store = useAppStore()
  });

  it("should have empty favorites and null moviesData initially", () => {
    expect(store.favorites).toEqual([]);
    expect(store.moviesData).toBeNull();
  });

  it("loads favorites movies from localStorage", () => {
    localStorage.setItem("fav", JSON.stringify([movie]));
    store.loadFavorites();

    expect(store.favorites.length).toBe(1);
    expect(store.favorites[0].imdbID).toBe("tt0848228");

    localStorage.clear()
    store.loadFavorites()

    expect(store.favorites.length).toBe(0);
    expect(store.favorites).toEqual([]);
  });


  it("Calls toggleFavorite to add favorite", () => {
    store.toggleFavorite(movie);
    expect(store.favorites).toEqual(expect.arrayContaining([movie]));
    expect(localStorage.getItem("fav")).toContain("tt0848228");
  });

  it("Calls toggleFavorite to remove favorite", () => {
    store.toggleFavorite(movie);
    expect(store.favorites).not.toContain(movie);
    expect(localStorage.getItem("fav")).not.toContain([movie]);
  });

  vi.mock("@/services/movie", () => ({
    getMovies: vi.fn().mockResolvedValue({
      page: 1,
      per_page: 10,
      total: 1,
      total_pages: 1,
      data: [{ Title: "The Avengers", Year: 2012, imdbID: "tt0848228" }]
    })
  }));

  it("Calls fetchData to set moviesData", async () => {
    await store.fetchData("Title", "The Avengers", 1);

    expect(store.moviesData).not.toBeNull();
    expect(store.moviesData?.data[0].Title).toBe("The Avengers");
  });

  it("sets error on fetchData", async () => {
    (getMovies as any).mockRejectedValue(new Error("API failed"))
    const store = useAppStore()

    await store.fetchData("Title", "test", 1)

    expect(store.error).toBe(true)
    expect(store.moviesData).toBeNull()
    expect(store.errorMessage).toBe("API failed")
    expect(store.isLoading).toBe(false)
  })

  it("checks a movie is favorite", async ()=>{
    store.toggleFavorite(movie);
    expect(store.isFavorite("tt0848228")).toBe(true)

  })

});

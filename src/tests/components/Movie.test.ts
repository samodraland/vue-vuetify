import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import { describe, it, expect, beforeEach } from "vitest"
import { useAppStore } from "@/stores/app"
import Movie from "@/components/Movie.vue"
import type { MovieList } from "@/types/movie"

let store: ReturnType<typeof useAppStore>
const movie: MovieList = { Title: "The Avengers", Year: 2012, imdbID: "tt0848228" };

function wrapperSetup(){
  const wrapper = mount(Movie)
  return wrapper
}

describe("Movie component",()=>{
  beforeEach(()=>{
    setActivePinia(createPinia())
    store = useAppStore()
    vi.spyOn(window,"open").mockImplementation(() => null)
  })

  it("Checks movie is favorite",()=>{
    const wrapper = wrapperSetup()
    store.toggleFavorite(movie)
    expect(wrapper.vm.isFav("tt0848228")).toBe(true)
  })

  it("Toggles movie to add/remove as favorite", ()=>{
    const wrapper = wrapperSetup()
    wrapper.vm.fav(movie)
    expect(store.favorites).toContainEqual(movie)
  })

  it("Opens IMdb link to new window", ()=>{
    const wrapper = wrapperSetup()
    wrapper.vm.goto("tt0848228")
    expect(window.open).toHaveBeenCalledWith(
      "https://www.imdb.com/title/tt0848228",
      "_blank"
    )
  })
})

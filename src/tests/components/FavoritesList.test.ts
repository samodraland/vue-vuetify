import { mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import FavoritesList from "@/components/FavoritesList.vue"
import { createPinia, setActivePinia } from "pinia"
import { useAppStore } from "@/stores/app"
import type { MovieList } from "@/types/movie"
import { nextTick } from "vue"

let store: ReturnType<typeof useAppStore>
const stubs: Array<string> = ["ErrorHandler", "Movie", "Pagination"]
const movie: MovieList = { Title: "The Avengers", Year: 2012, imdbID: "tt0848228" };

function wrapperSetup(movie: MovieList, stubs: Array<string>){
  store.favorites = movie
  const wrapper = mount(FavoritesList, {
    global: {
      stubs: stubs,
    },
  })
  return wrapper
}

describe("FavoritesList component", ()=>{

  beforeEach(()=>{
    setActivePinia(createPinia());
    store = useAppStore()
    store.favorites = []
  })

  it("Renders movie component",async ()=>{
    const wrapper = wrapperSetup([movie], stubs)
    await nextTick()
    stubs.filter(name => name != "ErrorHandler").forEach((name)=>{
      expect(wrapper.find(`${name}-stub`).exists()).toBe(true)
    })


  })

  it("Renders 'not found' message when favorites are empty",async()=>{
    const wrapper = wrapperSetup([], [stubs[0]])
    await nextTick()
    expect(wrapper.find("error-handler-stub").exists()).toBe(true)
  })
})

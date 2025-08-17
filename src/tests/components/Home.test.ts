import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import { describe, it, expect, beforeEach } from "vitest"
import { useAppStore } from "@/stores/app"
import Home from "@/components/Home.vue"
import { nextTick } from "vue"

let store: ReturnType<typeof useAppStore>
const stubs: Array<string>=["MovieList", "FavoritesList","VTextField"]

function wrapperSetup(){
  const wrapper = mount(Home, {
    global:{stubs}
  })
  return wrapper
}

async function setupInputField(keyword: string){
  const wrapper = wrapperSetup()
  const vm = wrapper.vm
  vm.movieListChild.searchMovie = vi.fn()
  vm.keyword = keyword
  const input = wrapper.find("v-text-field-stub")
  return {
    vm, input
  }
}

async function tabSwitch(whichTab: string, whichComponent: string){
  const wrapper = wrapperSetup()
  wrapper.vm.tab = whichTab
  await nextTick()
  expect(wrapper.findComponent({name: whichComponent}).exists()).toBe(true)
}

describe("Home component", ()=>{
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAppStore()
    store.favorites = []
  })

  it("Calls searchMovie function on enter", async ()=>{
    const { vm, input } = await setupInputField("Spiderman")
    await input.trigger("keydown.enter")
    expect(vm.movieListChild.searchMovie).toBeCalledWith(true)
  })

  it("Clears keyword when clear button is clicked and re-trigger search", async ()=>{
    const { vm, input } = await setupInputField("")
    vm.onClear()
    expect(vm.keyword).toBe("")
    await input.trigger("keydown.enter")
    expect(vm.movieListChild.searchMovie).toBeCalledWith(true)
  })

  it("Switches to Favorite tab", async ()=>{
    await tabSwitch("fav", "FavoritesList")
  })

  it("Switches to Movie list tab", async ()=>{
    await tabSwitch("list", "MovieList")
  })
})

import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { createPinia } from "pinia"
import IndexPage from "@/pages/index.vue"

describe("Index page",()=>{
  it("Loads Home component",()=>{
    const pinia = createPinia()
    const wrapper = mount(IndexPage,{
      global:{
        plugins: [pinia],
        stubs: ["home"]
      }
    })
    expect(wrapper.findComponent({name: "IndexPage"}).exists()).toBe(true)
  })
})
